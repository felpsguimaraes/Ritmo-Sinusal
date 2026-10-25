/* SINUS · importar materiais, respeitando estritamente matérias da grade oficial. */
(function(W){'use strict';
const state={items:[],loaded:false,errors:[],linked:0,unmatched:0};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const cats=['slides','provas','audios','videos','pratica','complementares'];
function kind(x){const m=x.m||'';return /image\//.test(m)?'Imagem':/audio\//.test(m)?'Áudio':/video\//.test(m)?'Vídeo':/pdf/.test(m)?'PDF':/presentation|powerpoint/.test(m)?'Slides':'Documento'}
function apply(){
 if(!state.loaded||typeof DB==='undefined'||!DB.subjects)return 0;
 const existing=new Map(Object.entries(DB.subjects).map(([name,s])=>[norm(name)+'|'+Number(s.period),{name,s}]));
 let linked=0,unmatched=0;
 for(const x of state.items){
  if(!x.id||!x.s||!cats.includes(x.cat)){unmatched++;continue}
  const pair=existing.get(norm(x.s)+'|'+Number(x.p));
  if(!pair){unmatched++;continue}
  const subject=pair.s;
  const located=cats.map(c=>({cat:c,found:(subject[c]||[]).find(f=>String(f.id)===String(x.id))})).find(z=>z.found);
  // Nunca modifica registro de outra fonte (professor/administrador ou turma).
  if(located&&located.found.source!=='medicina')continue;
  const entry={title:x.t,id:x.id,uid:'medicina_'+x.id,kind:kind(x),mime:x.m,
   period:x.p+'º período · Medicina',active:true,
   studyMode:x.area==='practice'?'practice':'theory',studySection:x.section||x.cat,
   source:'medicina',academicPeriod:Number(x.p),requiresGooglePermission:true};
  if(located){Object.assign(located.found,entry);
   if(located.cat!==x.cat){subject[located.cat]=subject[located.cat].filter(f=>f!==located.found);(subject[x.cat]||(subject[x.cat]=[])).push(located.found)}
  }else{(subject[x.cat]||(subject[x.cat]=[])).push(entry);linked++}
 }
 state.linked=linked;state.unmatched=unmatched;
 if(linked&&W.SinusApp?.S?.dentro){W.renderSubjects?.();W.renderLibrary?.();if(typeof UI!=='undefined'&&UI.subject&&W.renderSubject)W.renderSubject()}
 return linked;
}
state.ready=fetch('/biblioteca/dados/medicina.json?v=20261024-2',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()}).then(d=>{state.items=Array.isArray(d.items)?d.items:[];state.loaded=true;apply();W.dispatchEvent(new CustomEvent('sinus:medicina-ready'));return state.items}).catch(e=>{state.errors.push(String(e));return []});
W.addEventListener('sinus:drive-ready',apply);
const oldNav=W.nav;if(oldNav)W.nav=function(){apply();return oldNav.apply(this,arguments)};
const oldRenderAll=W.renderAll;if(oldRenderAll)W.renderAll=function(){apply();return oldRenderAll.apply(this,arguments)};
W.SinusMedicina={state,apply,ready:state.ready};
})(window);
