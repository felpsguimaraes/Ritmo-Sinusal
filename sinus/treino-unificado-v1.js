/* SINUS: treino unificado em Exercícios, Flashcards e Mapas mentais. Sem seleção de tipos pelo aluno. */
(function unifiedTraining(){
  'use strict';
  var W=window,D=document;
  var originalRender=W.renderSubject,originalSetTab=W.setTab;
  var host=function(){return D.getElementById('subjectContent')};
  var safe=function(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  function pane(){return ['exercises','flashcards','mindmaps'].indexOf(UI.trainingPane)>=0?UI.trainingPane:'mindmaps'}
  function nav(){
    if(UI.tab!=='training')return;
    var root=host();if(!root)return;
    root.querySelectorAll('.sxExerciseChoices').forEach(function(el){el.remove()});
    if(root.querySelector('.sxUnifiedTrainNav'))return;
    var active=pane(),items=[['mindmaps','Mapa mental'],['exercises','Treino misto'],['flashcards','Flashcards']];
    var links=items.map(function(item){return '<button type="button" data-sx-training-pane="'+item[0]+'" class="'+(active===item[0]?'active':'')+'" '+(active===item[0]?'aria-current="page"':'')+'>'+item[1]+'</button>'}).join('');
    root.insertAdjacentHTML('afterbegin','<nav class="sxUnifiedTrainNav" aria-label="Modalidades do treino">'+links+'</nav>');
  }
  var sxMapNodes=[];
  function mindmaps(){
    var root=host();
    if(!root)return;
    var subject=(typeof W.subjectData==='function'?W.subjectData():(DB.subjects||{})[UI.subject])||{};
    var slug=String(subject.slug||'');
    var grouped=new Map(),seen=new Set();
    function add(topic,prompt,answer,explanation,source){
      topic=String(topic||'Conceitos essenciais').trim();
      prompt=String(prompt||'').trim();
      answer=String(answer||'').trim();
      if(!prompt||!answer)return;
      var unique=(topic+'|'+prompt).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
      if(seen.has(unique))return;
      seen.add(unique);
      if(!grouped.has(topic))grouped.set(topic,[]);
      grouped.get(topic).push({topic:topic,prompt:prompt,answer:answer,explanation:String(explanation||''),source:source});
    }
    if(slug){
      var allDecks=W.SINUS_CARTOES||{};
      Object.keys(allDecks).filter(function(k){return k.indexOf(slug+'/')===0}).forEach(function(key){
        var deck=allDecks[key]||{};
        (deck.cartoes||[]).forEach(function(card){
          add(card.t||'Conceitos essenciais',card.q,card.a,card.x,'Flashcards');
        });
      });
    }
    ((DB.training||{}).questions||[]).forEach(function(q){
      if(q&&q.active!==false&&q.subject===UI.subject&&q.type!=='flashcard'){
        add(q.topic||q.period||'Questões da disciplina',q.prompt,q.answer,q.explanation,'Banco de questões');
      }
    });
    var topics=Array.from(grouped.entries()).map(function(entry){
      return {title:entry[0],nodes:entry[1]};
    });
    var total=topics.reduce(function(n,t){return n+t.nodes.length},0);
    if(!total){
      root.innerHTML='<section class="glass sxUnifiedIntro"><span class="eyebrow">Mapa mental</span><h2>Mapa em preparação nesta matéria</h2><p>Precisamos de conceitos e respostas revisados para construir um mapa útil. Não vamos transformar nomes de arquivos em relações clínicas sem verificar o conteúdo.</p><button class="btn primary" data-sx-training-pane="exercises">Ir para os exercícios</button></section>';
      return;
    }
    var pageSize=4,pageCount=Math.ceil(topics.length/pageSize);
    var page=Math.max(0,Math.min(pageCount-1,Number(UI.sxMindPage)||0));
    UI.sxMindPage=page;
    sxMapNodes=[];
    var shades=['mint','blue','rose','amber'];
    var parts=topics.slice(page*pageSize,(page+1)*pageSize).map(function(topic,t){
      var nodes=topic.nodes.slice(0,7).map(function(item){
        var id=sxMapNodes.push(item)-1;
        return '<button type="button" class="sxMindNode" data-sx-mind-node="'+id+'"><span>'+safe(item.prompt)+'</span><span aria-hidden="true">›</span></button>';
      }).join('');
      return '<section class="sxMindCluster" data-tone="'+shades[t%shades.length]+'"><div class="sxMindClusterHeader"><span class="sxMindClusterNumber">'+String(page*pageSize+t+1).padStart(2,'0')+'</span><div><h3>'+safe(topic.title)+'</h3><small>'+topic.nodes.length+' conceito(s) · '+safe(topic.nodes[0].source)+'</small></div></div><div class="sxMindClusterNodes">'+nodes+(topic.nodes.length>7?'<span class="sxMindOverflow">+'+(topic.nodes.length-7)+' conceitos adicionais neste tema</span>':'')+'</div></section>';
    }).join('');
    var mapLink=slug==='anatopato'?'<a class="sxGuidedLink" href="/aulas/mapas/?s=anatopato">Abrir Mapas Guiados ↗</a>':/^farmaco/.test(slug)?'<a class="sxGuidedLink" href="/aulas/mapas/?s=farmacologia">Abrir Mapas Guiados ↗</a>':'';
    root.innerHTML='<section class="sxMindView"><div class="sxMindHeadline"><div><span class="eyebrow">Exercícios · Mapa mental</span><h2>Comece entendendo as conexões.</h2><p>Selecione um conceito para explorar pergunta, resposta e explicação. Depois avance para o treino.</p></div><div class="sxMindCount">'+total+' conceitos · '+topics.length+' temas</div></div>'+
      '<div class="sxMindLayout"><div class="sxMindCanvas"><div class="sxMindRoot"><small>DISCIPLINA</small><strong>'+safe(UI.subject)+'</strong><span>Mapa de estudo</span></div><div class="sxMindClusters">'+parts+'</div>'+
      (pageCount>1?'<nav class="sxMindPagination" aria-label="Páginas do mapa"><button type="button" data-sx-map-page="-1" '+(page===0?'disabled':'')+'>← Anteriores</button><span>Página '+(page+1)+' de '+pageCount+'</span><button type="button" data-sx-map-page="1" '+(page===pageCount-1?'disabled':'')+'>Próximos →</button></nav>':'')+
      '</div><aside class="sxMindAside"><span class="eyebrow">Conceito selecionado</span><div id="sxMindDetails" aria-live="polite"></div><div class="sxMindAsideFooter">'+mapLink+'<button type="button" class="btn primary" data-sx-training-pane="exercises">Praticar exercícios →</button></div></aside></div>'+
      '<p class="sxMindSourceNote">Mapa gerado a partir dos flashcards e questões desta disciplina. As relações seguem os tópicos cadastrados; a validação do conteúdo clínico é independente.</p></section>';
    if(sxMapNodes.length)showMindNode(0);
  }
  function showMindNode(index){
    var node=sxMapNodes[index],root=host();
    if(!node||!root)return;
    root.querySelectorAll('[data-sx-mind-node]').forEach(function(button){
      var selected=Number(button.getAttribute('data-sx-mind-node'))===index;
      button.classList.toggle('active',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
    var panel=root.querySelector('#sxMindDetails');
    if(panel)panel.innerHTML='<h3>'+safe(node.prompt)+'</h3><div class="sxMindAnswer"><small>RESPOSTA</small><p>'+safe(node.answer)+'</p></div>'+
      (node.explanation?'<div class="sxMindWhy"><small>ENTENDA</small><p>'+safe(node.explanation)+'</p></div>':'')+
      '<span class="sxMindProvenance">Origem: '+safe(node.source)+'</span>';
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
    else if(tab==='training'&&UI.tab!=='training'){UI.trainingPane='mindmaps';UI.sxMindPage=0;}
    return originalSetTab(tab);
  };
  W.renderSubject=function(){
    if(!UI.subject)return;
    if(['review','cartoes','mapas'].indexOf(UI.tab)>=0){
      UI.trainingPane=UI.tab==='cartoes'?'flashcards':UI.tab==='mapas'?'mindmaps':'exercises';
      UI.tab='training';
    }
    var selected=UI.tab,mode=pane();
    if(selected==='training'&&mode==='flashcards'){
      UI.tab='cartoes';
      try{originalRender()}finally{UI.tab='training'}
    }else{
      originalRender();
      if(selected==='training'&&mode==='mindmaps')mindmaps();
    }
    var tabrow=D.getElementById('subjectTabs');
    if(tabrow){
      var primary=selected==='training'?'training':selected==='slides'?'slides':(selected==='videos'||selected==='audios')?'videos':'apostila';
      tabrow.innerHTML=[['apostila','Resumo / Apostila'],['slides','Slides'],['videos','Vídeos / Áudios'],['training','Exercícios']].map(function(item){
        return '<button type="button" class="'+(primary===item[0]?'active':'')+'" data-sx-top-tab="'+item[0]+'">'+item[1]+'</button>';
      }).join('');
    }
    if(selected==='training')nav();
    // As provas continuam acessíveis dentro de Resumo/Apostila, sem criar uma quinta aba.
    if(selected==='apostila'){
      var area=host(),extras=area&&area.querySelector('.sxStudyExtras .sxExerciseChoices');
      if(extras&&!extras.querySelector('[data-sx-top-tab="provas"]')){
        extras.insertAdjacentHTML('beforeend','<button type="button" class="btn sm" data-sx-top-tab="provas">Provas anteriores</button>');
      }else if(area&&!extras&&!area.querySelector('.sxProvasShortcut')){
        area.insertAdjacentHTML('beforeend','<button type="button" class="btn sm sxProvasShortcut" data-sx-top-tab="provas">Ver provas anteriores</button>');
      }
    }
  };
  D.addEventListener('click',function(e){
    var tab=e.target.closest('[data-sx-training-pane]');
    if(tab){e.preventDefault();selectPane(tab.getAttribute('data-sx-training-pane'));return;}
    var node=e.target.closest('[data-sx-mind-node]');
    if(node){e.preventDefault();showMindNode(Number(node.getAttribute('data-sx-mind-node')));return;}
    var move=e.target.closest('[data-sx-map-page]');
    if(move){e.preventDefault();UI.sxMindPage=(Number(UI.sxMindPage)||0)+Number(move.getAttribute('data-sx-map-page'));mindmaps();nav();return;}
    var top=e.target.closest('[data-sx-top-tab]');
    if(top){e.preventDefault();W.setTab(top.getAttribute('data-sx-top-tab'));}
  });
  var content=host();
  if(content&&typeof MutationObserver!=='undefined'){
    var observer=new MutationObserver(function(){if(UI.tab==='training')nav()});
    observer.observe(content,{childList:true});
  }
})();
