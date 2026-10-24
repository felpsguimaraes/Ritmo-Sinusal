// No third-party dependencies. Secrets stay in Edge Function environment.
const base = Deno.env.get('SUPABASE_URL');
const secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const origins = new Set(['https://meusinus.pages.dev']);
const permissions = {owner:['users','roles','plans','settings','audit','metrics','limits','messages'],support:['users','metrics','messages'],content:['settings','metrics','messages'],finance:['plans','metrics','limits']};
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
const rpc=(name,body)=>rest('/rest/v1/rpc/'+name,{method:'POST',body:JSON.stringify(body)});
const uuid=v=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

async function resolvePlan(uid){return await rpc('sinus_resolved_plan',{p_user:uid});}
async function allAuthUsers(){const users=[];for(let page=1;page<=51;page++){const d=await rest('/auth/v1/admin/users?page='+page+'&per_page=100');users.push(...(d.users||[]));if(users.length>5000)throw new ApiError(400,'Envie para grupos menores: o limite é de 5.000 alunos por envio.');if((d.users||[]).length<100)return users;}throw new ApiError(400,'Destinatários demais.');}
async function recipients(audience,target){
 if(!['all','user','plan'].includes(audience))throw new ApiError(400,'Escolha os destinatários.');
 if(audience==='user'&&!uuid(target))throw new ApiError(400,'Selecione o aluno na lista.');
 const users=audience==='user'?[await rest('/auth/v1/admin/users/'+target)]:await allAuthUsers();
 const actual=users.map(u=>u.user||u);
 const blocked=await query('sinus_access_controls','select=user_id&blocked=eq.true');
 const staff=await query('sinus_admin_members','select=user_id');
 let ids=actual.filter(u=>u.id&&!blocked.some(b=>b.user_id===u.id)&&!staff.some(a=>a.user_id===u.id)&&!(u.banned_until&&Date.parse(u.banned_until)>Date.now())).map(u=>u.id);
 if(audience==='plan'){
  if(target!=='free'&&!(await query('subscription_plans','code=eq.'+encodeURIComponent(target))).length)throw new ApiError(400,'Plano inválido.');
  const eligible=[];for(const id of ids){if(await resolvePlan(id)===target)eligible.push(id);}ids=eligible;
 }
 return ids;
}
async function signedMessageImage(path){if(!path)return null;const d=await rest('/storage/v1/object/sign/sinus-messages/'+path,{method:'POST',body:JSON.stringify({expiresIn:120})});return base+'/storage/v1'+d.signedURL;}
async function inboxFor(uid){const receipts=await query('sinus_message_receipts','user_id=eq.'+uid+'&select=message_id,read_at,sinus_messages!inner(*)&sinus_messages.withdrawn_at=is.null&order=sinus_messages(created_at).desc&limit=100');const rows=receipts.filter(r=>r.sinus_messages&&!r.sinus_messages.withdrawn_at).sort((a,b)=>Date.parse(b.sinus_messages.created_at)-Date.parse(a.sinus_messages.created_at));return await Promise.all(rows.map(async r=>({...r.sinus_messages,read_at:r.read_at,image_url:await signedMessageImage(r.sinus_messages.image_path)})));}

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
  if(Number(req.headers.get('content-length')||0)>4300000)throw new ApiError(413,'Solicitação muito grande.');
  const raw=await req.text();if(raw.length>4300000)throw new ApiError(413,'Solicitação muito grande.');
  let b;try{b=JSON.parse(raw);}catch{throw new ApiError(400,'Solicitação inválida.');}
  const m=await member(actor.id); const role=m?.role||'student';
  const allow=p=>{if(!permissions[role]?.includes(p))throw new ApiError(403,'Você não tem permissão para esta ação.');};
  const target=()=>{if(!uuid(b.user_id))throw new ApiError(400,'Usuário inválido.');if(b.user_id===actor.id)throw new ApiError(400,'Sua própria conta não pode ser alterada aqui.');};
  if(b.action==='me')return reply({role,permissions:permissions[role]||[],user_id:actor.id});
  if(b.action==='config')return reply({settings:await query('sinus_admin_settings','select=key,value'),tools:await query('sinus_tool_catalog','order=category.asc,name.asc'),plan_code:await resolvePlan(actor.id)});
  if(b.action==='event'){
   const kind=['login','page','heartbeat'].includes(b.kind)?b.kind:'heartbeat';
   const since=new Date(Date.now()-55000).toISOString();
   const previous=await query('sinus_access_events','select=id&user_id=eq.'+actor.id+'&created_at=gte.'+since+'&limit=1');
   if(!previous.length)await write('sinus_access_events',{user_id:actor.id,kind,page:String(b.page||'/').replace(/[?#].*$/,'').slice(0,160)});
   return reply({ok:true});
  }

  if(b.action==='tools'){allow('settings');return reply({tools:await query('sinus_tool_catalog','order=category.asc,name.asc')});}
  if(b.action==='tool'){
   allow('settings');if(typeof b.enabled!=='boolean'||typeof b.tool_key!=='string'||!/^[a-z_-]{1,40}$/.test(b.tool_key))throw new ApiError(400,'Ferramenta inválida.');
   const t=(await query('sinus_tool_catalog','key=eq.'+b.tool_key))[0];if(!t)throw new ApiError(404,'Ferramenta não encontrada.');if(t.essential&&!b.enabled)throw new ApiError(400,'Este recurso de conta permanece disponível.');
   await rpc('sinus_admin_tool_change',{p_actor:actor.id,p_kind:'feature',p_data:{tool_key:b.tool_key,enabled:b.enabled}});return reply({ok:true});
  }
  if(b.action==='limits'){
   allow('limits');return reply({tools:await query('sinus_tool_catalog','order=category.asc,name.asc'),plans:[{code:'free',name:'Sem assinatura / gratuito'},...await query('subscription_plans','select=code,name,interval')],rules:await query('sinus_plan_tool_rules','order=plan_code.asc,tool_key.asc,operation.asc&limit=1000')});
  }
  if(b.action==='limit'){
   allow('limits');if(typeof b.enabled!=='boolean'||!['view','use','download'].includes(b.operation)||typeof b.plan_code!=='string'||!/^[a-z0-9_]{1,50}$/.test(b.plan_code)||typeof b.tool_key!=='string'||!/^[a-z_-]{1,40}$/.test(b.tool_key))throw new ApiError(400,'Regra inválida.');
   for(const k of ['daily_limit','monthly_limit','total_limit'])if(b[k]!==null&&(!Number.isSafeInteger(b[k])||b[k]<0||b[k]>100000000))throw new ApiError(400,'Limites devem ser inteiros positivos, zero ou ilimitado.');
   const t=(await query('sinus_tool_catalog','key=eq.'+b.tool_key))[0];if(!t||t.essential)throw new ApiError(400,'Esta ferramenta não aceita cotas.');
   await rpc('sinus_admin_tool_change',{p_actor:actor.id,p_kind:'rule',p_data:{plan_code:b.plan_code,tool_key:b.tool_key,operation:b.operation,enabled:b.enabled,daily_limit:b.daily_limit,monthly_limit:b.monthly_limit,total_limit:b.total_limit}});return reply({ok:true});
  }
  if(b.action==='consume_batch'){
   if(!Array.isArray(b.checks)||b.checks.length<1||b.checks.length>8||b.checks.some(c=>typeof c.tool_key!=='string'||!/^[a-z_-]{1,40}$/.test(c.tool_key)||!['view','use','download'].includes(c.operation)||!uuid(c.request_id)))throw new ApiError(400,'Acesso inválido.');
   const result=await rpc('sinus_consume_tools',{p_user:actor.id,p_checks:b.checks});return reply(result,result.allowed?200:403);
  }
  if(b.action==='my_usage'||b.action==='usage_for'){
   let uid=actor.id;if(b.action==='usage_for'){allow('users');if(!uuid(b.user_id))throw new ApiError(400,'Usuário inválido.');uid=b.user_id;}
   const plan=await resolvePlan(uid);return reply({plan_code:plan,tools:await query('sinus_tool_catalog','select=key,name'),rules:await query('sinus_plan_tool_rules','plan_code=eq.'+encodeURIComponent(plan)),usage:await rpc('sinus_my_tool_usage',{p_user:uid})});
  }
  if(b.action==='consume'){
   if(typeof b.tool_key!=='string'||!/^[a-z_-]{1,40}$/.test(b.tool_key)||!['view','use','download'].includes(b.operation)||!uuid(b.request_id))throw new ApiError(400,'Acesso inválido.');
   const result=await rpc('sinus_consume_tool',{p_user:actor.id,p_tool:b.tool_key,p_operation:b.operation,p_request:b.request_id});return reply(result,result.allowed?200:403);
  }
  if(b.action==='user_plan'){
   allow('users');target();if(role!=='owner')throw new ApiError(403,'Somente o proprietário pode conceder planos.');
   if(typeof b.plan_code!=='string'||!String(b.reason||'').trim())throw new ApiError(400,'Informe o plano e o motivo.');
   if(b.plan_code!=='free'&&!(await query('subscription_plans','code=eq.'+encodeURIComponent(b.plan_code))).length)throw new ApiError(400,'Plano não encontrado.');
   if(b.expires_at!==null&&(!Number.isFinite(Date.parse(b.expires_at))||Date.parse(b.expires_at)<=Date.now()))throw new ApiError(400,'Informe uma validade futura.');
   const old=await rest('/auth/v1/admin/users/'+b.user_id);if((old.user||old).id!==b.user_id)throw new ApiError(404,'Aluno não encontrado.');
   await audit(actor.id,'manual_plan_requested',b.user_id,{plan_code:b.plan_code,expires_at:b.expires_at,reason:String(b.reason).slice(0,500)});
   await write('sinus_plan_access',{user_id:b.user_id,plan_code:b.plan_code,expires_at:b.expires_at,reason:String(b.reason).slice(0,500),updated_at:new Date().toISOString()});return reply({ok:true,billing_changed:false});
  }
  if(b.action==='inbox_count'){const unread=await query('sinus_message_receipts','select=message_id,sinus_messages!inner(id)&user_id=eq.'+actor.id+'&read_at=is.null&sinus_messages.withdrawn_at=is.null&limit=1001');return reply({unread:unread.length});}
  if(b.action==='inbox')return reply({messages:await inboxFor(actor.id)});
  if(b.action==='message_read'){
   if(!uuid(b.message_id))throw new ApiError(400,'Mensagem inválida.');
   await write('sinus_message_receipts',{read_at:new Date().toISOString()},'PATCH','user_id=eq.'+actor.id+'&message_id=eq.'+b.message_id+'&read_at=is.null');return reply({ok:true});
  }
  if(b.action==='messages'){allow('messages');return reply({messages:await rpc('sinus_admin_message_history',{p_actor:actor.id})});}
  if(b.action==='message_options'){allow('messages');return reply({plans:[{code:'free',name:'Sem assinatura / gratuito'},...await query('subscription_plans','select=code,name,interval')]});}
  if(b.action==='message_students'){
   allow('messages');const page=Math.max(1,Math.min(100,Math.floor(Number(b.page)||1)));
   const data=await rest('/auth/v1/admin/users?page='+page+'&per_page=50');const list=data.users||[],ids=list.map(u=>u.id);
   const staff=await query('sinus_admin_members','select=user_id');
   const academic=ids.length?await query('sinus_documents','select=id,user_id,collection,payload&collection=in.(perfis,progresso)&user_id=in.('+ids.join(',')+')'):[];
   return reply({has_more:list.length===50,users:list.filter(u=>!staff.some(s=>s.user_id===u.id)).map(u=>{const p=academic.find(d=>d.collection==='perfis'&&d.id===u.id)?.payload||{},prefs=academic.find(d=>d.collection==='progresso'&&d.id===u.id+'_sinus-perfil')?.payload?.prog||{};return {id:u.id,email:u.email,name:p.nome||u.user_metadata?.full_name||'',class_name:p.turma||prefs.turma||null,academic_period:prefs.periodo||p.periodo||null};})});
  }
  if(b.action==='message_preview'){allow('messages');return reply({count:(await recipients(b.audience,b.target)).length});}
  if(b.action==='message_image'){
   allow('messages');const match=String(b.data||'').match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/);if(!match)throw new ApiError(400,'Use JPG, PNG ou WebP.');
   const bytes=Uint8Array.from(atob(match[2]),c=>c.charCodeAt(0));if(bytes.length<12||bytes.length>3145728)throw new ApiError(400,'Imagem inválida ou maior que 3 MB.');
   const png=[137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n),jpeg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255,webp=new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
   if(!(match[1]==='image/png'&&png||match[1]==='image/jpeg'&&jpeg||match[1]==='image/webp'&&webp))throw new ApiError(400,'O conteúdo não corresponde a uma imagem suportada.');
   const path=actor.id+'/'+crypto.randomUUID()+'.'+({'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[match[1]]);
   await rest('/storage/v1/object/sinus-messages/'+path,{method:'POST',headers:{'Content-Type':match[1],'x-upsert':'false'},body:bytes});return reply({path});
  }
  if(b.action==='message_send'){
   allow('messages');if(!uuid(b.message_id)||typeof b.title!=='string'||!b.title.trim()||b.title.length>120||typeof b.body!=='string'||b.body.length>5000||!b.body.trim()&&!b.image_path)throw new ApiError(400,'Informe título e texto ou imagem.');
   if(b.image_path!==null&&(typeof b.image_path!=='string'||!b.image_path.startsWith(actor.id+'/')||!new RegExp('^'+actor.id+'/[a-f0-9-]{36}[.](png|jpg|webp)$').test(b.image_path)))throw new ApiError(400,'Anexo inválido.');
   const already=await query('sinus_messages','id=eq.'+b.message_id);if(already.length){if(already[0].author_id!==actor.id||already[0].title!==b.title.trim()||already[0].body!==b.body.trim()||already[0].image_path!==b.image_path||already[0].audience!==b.audience||already[0].target!==(b.target||null))throw new ApiError(409,'Solicitação já utilizada com outro conteúdo.');return reply({ok:true,duplicate:true});}
   const ids=await recipients(b.audience,b.target);if(!ids.length)throw new ApiError(400,'Nenhum aluno elegível para receber a mensagem.');if(ids.length!==b.expected_count)throw new ApiError(409,'A quantidade de destinatários mudou. Confira a prévia novamente.');
   const count=await rpc('sinus_publish_message',{p_actor:actor.id,p_id:b.message_id,p_title:b.title.trim(),p_body:b.body.trim(),p_image:b.image_path,p_audience:b.audience,p_target:b.target||null,p_recipients:ids});return reply({ok:true,count});
  }
  if(b.action==='message_withdraw'){
   allow('messages');if(!uuid(b.message_id))throw new ApiError(400,'Mensagem inválida.');const old=(await query('sinus_messages','id=eq.'+b.message_id))[0];if(!old||old.author_id!==actor.id&&role!=='owner')throw new ApiError(403,'Você não pode retirar esta mensagem.');
   await audit(actor.id,'message_withdrawn',b.message_id);await write('sinus_messages',{withdrawn_at:new Date().toISOString()},'PATCH','id=eq.'+b.message_id);return reply({ok:true});
  }

  if(b.action==='users'){
   allow('users'); const page=Math.max(1,Math.min(10000,Number(b.page)||1));
   const users=await rest('/auth/v1/admin/users?page='+page+'&per_page=50');
   const ids=(users.users||[]).map(u=>u.id);
   const controls=ids.length?await query('sinus_access_controls','user_id=in.('+ids.join(',')+')'):[];
   const roles=ids.length?await query('sinus_admin_members','user_id=in.('+ids.join(',')+')'):[];
   const profiles=ids.length?await query('profiles','id=in.('+ids.join(',')+')'):[];
   const academic=ids.length?await query('sinus_documents','select=id,user_id,collection,payload&collection=in.(perfis,progresso)&user_id=in.('+ids.join(',')+')'):[];
   const assigned=ids.length?await query('sinus_plan_access','user_id=in.('+ids.join(',')+')'):[];
   const subs=ids.length?await query('subscriptions','user_id=in.('+ids.join(',')+')&status=in.(active,trialing)&order=created_at.desc'):[];
   const planOf=uid=>assigned.find(a=>a.user_id===uid&&(!a.expires_at||Date.parse(a.expires_at)>Date.now()))?.plan_code||subs.find(a=>a.user_id===uid&&(!a.current_period_end||Date.parse(a.current_period_end)>Date.now()))?.plan_code||'free';
   const school=uid=>{const profile=academic.find(d=>d.user_id===uid&&d.collection==='perfis'&&d.id===uid)?.payload||{};const prefs=academic.find(d=>d.user_id===uid&&d.collection==='progresso'&&d.id===uid+'_sinus-perfil')?.payload?.prog||{};return {class_name:profile.turma||prefs.turma||null,academic_period:prefs.periodo||profile.periodo||profiles.find(p=>p.id===uid)?.academic_period||null,practice_group:prefs.grupoPratica||prefs.grupo||null,campus:prefs.campus||null,school_name:profile.nome||null};};
   return reply({page,total:users.total??null,users:(users.users||[]).map(u=>({id:u.id,email:u.email,plan_code:planOf(u.id),...school(u.id),name:school(u.id).school_name||profiles.find(p=>p.id===u.id)?.display_name||u.user_metadata?.full_name||'',created_at:u.created_at,last_sign_in_at:u.last_sign_in_at,blocked:controls.find(a=>a.user_id===u.id)?.blocked||!!(u.banned_until&&Date.parse(u.banned_until)>Date.now()),role:roles.find(a=>a.user_id===u.id)?.role||'student'}))});
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
   else if(b.key==='features'){throw new ApiError(400,'Use o catálogo completo de ferramentas.');}
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
