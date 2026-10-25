/* SINUS · Anatomía II: Drive verificado, coleção da Biblioteca por disciplina.
 * Não inventa vínculo com turmas; jamais copia arquivos nem altera permissões.
 */
(function(W){
'use strict';
const SRC='/sinus/anatomia-ii-biblioteca.json?v=20261025-periodos-i-ii-v1';
const CATS=['slides','provas','audios','videos','pratica','complementares'];
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const isII=x=>/^anatomia\s+(?:ii|2)$/.test(norm(x));
const state={items:[],loading:false,loaded:false,error:'',added:0};
let pending=null,updating=false;
function target(){
 if(typeof DB==='undefined'||!DB?.subjects)return null;
 const match=Object.entries(DB.subjects).find(([name,s])=>isII(name)&&Number(s.period)===2);
 return match?{name:match[0],subject:match[1]}:null;
}
function apply(){
 const ctx=target();if(!state.loaded||!ctx||updating)return 0;
 const s=ctx.subject,known=new Set();
 for(const cat of CATS)for(const it of s[cat]||[])if(it.id)known.add(String(it.id));
 let count=0;
 for(const raw of state.items){
  if(!raw.id||!CATS.includes(raw.cat)||raw.academicPeriod!==2||!isII(raw.subject)||known.has(String(raw.id)))continue;
  const cat=raw.cat;
  if(!Array.isArray(s[cat]))s[cat]=[];
  s[cat].push({
   id:raw.id,title:raw.title,kind:raw.mime,mime:raw.mime,
   source:'anatomia-ii-biblioteca',academicPeriod:2,
   studyMode:raw.studyMode,studySection:raw.studySection,
   topic:raw.topic,cohort:'',section:raw.studySection,
   url:raw.url,active:true,requiresGooglePermission:true,
   period:'Biblioteca · 2º período',uid:'sinus_anatomia_ii_'+raw.id
  });
  known.add(String(raw.id));count++;
 }
 if(!s.teacher)s.teacher='Cátedra de Anatomia';
 if(!s.practiceTeacher)s.practiceTeacher='Cátedra de Anatomia';
 if(s.mode!=='Teoria + Prática')s.mode='Teoria + Prática';
 state.added=count;
 if(count&&W.SinusApp?.S?.dentro&&!updating){
  updating=true;
  try{
   W.renderSubjects?.();
   W.renderLibrary?.();
   if(typeof UI!=='undefined'&&isII(UI.subject)&&W.renderSubject)W.renderSubject();
  }finally{updating=false}
 }
 return count;
}
function load(){
 if(state.loaded){apply();return Promise.resolve(state.items)}
 if(pending)return pending;
 state.loading=true;
 pending=fetch(SRC,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Anatomía II: HTTP '+r.status);return r.json()})
 .then(data=>{
  if(!Array.isArray(data?.items)||data.items.length<75)throw Error('Índice de Anatomía II ausente ou incompleto');
  const unique=new Set();
  state.items=data.items.filter(x=>{
   if(!x||!/^[a-zA-Z0-9_-]{20,100}$/.test(x.id)||unique.has(x.id))return false;
   unique.add(x.id);return true;
  });
  state.loaded=true;state.error='';apply();
  W.dispatchEvent?.(new CustomEvent('sinus:anatomia-ii-ready',{detail:{items:state.items.length,added:state.added}}));
  return state.items;
 }).catch(e=>{state.error=String(e);return []})
 .finally(()=>{pending=null;state.loading=false});
 return pending;
}
W.SinusAnatomiaIIBiblioteca={state,load,apply,get catalog(){return state.items}};
['sinus:drive-ready','sinus:medicina-ready'].forEach(event=>W.addEventListener?.(event,apply));
load();
})(window);
