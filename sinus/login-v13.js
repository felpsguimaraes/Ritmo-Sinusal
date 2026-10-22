/* SINUS V13: interações apenas da página de entrada. Sem alterar autenticação. */
(function(){
  'use strict';
  var root=document.getElementById('landing');
  if(!root || !root.classList.contains('sxEditorialLogin')) return;
  var trigger=document.getElementById('sxLoginMenuToggle');
  var close=document.getElementById('sxLoginMenuClose');
  var layer=document.getElementById('sxLoginMenuLayer');
  function toggle(open){
    if(!trigger || !layer) return;
    layer.classList.toggle('open',!!open);
    layer.setAttribute('aria-hidden',String(!open));
    trigger.setAttribute('aria-expanded',String(!!open));
    if(open && close) close.focus();
    else if(!open) trigger.focus();
  }
  if(trigger) trigger.addEventListener('click',function(){toggle(true)});
  if(close) close.addEventListener('click',function(){toggle(false)});
  if(layer) layer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  document.addEventListener('keydown',function(ev){if(ev.key==='Escape' && layer && layer.classList.contains('open'))toggle(false)});
  var content={
    pt:['Seu espaço começa aqui.','Entre com sua conta Google para continuar seus estudos de onde parou.','ENTRAR COM GOOGLE'],
    es:['Tu espacio comienza aquí.','Ingresa con tu cuenta Google y continúa donde lo dejaste.','ENTRAR CON GOOGLE'],
    en:['Your space starts here.','Sign in with Google to continue studying where you left off.','SIGN IN WITH GOOGLE']
  };
  function translate(lang){
    if(!content[lang]) return;
    var h=document.getElementById('sxLoginTitle');
    var p=root.querySelector('.sxLoginPanel > p');
    var b=root.querySelector('.sxGoogleStart > span:last-child');
    if(h) h.textContent=content[lang][0];
    if(p) p.textContent=content[lang][1];
    if(b) b.textContent=content[lang][2];
  }
  try{translate(localStorage.getItem('sinus_idioma')||'pt')}catch(e){}
  root.addEventListener('click',function(ev){
    var b=ev.target.closest('[data-sx-lang]');
    if(b)translate(b.getAttribute('data-sx-lang'));
  });
})();
