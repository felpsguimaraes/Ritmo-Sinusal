/* SINUS · videoaulas como materiais da Biblioteca; player oficial em modal. */
(function(W,D){
'use strict';
const CATALOG='/sinus/youtube-catalogo.json';
const UPE_CATALOG='/sinus/anatomia-upe-videos.json';
const STORE='sinus_youtube_aislan_v1';
const S={catalog:null,loading:null,error:'',q:'',filter:'all',sort:'new',limit:40,opened:''};
const H=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const idOK=id=>/^[A-Za-z0-9_-]{11}$/.test(String(id||''));
function prefs(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return {}}}
function save(p){try{localStorage.setItem(STORE,JSON.stringify(p))}catch(e){}}
function all(){return Array.isArray(S.catalog?.videos)?S.catalog.videos.filter(v=>v&&idOK(v.id)):[]}
function thumb(id){return 'https://i.ytimg.com/vi/'+encodeURIComponent(id)+'/hqdefault.jpg'}
function videoURL(id){return 'https://www.youtube.com/watch?v='+encodeURIComponent(id)}
function mediaKind(x){return x.section==='shorts'?'Vídeo curto':x.section==='streams'?'Transmissão':'Videoaula'}
function area(x){
 const cur=W.SinusVideoCuradoria?.classify(x);
 if(cur)return cur.subjectLabel;
 const t=norm(x.title);
 const rules=[
 ['Anatomia',/\banatom|anatomy|osteolog|miolog|articulac|topografi/],
 ['Histologia',/histolog|tejido|tissues|lamina/],
 ['Embriologia',/embriolog|embryolog|desarrollo embrion/],
 ['Microbiologia',/microbiolog|microbiology|bacteriolog|parasitolog|virolog|micolog/],
 ['Imunologia',/inmunolog|imunolog|immunolog/],
 ['Farmacologia',/farmacolog|pharmacolog|medicamento|drug/],
 ['Bioquímica',/bioquim|biochem|metabolismo|enzyme|enzima/],
 ['Patologia',/patolog|patholog|neoplasia|inflamacion|necrosis/],
 ['Fisiologia',/fisiolog|physiolog|circulatorio|somatosens|respirat|endocrin|digestiv/],
 ['Semiologia',/semiolog|anamnesis|examen fisico|exploracion fisica|signos y sintomas/],
 ['Neurologia',/\bneuro|cerebro|encefal|medula espinal|sistema nervioso/],
 ['Cardiologia',/cardiolog|electrocardio|ecg|infarto|corazon/],
 ['Clínica Médica',/clinica medica|medicina interna|diabetes|hipertension|neumonia/],
 ['Cirurgia',/cirurg|surg|quirurg|operatorio/]
 ];
 return rules.find(([,rx])=>rx.test(t))?.[0]||'Outras aulas';
}
function visible(){
 const p=prefs(),fav=p.favorites||[],seen=p.recent||[];
 let result=all().filter(v=>!S.q||norm(v.title+' '+area(v)).includes(norm(S.q)));
 if(S.filter==='favorites')result=result.filter(v=>fav.includes(v.id));
 if(S.filter==='recent')result=result.filter(v=>seen.includes(v.id));
 if(S.filter.startsWith('area:'))result=result.filter(v=>area(v)===S.filter.slice(5));
 if(S.sort==='az')result.sort((a,b)=>norm(a.title).localeCompare(norm(b.title),'pt'));
 if(S.sort==='za')result.sort((a,b)=>norm(b.title).localeCompare(norm(a.title),'pt'));
 return result;
}
function card(v,p){
 const fav=(p.favorites||[]).includes(v.id),title=H(v.title||'Videoaula');
 return '<article class="sxLibCard sxYTCard">'+
 '<div class="sxLibCover kind-video"><button type="button" class="sxLibOpenCover has-preview" data-sxyt-open="'+H(v.id)+'" aria-label="Assistir: '+title+'">'+
 '<span class="sxLibFallback"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/></svg><small>Vídeo</small></span>'+
 '<img src="'+thumb(v.id)+'" loading="lazy" alt="" onerror="this.parentElement.classList.remove(\'has-preview\');this.remove()">'+
 '<span class="sxYTPlay" aria-hidden="true">▶</span></button>'+
 '<span class="sxLibBadge">VÍDEO</span>'+
 '<button type="button" class="sxLibFavorite '+(fav?'on':'')+'" data-sxyt-fav="'+H(v.id)+'" aria-label="'+(fav?'Remover dos favoritos: ':'Adicionar aos favoritos: ')+title+'" aria-pressed="'+fav+'">'+(fav?'★':'☆')+'</button></div>'+
 '<button type="button" class="sxLibTitle" data-sxyt-open="'+H(v.id)+'">'+title+'</button>'+
 '<p class="sxLibMeta">'+H(area(v))+'</p><small class="sxLibContext">'+H(mediaKind(v))+'</small></article>';
}
function render(){
 const host=D.getElementById('sxYoutubeMount');if(!host)return;
 const list=visible(),items=all(),p=prefs(),hasFav=(p.favorites||[]).length>0,hasRecent=(p.recent||[]).length>0;
 const areas=[...new Set(items.map(area))].sort((a,b)=>a.localeCompare(b,'pt'));
 host.innerHTML=
 '<section class="sxLibSection sxYTLibrary"><div class="sxLibSectionHead"><h2>Videoaulas</h2><span class="sxYTCount">'+list.length+' de '+items.length+' vídeos</span></div>'+
 '<div class="sxLibToolbar sxYTToolbar"><span>Materiais em vídeo</span><div>'+
 '<label>Matéria <select data-sxyt-category aria-label="Filtrar videoaulas">'+
 '<option value="all"'+(S.filter==='all'?' selected':'')+'>Todas as matérias</option>'+
 (hasFav?'<option value="favorites"'+(S.filter==='favorites'?' selected':'')+'>Favoritos</option>':'')+
 (hasRecent?'<option value="recent"'+(S.filter==='recent'?' selected':'')+'>Assistidos recentemente</option>':'')+
 areas.map(a=>'<option value="area:'+H(a)+'"'+(S.filter==='area:'+a?' selected':'')+'>'+H(a)+'</option>').join('')+
 '</select></label><label>Ordenar <select data-sxyt-sort aria-label="Ordenar videoaulas">'+
 [['new','Mais recentes'],['az','Título: A–Z'],['za','Título: Z–A']].map(([v,t])=>'<option value="'+v+'"'+(S.sort===v?' selected':'')+'>'+t+'</option>').join('')+
 '</select></label></div></div>'+
 (S.loading&&!S.catalog?'<div class="sxLibEmpty"><h3>Carregando videoaulas…</h3><p>Organizando as aulas no catálogo.</p></div>':
 S.error&&!items.length?'<div class="sxLibEmpty"><h3>Catálogo indisponível</h3><p>Não foi possível carregar a lista de aulas.</p><button class="btn sm" data-sxyt-retry>Tentar novamente</button></div>':
 list.length?'<div class="sxLibGrid sxYTGrid">'+list.slice(0,S.limit).map(v=>card(v,p)).join('')+'</div>'+
 (list.length>S.limit?'<div class="sxLibMore"><button type="button" class="btn" data-sxyt-more>Mostrar mais materiais</button><small>'+Math.min(S.limit,list.length)+' de '+list.length+'</small></div>':''):
 '<div class="sxLibEmpty"><h3>Nenhuma videoaula encontrada</h3><p>Tente outra busca ou selecione outra matéria.</p></div>')+
 '</section>';
}
function mount(query){
 S.q=String(query||'');
 if(!S.catalog){render();load();return}
 render();
}
function load(force){
 if(S.loading)return S.loading;
 const suffix=force?'?refresh='+Date.now():'?v=20261025-upe';
 const options={cache:force?'no-store':'default'};
 S.loading=Promise.allSettled([CATALOG,UPE_CATALOG].map(url=>fetch(url+suffix,options)
   .then(r=>{if(!r.ok)throw Error('Catálogo '+url+' HTTP '+r.status);return r.json()})))
 .then(results=>{
  const valid=results.filter(r=>r.status==='fulfilled'&&Array.isArray(r.value?.videos));
  if(!valid.length)throw Error('Não foi possível carregar os catálogos de vídeo.');
  const all=[],seen=new Set();
  // Vídeos UPE em primeiro lugar; cada vídeo é um cartão independente.
  for(const which of [1,0]){
   const entry=results[which];
   if(entry.status!=='fulfilled'||!Array.isArray(entry.value?.videos))continue;
   for(const item of entry.value.videos){
    if(!item||!idOK(item.id)||seen.has(item.id))continue;
    seen.add(item.id);all.push(item);
   }
  }
  S.catalog={videos:all};S.error='';
 })
 .catch(err=>{S.error=String(err);if(!S.catalog)S.catalog={videos:[]}})
 .finally(()=>{S.loading=null;render()});
 return S.loading;
}
function close(){
 const modal=D.getElementById('sxYTViewer');
 if(modal)modal.remove();
 D.body.classList.remove('sxYTViewerOpen');
 S.opened='';
}
function openPlaylist(playlistId,title){
 if(!/^(?:PL|OLAK|UU|FL|LL)[A-Za-z0-9_-]{10,}$/.test(String(playlistId||'')))return;
 close();
 const shell=D.createElement('div');shell.id='sxYTViewer';shell.className='sxYTViewer';
 shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','Reproduzir playlist '+String(title||'Videoaulas'));
 shell.innerHTML='<div class="sxYTOverlay" data-sxyt-close></div>'+
 '<div class="sxYTDialog"><div class="sxYTDialogHead"><div><small>Matérias · Videoaulas</small><h2>'+H(title||'Playlist de videoaulas')+'</h2></div>'+
 '<button type="button" class="sxYTClose" data-sxyt-close aria-label="Fechar player">✕</button></div>'+
 '<div class="sxYTFrame"><iframe title="'+H(title||'Playlist de videoaulas')+'" src="https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(playlistId)+'&autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; accelerometer; gyroscope; web-share" allowfullscreen></iframe></div>'+
 '<div class="sxYTDialogFoot"><span>Player integrado · YouTube</span><a href="https://www.youtube.com/playlist?list='+encodeURIComponent(playlistId)+'" target="_blank" rel="noopener noreferrer">Abrir playlist original ↗</a></div></div>';
 D.body.appendChild(shell);D.body.classList.add('sxYTViewerOpen');S.opened=playlistId;
 shell.querySelector('.sxYTClose')?.focus();
}

function open(id){
 if(!idOK(id)||!all().some(x=>x.id===id))return;
 close();
 const item=all().find(x=>x.id===id),p=prefs();
 p.recent=[id,...(p.recent||[]).filter(x=>x!==id)].slice(0,40);p.last=id;save(p);
 const shell=D.createElement('div');
 shell.id='sxYTViewer';shell.className='sxYTViewer';
 shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','Reproduzir '+item.title);
 shell.innerHTML='<div class="sxYTOverlay" data-sxyt-close></div>'+
 '<div class="sxYTDialog"><div class="sxYTDialogHead"><div><small>Biblioteca · Vídeos</small><h2>'+H(item.title)+'</h2></div><button type="button" class="sxYTClose" data-sxyt-close aria-label="Fechar player">✕</button></div>'+
 '<div class="sxYTFrame"><iframe title="'+H(item.title)+'" src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; accelerometer; gyroscope; web-share" allowfullscreen></iframe></div>'+
 '<div class="sxYTDialogFoot"><span>'+H(area(item))+' · Player do YouTube</span><a href="'+videoURL(id)+'" target="_blank" rel="noopener noreferrer">Abrir vídeo original ↗</a></div></div>';
 D.body.appendChild(shell);D.body.classList.add('sxYTViewerOpen');S.opened=id;
 shell.querySelector('[data-sxyt-close].sxYTClose')?.focus();
 render();
}
D.addEventListener('click',e=>{
 const t=e.target.closest('[data-sxyt-open],[data-sxyt-fav],[data-sxyt-more],[data-sxyt-retry],[data-sxyt-close]');
 if(!t)return;
 if(t.hasAttribute('data-sxyt-close')){close();return}
 if(t.hasAttribute('data-sxyt-open')){open(t.dataset.sxytOpen);return}
 if(t.hasAttribute('data-sxyt-fav')){
  const id=t.dataset.sxytFav,p=prefs(),fav=Array.isArray(p.favorites)?p.favorites:[];
  p.favorites=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save(p);render();return;
 }
 if(t.hasAttribute('data-sxyt-more')){S.limit+=40;render();return}
 if(t.hasAttribute('data-sxyt-retry')){S.catalog=null;S.error='';load(true);render()}
});
D.addEventListener('change',e=>{
 if(e.target.matches('[data-sxyt-category]')){S.filter=e.target.value;S.limit=40;render()}
 if(e.target.matches('[data-sxyt-sort]')){S.sort=e.target.value;S.limit=40;render()}
});
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.opened){close();return}if(e.key==='Tab'&&S.opened){const closeButton=D.querySelector('#sxYTViewer .sxYTClose');const link=D.querySelector('#sxYTViewer .sxYTDialogFoot a');if(e.shiftKey&&D.activeElement===closeButton){e.preventDefault();link?.focus()}else if(!e.shiftKey&&D.activeElement===link){e.preventDefault();closeButton?.focus()}}});
W.SinusYoutube={mount,load,close,openPlaylist,get state(){return S},get catalog(){return S.catalog}};
})(window,document);
