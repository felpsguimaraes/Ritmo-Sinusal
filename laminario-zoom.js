/* SINUS — Zoom de imagens do Laminário | v1.1 | Sem dependências */
(() => {
  'use strict';
  if (window.SINUSLaminarioZoom?.initialized) return;

  const IMAGE_SELECTOR = [
    'img[data-laminario-zoom]',
    '[data-laminario-zoom-container] img',
    '[data-sinus-laminario] img',
    '#laminario img',
    '.laminario img',
    '#laminário img',
    '.laminário img'
  ].join(',');
  const MAX_SCALE = 5;
  const MIN_SCALE = 1;
  let modal = null;
  let zoomedImage = null;
  let imgSource = null;
  let lastFocused = null;
  let originalBodyOverflow = '';
  let scale = 1, panX = 0, panY = 0;
  let lastTap = 0;
  const pointers = new Map();
  let previousPinch = null;

  const css = `
    ${IMAGE_SELECTOR} { cursor: zoom-in; }
    .sinus-lamina-zoom-btn { appearance: none; border: 1px solid #e5e7eb; border-radius: 12px;
      display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,.97);
      width: 39px; height: 39px; color: #1b2534; cursor: pointer; box-shadow: 0 3px 14px rgba(0,0,0,.1); }
    .sinus-lamina-zoom-btn:hover { background:#f1f5f9; }
    .sinus-lamina-zoom-btn:focus-visible, .sinus-lamina-zoom-close:focus-visible,
    .sinus-lamina-zoom-control:focus-visible { outline: 3px solid #3b82f6; outline-offset: 2px; }
    .sinus-lamina-zoom-backdrop { position: fixed; inset:0; z-index: 2147483646;
      background: rgba(8,14,23,.9); display: flex; flex-direction: column;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .sinus-lamina-zoom-toolbar { background: #fff; min-height: 70px; display: flex; align-items:center;
      justify-content:space-between; gap:12px; padding: 10px 16px; flex-shrink:0; }
    .sinus-lamina-zoom-title { margin:0; font-size:14px; font-weight:650; color:#18212e;
      overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .sinus-lamina-zoom-caption { font-size:11px; color:#64748b; margin-top:3px; }
    .sinus-lamina-zoom-controls { display: flex; align-items:center; gap:6px; flex-shrink:0; }
    .sinus-lamina-zoom-control, .sinus-lamina-zoom-close { border:1px solid #e5e7eb;
      background:#fff; border-radius:11px; color:#111827; font-size:18px; width:40px; height:40px;
      cursor:pointer; display:inline-flex; align-items:center; justify-content:center; }
    .sinus-lamina-zoom-control:hover, .sinus-lamina-zoom-close:hover {background:#f3f4f6;}
    .sinus-lamina-zoom-control:disabled {opacity:.35; cursor:not-allowed;}
    .sinus-lamina-zoom-percent { min-width:46px; color:#334155; font-size:13px; text-align:center;
      font-variant-numeric:tabular-nums; }
    .sinus-lamina-zoom-viewport {position:relative; flex:1; min-height:0; overflow:hidden;
      touch-action:none; cursor:grab; user-select:none; -webkit-user-select:none; }
    .sinus-lamina-zoom-viewport.is-dragging { cursor:grabbing; }
    .sinus-lamina-zoom-image { position:absolute; left:50%; top:50%; max-width:100%; max-height:100%;
      width:auto; height:auto; object-fit:contain; pointer-events:none; -webkit-user-drag:none;
      will-change:transform; transform-origin:center center; }
    .sinus-lamina-zoom-hint {color:#e2e8f0; text-align:center; font-size:12px;
      padding: 8px 12px 12px; background:rgba(8,14,23,.7); }
    @media (max-width:650px) { .sinus-lamina-zoom-toolbar{min-height:60px; padding:8px;gap:6px;}
      .sinus-lamina-zoom-control,.sinus-lamina-zoom-close{width:35px;height:35px; border-radius:9px;}
      .sinus-lamina-zoom-title{font-size:12px;} .sinus-lamina-zoom-caption{display:none;}
      .sinus-lamina-zoom-controls{gap:3px;} .sinus-lamina-zoom-hint{font-size:11px;} }
    @media (prefers-reduced-motion:reduce) { .sinus-lamina-zoom-backdrop * {transition:none!important;} }
  `;

  function ensureStyles() {
    if (document.getElementById('sinus-laminario-zoom-styles')) return;
    const s = document.createElement('style');
    s.id = 'sinus-laminario-zoom-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }
  function icon(symbol) { return symbol; }
  function control(label, symbol, click, title = label) {
    const el = document.createElement('button');
    el.type = 'button'; el.className = 'sinus-lamina-zoom-control';
    el.setAttribute('aria-label', label); el.title = title; el.textContent = icon(symbol);
    el.addEventListener('click', click);
    return el;
  }
  function getFitSize() {
    if (!zoomedImage || !modal) return {w:0,h:0, vw:0, vh:0};
    const vp = modal.querySelector('.sinus-lamina-zoom-viewport');
    const vw=vp.clientWidth, vh=vp.clientHeight;
    const nw=zoomedImage.naturalWidth || zoomedImage.width || 1;
    const nh=zoomedImage.naturalHeight || zoomedImage.height || 1;
    const ratio = Math.min(1, vw/nw, vh/nh);
    return {w:nw*ratio,h:nh*ratio,vw,vh};
  }
  function update() {
    if (!modal || !zoomedImage) return;
    const {w,h,vw,vh} = getFitSize();
    const limitX = Math.max(0,(w*scale-vw)/2);
    const limitY = Math.max(0,(h*scale-vh)/2);
    panX = Math.max(-limitX,Math.min(limitX,panX));
    panY = Math.max(-limitY,Math.min(limitY,panY));
    zoomedImage.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${scale})`;
    const pct = modal.querySelector('.sinus-lamina-zoom-percent');
    pct.textContent = `${Math.round(scale*100)}%`;
    modal.querySelector('[data-action="minus"]').disabled = scale <= MIN_SCALE;
    modal.querySelector('[data-action="plus"]').disabled = scale >= MAX_SCALE;
  }
  function zoomTo(nextScale, x, y) {
    if (!modal) return;
    const viewport=modal.querySelector('.sinus-lamina-zoom-viewport');
    const rect=viewport.getBoundingClientRect();
    const dx=(x ?? (rect.left+rect.width/2))-(rect.left+rect.width/2);
    const dy=(y ?? (rect.top+rect.height/2))-(rect.top+rect.height/2);
    const limited=Math.min(MAX_SCALE,Math.max(MIN_SCALE,nextScale));
    const factor=limited/scale;
    panX=dx-(dx-panX)*factor;
    panY=dy-(dy-panY)*factor;
    scale=limited;
    if (scale===MIN_SCALE) {panX=0;panY=0;}
    update();
  }
  function reset() {scale=MIN_SCALE;panX=panY=0;update();}
  function pointerDistance(a,b) { return Math.hypot(a.x-b.x,a.y-b.y); }
  function pointerMidpoint(a,b) { return {x:(a.x+b.x)/2,y:(a.y+b.y)/2}; }

  function close() {
    if (!modal) return;
    modal.remove(); modal=null; zoomedImage=null; imgSource=null; pointers.clear(); previousPinch=null;
    document.body.style.overflow=originalBodyOverflow;
    document.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('resize', update);
    if (lastFocused && lastFocused.isConnected) lastFocused.focus({preventScroll:true});
  }
  function onKeyDown(e) {
    if (!modal) return;
    if (e.key==='Escape') {e.preventDefault();close();return;}
    if (e.key==='+' || e.key==='=') {e.preventDefault();zoomTo(scale+.25);}
    if (e.key==='-' || e.key==='_') {e.preventDefault();zoomTo(scale-.25);}
    if (e.key==='0') {e.preventDefault();reset();}
    if (e.key==='ArrowLeft') {e.preventDefault();panX-=60;update();}
    if (e.key==='ArrowRight') {e.preventDefault();panX+=60;update();}
    if (e.key==='ArrowUp') {e.preventDefault();panY-=60;update();}
    if (e.key==='ArrowDown') {e.preventDefault();panY+=60;update();}
    if (e.key==='Tab') {
      const buttons = [...modal.querySelectorAll('button:not(:disabled)')];
      if (!buttons.length) return;
      const ix = buttons.indexOf(document.activeElement);
      if (e.shiftKey && ix <= 0) {e.preventDefault();buttons.at(-1).focus();}
      else if (!e.shiftKey && ix===buttons.length-1) {e.preventDefault();buttons[0].focus();}
    }
  }
  function open(source) {
    if (!(source instanceof HTMLImageElement)) return;
    if (modal) close();
    ensureStyles();
    lastFocused=document.activeElement;
    originalBodyOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    scale=1;panX=0;panY=0;
    imgSource=source;

    modal=document.createElement('div');
    modal.className='sinus-lamina-zoom-backdrop';
    modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Ampliar lâmina do SINUS');
    modal.innerHTML=`<div class="sinus-lamina-zoom-toolbar">
       <div style="min-width:0;flex:1"><div class="sinus-lamina-zoom-title"></div>
         <div class="sinus-lamina-zoom-caption">Laminário SINUS · Imagem sem distorção</div></div>
       <div class="sinus-lamina-zoom-controls"><span class="sinus-lamina-zoom-percent" aria-live="polite">100%</span></div>
      </div><div class="sinus-lamina-zoom-viewport" aria-label="Imagem ampliada"></div>
      <div class="sinus-lamina-zoom-hint">Arraste para mover · Dois dedos ou rolagem para ampliar · Esc para fechar</div>`;
    modal.querySelector('.sinus-lamina-zoom-title').textContent=source.alt || 'Lâmina do SINUS';
    const toolbar=modal.querySelector('.sinus-lamina-zoom-controls');
    const minus=control('Reduzir zoom','−',()=>zoomTo(scale-.25)); minus.dataset.action='minus';
    const plus=control('Ampliar zoom','+',()=>zoomTo(scale+.25)); plus.dataset.action='plus';
    const resetButton=control('Restaurar zoom','↺',reset);
    const closeButton=control('Fechar imagem ampliada','×',close);
    closeButton.className='sinus-lamina-zoom-close';
    toolbar.prepend(minus); toolbar.append(plus,resetButton,closeButton);
    const viewport=modal.querySelector('.sinus-lamina-zoom-viewport');
    zoomedImage=document.createElement('img');
    zoomedImage.className='sinus-lamina-zoom-image';
    zoomedImage.alt=source.alt || 'Lâmina';
    zoomedImage.decoding='async';
    // Recupera a mesma fonte original, preferindo a versão em resolução maior quando disponível.
    zoomedImage.src=source.dataset.zoomSrc || source.currentSrc || source.src;
    zoomedImage.addEventListener('load',update,{once:true});
    viewport.appendChild(zoomedImage);
    viewport.addEventListener('pointerdown',(e)=>{
      if (e.pointerType==='mouse' && e.button!==0) return;
      e.preventDefault(); viewport.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===2) {const [a,b]=[...pointers.values()];previousPinch={distance:pointerDistance(a,b),mid:pointerMidpoint(a,b)};}
      viewport.classList.add('is-dragging');
    });
    viewport.addEventListener('pointermove',(e)=>{
      if (!pointers.has(e.pointerId)) return;
      e.preventDefault();
      const old=pointers.get(e.pointerId);
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===1 && scale>1) {panX+=e.clientX-old.x;panY+=e.clientY-old.y;update();}
      else if(pointers.size===2) {
        const [a,b]=[...pointers.values()];
        const distance=pointerDistance(a,b),mid=pointerMidpoint(a,b);
        if(previousPinch?.distance>0) {
          zoomTo(scale*(distance/previousPinch.distance),mid.x,mid.y);
          panX+=mid.x-previousPinch.mid.x;
          panY+=mid.y-previousPinch.mid.y;
          update();
        }
        previousPinch={distance,mid};
      }
    });
    function endPointer(e){pointers.delete(e.pointerId);if(pointers.size<2) previousPinch=null;if(!pointers.size) viewport.classList.remove('is-dragging');}
    viewport.addEventListener('pointerup',(e)=>{
      if(pointers.has(e.pointerId) && pointers.size===1) {
        const old=pointers.get(e.pointerId);
        if(Math.hypot(old.x-e.clientX,old.y-e.clientY)<8) {
          const now=Date.now();if(now-lastTap<320)zoomTo(scale<2?2:1,e.clientX,e.clientY);lastTap=now;
        }
      }
      endPointer(e);
    });
    viewport.addEventListener('pointercancel',endPointer);
    viewport.addEventListener('wheel',(e)=>{e.preventDefault();zoomTo(scale*(e.deltaY>0?.9:1.1),e.clientX,e.clientY);},{passive:false});
    // Fecha ao tocar no fundo, mas nunca ao tocar ou arrastar a imagem.
    document.body.appendChild(modal);
    document.addEventListener('keydown',onKeyDown,true);
    window.addEventListener('resize',update);
    closeButton.focus({preventScroll:true});
    update();
  }

  // Compatibilidade com o Laminário em páginas React que ainda não têm
  // um atributo data-laminario-zoom: só detecta imagens grandes no contexto
  // de questões anatomo-patológicas ou numa rota explicitamente do laminário.
  function eligibleImage(img) {
    if (!(img instanceof HTMLImageElement)) return false;
    if (img.matches(IMAGE_SELECTOR)) return true;
    // Não intercepta ícones, avatares, imagens clicáveis de links ou botões.
    if (img.closest('a,button,[role="button"],nav,header,footer')) return false;
    const rect = img.getBoundingClientRect();
    if (rect.width < 110 || rect.height < 85) return false;
    const context = `${location.pathname} ${location.hash} ${location.search}`.toLowerCase();
    if (/lamin[aá]rio|l[aá]minas?[-_]?p[12]/i.test(context)) return true;
    let parent = img.parentElement;
    // Procura contexto específico da ficha, sem analisar a página inteira.
    for (let level = 0; parent && level < 5; level++, parent = parent.parentElement) {
      if (parent.matches('main,body,#root')) break;
      const txt = (parent.textContent || '').slice(0, 5000).toLowerCase();
      const keywords = [/(?:órg[aã]o|organo)/, /(?:processo|proceso)/,
        /(?:alterações|alteraciones|descri[cç][aã]o|descripci[oó]n)/,
        /(?:diagn[oó]stico|diagn[oó]stic[oa]|\bdx\b)/];
      if (keywords.filter(re => re.test(txt)).length >= 3) return true;
    }
    return false;
  }
  // Delegação funciona também em páginas React renderizadas após a navegação.
  document.addEventListener('click',(e)=>{
    const opener=e.target.closest?.('[data-laminario-zoom-open]');
    let img=null;
    if(opener) {
      const selector=opener.getAttribute('data-laminario-zoom-open');
      img=(selector && selector!=='true') ? document.querySelector(selector) : opener.parentElement?.querySelector('img');
    } else if(e.target instanceof HTMLImageElement && eligibleImage(e.target)) img=e.target;
    if (!img || !eligibleImage(img)) return;
    e.preventDefault();e.stopPropagation();
    open(img);
  },true);
  window.SINUSLaminarioZoom={initialized:true,open,close};
  ensureStyles();
})();
