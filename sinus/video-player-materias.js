/* SINUS · player unico de videos/audios por materia, imediatamente abaixo dos lembretes.
 * Links e metadados publicos do YouTube; sem copiar conteudo, sem criar playlists na conta.
 */
(function(W,D){
'use strict';
const CHANNEL='https://www.youtube.com/@aislanfernandes4039/videos';
const VIDEO_SOURCE='/sinus/youtube-catalogo.json';
const PLAYLIST_SOURCE='/sinus/youtube-playlists.json';
const S={videos:null,playlists:null,loading:null,error:'',subject:'',mode:'',selected:'',query:'',teacher:'todos',type:'todos',limit:70};
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\u0027':'&#39;'}[c]));
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const vidOK=x=>/^[A-Za-z0-9_-]{11}$/.test(String(x||''));
const plOK=x=>/^(?:PL|OLAK|UU|FL|LL)[A-Za-z0-9_-]{10,}$/.test(String(x||''));
function base(name){
 const n=norm(name).replace(/\./g,'');
 if(/^anatomia patologica/.test(n))return 'anatopato';
 if(/^anatomia\b/.test(n))return 'anatomia';
 if(/^histolog/.test(n))return 'histologia';
 if(/^fisiopatolog/.test(n))return 'fisiopatologia';
 if(/^fisiolog/.test(n))return 'fisiologia';
 if(/^microbiolog/.test(n)||/^parasitolog/.test(n))return 'microbiologia';
 if(/^bioquim/.test(n))return 'bioquimica';
 if(/^biofis/.test(n))return 'biofisica';
 if(/^inmunolog|^imunolog/.test(n))return 'inmunologia';
 if(/^epidemiolog|^salud publica|^salud comunit/.test(n))return 'epidemiologia';
 if(/^nutricion|^nutricao/.test(n))return 'nutricion';
 if(/^neuro/.test(n))return 'neurologia';
 if(/^semiolog/.test(n))return 'semiologia';
 if(/^farmacolog/.test(n))return 'farmacologia';
 if(/^genetic/.test(n))return 'genetica';
 if(/^patolog/.test(n))return 'anatopato';
 return '';
}
function subjectFor(v){
 const curated=W.SinusVideoCuradoria?.classify(v);
 return curated?.subject||W.SinusEstudoAcervo?.ytGroup?.(v.title)||'';
}
function teacherFor(v){
 return W.SinusVideoCuradoria?.classify(v)?.professor||'Professor não identificado';
}
function courseFilter(v,name){
 const key=base(name),title=norm(v.title);
 if(!key||subjectFor(v)!==key)return false;
 if(key==='anatomia'){
  const m=norm(name).match(/\b(ii|i|2|1)\b/),second=m&&(m[1]==='ii'||m[1]==='2');
  if(m){
   const anatomyI=/craneo|cranial|craneal|cabeza|cara|esfenoid|viscerocraneo|vertebras|sacro|coccix/i;
   const anatomyII=/abdomen|abdominal|inguinal|peritoneo|pelv|muslo|pierna|miembro inferior|intestino|estomago|duodeno|higado|vesicula|pancreas|bazo|rins|renal|colon|ciego/i;
   if(second&&anatomyI.test(title)&&!anatomyII.test(title))return false;
   if(!second&&anatomyII.test(title)&&!anatomyI.test(title))return false;
  }
 }
 return true;
}
function playlistFor(p,name){
 const key=base(name),n=norm(p.title);
 const candidates={histologia:['histo','histologia'],anatomia:['anato','anatomia'],fisiologia:['fisiologia','neuro'],neurologia:['neuro'],bioquimica:['bioquimica'],biofisica:['biofisica'],inmunologia:['inmunologia','imunologia'],microbiologia:['microbiologia'],epidemiologia:['epidemiologia'],nutricion:['nutricion']};
 return plOK(p.id)&&!!key&&(candidates[key]||[key]).includes(n);
}
function entries(name,mode){
 const found=new Set(),videos=(S.videos||[]).filter(v=>vidOK(v.id)&&courseFilter(v,name))
  .filter(v=>mode!=='practice'||W.SinusVideoCuradoria?.classify(v)?.isPractice)
  .map(v=>{
   const c=W.SinusVideoCuradoria?.classify(v)||{};
   return {key:'v:'+v.id,id:v.id,title:v.title,kind:/\baudio\b|\báudio\b/i.test(v.title)?'audio':'video',teacher:teacherFor(v),order:c.rank??9999,origin:'video'};
  }).filter(v=>{if(found.has(v.id))return false;found.add(v.id);return true})
  .sort((a,b)=>a.order-b.order||a.title.localeCompare(b.title,'pt'));
 const playlists=mode==='theory'?(S.playlists||[]).filter(p=>playlistFor(p,name)).map(p=>({key:'p:'+p.id,id:p.id,title:p.title,kind:'playlist',teacher:'Playlist da disciplina',order:99999,origin:'playlist'})):[];
 return videos.concat(playlists);
}
function current(){
 const view=D.getElementById('subjectView');
 if(!view||view.classList.contains('hidden')||!W.UI?.subject||W.UI.tab!=='videos')return null;
 const name=W.UI.subject;
 if(D.querySelector('#subjectHeader h1')?.textContent.trim()!==name)return null;
 return {name,mode:W.UI.mode||'theory'};
}
function slot(){
 const host=D.getElementById('subjectContent');
 if(!host)return null;
 const group=host.querySelector(':scope > .sxAcademicOrdered');
 if(group){
  const rem=group.querySelector(':scope > .sxAOReminders');
  if(rem)return {host:group,after:rem};
 }
 const reminder=host.querySelector(':scope > .sinus-rem-box');
 return {host,after:reminder};
}
function addFrame(section,item){
 const panel=section.querySelector('[data-sx-avp-screen]');
 const url=item.origin==='playlist'
  ?'https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(item.id)+'&rel=0'
  :'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(item.id)+'?rel=0';
 if(panel.dataset.url!==url){
  panel.dataset.url=url;
  panel.innerHTML='<iframe title="'+esc(item.title)+'" src="'+url+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
 }
 section.querySelector('[data-sx-avp-title]').textContent=item.title;
 const link=section.querySelector('[data-sx-avp-link]');
 link.href=item.origin==='playlist'?'https://www.youtube.com/playlist?list='+encodeURIComponent(item.id):'https://www.youtube.com/watch?v='+encodeURIComponent(item.id);
 link.hidden=false;
}
function draw(){
 const c=current(),place=slot();
 if(!c||!place)return;
 const reset=c.name!==S.subject||c.mode!==S.mode;
 if(reset){S.subject=c.name;S.mode=c.mode;S.selected='';S.query='';S.teacher='todos';S.type='todos';S.limit=70;}
 let section=place.host.querySelector(':scope > [data-sx-avp]');
 if(!section){
  section=D.createElement('section');section.className='sxAVP';section.setAttribute('data-sx-avp','');
 }
 if(place.after&&place.after.parentElement===place.host){
  if(section.previousElementSibling!==place.after)place.after.after(section);
 }else if(place.host.firstElementChild!==section)place.host.prepend(section);
 const list=entries(c.name,c.mode),teachers=[...new Set(list.filter(x=>x.origin==='video').map(x=>x.teacher))].sort((a,b)=>a.localeCompare(b,'pt'));
 const filter=list.filter(x=>(S.teacher==='todos'||x.teacher===S.teacher)
   &&(S.type==='todos'||S.type===x.kind||(S.type==='video'&&x.kind==='audio'))
   &&(!S.query||norm(x.title+' '+x.teacher).includes(norm(S.query))));
 if(!filter.some(x=>x.key===S.selected))S.selected=filter[0]?.key||'';
 const selected=filter.find(x=>x.key===S.selected);
 const savedScreen=section.querySelector('[data-sx-avp-screen]');
 const sameSelected=savedScreen?.dataset.key===S.selected;
 if(!section.querySelector('[data-sx-avp-shell]')||reset){
  section.innerHTML='<div data-sx-avp-shell><div class="sxAVPHead"><div><small>VIDEOAULAS · '+(c.mode==='practice'?'PRÁTICA':'TEORIA')+'</small><h2>Vídeos / Áudios</h2><p>Aulas por matéria, assunto e professor. Selecione uma aula na lista ao lado.</p></div><span data-sx-avp-count></span></div>'+
  '<div class="sxAVPTools"><label>Professor <select data-sx-avp-teacher></select></label><label>Tipo <select data-sx-avp-type></select></label><label class="sxAVPSearch">Buscar aula <input data-sx-avp-query type="search" placeholder="Assunto ou título..." autocomplete="off"></label></div>'+
  '<div class="sxAVPGrid"><div class="sxAVPMain"><div data-sx-avp-screen class="sxAVPScreen"></div><div class="sxAVPFoot"><strong data-sx-avp-title></strong><a data-sx-avp-link target="_blank" rel="noopener noreferrer" hidden>Abrir no YouTube ↗</a></div></div><aside class="sxAVPQueue" aria-label="Aulas disponíveis"><div class="sxAVPQueueHead" data-sx-avp-queue-count></div><div data-sx-avp-items></div><div data-sx-avp-more></div></aside></div>'+
  '<div class="sxAVPSource">Fonte: <a href="'+CHANNEL+'" target="_blank" rel="noopener noreferrer">canal público Clases Medicina - Py</a> · Catálogo atualizado automaticamente</div></div>';
 }
 section.querySelector('[data-sx-avp-count]').textContent=list.filter(x=>x.origin==='video').length+' aulas · '+list.filter(x=>x.origin==='playlist').length+' playlists';
 const prof=section.querySelector('[data-sx-avp-teacher]');
 prof.innerHTML='<option value="todos">Todos os professores</option>'+teachers.map(t=>'<option value="'+esc(t)+'">'+esc(t)+'</option>').join('');
 prof.value=S.teacher;
 const typ=section.querySelector('[data-sx-avp-type]');
 typ.innerHTML=[['todos','Todos os conteúdos'],['video','Videoaulas'],['audio','Aulas em áudio'],['playlist','Playlists']].map(([id,label])=>'<option value="'+id+'">'+label+'</option>').join('');
 typ.value=S.type;
 const query=section.querySelector('[data-sx-avp-query]');
 if(query.value!==S.query)query.value=S.query;
 section.querySelector('[data-sx-avp-queue-count]').textContent=filter.length+' item(ns) · '+c.name;
 section.querySelector('[data-sx-avp-items]').innerHTML=filter.slice(0,S.limit).map((x,i)=>
  '<button type="button" class="sxAVPItem'+(x.key===S.selected?' active':'')+'" data-sx-avp-choose="'+esc(x.key)+'" aria-current="'+(x.key===S.selected?'true':'false')+'"><span class="sxAVPIndex">'+String(i+1).padStart(2,'0')+'</span><span class="sxAVPItemCopy"><b>'+esc(x.title)+'</b><small>'+esc(x.teacher)+' · '+(x.kind==='playlist'?'Playlist':x.kind==='audio'?'Áudio':'Vídeo')+'</small></span><span class="sxAVPPlay" aria-hidden="true">▶</span></button>').join('')||
  '<div class="sxAVPEmpty">Nenhuma aula localizada com esses filtros. Consulte a fonte ou experimente outro professor.</div>';
 section.querySelector('[data-sx-avp-more]').innerHTML=filter.length>S.limit?'<button type="button" data-sx-avp-more-btn>Mostrar mais '+(filter.length-S.limit)+' aulas</button>':'';
 if(selected){
  const screen=section.querySelector('[data-sx-avp-screen]');
  if(!sameSelected||screen.dataset.key!==selected.key)screen.dataset.url='';
  screen.dataset.key=selected.key;
  addFrame(section,selected);
 }else{
  const screen=section.querySelector('[data-sx-avp-screen]');
  screen.replaceChildren();
  screen.dataset.url='';screen.dataset.key='';
  screen.innerHTML='<div class="sxAVPPlaceholder">'+(S.videos===null?'Sincronizando catálogo de videoaulas…':'Nenhum vídeo da disciplina classificado no catálogo atual.')+'</div>';
  section.querySelector('[data-sx-avp-title]').textContent='';
  section.querySelector('[data-sx-avp-link]').hidden=true;
 }
}
function load(){
 if(S.loading)return S.loading;
 S.loading=Promise.allSettled([VIDEO_SOURCE,PLAYLIST_SOURCE].map(path=>fetch(path+'?v=20261025-video-2').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()})))
 .then(results=>{
  if(results[0].status==='fulfilled'&&Array.isArray(results[0].value?.videos))S.videos=results[0].value.videos;
  if(results[1].status==='fulfilled'&&Array.isArray(results[1].value?.playlists))S.playlists=results[1].value.playlists;
  if(!S.videos)S.error='Catálogo de vídeos indisponível';
  if(!S.playlists)S.playlists=[];
 }).finally(()=>{S.loading=null;draw()});
 return S.loading;
}
function mount(){
 if(!current())return;
 draw();
 if(S.videos===null)load();
}
D.addEventListener('click',e=>{
 const box=e.target.closest('[data-sx-avp]');
 if(!box)return;
 const choose=e.target.closest('[data-sx-avp-choose]');
 if(choose){S.selected=choose.dataset.sxAvpChoose;draw();return}
 if(e.target.closest('[data-sx-avp-more-btn]')){S.limit+=70;draw();}
});
D.addEventListener('change',e=>{
 if(!e.target.closest('[data-sx-avp]'))return;
 if(e.target.matches('[data-sx-avp-teacher]')){S.teacher=e.target.value;S.selected='';S.limit=70;draw();}
 if(e.target.matches('[data-sx-avp-type]')){S.type=e.target.value;S.selected='';S.limit=70;draw();}
});
D.addEventListener('input',e=>{
 if(!e.target.matches('[data-sx-avp-query]'))return;
 S.query=e.target.value;S.selected='';S.limit=70;draw();
});
const previous=W.renderSubject;
if(typeof previous==='function')W.renderSubject=function(){const result=previous.apply(this,arguments);mount();return result;};
W.SinusVideoPlayerMateria={mount,load,entries,get catalog(){return S.videos},get error(){return S.error}};
})(window,document);
