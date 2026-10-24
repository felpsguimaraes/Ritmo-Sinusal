/* SINUS: compromissos por matéria + categorias na agenda, v1. */
(function(W,D){'use strict';
const K='sinus_compromissos_materias_v1';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function profileKey(){const u=typeof W.user==='function'?W.user():{};return String(u.email||u.uid||u.id||'perfil-local')}
function read(){try{return JSON.parse(localStorage.getItem(K+':'+profileKey())||'[]')}catch{return []}}
function save(a){localStorage.setItem(K+':'+profileKey(),JSON.stringify(a))}
function current(){return W.UI?.subject||W.SinusApp?.UI?.subject||''}
function isDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)}
function openForm(subject){const d=new Date(),today=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');const options=(W.DB?.subjects?Object.keys(W.DB.subjects):[]);const sub=subject||current()||options[0]||'';
 const pick=options.length?'<label class="field"><span>Matéria</span><select id="sinusCompSubject">'+options.map(s=>'<option value="'+esc(s)+'"'+(s===sub?' selected':'')+'>'+esc(s)+'</option>').join('')+'</select></label>':'';
 W.openModal('Novo lembrete',pick+'<label class="field"><span>Compromisso</span><input id="sinusCompTitle" maxlength="120" placeholder="Ex.: revisar a aula prática"></label><label class="field"><span>Data</span><input id="sinusCompDate" type="date" value="'+today+'"></label><label class="field"><span>Horário</span><input id="sinusCompTime" type="time" value="18:00"></label><label class="field"><span>Detalhes</span><textarea id="sinusCompNote" maxlength="500"></textarea></label><p style="font-size:12px;color:#697b71">Lembrete privado. Avisos oficiais são publicados pela faculdade ou delegado autorizado.</p>',()=>{
 const title=D.getElementById('sinusCompTitle')?.value.trim(),date=D.getElementById('sinusCompDate')?.value,subject=D.getElementById('sinusCompSubject')?.value||sub;
 if(!title||!isDate(date))return W.toast?.('Informe título e uma data válida.');
 const arr=read();arr.push({id:Date.now()+Math.random(),title,date,subject,time:D.getElementById('sinusCompTime')?.value||'',note:D.getElementById('sinusCompNote')?.value.trim()||'',done:false});
 save(arr);W.closeModal();refresh();W.toast?.('Lembrete salvo neste navegador.');
 });}
function toggle(id){const a=read();const v=a.find(x=>String(x.id)===String(id));if(v){v.done=!v.done;save(a);refresh()}}
function remove(id){if(!confirm('Excluir este lembrete?'))return;save(read().filter(x=>String(x.id)!==String(id)));refresh()}
function subjectBox(){const subject=current();if(!subject)return '';let items=read().filter(x=>x.subject===subject).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));const markup=items.length?items.map(x=>'<div class="sinus-rem-line"><input type="checkbox" data-rem-toggle="'+esc(x.id)+'" '+(x.done?'checked':'')+' aria-label="Concluir lembrete"><div><strong style="'+(x.done?'text-decoration:line-through;opacity:.55':'')+'">'+esc(x.title)+'</strong><small>'+esc(x.date)+' · '+esc(x.time)+(x.note?' · '+esc(x.note):'')+'</small></div><button class="btn sm" data-rem-delete="'+esc(x.id)+'" title="Excluir">×</button></div>').join(''):'<p style="font-size:12px;color:#50687a">Nenhum lembrete. Adicione compromissos e organize suas revisões.</p>';
 return '<section class="sinus-rem-box" aria-label="Lembretes da matéria"><div class="sinus-rem-head"><h3>✚ &nbsp; Lembretes</h3><button class="btn sm" data-rem-add="'+esc(subject)+'">＋ Criar lembrete</button></div>'+markup+'</section>';
}
function renderSubjectBox(){const dest=D.getElementById('subjectContent');if(!dest||!current())return;dest.querySelectorAll('.sinus-rem-box').forEach(x=>x.remove());dest.insertAdjacentHTML('afterbegin',subjectBox())}
function grouping(){const box=D.getElementById('page-schedule');if(!box||!box.innerHTML)return;box.querySelector('#sinus-week-categories')?.remove();const today=W.SinusCalendar?.events?.(D.querySelector('.sinus-day.selected')?.dataset.sinusDay||new Date().toISOString().slice(0,10))||[];
 const sections=[['Horários das aulas',today.filter(x=>x.kind==='class')],['Eventos da faculdade',today.filter(x=>x.kind==='notice'&&!/prova|avalia/i.test(x.type+' '+x.title))],['Provas do dia',today.filter(x=>x.kind==='notice'&&/prova|avalia/i.test(x.type+' '+x.title))]];
 const selected=D.querySelector('.sinus-day.selected')?.dataset.sinusDay||new Date().toISOString().slice(0,10);
 const own=read().filter(x=>x.date===selected);
 sections.push(['Compromissos de cada matéria',own]);
 box.insertAdjacentHTML('beforeend','<section class="sinus-comp-section" id="sinus-week-categories"><div class="heading"><div><span class="eyebrow">AGENDA SEMANAL · DIA SELECIONADO</span><h2>Aulas, eventos, provas e compromissos</h2></div><button class="btn sm primary" data-rem-add="">＋ Lembrete</button></div><div class="sinus-comp-grid">'+sections.map(([name,rows])=>'<div class="sinus-comp-card"><h3>'+esc(name)+'</h3>'+(rows.length?rows.map(x=>'<div class="sinus-comp-item"><b>'+esc(x.title)+'</b><small>'+esc(x.time||'')+(x.subject?' · '+esc(x.subject):'')+'</small></div>').join(''):'<p>Sem registros para este dia.</p>')+'</div>').join('')+'</div></section>');
}
function refresh(){renderSubjectBox();grouping()}
const style=D.createElement('style');style.textContent='.sinus-rem-box{background:#e1edf8;border:1px solid #d2e2ef;border-radius:23px;padding:25px;margin:0 0 20px;color:#293d4e}.sinus-rem-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:15px}.sinus-rem-head h3{font-size:20px;margin:0;font-weight:850}.sinus-rem-line{display:flex;gap:12px;align-items:center;padding:12px 0;border-top:1px solid #cbdae8}.sinus-rem-line input{accent-color:#2584e0;width:20px;height:20px}.sinus-rem-line>div{flex:1;min-width:0}.sinus-rem-line strong{display:block}.sinus-rem-line small{display:block;margin-top:3px;color:#5c7282}.sinus-comp-section{margin-top:24px}.sinus-comp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.sinus-comp-card{border:1px solid #e4eae6;border-radius:16px;background:#fff;padding:19px}.sinus-comp-card h3{margin:0 0 12px;font-size:15px}.sinus-comp-card p{font-size:12px;color:#87958a}.sinus-comp-item{padding:10px 0;border-top:1px solid #ecf1ec}.sinus-comp-item b,.sinus-comp-item small{display:block}.sinus-comp-item small{color:#7d8981;margin-top:4px}@media(max-width:680px){.sinus-comp-grid{grid-template-columns:1fr}.sinus-rem-head{flex-wrap:wrap}}';D.head.appendChild(style);
D.addEventListener('click',e=>{const add=e.target.closest('[data-rem-add]'),del=e.target.closest('[data-rem-delete]');if(add){openForm(add.dataset.remAdd||'');return}if(del)remove(del.dataset.remDelete)});
D.addEventListener('change',e=>{if(e.target.matches('[data-rem-toggle]'))toggle(e.target.dataset.remToggle)});
function init(){const rs=W.renderSchedule;if(typeof rs==='function')W.renderSchedule=function(){const value=rs.apply(this,arguments);grouping();return value};const sub=W.renderSubject;if(typeof sub==='function')W.renderSubject=function(){const value=sub.apply(this,arguments);renderSubjectBox();return value};refresh()}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
