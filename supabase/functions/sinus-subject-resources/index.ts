// SINUS · gerenciamento de recursos por matéria (endpoint separado da API financeira).
const base=Deno.env.get('SUPABASE_URL')!;
const secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const allowedOrigin='https://meusinus.pages.dev';
class Fail extends Error { status:number; constructor(status:number,message:string){super(message);this.status=status;} }
const sections=new Set(['overview','slides','provas','audios','videos','pratica','laminas','complementares','transcribe','training','review','notebook','resumos','livros','lembretes']);
const clean=(v:unknown,max:number)=>String(v??'').trim().slice(0,max);
const isScope=(v:any)=>Number.isInteger(v.period)&&v.period>=1&&v.period<=10&&typeof v.subject==='string'&&v.subject.trim().length>0&&v.subject.trim().length<=160&&typeof v.cohort==='string'&&(/^([A-Z]{1,3}|\*)$/).test(v.cohort);
async function rest(path:string,options:RequestInit={}) {
 const response=await fetch(base+path,{...options,headers:{'apikey':secret,'Authorization':'Bearer '+secret,'Content-Type':'application/json',...options.headers}});
 const text=await response.text();let data:any;try{data=text?JSON.parse(text):null;}catch{throw new Fail(502,'Resposta inválida do banco.');}
 if(!response.ok)throw new Fail(502,'Falha ao acessar o banco de dados.');
 return data;
}
const db=(filter:string)=>rest('/rest/v1/sinus_subject_resource_configs?'+filter);
async function auth(token:string){if(!token)throw new Fail(401,'Entre no SINUS.');const r=await fetch(base+'/auth/v1/user',{headers:{'apikey':secret,'Authorization':'Bearer '+token}});if(!r.ok)throw new Fail(401,'Sessão expirada. Entre novamente.');return r.json();}
const doc=(uid:string,collection:string,id:string)=>rest('/rest/v1/sinus_documents?select=payload&user_id=eq.'+uid+'&collection=eq.'+collection+'&id=eq.'+encodeURIComponent(id)+'&limit=1');
async function school(uid:string) {
 const [p,u,pr]=await Promise.all([doc(uid,'progresso',uid+'_sinus-perfil'),doc(uid,'perfis',uid),rest('/rest/v1/profiles?select=academic_period&id=eq.'+uid+'&limit=1')]);
 const prefs=p[0]?.payload?.prog||{},profile=u[0]?.payload||{};
 const n=Number(String(prefs.periodo||prefs.period||pr[0]?.academic_period||'').match(/\d+/)?.[0]||0);
 const cohort=clean(profile.turma||prefs.turma||'',3).toUpperCase();
 return {period:n,cohort};
}
async function staff(uid:string){const m=await rest('/rest/v1/sinus_admin_members?select=role&user_id=eq.'+uid+'&limit=1');return ['owner','content'].includes(m[0]?.role);}
function validLinks(input:any){
 if(!Array.isArray(input)||input.length>10)throw new Fail(400,'Cadastre até 10 links por aba.');
 return input.map((x:any)=>{const title=clean(x?.title,100);const raw=clean(x?.url,1800);if(!title||!raw)throw new Fail(400,'Informe o título e o link de cada material.');
 let u:URL;try{u=new URL(raw);}catch{throw new Fail(400,'Link de Drive inválido.');}
 if(u.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(u.hostname)||u.username||u.password)throw new Fail(400,'Use links HTTPS do Google Drive ou Google Docs.');
 const stage=['P1','P2','FINAL','OUTROS'].includes(String(x?.stage||'').toUpperCase())?String(x.stage).toUpperCase():'OUTROS';
 return {title,url:u.href,stage};});
}
const scopeQuery=(s:any)=>'academic_period=eq.'+s.period+'&subject=eq.'+encodeURIComponent(s.subject.trim())+'&select=academic_period,cohort,subject,section,label,visible,links,updated_at,updated_by&limit=1000';
Deno.serve(async(req:Request)=>{
 const origin=req.headers.get('origin')||'';
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin',...(origin===allowedOrigin?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization,content-type,apikey,x-client-info','Access-Control-Allow-Methods':'POST,OPTIONS'}:{})};
 const reply=(value:any,status=200)=>new Response(JSON.stringify(value),{status,headers});
 if(origin&&origin!==allowedOrigin)return reply({error:'Origem inválida.'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return reply({error:'Método inválido.'},405);
 try{
  const actor=await auth((req.headers.get('authorization')||'').replace(/^Bearer /i,''));
  const blocked=await rest('/rest/v1/sinus_access_controls?select=blocked&user_id=eq.'+actor.id+'&limit=1');
  if(blocked[0]?.blocked)throw new Fail(403,'Conta bloqueada.');
  const raw=await req.text();if(raw.length>180000)throw new Fail(413,'Solicitação grande demais.');
  let b:any;try{b=JSON.parse(raw);}catch{throw new Fail(400,'Dados inválidos.');}
  if(b.action==='student'){
   const s=await school(actor.id);
   if(!(s.period>=1&&s.period<=10&&/^[A-Z]{1,3}$/.test(s.cohort)))return reply({configs:[],scope_ready:false});
   const subject=clean(b.subject,160);
   if(!subject)return reply({configs:[],scope_ready:true});
   const all=await db(scopeQuery({period:s.period,subject}));
   const configs=all.filter((r:any)=>r.cohort==='*'||r.cohort===s.cohort).sort((a:any,b:any)=>(a.cohort==='*'?0:1)-(b.cohort==='*'?0:1));
   const imported=await rest('/rest/v1/sinus_drive_resource_items?select=file_id,title,url,mime_type,academic_period,cohort,subject,section,stage,study_mode,source_path,source_root_id&academic_period=eq.'+s.period+'&subject=eq.'+encodeURIComponent(subject)+'&limit=2000');
   return reply({configs,items:imported.filter((r:any)=>r.cohort==='*'||r.cohort===s.cohort),scope_ready:true});
  }
  if(!(await staff(actor.id)))throw new Fail(403,'Somente a equipe de conteúdo pode editar estes recursos.');
  if(b.action==='import_batch'){
   const root=clean(b.root_id,120);
   if(!/^[A-Za-z0-9_-]{15,120}$/.test(root)||!Array.isArray(b.items)||!b.items.length||b.items.length>100)throw new Fail(400,'Lote inválido: máximo de 100 arquivos.');
   const allowedSections=new Set(['slides','provas','audios','videos','pratica','laminas','complementares','resumos','livros']);
   const allowedMime=/^[a-zA-Z0-9.+/_-]{0,140}$/;
   const records:any[]=[],keys=new Set<string>();
   for(const x of b.items){
    const scope={period:x.period,cohort:x.cohort,subject:x.subject};
    const id=clean(x.file_id,120),title=clean(x.title,220),mode=clean(x.study_mode,15),mime=clean(x.mime_type,140),p=clean(x.source_path,500),section=clean(x.section,40),stage=clean(x.stage,10);
    if(!isScope(scope)||!allowedSections.has(section)||!/^[A-Za-z0-9_-]{10,120}$/.test(id)||!title||!['theory','practice'].includes(mode)||!['P1','P2','FINAL','OUTROS'].includes(stage)||!allowedMime.test(mime))throw new Fail(400,'Arquivo com classificação inválida.');
    let url:URL;try{url=new URL(String(x.url));}catch{throw new Fail(400,'URL de arquivo inválida.');}
    if(url.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(url.hostname)||url.username||url.password)throw new Fail(400,'Os links devem pertencer ao Google Drive.');
    const k=[id,x.period,x.cohort,x.subject,section,mode].join('\u001f');
    if(keys.has(k))continue;keys.add(k);
    records.push({source_root_id:root,file_id:id,academic_period:x.period,cohort:x.cohort,subject:x.subject,section,stage,study_mode:mode,title,mime_type:mime,url:url.href,source_path:p,updated_by:actor.id,updated_at:new Date().toISOString()});
   }
   const existing=await rest('/rest/v1/sinus_drive_resource_items?select=file_id,academic_period,cohort,subject,section,study_mode&source_root_id=eq.'+encodeURIComponent(root)+'&file_id=in.('+records.map(x=>x.file_id).join(',')+')&limit=1000');
   const existingKeys=new Set(existing.map((x:any)=>[x.file_id,x.academic_period,x.cohort,x.subject,x.section,x.study_mode].join('\u001f')));
   await rest('/rest/v1/sinus_drive_resource_items?on_conflict=source_root_id,file_id,academic_period,cohort,subject,section,study_mode',{method:'POST',headers:{Prefer:'return=minimal,resolution=merge-duplicates'},body:JSON.stringify(records)});
   const added=records.filter(x=>!existingKeys.has([x.file_id,x.academic_period,x.cohort,x.subject,x.section,x.study_mode].join('\u001f'))).length;
   await rest('/rest/v1/sinus_admin_audit',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({actor_id:actor.id,action:'drive_bulk_import',target:root,details:{received:records.length,created:added,updated:records.length-added}})});
   return reply({ok:true,created:added,updated:records.length-added,total:records.length});
  }
  if(b.action==='import_summary'){
   const root=clean(b.root_id,120);
   if(!/^[A-Za-z0-9_-]{15,120}$/.test(root))throw new Fail(400,'ID da pasta inválido.');
   const rows=await rest('/rest/v1/sinus_drive_resource_items?select=file_id,academic_period,cohort,subject,section,stage&source_root_id=eq.'+root+'&limit=5000');
   const groups:Record<string,{period:number,cohort:string,subject:string,section:string,files:number}>={};
   for(const x of rows){const key=[x.academic_period,x.cohort,x.subject,x.section].join('|');if(!groups[key])groups[key]={period:x.academic_period,cohort:x.cohort,subject:x.subject,section:x.section,files:0};groups[key].files++;}
   return reply({total:rows.length,groups:Object.values(groups)});
  }
  if(b.action==='list'){
   if(!isScope(b))throw new Fail(400,'Selecione período, turma e matéria.');
   const configs=await db(scopeQuery(b));
   return reply({configs:configs.filter((r:any)=>r.cohort==='*'||r.cohort===b.cohort)});
  }
  if(b.action==='save'){
   if(!isScope(b)||!sections.has(b.section)||typeof b.visible!=='boolean')throw new Fail(400,'Configuração inválida.');
   const links=validLinks(b.links);const label=clean(b.label,65);
   const record={academic_period:b.period,cohort:b.cohort,subject:b.subject.trim(),section:b.section,label,visible:b.visible,links,updated_by:actor.id,updated_at:new Date().toISOString()};
   await rest('/rest/v1/sinus_subject_resource_configs?on_conflict=academic_period,cohort,subject,section',{method:'POST',headers:{Prefer:'return=representation,resolution=merge-duplicates'},body:JSON.stringify(record)});
   await rest('/rest/v1/sinus_admin_audit',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({actor_id:actor.id,action:'subject_resource_saved',target:b.period+'|'+b.cohort+'|'+b.subject+'|'+b.section,details:{visible:b.visible,links:links.length}})});
   return reply({ok:true});
  }
  if(b.action==='delete'){
   if(!isScope(b)||!sections.has(b.section))throw new Fail(400,'Configuração inválida.');
   const filter='academic_period=eq.'+b.period+'&cohort=eq.'+encodeURIComponent(b.cohort)+'&subject=eq.'+encodeURIComponent(b.subject.trim())+'&section=eq.'+b.section;
   await rest('/rest/v1/sinus_subject_resource_configs?'+filter,{method:'DELETE'});
   await rest('/rest/v1/sinus_admin_audit',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({actor_id:actor.id,action:'subject_resource_reset',target:b.period+'|'+b.cohort+'|'+b.subject+'|'+b.section,details:{}})});
   return reply({ok:true});
  }
  throw new Fail(404,'Ação não encontrada.');
 }catch(err){const e=err as any;return reply({error:e instanceof Fail?e.message:'Não foi possível concluir a operação.'},e instanceof Fail?e.status:500);}
});
