/* SINUS · Balões administrados por matéria/período/turma. Não altera os materiais já existentes. */
(function(W,D){'use strict';
if(!W.SinusBackend?.client||W.SINUS_DEMO)return;
const END='https://qyioizupudjrwmtasrue.supabase.co/functions/v1/sinus-subject-resources';
const display={overview:'Visão geral',resumos:'Resumos e apostilas',slides:'Slides',provas:'Provas e gabaritos',audios:'Áudios',videos:'Vídeos',pratica:'Materiais práticos',laminas:'Lâminas e imagens',complementares:'Complementares',livros:'Livros',training:'Treino',review:'Revisão',transcribe:'Transcrição',notebook:'Caderno',lembretes:'Lembretes'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cache=new Map(),pending=new Map();let busy=false;
const context=()=>typeof UI!=='undefined'&&UI.subject&&D.getElementById('subjectView')&&!D.getElementById('subjectView').classList.contains('hidden')?{subject:UI.subject,tab:UI.tab,mode:UI.mode}:null;
function validatedLinks(arr){return (Array.isArray(arr)?arr:[]).filter(x=>{try{let u=new URL(x.url);return u.protocol==='https:'&&['drive.google.com','docs.google.com'].includes(u.hostname)}catch{return false}});}
function scopedRows(rows){const selected={};for(const x of rows){if(display[x.section])selected[x.section]=x;}return selected;}
async function fetchConfigs(subject){
 if(cache.has(subject))return cache.get(subject);
 if(pending.has(subject))return pending.get(subject);
 const task=(async()=>{
  const {data:{session}}=await W.SinusBackend.client.auth.getSession();
  if(!session)return {};
  const r=await fetch(END,{method:'POST',headers:{Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'},body:JSON.stringify({action:'student',subject})});
  if(!r.ok)throw Error('Não foi possível obter os recursos.');
  const d=await r.json();const config=d.scope_ready===false?{}:scopedRows(d.configs||[]);
  cache.set(subject,config);return config;
 })().finally(()=>pending.delete(subject));
 pending.set(subject,task);return task;
}
function cards(links,label){
 const items=validatedLinks(links);
 if(!items.length)return '';
 return '<section class="sxAdminResourceLinks"><div class="sxAdminResourceHead"><span>ARQUIVOS ORGANIZADOS</span><h3>'+esc(label)+'</h3></div><div class="sxAdminResourceCards">'+items.map(x=>'<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" class="sxAdminResourceCard"><span class="sxAdminResourceIcon">↗</span><span><b>'+esc(x.title)+'</b><small>Abrir no Google Drive</small></span></a>').join('')+'</div></section>';
}
function apply(subject,configs){
 const ctx=context();if(!ctx||ctx.subject!==subject||busy)return;
 const hidden=key=>key!=='overview'&&configs[key]?.visible===false;
 if(hidden(ctx.tab)){
  busy=true;UI.tab='overview';if(typeof W.renderSubject==='function')W.renderSubject();busy=false;
  apply(subject,configs);return;
 }
 const tabs=D.querySelectorAll('#subjectTabs button');
 tabs.forEach(b=>{const tab=b.getAttribute('onclick')?.match(/setTab\(['"]([^'"]+)['"]\)/)?.[1];if(!tab)return;b.hidden=hidden(tab);if(configs[tab]?.label)b.textContent=configs[tab].label;});
 D.querySelectorAll('.sxSubjectHubAction').forEach(b=>{const tab=b.getAttribute('onclick')?.match(/setTab\(['"]([^'"]+)['"]\)/)?.[1];if(tab){b.hidden=hidden(tab);if(configs[tab]?.label){const first=b.querySelector('span');if(first)first.textContent=configs[tab].label;}}});
 const host=D.getElementById('subjectContent');if(!host)return;
 host.querySelectorAll('.sxAdminResourceLinks').forEach(el=>el.remove());
 let html='';
 if(ctx.tab==='overview'){
  html+=cards(configs.overview?.links,configs.overview?.label||'Materiais da disciplina');
  for(const sec of ['resumos','livros','lembretes']){
   const entry=configs[sec];if(!entry||entry.visible===false)continue;
   html+=cards(entry.links,entry.label||display[sec]);
  }
 }else if(!hidden(ctx.tab)){
  html+=cards(configs[ctx.tab]?.links,configs[ctx.tab]?.label||display[ctx.tab]||'Materiais');
 }
 if(html)host.insertAdjacentHTML('afterbegin',html);
}
const original=W.renderSubject;
if(typeof original==='function'){
 W.renderSubject=function(){const v=original.apply(this,arguments),ctx=context();if(ctx){
  const conf=cache.get(ctx.subject);
  if(conf)apply(ctx.subject,conf);
  else fetchConfigs(ctx.subject).then(x=>{const active=context();if(active?.subject===ctx.subject)apply(ctx.subject,x)}).catch(()=>{});
 }return v;};
}
W.SinusBackend.client.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT'||event==='SIGNED_IN')cache.clear();});
D.head.insertAdjacentHTML('beforeend','<style>.sxAdminResourceLinks{border:1px solid #d9e6dc;border-radius:16px;background:#fbfdfb;padding:20px;margin:0 0 18px;color:#244c34}.sxAdminResourceHead span{font-size:10px;font-weight:800;letter-spacing:.12em;color:#72917c}.sxAdminResourceHead h3{margin:5px 0 16px;font-size:19px}.sxAdminResourceCards{display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:10px}.sxAdminResourceCard{display:flex;align-items:center;gap:12px;border:1px solid #e2ebe4;border-radius:12px;background:white;text-decoration:none;color:inherit;padding:15px;transition:background .15s,border-color .15s}.sxAdminResourceCard:hover{background:#edf7f0;border-color:#9dc3a7}.sxAdminResourceIcon{display:grid;place-items:center;flex:none;background:#ebf4ed;color:#2d7450;border-radius:9px;width:37px;height:37px}.sxAdminResourceCard b{font-size:13px;display:block}.sxAdminResourceCard small{display:block;color:#829388;font-size:11px;margin-top:4px}#subjectTabs button[hidden],.sxSubjectHubAction[hidden]{display:none!important}@media(max-width:600px){.sxAdminResourceLinks{padding:15px}.sxAdminResourceCards{grid-template-columns:1fr}}</style>');
})(window,document);
