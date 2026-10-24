/* SINUS · Playlists públicas organizadas dentro das respectivas matérias. */
(function(W,D){
'use strict';
const SOURCE='/sinus/youtube-playlists.json';
const S={list:null,promise:null,error:''};
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[.\-–]/g,' ').replace(/\s+/g,' ').trim();
const valid=id=>/^(?:PL|OLAK|UU|FL|LL)[A-Za-z0-9_-]{10,}$/.test(String(id||''));
const GROUPS={
 'nutricion':/^(?:nutricion)\b/,
 'epidemiologia':/^(?:epidemiologia|salud publica)\b/,
 'inmunologia':/^(?:inmunologia|imunologia)\b/,
 'microbiologia':/^microbiologia\b/,
 'bioquimica':/^bioquimica\b/,
 'fisiologia':/^fisiologia\b/,
 'neuro':/^(?:neurologia|neuroanatomia|neurofisiologia|fisiologia ii)\b/,
 'histo':/^histologia\b/,
 'anato':/^anatomia\s+(?!patologica\b)(?:[ivx]+\b|humana\b|general\b|descriptiva\b)/
};
function match(playlist,subject){
 const key=norm(playlist.title), name=norm(subject);
 return Object.entries(GROUPS).some(([k,rx])=>key===k&&rx.test(name)) ||
 (key.startsWith('anatomia')&&!key.includes('patologica')&&GROUPS.anato.test(name)) ||
 (key.startsWith('histologia')&&GROUPS.histo.test(name));
}
function playlistsFor(subject){return (S.list||[]).filter(p=>valid(p.id)&&match(p,subject))}
function render(subject,mode,hasNative){
 if(mode!=='theory'||W.UI?.tab==='practice')return;
 const box=D.getElementById('subjectContent');
 if(!box||D.querySelector('#subjectHeader h1')?.textContent.trim()!==subject)return;
 const activeTab=D.querySelector('#subjectTabs button.active')?.textContent||'';
 if(!/v[ií]deos?/i.test(activeTab))return;
 if(box.querySelector('[data-sx-playlists]'))return;
 const matches=playlistsFor(subject);
 if(!matches.length)return;
 const section=D.createElement('section');section.className='sxSPSection';section.setAttribute('data-sx-playlists','');
 section.innerHTML='<div class="sxSPHead"><div><span class="eyebrow">AULAS DA MATÉRIA</span><h2>Playlists de videoaulas</h2><p>Conteúdo organizado por disciplina, junto dos seus materiais.</p></div><span class="sxSPCount">'+matches.length+' '+(matches.length===1?'playlist':'playlists')+'</span></div>'+
 '<div class="sxSPCards">'+matches.map(p=>
 '<article class="sxLibCard sxSPCard"><div class="sxLibCover kind-video">'+
 '<button class="sxLibOpenCover sxSPOpen" data-sx-play="'+esc(p.id)+'" aria-label="Assistir playlist '+esc(p.title)+'">'+
 '<span class="sxLibFallback"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="12" height="3" rx="1"/><rect x="4" y="10" width="12" height="3" rx="1"/><rect x="4" y="15" width="12" height="4" rx="1"/><path d="m19 9 3 3-3 3z"/></svg><small>Videoaulas</small></span><span class="sxSPPlay" aria-hidden="true">▶</span></button><span class="sxLibBadge">PLAYLIST</span></div>'+
 '<button type="button" class="sxLibTitle" data-sx-play="'+esc(p.id)+'">'+esc(p.title)+'</button>'+
 '<p class="sxLibMeta">'+esc(subject)+'</p><small class="sxLibContext">Aulas em sequência</small></article>'
 ).join('')+'</div>';
 box.prepend(section);
 // Mantém os recursos antigos acessíveis sem um player vazio dominando a página.
 if(!hasNative){
  const native=box.querySelector(':scope > .resourceLayout');
  if(native){
   const details=D.createElement('details');details.className='sxSPOther';
   const summary=D.createElement('summary');summary.textContent='Outros vídeos e arquivos da matéria';
   details.appendChild(summary);details.appendChild(native);box.appendChild(details);
  }
 }
}
function load(){
 if(S.promise)return S.promise;
 S.promise=fetch(SOURCE,{cache:'default'})
 .then(r=>{if(!r.ok)throw Error('Playlists indisponíveis');return r.json()})
 .then(data=>{if(!Array.isArray(data.playlists))throw Error('Catálogo inválido');S.list=data.playlists.filter(x=>x&&valid(x.id));S.error=''})
 .catch(e=>{S.error=String(e);S.list=[]})
 .finally(()=>{S.promise=null;const ctx=S.context;if(ctx&&S.list)render(ctx.subject,ctx.mode,ctx.hasNative)});
 return S.promise;
}
function mount(subject,mode,hasNative){
 S.context={subject,mode,hasNative:!!hasNative};
 if(mode!=='theory')return;
 if(S.list){render(subject,mode,!!hasNative);return}
 load();
}
D.addEventListener('click',e=>{
 const btn=e.target.closest('[data-sx-play]');
 if(!btn)return;
 const id=btn.getAttribute('data-sx-play');
 if(!valid(id))return;
 const item=(S.list||[]).find(x=>x.id===id);
 if(item&&W.SinusYoutube?.openPlaylist)W.SinusYoutube.openPlaylist(item.id,item.title);
});
W.SinusSubjectPlaylists={mount,load,playlistsFor,get catalog(){return S.list},get error(){return S.error}};
})(window,document);
