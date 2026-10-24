/* SINUS: compromissos por matéria + categorias na agenda, v1. */
(function(W,D){'use strict';
const K='sinus_compromissos_materias_v1';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function profileKey(){const u=typeof W.user==='function'?W.user():{};return String(u.email||u.uid||u.id||'perfil-local')}
function read(){try{return JSON.parse(localStorage.getItem(K+':'+profileKey())||'[]')}catch{return []}}
function save(a){localStorage.setItem(K+':'+profileKey(),JSON.stringify(a))}
function current(){const view=D.getElementById('subjectView');if(!view||view.classList.contains('hidden'))return '';return view.querySelector('#subjectHeader h1')?.textContent?.trim()||''}
function isDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)}
function ensureDrawer(){
 let root=D.getElementById('sinus-reminder-drawer');
 if(root)return root;
 root=D.createElement('div');
 root.id='sinus-reminder-drawer';
 root.hidden=true;
 root.innerHTML='<div class="sxrem-scrim" data-sxrem-close></div>'+
 '<section class="sxrem-sheet" role="dialog" aria-modal="true" aria-labelledby="sxrem-title" tabindex="-1">'+
 '<header class="sxrem-head"><div><span class="eyebrow">ORGANIZAÇÃO ACADÊMICA</span><h2 id="sxrem-title">Novo lembrete</h2><p>Vincule à sua matéria e acompanhe na agenda semanal.</p></div><button type="button" class="sxrem-x" data-sxrem-close aria-label="Fechar">×</button></header>'+
 '<div class="sxrem-body"><form id="sxrem-form">'+
 '<label class="field"><span>Nome do lembrete</span><input id="sinusCompTitle" maxlength="120" placeholder="Ex.: revisar semiologia" required autocomplete="off"></label>'+
 '<div class="sxrem-dates"><label class="field"><span>Data</span><input id="sinusCompDate" type="date" required></label><label class="field"><span>Horário</span><input id="sinusCompTime" type="time" value="18:00"></label></div>'+
 '<label class="field"><span>Vincular à matéria</span><select id="sinusCompSubject"></select></label>'+
 '<label class="field"><span>Categoria</span><select id="sinusCompKind"><option value="materia">Compromisso da matéria</option><option value="pessoal">Lembrete pessoal</option></select></label>'+
 '<label class="field"><span>Detalhes <small>opcional</small></span><textarea id="sinusCompNote" maxlength="500" rows="3" placeholder="Informações para lembrar..."></textarea></label>'+
 '<p class="sxrem-private">Lembrete pessoal, salvo neste navegador. Avisos oficiais são gerenciados separadamente.</p>'+
 '<footer class="sxrem-foot"><button type="button" class="btn" data-sxrem-close>Cancelar</button><button class="btn primary" type="submit">Salvar lembrete</button></footer>'+
 '</form></div></section>';
 D.body.appendChild(root);
 root.addEventListener('click',function(e){if(e.target.closest('[data-sxrem-close]'))closeDrawer()});
 root.querySelector('#sxrem-form').addEventListener('submit',function(e){
  e.preventDefault();
  const title=D.getElementById('sinusCompTitle').value.trim();
  const date=D.getElementById('sinusCompDate').value;
  const subject=D.getElementById('sinusCompSubject').value;
  if(!title||!isDate(date)){W.toast?.('Informe título e uma data válida.');return}
  const arr=read();
  arr.push({id:Date.now()+Math.random(),title,date,subject,time:D.getElementById('sinusCompTime').value||'',note:D.getElementById('sinusCompNote').value.trim(),kind:D.getElementById('sinusCompKind').value,done:false});
  save(arr);closeDrawer();refresh();W.toast?.('Lembrete adicionado à agenda.');
 });
 D.addEventListener('keydown',function(e){
  if(root.hidden)return;
  if(e.key==='Escape'){e.preventDefault();closeDrawer();return}
  if(e.key==='Tab'){const focusables=[...root.querySelectorAll('button,input,select,textarea')].filter(x=>x.getClientRects().length&&!x.disabled);
   if(!focusables.length)return;
   if(e.shiftKey&&D.activeElement===focusables[0]){e.preventDefault();focusables[focusables.length-1].focus()}
   else if(!e.shiftKey&&D.activeElement===focusables[focusables.length-1]){e.preventDefault();focusables[0].focus()}
  }
 });
 return root;
}
let lastReminderFocus=null,wasReminderOverflow='';
function closeDrawer(){
 const root=D.getElementById('sinus-reminder-drawer');if(!root||root.hidden)return;
 root.hidden=true;D.body.style.overflow=wasReminderOverflow;
 if(lastReminderFocus&&typeof lastReminderFocus.focus==='function')lastReminderFocus.focus();
}
function openForm(subject,chosenDate){
 const root=ensureDrawer();
 lastReminderFocus=D.activeElement;
 const d=new Date(),today=isDate(chosenDate)?chosenDate:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 const ctx=W.SinusCalendar?.context?.()||{};
 const list=W.SinusTimetable?.academicOptions?.(ctx.period,ctx.cohort)||[];
 const subjectList=[...new Set([...(W.DB?.subjects?Object.keys(W.DB.subjects):[]),...list.map(x=>x.title),...(subject?[subject]:[]),...(current()?[current()]:[])])];
 const preferred=subject||current()||subjectList[0]||'';
 root.querySelector('#sxrem-form').reset();
 root.querySelector('#sinusCompSubject').innerHTML='<option value="">Sem matéria (pessoal)</option>'+subjectList.map(s=>'<option value="'+esc(s)+'">'+esc(s)+'</option>').join('');
 root.querySelector('#sinusCompSubject').value=preferred;
 root.querySelector('#sinusCompDate').value=today;
 root.querySelector('#sinusCompTime').value='18:00';
 root.hidden=false;
 wasReminderOverflow=D.body.style.overflow;D.body.style.overflow='hidden';
 root.querySelector('#sinusCompTitle').focus();
}
function toggle(id){const a=read();const v=a.find(x=>String(x.id)===String(id));if(v){v.done=!v.done;save(a);refresh()}}
function remove(id){if(!confirm('Excluir este lembrete?'))return;save(read().filter(x=>String(x.id)!==String(id)));refresh()}
function subjectBox(){const subject=current();if(!subject)return '';let items=read().filter(x=>x.subject===subject).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));const markup=items.length?items.map(x=>'<div class="sinus-rem-line"><input type="checkbox" data-rem-toggle="'+esc(x.id)+'" '+(x.done?'checked':'')+' aria-label="Concluir lembrete"><div><strong style="'+(x.done?'text-decoration:line-through;opacity:.55':'')+'">'+esc(x.title)+'</strong><small>'+esc(x.date)+' · '+esc(x.time)+(x.note?' · '+esc(x.note):'')+'</small></div><button class="btn sm" data-rem-delete="'+esc(x.id)+'" title="Excluir">×</button></div>').join(''):'<p style="font-size:12px;color:#50687a">Nenhum lembrete. Adicione compromissos e organize suas revisões.</p>';
 return '<section class="sinus-rem-box" aria-label="Lembretes da matéria"><div class="sinus-rem-head"><h3>✚ &nbsp; Lembretes</h3><button class="btn sm" data-rem-add="'+esc(subject)+'">＋ Adicionar</button></div>'+markup+'</section>';
}
function renderSubjectBox(){const dest=D.getElementById('subjectContent');if(!dest||!current())return;dest.querySelectorAll('.sinus-rem-box').forEach(x=>x.remove());dest.insertAdjacentHTML('afterbegin',subjectBox())}
function grouping(){if(W.SinusAgendaSemanal&&typeof W.SinusAgendaSemanal.render==='function')W.SinusAgendaSemanal.render()}
function refresh(){renderSubjectBox();grouping()}
const style=D.createElement('style');style.textContent='.sinus-rem-box{background:#e1edf8;border:1px solid #d2e2ef;border-radius:23px;padding:25px;margin:0 0 20px;color:#293d4e}.sinus-rem-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:15px}.sinus-rem-head h3{font-size:20px;margin:0;font-weight:850}.sinus-rem-line{display:flex;gap:12px;align-items:center;padding:12px 0;border-top:1px solid #cbdae8}.sinus-rem-line input{accent-color:#2584e0;width:20px;height:20px}.sinus-rem-line>div{flex:1;min-width:0}.sinus-rem-line strong{display:block}.sinus-rem-line small{display:block;margin-top:3px;color:#5c7282}.sinus-comp-section{margin-top:24px}.sinus-comp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.sinus-comp-card{border:1px solid #e4eae6;border-radius:16px;background:#fff;padding:19px}.sinus-comp-card h3{margin:0 0 12px;font-size:15px}.sinus-comp-card p{font-size:12px;color:#87958a}.sinus-comp-item{padding:10px 0;border-top:1px solid #ecf1ec}.sinus-comp-item b,.sinus-comp-item small{display:block}.sinus-comp-item small{color:#7d8981;margin-top:4px}.sinus-comp-section{margin-top:14px}.sinus-comp-section .heading{margin-bottom:10px}.sinus-comp-grid{gap:9px}.sinus-comp-card{padding:12px 14px;border-radius:13px;border-left:3px solid var(--accent)}.sinus-comp-card h3{display:flex;align-items:center;gap:7px;font-size:12px;margin:0 0 5px}.sinus-comp-card h3 small{margin-left:auto;color:#809088;font-size:10px}.sinus-comp-dot{height:8px;width:8px;background:var(--accent);border-radius:50%;display:inline-block}.sinus-comp-type-0{--accent:#2d8b70;background:#f4faf7}.sinus-comp-type-1{--accent:#a47cdb;background:#faf7fe}.sinus-comp-type-2{--accent:#dd7b50;background:#fff8f3}.sinus-comp-type-3{--accent:#3681c9;background:#f5f9ff}.sinus-comp-item{display:flex;align-items:baseline;gap:9px;padding:7px 0;font-size:11px}.sinus-comp-item time{font-variant-numeric:tabular-nums;color:var(--accent);font-size:10px;flex:0 0 42px;font-weight:800}.sinus-comp-item span{min-width:0}.sinus-comp-item b{font-size:11px;line-height:1.25;font-weight:650}.sinus-comp-item small{font-size:10px;margin-top:1px}.sinus-comp-card p{font-size:10px;margin:5px 0 0}.sinus-rem-box{padding:17px 20px}.sinus-rem-line{padding:8px 0}.sinus-rem-head h3{font-size:17px}@media(max-width:680px){.sinus-comp-grid{grid-template-columns:1fr}.sinus-rem-head{flex-wrap:wrap}}';D.head.appendChild(style);
D.addEventListener('click',e=>{const add=e.target.closest('[data-rem-add]'),del=e.target.closest('[data-rem-delete]');if(add){openForm(add.dataset.remAdd||'');return}if(del)remove(del.dataset.remDelete)});
D.addEventListener('change',e=>{if(e.target.matches('[data-rem-toggle]'))toggle(e.target.dataset.remToggle)});
W.SinusCompromissos={read:read,openForm:openForm,toggle:toggle,remove:remove,refresh:refresh};
function init(){const rs=W.renderSchedule;if(typeof rs==='function')W.renderSchedule=function(){const value=rs.apply(this,arguments);grouping();return value};const sub=W.renderSubject;if(typeof sub==='function')W.renderSubject=function(){const value=sub.apply(this,arguments);renderSubjectBox();return value};refresh()}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
