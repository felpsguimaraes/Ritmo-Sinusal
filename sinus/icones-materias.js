/* Família SINUS de ícones vetoriais. Somente apresentação; preserva eventos e destinos. */
(function(){'use strict';
const paths={
book:'M3 4h6a3 3 0 0 1 3 3v15a5 5 0 0 0-5-2H3z M21 4h-6a3 3 0 0 0-3 3v15a5 5 0 0 1 5-2h4z',
microscope:'M10 3h4v8h-4z M12 11v3 M15 8a7 7 0 0 1 2 13 M6 21h14 M6 17h8 M6 21v-4 M8 14h6',
pill:'m8 4-4 4a5 5 0 0 0 7 7l5-5a5 5 0 0 0-7-7z M7 5l7 7 M15 16l4 4 M17 15l4 4',
stethoscope:'M4 3v6a5 5 0 0 0 10 0V3 M2 3h4 M12 3h4 M9 14v3a5 5 0 0 0 10 0v-3 M21 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
heart:'M12 21S2 15 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 7-10 13-10 13 M3 12h5l2-4 3 8 2-4h6',
scan:'M3 8V3h5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5 M7 12h10 M12 7v10 M5 5l14 14',
people:'M9 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0 M21 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0 M1 21v-4a5 5 0 0 1 9-3 M23 21v-4a5 5 0 0 0-9-3 M12 22s-5-3-5-6a3 3 0 0 1 5-2 3 3 0 0 1 5 2c0 3-5 6-5 6',
bone:'M8 5a3 3 0 1 0-4 4l10 10a3 3 0 1 0 4-4L8 5 M5 8l3-3 M15 18l3-3',
cells:'M9 3 3 7v7l6 4 6-4V7z M15 10l6 4v7l-6 3-6-3v-3 M7 10h.01 M11 11h.01 M15 18h.01',
flask:'M9 2h6 M10 2v7L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 9V2 M7 15h10 M10 18h.01 M14 19h.01',
dna:'M6 2c0 10 12 10 12 20 M18 2C18 12 6 12 6 22 M7 5h10 M9 9h6 M9 15h6 M7 19h10',
brain:'M12 4C8-1 4 3 5 7 1 8 1 14 5 15c-1 5 4 8 7 4 3 4 8 1 7-4 4-1 4-7 0-8 1-4-3-8-7-3 M12 4v15 M5 7l3 2 M5 15l3-2 M19 7l-3 2 M19 15l-3-2',
eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
lung:'M12 2v7 M12 7l-5 5 M12 7l5 5 M9 6C7 3 2 10 2 17s7 3 7-1V6 M15 6c2-3 7 4 7 11s-7 3-7-1V6',
kidney:'M8 4C1 3 0 17 6 19c4 1 5-6 2-8-2-1-2-3 0-7 M16 4c7-1 8 13 2 15-4 1-5-6-2-8 2-1 2-3 0-7 M10 17v5 M14 17v5',
baby:'M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0 M12 5c-3 0-3-4 0-4 3 0 3 4 0 4 M8 12h.01 M16 12h.01 M9 16q3 3 6 0',
female:'M17 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0 M12 13v10 M8 19h8',
scalpel:'m3 21 8-8 M8 16l3 3 M11 13l9-11 2 2-8 12z',
bacteria:'M8 6c-5 3-4 10 1 12s11-3 9-8S12 3 8 6 M5 5l2 2 M3 11h3 M6 18l-2 3 M12 18v4 M18 15l3 2 M18 8l3-2 M12 4V1 M10 9h.01 M14 12h.01 M9 14h.01',
shield:'M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6z M8 12l3 3 5-6',
atom:'M12 2c5 0 5 20 0 20S7 2 12 2 M3 7c3-4 21 6 18 10S0 11 3 7 M3 17C0 13 18 3 21 7S6 21 3 17 M12 12h.01',
ribbon:'M8 4c0-4 8-4 8 0s-9 14-9 14l-4 3 2-6s11-8 11-11 M8 4c0 5 9 14 9 14l4 3-2-6S8 7 8 4',
chart:'M3 3v18h19 M7 17v-5 M12 17V8 M17 17V4',
scale:'M12 3v18 M7 21h10 M3 7h18 M5 7l-4 8h8z M19 7l-4 8h8z',
food:'M6 2v7 M3 2v5a3 3 0 0 0 6 0V2 M6 10v12 M18 2c-4 3-4 10 0 10h2V2z M20 12v10',
play:'m8 3 14 9-14 9z',audio:'M4 15v-4a8 8 0 0 1 16 0v4 M4 13H2v7h5v-7z M20 13h2v7h-5v-7z',layers:'m12 2 10 5-10 5L2 7z M2 12l10 5 10-5 M2 17l10 5 10-5',
check:'m2 5 2 2 3-4 M11 5h11 M2 12l2 2 3-4 M11 12h11 M2 19l2 2 3-4 M11 19h11',
file:'M5 2h9l6 6v14H5z M14 2v7h6 M9 13h7 M9 17h7',home:'m2 10 10-8 10 8v12h-7v-8H9v8H2z',calendar:'M3 5h18v17H3z M7 2v6 M17 2v6 M3 11h18 M7 15h1 M12 15h1 M17 15h1 M7 19h1 M12 19h1',library:'M2 3h4v19H2z M9 3h4v19H9z m7 1 4-1 4 18-4 1z',user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M3 22v-3a9 9 0 0 1 18 0v3',more:'M5 12h.01 M12 12h.01 M19 12h.01',
search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M15 15l7 7',download:'M12 2v13 M7 10l5 5 5-5 M3 17v5h18v-5',upload:'M12 17V3 M7 8l5-5 5 5 M3 17v5h18v-5',save:'M3 3h15l4 4v15H3z M7 3v7h10V3 M7 22v-7h11v7',edit:'m3 16 13-13 5 5L8 21H3z M13 6l5 5',trash:'M3 6h18 M9 6V2h6v4 M5 6l1 16h12l1-16 M10 10v8 M14 10v8',plus:'M12 3v18 M3 12h18',split:'M2 3h20v19H2z M12 3v19',arrow:'M3 12h18 M15 6l6 6-6 6',back:'M21 12H3 M9 6l-6 6 6 6',share:'M12 16V2 M7 7l5-5 5 5 M5 12H3v10h18V12h-2',mic:'M9 3a3 3 0 0 1 6 0v9a3 3 0 0 1-6 0z M5 10v2a7 7 0 0 0 14 0v-2 M12 19v4 M8 23h8',spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z'};
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
const subjectRules=[[/patologica/,'microscope'],[/farmac|toxico/,'pill'],[/semio/,'stethoscope'],[/fisio/,'heart'],[/imagen|radiolog/,'scan'],[/familia|comunitaria/,'people'],[/anatom|ortoped|traumato/,'bone'],[/embrio/,'baby'],[/histo/,'cells'],[/bioquim|quim/,'flask'],[/genetic/,'dna'],[/inmun/,'shield'],[/microbio|infecto/,'bacteria'],[/biofisic/,'atom'],[/oftalmo/,'eye'],[/neumo/,'lung'],[/urolog|nefro/,'kidney'],[/neuro|psiquiat|psicolog/,'brain'],[/pediatr/,'baby'],[/gineco|obstet/,'female'],[/quirurg|cirug/,'scalpel'],[/oncolog/,'ribbon'],[/nutri/,'food'],[/legal|bioetic/,'scale'],[/epidemio|estadist|gestion|salud publica/,'chart'],[/primeros auxilio/,'shield'],[/medicina interna/,'stethoscope']];
function subjectKey(t){t=normalize(t);return subjectRules.find(([r])=>r.test(t))?.[1]||'book'}
function navKey(t){t=normalize(t);return /mapa/.test(t)?'brain':/horar|agenda|schedule/.test(t)?'calendar':/biblioteca|library/.test(t)?'library':/inicio|home/.test(t)?'home':/perfil|profile/.test(t)?'user':/trein|quest|prova/.test(t)?'check':/transcre|audio|ouvir/.test(t)?'audio':/flash/.test(t)?'layers':/video|assist/.test(t)?'play':/mais/.test(t)?'more':'book'}
function icon(k){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 26 26');s.setAttribute('class','sinus-line-icon');s.setAttribute('aria-hidden','true');s.setAttribute('focusable','false');s.dataset.sinusIcon=k;const p=document.createElementNS(s.namespaceURI,'path');p.setAttribute('d',paths[k]||paths.book);s.append(p);return s}
function replace(el,k){if(el.querySelector('[data-sinus-icon="'+k+'"]'))return;el.replaceChildren(icon(k))}
function apply(){document.querySelectorAll('.card .iconWrap').forEach(el=>replace(el,subjectKey(el.closest('.card')?.querySelector('h3')?.textContent)));document.querySelectorAll('.navIcon').forEach(el=>replace(el,navKey(el.closest('button,a')?.textContent)));document.querySelectorAll('.sxHomeActions>button>span,.sxBottomNav [data-sx-go]>span:first-child,.sxBottomNav [data-sx-menu]>span:first-child').forEach(el=>replace(el,navKey(el.closest('button')?.textContent)));document.querySelectorAll('[data-sx-estilo]').forEach(el=>{if(el.querySelector('.sinus-line-icon'))return;el.prepend(icon(navKey(el.dataset.sxEstilo)))});
const actions=[[/^(buscar|pesquisar)/,'search'],[/^(baixar|download)/,'download'],[/^(enviar|carregar|anexar|importar)/,'upload'],[/^salvar/,'save'],[/^editar/,'edit'],[/^(excluir|remover)/,'trash'],[/^(\+\s*)?(adicionar|novo|nova)/,'plus'],[/dividir tela/,'split'],[/^(ouvir|audio)/,'audio'],[/^(assistir|reproduzir)/,'play'],[/^(gravar|transcrever)/,'mic'],[/^(proxima|continuar|avancar)/,'arrow'],[/^(anterior|voltar)/,'back'],[/^(abrir|ver documento|ver material)/,'file'],[/^compartilhar/,'share'],[/^(mostrar resposta|revelar)/,'eye']];
document.querySelectorAll('#subjectTabs>button').forEach(el=>{if(!el.querySelector('svg'))el.prepend(icon(navKey(el.textContent)))});
document.querySelectorAll('.btn').forEach(el=>{if(el.querySelector('svg,img')||el.matches('.sxGoogle'))return;const t=normalize(el.textContent).trim(),k=actions.find(([r])=>r.test(t))?.[1];if(k)el.prepend(icon(k))})}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}function init(){apply();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
