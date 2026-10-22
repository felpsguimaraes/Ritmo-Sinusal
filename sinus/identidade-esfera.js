/* Sinus · identidade APPROVADA: a esfera verde em vidro com ECG branco.
   Somente alterações DOM/ícones. Não sobrescreve as funções de matérias, biblioteca ou autenticação. */
(function(){
'use strict';
const orb='/icons/sinus-esfera-ecg.webp';
const icons={
home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
schedule:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M14 14h3"/>',
subjects:'<path d="M3 5c3-1 6-1 9 2 3-3 6-3 9-2v14c-3-1-6-1-9 2-3-3-6-3-9-2z"/><path d="M12 7v14"/>',
library:'<rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="6" width="5" height="15" rx="1"/><path d="m17 4 4 1v16l-4-1z"/>',
study:'<path d="M2 12h5l3-7 4 14 3-7h5"/>',
apostilas:'<path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7"/>',
agenda:'<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M7 2v4M17 2v4M3 10h18m-13 4h4m-4 4h8"/>',
immigration:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 5-4 13 0 18M12 3c4 5 4 13 0 18"/>',
profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2c0-4 3-6 8-6s8 2 8 6v2"/>',
pockets:'<rect x="5" y="4" width="14" height="17" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>',
'study-together':'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-3c0-5 12-5 12 0v3M15 15c3-1 7 1 7 4v2"/>',
ranking:'<path d="M3 21h18M6 21v-6h4v6M10 21V9h4v12M14 21V4h4v17"/>',
plans:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h5"/>',
admin:'<path d="M12 2v3M12 19v3M4 4l2 2m12 12 2 2M2 12h3m14 0h3M4 20l2-2M18 6l2-2"/><circle cx="12" cy="12" r="4"/>',
exit:'<path d="M10 4H4v16h6m4-4 4-4-4-4M8 12h10"/>',
more:'<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>'
};
const svg=k=>'<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">'+(icons[k]||icons.subjects)+'</svg>';
function apply(root){
 const scope=root?.querySelectorAll?root:document;
 scope.querySelectorAll('.logoMark:not(.sinusOrb)').forEach(n=>{
  n.classList.add('sinusOrb');n.textContent='';
  const img=document.createElement('img');img.src=orb;img.alt='';img.loading='eager';n.appendChild(img);
 });
 scope.querySelectorAll('.navBtn .navIcon:not([data-sinus-icon])').forEach(n=>{
  const b=n.closest('.navBtn');const key=b?.dataset.page||(b?.getAttribute('onclick')||'').includes('Admin')?'admin':null;
  const role=b?.dataset.page||((b?.getAttribute('onclick')||'').includes('Admin')?'admin':b?.hasAttribute('data-sx-sair')?'exit':'more');
  n.innerHTML=svg(role);n.setAttribute('data-sinus-icon',role);
 });
 scope.querySelectorAll('.sxBottomNav [data-sx-go] > span:first-child:not([data-sinus-icon])').forEach(n=>{
  const key=n.closest('[data-sx-go]')?.dataset.sxGo||'more';n.innerHTML=svg(key);n.setAttribute('data-sinus-icon',key);
 });
 scope.querySelectorAll('.sxBottomNav [data-sx-menu] > span:first-child:not([data-sinus-icon])').forEach(n=>{n.innerHTML=svg('more');n.dataset.sinusIcon='more'});
}
let scheduled=false;
const obs=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply(document)})});
function init(){apply(document);obs.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
