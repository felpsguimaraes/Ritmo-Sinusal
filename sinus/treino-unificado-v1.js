/* SINUS: treino unificado em Exercícios, Flashcards e Mapas mentais. Sem seleção de tipos pelo aluno. */
(function unifiedTraining(){
  'use strict';
  var W=window,D=document;
  var originalRender=W.renderSubject,originalSetTab=W.setTab;
  var host=function(){return D.getElementById('subjectContent')};
  var safe=function(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  function pane(){return ['exercises','flashcards','mindmaps'].indexOf(UI.trainingPane)>=0?UI.trainingPane:'exercises'}
  function nav(){
    if(UI.tab!=='training')return;
    var root=host();if(!root)return;
    root.querySelectorAll('.sxExerciseChoices').forEach(function(el){el.remove()});
    if(root.querySelector('.sxUnifiedTrainNav'))return;
    var active=pane(),items=[['exercises','Exercícios'],['flashcards','Flashcards'],['mindmaps','Mapas mentais']];
    var links=items.map(function(item){return '<button type="button" data-sx-training-pane="'+item[0]+'" class="'+(active===item[0]?'active':'')+'" '+(active===item[0]?'aria-current="page"':'')+'>'+item[1]+'</button>'}).join('');
    root.insertAdjacentHTML('afterbegin','<nav class="sxUnifiedTrainNav" aria-label="Modalidades do treino">'+links+'</nav>');
  }
  function mindmaps(){
    var root=host(),subject=(DB.subjects||{})[UI.subject]||{},qbank=((DB.training||{}).questions||[]);
    if(!root)return;
    var groups={P1:[],P2:[],Final:[],Geral:[]},seen=new Set();
    function add(item){
      var tag=String(item.period||'Geral'),id=/^P1$/i.test(tag)?'P1':/^P2$/i.test(tag)?'P2':/^Final$/i.test(tag)?'Final':'Geral';
      var key=id+'|'+item.kind+'|'+String(item.title||'').trim().toLocaleLowerCase();
      if(!item.title||seen.has(key))return;
      seen.add(key);groups[id].push(item);
    }
    ['slides','complementares','pratica','provas'].forEach(function(kind){
      (subject[kind]||[]).forEach(function(file){
        if(file&&file.active!==false)add({kind:'file',title:file.title,period:file.period,category:kind});
      });
    });
    qbank.forEach(function(q){
      if(q&&q.active!==false&&q.subject===UI.subject&&q.type!=='flashcard'&&q.answer){
        add({kind:'concept',title:q.answer,period:q.period,question:q.prompt,explanation:q.explanation});
      }
    });
    var total=Object.keys(groups).reduce(function(n,k){return n+groups[k].length},0);
    if(!total){
      root.innerHTML='<section class="glass sxUnifiedIntro"><span class="eyebrow">Mapas mentais</span><h2>Em preparação nesta matéria</h2><p>Ainda não há tópicos cadastrados suficientes para organizar um mapa. As outras modalidades continuam disponíveis.</p></section>';
      return;
    }
    var labels={P1:'Fundamentos',P2:'Desenvolvimento',Final:'Consolidação',Geral:'Outros tópicos'};
    var branches=Object.keys(groups).filter(function(k){return groups[k].length}).map(function(k){
      var a=groups[k],visible=a.slice(0,10),nodes=visible.map(function(item){
        if(item.kind==='concept'){
          return '<details class="sxMindItem sxMindItemConcept"><summary><small>Conceito</small><strong>'+safe(item.title)+'</strong></summary>'+
          (item.question?'<p>'+safe(item.question)+'</p>':'')+
          (item.explanation?'<p>'+safe(item.explanation)+'</p>':'')+'</details>';
        }
        return '<div class="sxMindItem"><small>Material</small><strong>'+safe(item.title)+'</strong></div>';
      }).join('');
      return '<section class="sxMindBranch"><header><span class="sxMindBranchId">'+safe(k)+'</span><div><h3>'+safe(labels[k])+'</h3><small>'+a.length+' tópico(s)</small></div></header>'+
       '<div class="sxMindItems">'+nodes+(a.length>visible.length?'<p class="sxMindMore">+ '+(a.length-visible.length)+' tópicos presentes no acervo da matéria</p>':'')+'</div></section>';
    }).join('');
    root.innerHTML='<div class="sxMindPanel"><div class="sxMindLead"><span class="eyebrow">Mapas mentais</span><h2>Conceitos em perspectiva.</h2>'+
      '<p>Mapa visual organizado a partir dos títulos dos materiais e das respostas já cadastradas. Abra um conceito para explorar seus detalhes.</p></div>'+
      '<div class="sxMindCenter"><small>DISCIPLINA</small><strong>'+safe(UI.subject)+'</strong><span>'+total+' tópicos</span></div>'+
      '<div class="sxMindBranches">'+branches+'</div></div>';
  }
  function selectPane(next){
    if(['exercises','flashcards','mindmaps'].indexOf(next)<0)return;
    UI.trainingPane=next;
    UI.tab='training';
    W.renderSubject();
  }
  W.setTab=function(tab){
    if(tab==='review'){UI.trainingPane='exercises';tab='training'}
    else if(tab==='cartoes'){UI.trainingPane='flashcards';tab='training'}
    else if(tab==='mapas'){UI.trainingPane='mindmaps';tab='training'}
    else if(tab==='training'&&UI.tab!=='training')UI.trainingPane='exercises';
    return originalSetTab(tab);
  };
  function laminaExercicio(){
    if(UI.mode!=='practice')return false;
    var s=(typeof DB!=='undefined'&&DB.subjects)?DB.subjects[UI.subject]:null;
    if(s&&s.slug==='anatopato')return true;
    var n=String(UI.subject||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return /anatom/.test(n)&&/patolog/.test(n);
  }
  W.renderSubject=function(){
    if(!UI.subject)return;
    if(['review','cartoes','mapas'].indexOf(UI.tab)>=0){
      UI.trainingPane=UI.tab==='cartoes'?'flashcards':UI.tab==='mapas'?'mindmaps':'exercises';
      UI.tab='training';
    }
    var selected=UI.tab,mode=pane();
    var exLam=selected==='training'&&mode==='exercises'&&laminaExercicio();
    W.SINUS_EXERCICIO_LAMINA=!!exLam;
    if(selected==='training'&&(mode==='flashcards'||exLam)){
      UI.tab='cartoes';
      try{originalRender()}finally{UI.tab='training'}
    }else{
      originalRender();
      if(selected==='training'&&mode==='mindmaps')mindmaps();
    }
    var tabrow=D.getElementById('subjectTabs');
    if(tabrow){
      var primary=selected==='training'?'training':selected==='provas'?'provas':selected==='slides'?'slides':(selected==='videos'||selected==='audios')?'videos':'apostila';
      tabrow.innerHTML=[['apostila','Resumo / Apostila'],['slides','Slides'],['videos','Vídeos / Áudios'],['provas','Provas'],['training','Treino']].map(function(item){
        return '<button type="button" class="'+(primary===item[0]?'active':'')+'" data-sx-top-tab="'+item[0]+'">'+item[1]+'</button>';
      }).join('');
    }
    if(selected==='training')nav();
  };
  D.addEventListener('click',function(e){
    var tab=e.target.closest('[data-sx-training-pane]');
    if(tab){e.preventDefault();selectPane(tab.getAttribute('data-sx-training-pane'));return;}
    var top=e.target.closest('[data-sx-top-tab]');
    if(top){e.preventDefault();W.setTab(top.getAttribute('data-sx-top-tab'));}
  });
  var content=host();
  if(content&&typeof MutationObserver!=='undefined'){
    var observer=new MutationObserver(function(){if(UI.tab==='training')nav()});
    observer.observe(content,{childList:true});
  }
})();
