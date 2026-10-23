// No third-party dependencies. Secrets stay in Edge Function environment.
const base = Deno.env.get('SUPABASE_URL');
const secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const origins = new Set(['https://meusinus.pages.dev']);
const permissions = {owner:['users','roles','plans','settings','audit','metrics'],support:['users','metrics'],content:['settings','metrics'],finance:['plans','metrics']};
class ApiError extends Error { constructor(status,message){super(message);this.status=status;} }
async function rest(path,opts={}) {
 const r=await fetch(base+path,{...opts,headers:{apikey:secret,Authorization:'Bearer '+secret,'Content-Type':'application/json',...opts.headers}});
 const body=await r.text(); let data;try{data=body?JSON.parse(body):null;}catch{throw new ApiError(502,'Resposta inválida do serviço.');}
 if(!r.ok)throw new ApiError(502,'Não foi possível concluir a operação no banco.');
 return data;
}
const query=(table,filter='')=>rest('/rest/v1/'+table+'?'+filter);
const write=(table,body,method='POST',filter='')=>rest('/rest/v1/'+table+'?'+filter,{method,headers:{Prefer:'return=representation,resolution=merge-duplicates'},body:JSON.stringify(body)});
async function audit(actor,action,target,details={}){await write('sinus_admin_audit',{actor_id:actor,action,target,details});}
async function member(uid){return (await query('sinus_admin_members','user_id=eq.'+uid))[0];}
const uuid=v=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
Deno.serve(async req=>{
 const origin=req.headers.get('origin')||'';
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin',...(origins.has(origin)?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization,apikey,content-type,x-client-info','Access-Control-Allow-Methods':'POST,OPTIONS'}:{})};
 const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
 if(origin&&!origins.has(origin))return reply({error:'Origem não autorizada.'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return reply({error:'Método não permitido.'},405);
 try {
  const token=(req.headers.get('authorization')||'').replace(/^Bearer /i,'');
  if(!token)throw new ApiError(401,'Entre na sua conta.');
  const r=await fetch(base+'/auth/v1/user',{headers:{apikey:secret,Authorization:'Bearer '+token}});
  if(!r.ok)throw new ApiError(401,'Sessão inválida. Entre novamente.');
  const actor=await r.json();
  const access=(await query('sinus_access_controls','user_id=eq.'+actor.id))[0];
  if(access?.blocked || (actor.banned_until&&Date.parse(actor.banned_until)>Date.now()))throw new ApiError(403,'Conta bloqueada. Fale com o suporte.');
  if(Number(req.headers.get('content-length')||0)>12000)throw new ApiError(413,'Solicitação muito grande.');
  const raw=await req.text();if(raw.length>12000)throw new ApiError(413,'Solicitação muito grande.');
  let b;try{b=JSON.parse(raw);}catch{throw new ApiError(400,'Solicitação inválida.');}
  const m=await member(actor.id); const role=m?.role||'student';
  const allow=p=>{if(!permissions[role]?.includes(p))throw new ApiError(403,'Você não tem permissão para esta ação.');};
  const target=()=>{if(!uuid(b.user_id))throw new ApiError(400,'Usuário inválido.');if(b.user_id===actor.id)throw new ApiError(400,'Sua própria conta não pode ser alterada aqui.');};
  if(b.action==='me')return reply({role,permissions:permissions[role]||[],user_id:actor.id});
  if(b.action==='config')return reply({settings:await query('sinus_admin_settings','select=key,value')});
  if(b.action==='event'){
   const kind=['login','page','heartbeat'].includes(b.kind)?b.kind:'heartbeat';
   const since=new Date(Date.now()-55000).toISOString();
   const previous=await query('sinus_access_events','select=id&user_id=eq.'+actor.id+'&created_at=gte.'+since+'&limit=1');
   if(!previous.length)await write('sinus_access_events',{user_id:actor.id,kind,page:String(b.page||'/').replace(/[?#].*$/,'').slice(0,160)});
   return reply({ok:true});
  }
  if(b.action==='users'){
   allow('users'); const page=Math.max(1,Math.min(10000,Number(b.page)||1));
   const users=await rest('/auth/v1/admin/users?page='+page+'&per_page=50');
   const ids=(users.users||[]).map(u=>u.id);
   const controls=ids.length?await query('sinus_access_controls','user_id=in.('+ids.join(',')+')'):[];
   const roles=ids.length?await query('sinus_admin_members','user_id=in.('+ids.join(',')+')'):[];
   const profiles=ids.length?await query('profiles','id=in.('+ids.join(',')+')'):[];
   return reply({page,total:users.total??null,users:(users.users||[]).map(u=>({id:u.id,email:u.email,name:profiles.find(p=>p.id===u.id)?.display_name||u.user_metadata?.full_name||'',created_at:u.created_at,last_sign_in_at:u.last_sign_in_at,blocked:controls.find(a=>a.user_id===u.id)?.blocked||!!(u.banned_until&&Date.parse(u.banned_until)>Date.now()),role:roles.find(a=>a.user_id===u.id)?.role||'student'}))});
  }
  if(b.action==='block'){
   allow('users');target(); const tm=await member(b.user_id);
   if(tm?.role==='owner'||(tm&&role!=='owner'))throw new ApiError(403,'Esta conta é protegida.');
   if(typeof b.blocked!=='boolean'||!String(b.reason||'').trim())throw new ApiError(400,'Informe o motivo.');
   // Fail closed: database access is denied before asking Auth to ban the account.
   if(b.blocked)await write('sinus_access_controls',{user_id:b.user_id,blocked:true,reason:String(b.reason).slice(0,500),updated_at:new Date().toISOString()});
   await audit(actor.id,b.blocked?'block_requested':'unblock_requested',b.user_id,{reason:String(b.reason).slice(0,500)});
   await rest('/auth/v1/admin/users/'+b.user_id,{method:'PUT',body:JSON.stringify({ban_duration:b.blocked?'876000h':'none'})});
   if(!b.blocked)await write('sinus_access_controls',{user_id:b.user_id,blocked:false,reason:String(b.reason).slice(0,500),updated_at:new Date().toISOString()});
   await audit(actor.id,b.blocked?'user_blocked':'user_unblocked',b.user_id);return reply({ok:true});
  }
  if(b.action==='role'){
   allow('roles');target(); const tm=await member(b.user_id);
   if(tm?.role==='owner')throw new ApiError(403,'O proprietário é protegido.');
   if(!['student','support','content','finance'].includes(b.role))throw new ApiError(400,'Função inválida.');
   const u=await rest('/auth/v1/admin/users/'+b.user_id);if(!u.id&&!u.user?.id)throw new ApiError(404,'Usuário não encontrado.');
   await audit(actor.id,'role_requested',b.user_id,{role:b.role});
   if(b.role==='student')await rest('/rest/v1/sinus_admin_members?user_id=eq.'+b.user_id,{method:'DELETE'});
   else await write('sinus_admin_members',{user_id:b.user_id,role:b.role});
   await audit(actor.id,'role_changed',b.user_id,{role:b.role});return reply({ok:true});
  }
  if(b.action==='plans'){allow('plans');return reply({plans:await query('subscription_plans','order=amount_cents.asc')});}
  if(b.action==='plan'){
   allow('plans');if(!/^[a-z0-9_]{1,50}$/.test(b.code)||!Number.isSafeInteger(b.amount_cents)||b.amount_cents<0||b.amount_cents>10000000||typeof b.active!=='boolean')throw new ApiError(400,'Preço ou plano inválido.');
   const old=(await query('subscription_plans','code=eq.'+b.code))[0];if(!old)throw new ApiError(404,'Plano não encontrado.');
   if(old.stripe_price_id&&old.amount_cents!==b.amount_cents)throw new ApiError(409,'Este plano está vinculado à cobrança. É necessário criar um novo preço no provedor antes de trocar o valor.');
   await audit(actor.id,'plan_change_requested',b.code,{before:{amount_cents:old.amount_cents,active:old.active},after:{amount_cents:b.amount_cents,active:b.active}});
   await write('subscription_plans',{amount_cents:b.amount_cents,active:b.active},'PATCH','code=eq.'+b.code);
   await audit(actor.id,'plan_changed',b.code);return reply({ok:true,billing_changed:false});
  }
  if(b.action==='settings'){allow('settings');return reply({settings:await query('sinus_admin_settings')});}
  if(b.action==='setting'){
   allow('settings');let value;
   if(b.key==='announcement'){if(typeof b.value?.enabled!=='boolean'||typeof b.value?.text!=='string'||b.value.text.length>500)throw new ApiError(400,'Aviso inválido.');value={enabled:b.value.enabled,text:b.value.text};}
   else if(b.key==='features'){const keys=['library','flashcards','revalida','atlas','ai'];if(keys.some(k=>typeof b.value?.[k]!=='boolean'))throw new ApiError(400,'Configuração inválida.');value=Object.fromEntries(keys.map(k=>[k,b.value[k]]));}
   else throw new ApiError(400,'Configuração não reconhecida.');
   await audit(actor.id,'setting_change_requested',b.key,{value});await write('sinus_admin_settings',{key:b.key,value,updated_at:new Date().toISOString()});await audit(actor.id,'setting_changed',b.key);return reply({ok:true});
  }
  if(b.action==='audit'){allow('audit');return reply({audit:await query('sinus_admin_audit','order=created_at.desc&limit=100')});}
  if(b.action==='metrics'){
   allow('metrics');const days=Math.max(1,Math.min(90,Number(b.days)||7));
   const since=new Date(Date.now()-days*86400000).toISOString();
   const events=await query('sinus_access_events','select=user_id,kind,page,created_at&created_at=gte.'+since+'&order=created_at.desc&limit=10000');
   const last5=new Set(events.filter(e=>Date.parse(e.created_at)>Date.now()-300000).map(e=>e.user_id)).size;
   const perDay={};events.forEach(e=>{const d=e.created_at.slice(0,10);(perDay[d]??=new Set()).add(e.user_id);});
   return reply({days,active_users:new Set(events.map(e=>e.user_id)).size,online_5min:last5,events:events.length,capped:events.length===10000,per_day:Object.entries(perDay).map(([day,users])=>({day,users:users.size})).sort((a,b)=>a.day.localeCompare(b.day)),notice:'Métricas a partir da instalação. Presença nos últimos 5 minutos é aproximada.'});
  }
  throw new ApiError(400,'Ação não reconhecida.');
 }catch(e){return reply({error:e instanceof ApiError?e.message:'Não foi possível concluir. Tente novamente.'},e instanceof ApiError?e.status:500);}
});
