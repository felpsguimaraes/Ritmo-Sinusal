/* Sinus Agenda Liquid — reaproveita agenda() e setAgenda() existentes; não apaga eventos */
(function(){
'use strict';
const state={month:new Date(new Date().getFullYear(),new Date().getMonth(),1),selected:new Date().toISOString().slice(0,10)};
const z=n=>String(n).padStart(2,'0');
const iso=(y,m,d)=>y+'-'+z(m+1)+'-'+z(d);
const monthText=d=>d.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
const safe=s=>typeof window.esc==='function'?window.esc(String(s||'')):String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function dateOf(item){
 const raw=String(item.date||'');
 if(/^\d{4}-\d{2}-\d{2}$/.test(raw.slice(0,10)))return raw.slice(0,10);
 const us=raw.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
 if(us){const y=us[3]?(+us[3]<100?2000+(+us[3]):+us[3]):new Date().getFullYear();return iso(y,+us[2]-1,+us[1])}
 return '';
}
function timeOf(item){
 const raw=String(item.date||'');const m=raw.match(/(\d{1,2}):(\d{2})/);
 return m?z(m[1])+':'+m[2]:'';
}
const list=()=>typeof window.agenda==='function'?window.agenda():[];
function classEvents(){
 const result=[];
 try{
  const u=typeof window.user==='function'?window.user():null;
  const group=u?.class||'G';
  const sch=typeof window.DB!=='undefined'?window.DB.schedules?.[group]:null;
  const week=sch?.dias||{};
  const days=['dom','lun','mar','mie','jue','vie','sab'];
  const year=state.month.getFullYear(),month=state.month.getMonth();
  const first=new Date(year,month,1);const offset=(first.getDay()+6)%7;
  for(let n=1-offset;n<=42-offset;n++){
   const d=new Date(year,month,n),k=iso(d.getFullYear(),d.getMonth(),d.getDate());
   for(const slot of (week[days[d.getDay()]]||[])){
    result.push({title:slot.mat||'Aula',date:k+' '+(slot.time||''),note:(slot.tipo||'')+(slot.prof?' · '+slot.prof:''),kind:'class'});
   }
  }
 }catch(e){}
 return result;
}
function render(){
 const box=document.getElementById('page-agenda');if(!box)return;
 const y=state.month.getFullYear(),m=state.month.getMonth();
 const first=new Date(y,m,1).getDay(),offset=(first+6)%7;
 const count=new Date(y,m+1,0).getDate();
 const personal=list();const data=personal.concat(classEvents());const dateMap=new Map();
 data.forEach((row,i)=>{const k=dateOf(row);if(k){if(!dateMap.has(k))dateMap.set(k,[]);dateMap.get(k).push({row,i})}});
 const currentDay=new Date().toLocaleDateString('sv-SE');
 const days=Array.from({length:Math.ceil((offset+count)/7)*7},(_,i)=>{
  const n=i-offset+1;const date=new Date(y,m,n),k=iso(date.getFullYear(),date.getMonth(),date.getDate());
  const entries=dateMap.get(k)||[];
  return '<button class="sinus-day'+(date.getMonth()!==m?' muted':'')+(k===currentDay?' today':'')+(k===state.selected?' selected':'')+(entries.length?' active':'')+'" type="button" data-sinus-day="'+k+'" aria-label="'+safe(date.toLocaleDateString('pt-BR',{day:'numeric',month:'long'}))+'"><span class="sinus-day-num">'+date.getDate()+'</span>'+entries.slice(0,2).map(x=>'<span class="sinus-event-pill">'+safe(x.row.title)+'</span>').join('')+(entries.length>2?'<span class="sinus-event-pill">+'+(entries.length-2)+' mais</span>':'')+'</button>';
 }).join('');
 const upcoming=data.map((row,i)=>({row,i,date:dateOf(row)})).filter(r=>r.date).sort((a,b)=>a.date.localeCompare(b.date)).filter(r=>r.date>=currentDay).slice(0,6);
 const chosen=data.map((row,i)=>({row,i,date:dateOf(row)})).filter(r=>r.date===state.selected);
 const oldUnstructured=personal.filter(r=>!dateOf(r));
 box.innerHTML='<div class="heading"><div><span class="eyebrow">SINUS · AGENDA</span><h1>Seu calendário.</h1><p>Compromissos e estudos no mesmo lugar, preservando tudo que você já cadastrou.</p></div><button class="btn primary" type="button" onclick="newAgenda()">+ Novo compromisso</button></div>'+
 '<section class="sinus-agenda"><div class="sinus-cal"><header class="sinus-cal-head"><div><div class="eyebrow">ROTINA ACADÊMICA</div><h2 class="sinus-month-title">'+safe(monthText(state.month))+'</h2></div><div class="sinus-cal-controls"><button type="button" data-sinus-prev aria-label="Mês anterior">‹</button><button type="button" data-sinus-today>Hoje</button><button type="button" data-sinus-next aria-label="Próximo mês">›</button></div></header><div class="sinus-days">'+['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(s=>'<div class="sinus-dow">'+s+'</div>').join('')+days+'</div></div>'+
 '<aside class="sinus-agenda-side"><div class="sinus-side-card"><span class="eyebrow">DIA SELECIONADO</span><h3>'+safe(new Date(state.selected+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}))+'</h3>'+
 (chosen.length?chosen.map(it=>'<div class="sinus-agenda-item"><strong>'+safe(it.row.title)+'</strong><small>'+safe(timeOf(it.row)+' '+(it.row.note||''))+'</small><button class="btn sm" type="button" data-sinus-remove="'+it.i+'">Excluir</button></div>').join(''):'<p class="sinus-agenda-empty">Nenhum compromisso neste dia. Escolha uma data e toque em “Novo compromisso”.</p>')+
 '<button class="sinus-agenda-action" type="button" onclick="newAgenda()">Adicionar compromisso</button></div>'+
 '<div class="sinus-side-card"><span class="eyebrow">NA SUA AGENDA</span><h3>Próximos compromissos</h3>'+
 (upcoming.length?upcoming.map(it=>'<div class="sinus-agenda-item"><strong>'+safe(it.row.title)+'</strong><small>'+safe(it.date+' '+timeOf(it.row)+' '+(it.row.note||''))+'</small></div>').join(''):'<p class="sinus-agenda-empty">Nenhum compromisso futuro cadastrado.</p>')+
 (oldUnstructured.length?'<p class="sinus-agenda-empty">'+oldUnstructured.length+' registro(s) com data antiga continuam salvos e podem ser consultados abaixo.</p>':'')+
 (oldUnstructured.length?oldUnstructured.map(it=>'<div class="sinus-agenda-item"><strong>'+safe(it.title)+'</strong><small>'+safe(it.date||'')+' · '+safe(it.note||'')+'</small></div>').join(''):'')+
 '</div></aside></section>';
}
function add(){
 const pre=state.selected;
 if(typeof window.openModal!=='function')return;
 window.openModal('Novo compromisso', '<label class="field"><span>Título</span><input id="agT" maxlength="130" placeholder="Ex.: Prova prática de Semiologia"></label><label class="field"><span>Data</span><input id="agDate" type="date" value="'+pre+'"></label><label class="field"><span>Horário (opcional)</span><input id="agTime" type="time"></label><label class="field"><span>Nota (opcional)</span><textarea id="agN" rows="3"></textarea></label>',()=>{
   const title=(document.getElementById('agT')?.value||'').trim();
   const date=document.getElementById('agDate')?.value||pre;
   const time=document.getElementById('agTime')?.value||'';
   const note=(document.getElementById('agN')?.value||'').trim();
   if(!title)return alert('Informe o título do compromisso.');
   const all=list();all.unshift({title,date:date+(time?' · '+time:''),note});
   if(typeof window.setAgenda==='function')window.setAgenda(all);
   state.selected=date;state.month=new Date(date+'T12:00:00');state.month.setDate(1);
   if(typeof window.closeModal==='function')window.closeModal();render();
 });
}
function init(){
 window.renderAgenda=render;
 window.newAgenda=add;
 document.addEventListener('click',ev=>{
  if(ev.target.closest('[data-sinus-prev]')){state.month.setMonth(state.month.getMonth()-1);render();return}
  if(ev.target.closest('[data-sinus-next]')){state.month.setMonth(state.month.getMonth()+1);render();return}
  if(ev.target.closest('[data-sinus-today]')){const d=new Date();state.month=new Date(d.getFullYear(),d.getMonth(),1);state.selected=iso(d.getFullYear(),d.getMonth(),d.getDate());render();return}
  const day=ev.target.closest('[data-sinus-day]');if(day){state.selected=day.dataset.sinusDay;render();return}
  const del=ev.target.closest('[data-sinus-remove]');if(del){const i=Number(del.dataset.sinusRemove);if(confirm('Excluir este compromisso?')){const arr=list();arr.splice(i,1);window.setAgenda(arr);render()}}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
