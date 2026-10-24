/* SINUS · Videoteca YouTube. Exibe embeds oficiais; não baixa nem re-hospeda vídeos. */
(function (W,D) {
  'use strict';
  const CHANNEL='https://www.youtube.com/@aislanfernandes4039';
  const CATALOG_URL='/sinus/youtube-catalogo.json';
  const SETTINGS_KEY='sinus_youtube_aislan_v1';
  const S={catalog:null,loading:null,query:'',tab:'todos',limit:36,selected:'',mode:'video',error:''};
  const H=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const videoId=x=>/^[\w-]{11}$/.test(String(x||''))?String(x):'';
  const channelId=x=>/^UC[\w-]{22}$/.test(String(x||''))?String(x):'';
  const playlistId=x=>/^(UU|PL)[\w-]{10,}$/.test(String(x||''))?String(x):'';
  function prefs(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}')}catch{return {}}}
  function save(values){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(Object.assign(prefs(),values)))}catch(e){}}
  function items(){return Array.isArray(S.catalog?.videos)?S.catalog.videos.filter(x=>videoId(x.id)):[]}
  function list(){
    return items().filter(x=>(S.tab==='todos'||String(x.section||'videos')===S.tab) &&
      (!S.query||clean([x.title,x.description,x.section].join(' ')).includes(clean(S.query))));
  }
  const sections=[['todos','Todos'],['videos','Aulas'],['shorts','Curtos'],['streams','Transmissões']];
  function ytUrl(id){return 'https://www.youtube.com/watch?v='+encodeURIComponent(id)}
  function thumb(id){return 'https://i.ytimg.com/vi/'+encodeURIComponent(id)+'/hqdefault.jpg'}
  function currentVideo(){
    return items().find(v=>v.id===S.selected) || items()[0] || null;
  }
  function effectivePlaylist(){
    const fromCatalog=playlistId(S.catalog?.uploadsPlaylistId);
    const id=channelId(S.catalog?.channelId);
    return fromCatalog||(id?'UU'+id.slice(2):'');
  }
  function render(){
    const host=D.getElementById('sxYoutubeMount');
    if(!host)return;
    const all=items(), filtered=list(), c=S.catalog||{}, selected=currentVideo(), pl=effectivePlaylist();
    const favor=prefs().favorites||[], last=prefs().last||'';
    const hasPlayer=(S.mode==='playlist'&&pl)||selected;
    const frameUrl=S.mode==='playlist'&&pl?'https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(pl)+'&rel=0':
      selected?'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(selected.id)+'?rel=0':'';
    const channelName=H(c.channelName||'Clases Medicina - Py');
    const channelHref=CHANNEL;
    host.innerHTML=
      '<div class="sxYTTop"><div class="sxYTSource"><span class="sxYTBrand" aria-hidden="true">▶</span><div><span class="eyebrow">VIDEOAULAS · FONTE EXTERNA</span><h2>'+channelName+'</h2><p>Conteúdo público do canal, reproduzido pelo YouTube no SINUS.</p></div></div>'+
      '<a class="sxYTExternal" href="'+channelHref+'" target="_blank" rel="noopener noreferrer">Visitar canal ↗</a></div>'+
      '<div class="sxYTStats"><span><b>'+all.length+'</b> vídeos indexados</span><span>Fonte: YouTube</span>'+
      (c.updatedAt?'<span>Catálogo atualizado '+H(new Date(c.updatedAt).toLocaleDateString('pt-BR'))+'</span>':'<span>Catálogo aguardando sincronização</span>')+'</div>'+
      '<div class="sxYTLayout"><section class="sxYTStage"><div class="sxYTPlayer">'+(hasPlayer?
        '<iframe title="Player de videoaulas do YouTube" src="'+H(frameUrl)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>':
        '<div class="sxYTPlaceholder"><span>▶</span><h3>Preparando o catálogo de aulas</h3><p>A lista de vídeos será preenchida pela sincronização do canal. O acesso ao canal já está disponível.</p><a href="'+CHANNEL+'" target="_blank" rel="noopener noreferrer">Abrir canal no YouTube ↗</a></div>')+'</div>'+
      '<div class="sxYTNow"><div><small>REPRODUZINDO AGORA</small><h3>'+H(S.mode==='playlist'?'Todos os vídeos públicos do canal':selected?.title||'Videoteca em preparação')+'</h3><p>Canal original: '+channelName+'</p></div>'+
      '<div class="sxYTActions">'+(pl?'<button type="button" class="btn sm" data-yt-playlist>▶ Playlist completa</button>':'')+
      (selected?'<button type="button" class="btn sm" data-yt-fav="'+H(selected.id)+'">'+(favor.includes(selected.id)?'★ Salvo':'☆ Favoritar')+'</button>':'')+
      '<a class="btn sm" target="_blank" rel="noopener noreferrer" href="'+(selected&&S.mode!=='playlist'?ytUrl(selected.id):pl?'https://www.youtube.com/playlist?list='+encodeURIComponent(pl):CHANNEL)+'">Ver no YouTube ↗</a></div></div>'+
      '<div class="sxYTNote">Alguns vídeos podem não permitir reprodução incorporada. Nesses casos, utilize “Ver no YouTube”.</div></section>'+
      '<aside class="sxYTBrowse"><div class="sxYTBrowseTop"><h3>Explorar aulas</h3><label class="sxYTSearch"><span aria-hidden="true">⌕</span><input id="sxYTSearch" type="search" placeholder="Buscar por tema ou aula" value="'+H(S.query)+'" aria-label="Buscar videoaulas"></label></div>'+
      '<div class="sxYTFilters">'+sections.map(([id,label])=>'<button type="button" data-yt-section="'+id+'" aria-pressed="'+(S.tab===id)+'" class="'+(S.tab===id?'active':'')+'">'+label+'</button>').join('')+
      (favor.length?'<button type="button" data-yt-section="favoritos" aria-pressed="'+(S.tab==='favoritos')+'" class="'+(S.tab==='favoritos'?'active':'')+'">★ Favoritos</button>':'')+'</div>'+
      (S.loading&&!S.catalog?'<p class="sxYTEmpty">Consultando o catálogo de videoaulas…</p>':
       S.error&&!all.length?'<p class="sxYTEmpty">Não foi possível carregar o catálogo. <button type="button" data-yt-retry>Tentar novamente</button></p>':
       all.length===0?'<p class="sxYTEmpty">Ainda não há vídeos indexados. A sincronização automática consulta os vídeos públicos do canal.</p>':
       (S.tab==='favoritos'?all.filter(v=>favor.includes(v.id)&&(!S.query||clean(v.title).includes(clean(S.query)))):filtered).length===0?
          '<p class="sxYTEmpty">Nenhuma aula encontrada para esta busca.</p>':
          '<div class="sxYTList">'+(S.tab==='favoritos'?all.filter(v=>favor.includes(v.id)&&(!S.query||clean(v.title).includes(clean(S.query)))):filtered).slice(0,S.limit).map(v=>
           '<button type="button" data-yt-select="'+H(v.id)+'" class="sxYTItem '+(S.selected===v.id?'active':'')+'">'+
           '<span class="sxYTThumb"><img src="'+thumb(v.id)+'" loading="lazy" alt=""><span>▶</span></span>'+
           '<span class="sxYTItemText"><b>'+H(v.title||'Videoaula')+'</b><small>'+H(({videos:'Aula',shorts:'Vídeo curto',streams:'Transmissão'})[v.section]||'Vídeo')+(last===v.id?' · Último assistido':'')+'</small></span></button>').join('')+'</div>'+
          ((S.tab==='favoritos'?all.filter(v=>favor.includes(v.id)&&(!S.query||clean(v.title).includes(clean(S.query)))):filtered).length>S.limit?'<button type="button" class="sxYTMore" data-yt-more>Mostrar mais aulas</button>':''))+'</aside></div>';
  }
  function load(force){
    if(S.loading&&!force)return S.loading;
    S.loading=fetch(CATALOG_URL+(force?'?t='+Date.now():''),{cache:force?'no-store':'default'})
    .then(r=>{if(!r.ok)throw Error('Catálogo indisponível');return r.json()})
    .then(data=>{
      if(!data||!Array.isArray(data.videos))throw Error('Formato inválido');
      S.catalog=data;S.error='';
      const saved=prefs().last;
      S.selected=videoId(saved)&&items().some(v=>v.id===saved)?saved:items()[0]?.id||'';
      if(!S.selected&&effectivePlaylist())S.mode='playlist';
    }).catch(e=>{S.error=e.message;S.catalog={videos:[]}}).finally(()=>{S.loading=null;render()});
    return S.loading;
  }
  function mount(){
    const host=D.getElementById('sxYoutubeMount');
    if(!host)return;
    if(!S.catalog){render();load();return}
    render();
  }
  D.addEventListener('click',e=>{
    const target=e.target.closest('[data-yt-select],[data-yt-section],[data-yt-more],[data-yt-fav],[data-yt-playlist],[data-yt-retry]');
    if(!target)return;
    if(target.hasAttribute('data-yt-select')){S.selected=target.dataset.ytSelect;S.mode='video';save({last:S.selected});render()}
    if(target.hasAttribute('data-yt-section')){S.tab=target.dataset.ytSection;S.limit=36;render()}
    if(target.hasAttribute('data-yt-more')){S.limit+=36;render()}
    if(target.hasAttribute('data-yt-fav')){const id=target.dataset.ytFav;const p=prefs();p.favorites=Array.isArray(p.favorites)?p.favorites:[];p.favorites=p.favorites.includes(id)?p.favorites.filter(x=>x!==id):[...p.favorites,id];save(p);render()}
    if(target.hasAttribute('data-yt-playlist')){S.mode='playlist';render()}
    if(target.hasAttribute('data-yt-retry')){S.catalog=null;load(true);render()}
  });
  D.addEventListener('input',e=>{
    if(e.target.id!=='sxYTSearch')return;
    S.query=e.target.value;S.limit=36;const focus=e.target.selectionStart;render();
    const input=D.getElementById('sxYTSearch');if(input){input.focus();try{input.setSelectionRange(focus,focus)}catch(err){}}
  });
  W.SinusYoutube={mount,load,get state(){return S},get catalog(){return S.catalog}};
})(window,document);
