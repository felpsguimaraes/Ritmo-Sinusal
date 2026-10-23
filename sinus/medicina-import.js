/* Materiais de Medicina: um catálogo para matérias e Biblioteca. */
(function(W){'use strict';
const state={items:[],loaded:false,errors:[]};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const cats=['slides','provas','audios','videos','pratica','complementares'];
function kind(x){const m=x.m||'';return /image\//.test(m)?'Imagem':/audio\//.test(m)?'Áudio':/video\//.test(m)?'Vídeo':/pdf/.test(m)?'PDF':/presentation|powerpoint/.test(m)?'Slides':'Documento'}
function apply(){if(!state.loaded||typeof DB==='undefined')return;let changed=false;
const canonical=new Map(state.items.map(x=>[norm(x.s),x.s]));Object.keys(DB.subjects).forEach(name=>{const target=canonical.get(norm(name));if(!target||target===name)return;const old=DB.subjects[name],next=DB.subjects[target];if(!next)DB.subjects[target]=old;else cats.forEach(cat=>{const known=new Set((next[cat]||[]).map(x=>x.id||x.uid));(old[cat]||[]).forEach(x=>{if(!known.has(x.id||x.uid))(next[cat]||(next[cat]=[])).push(x)})});delete DB.subjects[name];if(typeof UI!=='undefined'&&UI.subject===name)UI.subject=target;changed=true});
state.items.forEach(x=>{if(!x.id||!x.s)return;let subject=DB.subjects[x.s];if(!subject){subject=DB.subjects[x.s]={id:'medicina_'+x.p+'_'+x.s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'_'),period:x.p,active:true,teacher:'',mode:'Teoria',accent:'green',slides:[],provas:[],audios:[],videos:[],pratica:[],complementares:[]};changed=true}
let found;for(const c of cats){const index=(subject[c]||[]).findIndex(f=>String(f.id)===x.id);if(index>=0){found=subject[c][index];if(c!==x.cat){subject[c].splice(index,1);(subject[x.cat]||(subject[x.cat]=[])).push(found)}break}}
const item={title:x.t,id:x.id,uid:'medicina_'+x.id,kind:kind(x),mime:x.m,period:x.p+'º período · Medicina',active:true,studyMode:x.area,studySection:x.section,source:'medicina',academicPeriod:x.p};
if(found){if(found.source==='medicina'&&found.studyMode===x.area&&found.studySection===x.section)return;Object.assign(found,item)}else (subject[x.cat]||(subject[x.cat]=[])).push(item);if(x.area==='practice')subject.mode='Teoria + Prática';changed=true;
});if(changed&&W.SinusApp?.S?.dentro){W.renderSubjects?.();W.renderLibrary?.();if(typeof UI!=='undefined'&&UI.subject&&W.renderSubject)W.renderSubject()}}
state.ready=fetch('/biblioteca/dados/medicina.json?v=20261023',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()}).then(data=>{state.items=data.items||[];state.loaded=true;apply();return state.items}).catch(e=>{state.errors.push(String(e));return []});
W.addEventListener('sinus:drive-ready',apply);
const previous=W.SinusApp?.montarDados;
// A montagem do perfil pode recriar DB.subjects; reaplicar após cada navegação mantém o vínculo.
const oldNav=W.nav;if(oldNav)W.nav=function(){apply();return oldNav.apply(this,arguments)};
const oldRenderAll=W.renderAll;if(oldRenderAll)W.renderAll=function(){apply();return oldRenderAll.apply(this,arguments)};
W.SinusMedicina={state,apply,ready:state.ready};
})(window);
