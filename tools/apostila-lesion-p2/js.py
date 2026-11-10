JS = r'''
(function(){
  function stpGo(st,i){
    var bs=st.querySelectorAll('.stp-bar button');
    for(var k=0;k<bs.length;k++)bs[k].setAttribute('aria-pressed',k===i?'true':'false');
    st.classList.toggle('foco',i>0);
    var gs=st.querySelectorAll('.sg');
    for(var j=0;j<gs.length;j++)gs[j].classList.toggle('on',i>0&&gs[j].classList.contains('s'+i));
    var b=bs[i],ch=(b.getAttribute('data-chips')||'').split('|').filter(Boolean);
    var info=st.querySelector('.stp-info');
    info.innerHTML=b.getAttribute('data-tip');
    if(ch.length){var d=document.createElement('div');ch.forEach(function(c){var s=document.createElement('span');s.className='chip';s.textContent=c;d.appendChild(s)});info.appendChild(d)}
    var bar=st.querySelector('.stp-bar');bar.scrollLeft=Math.max(0,b.offsetLeft-bar.clientWidth/2+b.offsetWidth/2);
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.g3c');
    if(b){var gl=b.closest('[data-g3d]'),cs=gl.querySelectorAll('.g3c');
      for(var k=0;k<cs.length;k++)cs[k].setAttribute('aria-pressed',cs[k]===b?'true':'false');
      gl.querySelector('.g3d-info').innerHTML=b.getAttribute('data-tip');return}
    var s=e.target.closest&&e.target.closest('.stp-bar button,.stp-nav button');
    if(s){var st=s.closest('[data-stp]'),bs=[].slice.call(st.querySelectorAll('.stp-bar button'));
      var cur=0;bs.forEach(function(x,k){if(x.getAttribute('aria-pressed')==='true')cur=k});
      var i=s.hasAttribute('data-d')?Math.max(0,Math.min(bs.length-1,cur+(+s.getAttribute('data-d')))):+s.getAttribute('data-s');
      stpGo(st,i)}
  });
})();
'''
JS += r'''
(function(){
  var K='apos-p2-aud';
  function ler(){try{var v=JSON.parse(localStorage.getItem(K));return v&&typeof v==='object'?v:{}}catch(e){return{}}}
  function gravar(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
  var st=ler();st.pos=st.pos||{};st.vel=st.vel||1;
  function hms(s){var m=Math.round(s/60);return m>=60?Math.floor(m/60)+' h '+(m%60)+' min':m+' min'}
  var its=[].slice.call(document.querySelectorAll('.aud-it'));
  function marcaVel(){its.forEach(function(c){[].forEach.call(c.querySelectorAll('[data-v]'),function(b){b.setAttribute('aria-pressed',String(+b.getAttribute('data-v')===st.vel))})})}
  marcaVel();
  its.forEach(function(c){
    var au=c.querySelector('audio'),arq=c.getAttribute('data-arq'),onde=c.querySelector('.onde'),salvo=0,alvo=null;
    function mostra(){var s=st.pos[arq];onde.textContent=s>30?' · parou em '+hms(s):''}
    mostra();
    function ir(t){alvo=t;if(au.readyState>=1){au.currentTime=t;alvo=null}else{au.preload='metadata';au.load()}}
    au.addEventListener('loadedmetadata',function(){
      if(alvo!=null){au.currentTime=alvo;alvo=null;return}
      var s=st.pos[arq];if(s>10&&au.currentTime<1&&(!au.duration||s<au.duration-5))au.currentTime=s});
    au.addEventListener('play',function(){au.playbackRate=st.vel;
      document.querySelectorAll('audio').forEach(function(o){if(o!==au&&!o.paused)o.pause()})});
    au.addEventListener('timeupdate',function(){if(Math.abs(au.currentTime-salvo)<5)return;salvo=au.currentTime;st.pos[arq]=Math.floor(salvo);gravar();mostra()});
    au.addEventListener('pause',function(){if(au.currentTime>0){st.pos[arq]=Math.floor(au.currentTime);gravar();mostra()}});
    au.addEventListener('ended',function(){delete st.pos[arq];gravar();mostra()});
    c.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.hasAttribute('data-j')){var t=Math.max(0,(au.currentTime||st.pos[arq]||0)+(+b.getAttribute('data-j')));if(au.duration)t=Math.min(t,au.duration-1);ir(t);if(au.paused){st.pos[arq]=Math.floor(t);gravar();mostra()}}
      else if(b.hasAttribute('data-v')){st.vel=+b.getAttribute('data-v');gravar();marcaVel();document.querySelectorAll('.aud-it audio').forEach(function(o){o.playbackRate=st.vel})}
      else if(b.hasAttribute('data-at')){ir(+b.getAttribute('data-at'));var p=au.play();if(p&&p.catch)p.catch(function(){})}
    });
  });
})();
'''

JS += r'''
(function(){
  var abertos=[];
  function antes(){abertos=[].slice.call(document.querySelectorAll('details:not([open])'));abertos.forEach(function(d){d.open=true});
    document.querySelectorAll('img[loading=lazy]').forEach(function(i){i.loading='eager'})}
  function depois(){abertos.forEach(function(d){d.open=false});abertos=[]}
  window.addEventListener('beforeprint',antes);window.addEventListener('afterprint',depois);
  window.__abrirTudo=antes;
})();
'''
