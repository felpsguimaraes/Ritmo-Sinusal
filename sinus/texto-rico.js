/* SINUS: texto de comentários e explicações com ênfase. **negrito**, ==grifo==, linhas em branco = parágrafos. */
(function(){
  'use strict';
  function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  window.sxRico=function(t){
    var h=esc(t).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/==([^=]+)==/g,'<mark class="sxGrifo">$1</mark>');
    return h.split(/\n{2,}/).map(function(p){return '<p>'+p.replace(/\n/g,'<br>')+'</p>'}).join('');
  };
  /* bloco "por que errei": só aparece quando o item traz o campo */
  window.sxPorqueErrei=function(t){return t?'<aside class="sxPorque"><h4>Por que se erra</h4>'+window.sxRico(t)+'</aside>':''};
})();
