/* SINUS: junta o banco de exercícios (aulas/exercicios/banco.js) às questões do treino, sem duplicar por id. */
(function(){
  'use strict';
  function juntar(){
    try{
      var lista=window.SINUS_EXERCICIOS||[];
      if(!lista.length||typeof DB==='undefined'||!DB)return;
      DB.training=DB.training||{};DB.training.questions=DB.training.questions||[];
      var q=DB.training.questions,idx={};
      q.forEach(function(x,i){idx[x.id]=i});
      lista.forEach(function(x){
        if(!x||!x.id||x.active===false&&idx[x.id]===undefined)return;
        if(idx[x.id]===undefined){idx[x.id]=q.length;q.push(x)}else q[idx[x.id]]=x;
      });
    }catch(e){}
  }
  juntar();
  document.addEventListener('DOMContentLoaded',juntar);
  window.sxJuntarExercicios=juntar;
})();
