/* SINUS · Agenda semanal compacta — prévia isolada; não altera a branch main. */
(function(W,D){
'use strict';
var state={selected:localDay(new Date())};
function two(n){return String(n).padStart(2,'0')}
function localDay(d){return d.getFullYear()+'-'+two(d.getMonth()+1)+'-'+two(d.getDate())}
function toDate(s){return new Date(s+'T12:00:00')}
function safe(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function monday(s){var d=toDate(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return d}
function addDays(s,n){var d=toDate(s);d.setDate(d.getDate()+n);return localDay(d)}
function category(e){
 if(e.kind==='class')return 'aula';
 if(e.kind==='materia')return 'materia';
 if(e.kind==='personal')return 'pessoal';
 return /prova|avalia|exame|recupera|p1\b|p2\b|final/i.test(String(e.type||'')+' '+String(e.title||''))?'prova':'faculdade';
}
function all(day){
 var academic=W.SinusCalendar&&typeof W.SinusCalendar.events==='function'?W.SinusCalendar.events(day):[];
 var reminders=W.SinusCompromissos&&typeof W.SinusCompromissos.read==='function'?W.SinusCompromissos.read():[];
 var own=reminders.filter(function(x){return x.date===day}).map(function(x){return {kind:'materia',title:x.title,time:x.time||'',subject:x.subject||'',note:x.note||'',id:x.id,done:!!x.done,type:'Matéria'}});
 return academic.concat(own).map(function(x){return Object.assign({},x,{category:category(x)})}).sort(function(a,b){
  var aa=(a.time||'99:99').match(/\d{2}:\d{2}/),bb=(b.time||'99:99').match(/\d{2}:\d{2}/);
  return (aa?aa[0]:'99:99').localeCompare(bb?bb[0]:'99:99')||({prova:0,faculdade:1,aula:2,materia:3,pessoal:4}[a.category]-{prova:0,faculdade:1,aula:2,materia:3,pessoal:4}[b.category]);
 });
}
var meta={aula:['Aula','#248670'],prova:['Prova','#db8051'],faculdade:['Faculdade','#a37bd1'],materia:['Matéria','#4488c8'],pessoal:['Pessoal','#6a91a3']};
function weekDays(){
 var start=monday(state.selected),html='';
 for(var i=0;i<7;i++){
  var d=new Date(start.getTime());d.setDate(start.getDate()+i);
  var key=localDay(d),rows=all(key),counts={};rows.forEach(function(r){counts[r.category]=(counts[r.category]||0)+1});
  var dots=Object.keys(counts).map(function(k){return '<i class="sxw-dot '+k+'" title="'+safe(meta[k][0]+': '+counts[k])+'"></i>'}).join('');
  html+='<button type="button" class="sxw-day'+(key===state.selected?' selected':'')+(key===localDay(new Date())?' today':'')+'" data-sxw-day="'+key+'" aria-pressed="'+(key===state.selected)+'" aria-label="'+safe(d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}))+', '+rows.length+' eventos"><span>'+['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][i]+'</span><b>'+two(d.getDate())+'</b><small>'+rows.length+' '+(rows.length===1?'evento':'eventos')+'</small><em class="sxw-dots">'+dots+'</em></button>';
 }
 return html;
}
function item(e){
 var m=meta[e.category]||meta.pessoal,time=(e.time||'').match(/\d{2}:\d{2}/),when=time?time[0]:'—';
 var extra=[e.subject||'',e.note||''].filter(Boolean).join(' · ');
 var controls=e.kind==='materia'?'<div class="sxw-actions"><label title="Marcar lembrete como concluído"><input type="checkbox" data-rem-toggle="'+safe(e.id)+'" '+(e.done?'checked':'')+'> Feito</label><button type="button" data-rem-delete="'+safe(e.id)+'" aria-label="Excluir lembrete">×</button></div>':'';
 var source=e.sourceId?'<button type="button" class="sxw-source" data-cal-source="'+safe(e.sourceId)+'">Ver origem</button>':'';
 return '<article class="sxw-item '+e.category+(e.done?' done':'')+'"><time>'+safe(when)+'</time><div class="sxw-item-body"><div class="sxw-item-line"><span class="sxw-type">'+m[0]+'</span><strong>'+safe(e.title||'Evento sem título')+'</strong></div>'+(extra?'<p>'+safe(extra)+'</p>':'')+'</div>'+source+controls+'</article>';
}
function sources(){
 var ctx=W.SinusCalendar&&W.SinusCalendar.context?W.SinusCalendar.context():{}, ids=(W.SinusTimetable&&W.SinusTimetable.sourceIds)?W.SinusTimetable.sourceIds(ctx.period,ctx.cohort):[];
 if(!ids.length)return '';
 return '<details class="sxw-official"><summary>Consultar horários e fontes oficiais · '+ids.length+' documentos</summary><div>'+ids.map(function(id){var s=W.SINUS_CALENDARIO&&W.SINUS_CALENDARIO.sources&&W.SINUS_CALENDARIO.sources[id];return '<button class="btn sm" type="button" data-cal-source="'+safe(id)+'">'+safe(s&&s.title||'Fonte de horário')+'</button>'}).join('')+'</div></details>';
}
function render(){
 var box=D.getElementById('page-schedule');if(!box)return;
 var start=monday(state.selected),end=addDays(localDay(start),6),day=toDate(state.selected);
 var ctx=W.SinusCalendar&&W.SinusCalendar.context?W.SinusCalendar.context():{},rows=all(state.selected);
 var badges=['aula','prova','faculdade','materia'].map(function(k){return '<span class="sxw-legend '+k+'"><i></i>'+({aula:'Aulas',prova:'Provas',faculdade:'Eventos da faculdade',materia:'Lembretes por matéria'}[k])+'</span>'}).join('');
 var header='<div class="heading sxw-heading"><div><span class="eyebrow">SINUS · HORÁRIOS</span><h1>Horários e compromissos</h1><p>Sua semana de aulas, provas, eventos acadêmicos e lembretes — tudo em um só lugar.</p></div><button class="btn primary" type="button" data-sxw-add>＋ Novo lembrete</button></div>';
 var top='<section class="sxw-card"><div class="sxw-top"><div><span class="eyebrow">AGENDA SEMANAL</span><h2>'+safe(start.toLocaleDateString('pt-BR',{day:'numeric',month:'short'}))+' – '+safe(toDate(end).toLocaleDateString('pt-BR',{day:'numeric',month:'short',year:'numeric'}))+'</h2><p>'+safe((ctx.period||'')+'º período · Turma '+(ctx.cohort||'—'))+'</p></div><div class="sxw-controls"><button type="button" aria-label="Semana anterior" data-sxw-prev>‹</button><button type="button" data-sxw-today>Hoje</button><button type="button" aria-label="Semana seguinte" data-sxw-next>›</button></div></div><div class="sxw-week">'+weekDays()+'</div><div class="sxw-legend-row">'+badges+'</div></section>';
 var selected='<section class="sxw-list-card"><div class="sxw-list-head"><div><span class="eyebrow">COMPROMISSOS DO DIA</span><h2>'+safe(day.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}))+'</h2></div><span class="sxw-count">'+rows.length+' '+(rows.length===1?'evento':'eventos')+'</span></div><div class="sxw-list">'+(rows.length?rows.map(item).join(''):'<p class="sxw-empty">Sem eventos neste dia. Se precisar, crie um lembrete para a sua matéria.</p>')+'</div></section>';
 box.innerHTML=header+top+selected+sources();
}
function navigate(delta){state.selected=addDays(state.selected,delta);render()}
function newReminder(){if(W.SinusCompromissos&&W.SinusCompromissos.openForm)W.SinusCompromissos.openForm('',state.selected);else if(typeof W.newAgenda==='function')W.newAgenda()}
function init(){
 var oldNav=W.nav;
 if(typeof oldNav==='function')W.nav=function(page,button){var r=oldNav.apply(this,arguments);if(page==='schedule'||page==='agenda'){render();var t=D.getElementById('pageTitle');if(t)t.textContent='Horários'}return r};
 W.renderSchedule=render;W.renderAgenda=render;
 D.addEventListener('click',function(e){
  var el=e.target.closest('[data-sxw-prev],[data-sxw-next],[data-sxw-today],[data-sxw-day],[data-sxw-add]');if(!el)return;
  if(el.hasAttribute('data-sxw-prev'))navigate(-7);
  else if(el.hasAttribute('data-sxw-next'))navigate(7);
  else if(el.hasAttribute('data-sxw-today')){state.selected=localDay(new Date());render()}
  else if(el.dataset.sxwDay){state.selected=el.dataset.sxwDay;render()}
  else if(el.hasAttribute('data-sxw-add'))newReminder();
 });
 W.addEventListener('sinus:compromissos',render);
 // Login, navegação e re-renderização podem recuperar a agenda antiga:
 // a navegação acima torna a versão semanal a única agenda visível.
 var page=D.getElementById('page-schedule');
 if(page&&page.classList.contains('active'))render();
}
W.SinusAgendaSemanal={render:render,events:all,state:state};
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
