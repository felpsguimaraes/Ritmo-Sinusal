/* SINUS: Treinar como app de treino — matéria → assunto → modo. Abre na tela "Treinar" do Início. */
(function treinoHub(){
  'use strict';
  var W=window,D=document;
  var ST={v:'home',name:'',tab:'',k:'',g:'',titulo:'',area:''};
  var KEY='sinus_treino_ultimo';
  function H(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function DK(){return W.SINUS_CARTOES||{}}
  function box(){return D.getElementById('page-hub')}
  function subj(){try{return subjectEntries()}catch(e){return []}}
  function sigla(n){return String(n).replace(/\b(I|II|III|IV|V)\b/g,'').split(/\s+/).filter(Boolean).map(function(x){return x[0]}).join('').slice(0,2).toUpperCase()}
  function keys(slug){return Object.keys(DK()).filter(function(k){return slug&&k.indexOf(slug+'/')===0}).sort(function(a,b){return (DK()[a].ordem||99)-(DK()[b].ordem||99)})}
  function parcial(k){var d=DK()[k],c=String(d.curto||'');if(/^P1$/i.test(c)||/\/p1/.test(k))return 'P1';if(/P2/i.test(c)||/\/p2/.test(k))return 'P2';return ''}
  function prog(k){try{return W.sxTreinoProg?W.sxTreinoProg(k):{}}catch(e){return {}}}
  function stat(k,g){
    var d=DK()[k],cs=g?d.cartoes.filter(function(c){return c.g===g}):d.cartoes,p=prog(k),dom=0,pend=0;
    cs.forEach(function(c){var x=p[c.id];if(x==='normal'||x==='facil')dom++;if(x==='errou'||x==='dificil')pend++});
    return {total:cs.length,dom:dom,pend:pend};
  }
  function temPratica(name){var s=(DB.subjects||{})[name]||{};return keys(s.slug).some(function(k){return DK()[k].area==='pratica'})||(s.pratica||[]).length>0}
  function qCount(name,area){var tr=((typeof DB!=="undefined"&&DB)||{}).training||{},q=tr.questions||[];return q.filter(function(x){return x&&x.active!==false&&x.subject===name&&x.type!=='flashcard'&&(!area||(x.mode==='practice'?'pratica':'teoria')===area)}).length}
  function resumo(name){
    var s=(DB.subjects||{})[name]||{},ks=keys(s.slug),t=0,d=0,p=0,n=0;
    ks.forEach(function(k){var x=stat(k);t+=x.total;d+=x.dom;p+=x.pend;var gs={};DK()[k].cartoes.forEach(function(c){gs[c.g||'']=1});n+=Object.keys(gs).length});
    return {ks:ks,total:t,dom:d,pend:p,assuntos:n,q:qCount(name)};
  }
  function assuntos(name,tab,area){
    var s=(DB.subjects||{})[name]||{},out=[];
    keys(s.slug).forEach(function(k){
      var d=DK()[k],pa=parcial(k);
      if(area&&(d.area||'teoria')!==area)return;
      if(tab&&tab!=='Todos'&&pa!==tab)return;
      var gs=[];d.cartoes.forEach(function(c){if(c.g&&gs.indexOf(c.g)<0)gs.push(c.g)});
      if(gs.length)gs.forEach(function(g){out.push({k:k,g:g,t:g.replace(/^\d+\s*·\s*/,''),area:d.area,st:stat(k,g)})});
      else out.push({k:k,g:'',t:d.nome||k,area:d.area,st:stat(k,'')});
    });
    return out;
  }
  function tabsDe(name,area){
    var s=(DB.subjects||{})[name]||{},ks=keys(s.slug).filter(function(k){return !area||(DK()[k].area||'teoria')===area}),has=ks.some(function(k){return parcial(k)});
    if(!has)return null;
    return ['P1','P2','Final','Todos'];
  }
  function tabInicial(name,area){
    var s=(DB.subjects||{})[name]||{},ks=keys(s.slug).filter(function(k){return !area||(DK()[k].area||'teoria')===area}),pad=ks.filter(function(k){return DK()[k].padrao})[0];
    return (pad&&parcial(pad))||'Todos';
  }
  function bar(p){return '<div class="thBar"><i style="width:'+Math.max(0,Math.min(100,p))+'%"></i></div>'}
  function nc(n){return n+(n===1?' cartão':' cartões')}
  function pct(x){return x.total?Math.round(100*x.dom/x.total):0}
  function nav2(){return ''}
  function ultimo(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
  function pendTotal(){
    var best=null,tot=0;
    subj().forEach(function(e){var name=e[0],s=e[1];keys(s.slug).forEach(function(k){var x=stat(k);tot+=x.pend;if(!best||x.pend>best.pend)best={name:name,k:k,pend:x.pend}})});
    return {tot:tot,best:best&&best.pend?best:null};
  }
  function estudados(){var n=0;subj().forEach(function(e){keys(e[1].slug).forEach(function(k){n+=Object.keys(prog(k)).length})});return n}

  function home(){
    var es=subj().map(function(e){return [e[0],resumo(e[0])]});
    es.sort(function(a,b){return (b[1].total+b[1].q>0)-(a[1].total+a[1].q>0)});
    var u=ultimo(),pt=pendTotal(),est=estudados(),h='';
    h+='<div class="thHead"><h1>Treinar</h1><p>Escolha uma matéria e comece.</p></div>';
    h+='<div class="thStats"><div><b>'+est+'</b><span>cartões estudados</span></div><div><b>'+pt.tot+'</b><span>para revisar</span></div><div><b>'+es.filter(function(x){return x[1].total}).length+'</b><span>matérias com treino</span></div></div>';
    if(u&&((DB||{}).subjects||{})[u.name]){
      var d=u.k&&DK()[u.k];
      h+='<button class="thCta" data-th="continuar"><i>▶</i><span><b>Continuar de onde parou</b><small>'+H(u.name)+(u.g?' · '+H(u.g):d?' · '+H(d.curto||d.nome):'')+'</small></span></button>';
    }
    if(pt.best)h+='<button class="thCta alt" data-th="pendentes"><i>↻</i><span><b>Revisar '+pt.tot+' pendente'+(pt.tot>1?'s':'')+'</b><small>Cartões que você errou ou achou difícil · começa por '+H(pt.best.name)+'</small></span></button>';
    h+='<div class="thSec">Matérias</div><div class="thList">';
    h+=es.map(function(x){var n=x[0],r=x[1],sub=r.total?r.assuntos+' assunto'+(r.assuntos>1?'s':'')+' · '+nc(r.total)+(r.pend?' · '+r.pend+' p/ revisar':''):r.q?r.q+' questões':'em breve';
      return '<button class="thRow'+(r.total||r.q?'':' vazio')+'" data-th-mat="'+H(n)+'"><span class="thIc">'+H(sigla(n))+'</span><span class="thT"><b>'+H(n)+'</b><small>'+H(sub)+'</small>'+(r.total?bar(pct(r)):'')+'</span><span class="thCh">›</span></button>'}).join('')||'<div class="emptyBox">Sem matérias cadastradas para este período.</div>';
    h+='</div>';
    return h;
  }
  function crumb(parts){return '<div class="thTop"><button class="thBack" data-th="voltar" aria-label="Voltar">‹</button><div class="thCrumb">'+parts+'</div></div>'}
  function escolhaArea(){
    var name=ST.name,a=function(area){return assuntos(name,'Todos',area).reduce(function(n,x){return n+x.st.total},0)};
    function sub(area){var n=a(area),q=qCount(name,area);return (n?nc(n):'')+(n&&q?' · ':'')+(q?q+' questões':'')||'em breve'}
    return crumb('Treinar › <b>'+H(name)+'</b>')+'<div class="thHead"><h1>'+H(name)+'</h1><p>O que você quer estudar?</p></div>'+
      '<div class="thGrid thArea"><button class="thMode" data-th-area="teoria"><i>📚</i><b>Teoria</b><small>'+H(sub('teoria'))+'</small></button>'+
      '<button class="thMode" data-th-area="pratica"><i>🔬</i><b>Prática</b><small>'+H(sub('pratica'))+'</small></button></div>';
  }
  function materia(){
    var name=ST.name;
    if(temPratica(name)&&!ST.area)return escolhaArea();
    var area=ST.area,tabs=tabsDe(name,area);
    if(tabs&&!ST.tab)ST.tab=tabInicial(name,area);
    var h=crumb('Treinar › '+H(name)+(area?' › <b>'+(area==='pratica'?'Prática':'Teoria')+'</b>':''))+'<div class="thHead"><h1>'+H(area==='pratica'?'Prática':area==='teoria'?'Teoria':name)+'</h1><p>'+H(name)+' · escolha o assunto.</p></div>';
    if(tabs)h+='<div class="thTabs">'+tabs.map(function(t){return '<button class="'+(ST.tab===t?'on':'')+'" data-th-tab="'+t+'">'+t+'</button>'}).join('')+'</div>';
    var as=tabs?assuntos(name,ST.tab,area):assuntos(name,'Todos',area);
    if(!as.length){
      var q=qCount(name,area);
      h+='<div class="thNote">'+(tabs&&ST.tab==='Final'?'O material do Final ainda não foi cadastrado. Em breve.':'Esta matéria ainda não tem cartões por assunto.')+'</div>';
      if(!tabs||ST.tab==='Final'||!q)h+=modos(null);
      return h;
    }
    if(as.length>1)h+='<button class="thRow thAll" data-th-all="1"><span class="thIc">★</span><span class="thT"><b>Misturar todos os assuntos</b><small>Fila com os erros primeiro</small></span><span class="thCh">›</span></button>';
    h+='<div class="thList">'+as.map(function(a,i){return '<button class="thRow" data-th-as="'+i+'"><span class="thIc">'+(i+1)+'</span><span class="thT"><b>'+H(a.t)+'</b><small>'+nc(a.st.total)+(a.st.pend?' · '+a.st.pend+' p/ revisar':'')+'</small>'+bar(pct(a.st))+'</span><span class="thCh">›</span></button>'}).join('')+'</div>';
    ST._as=as;
    return h;
  }
  function modos(a){
    var name=ST.name,d=ST.k&&DK()[ST.k],q=qCount(name,ST.area),slug=((DB.subjects||{})[name]||{}).slug,h='';
    if(d){
      var x=stat(ST.k,ST.g),prat=d.area==='pratica';
      h+='<button class="thMode full" data-th-modo="cartoes"><i>'+(prat?'🔬':'🗂')+'</i><span><b>'+(prat?'Laminário':'Flashcards')+'</b><small>'+x.total+' cartões'+(x.pend?' · '+x.pend+' para revisar':'')+'</small></span></button>';
      if(prat) h+='<button class="thMode full" data-th-modo="exercicios"><i>✏️</i><span><b>Exercícios</b><small>escreva antes de ver o gabarito</small></span></button>';
    }
    h+='<div class="thGrid">';
    h+='<button class="thMode" data-th-modo="exercises"><i>❓</i><b>Questões</b><small>'+(q?q+' disponíveis':'da matéria')+'</small></button>';
    h+='<button class="thMode" data-th-modo="mindmaps"><i>🧠</i><b>Mapas mentais</b><small>conceitos em perspectiva</small></button>';
    if(slug==='anatopato')h+='<button class="thMode" data-th-modo="guiados"><i>🗺</i><b>Mapas guiados</b><small>complete o esquema</small></button>';
    h+='<button class="thMode" data-th-modo="estudar"><i>📖</i><b>Estudar antes</b><small>slides e materiais</small></button>';
    h+='</div>';
    return h;
  }
  function modoTela(){
    var t=ST.titulo||ST.name;
    return crumb('Treinar › '+H(ST.name)+' › <b>'+H(t)+'</b>')+'<div class="thHead"><h1>'+H(t)+'</h1><p>Como você quer treinar agora?</p></div>'+modos();
  }
  function draw(){
    var b=box();if(!b)return;
    b.innerHTML='<div class="thApp">'+(ST.v==='home'?home():ST.v==='mat'?materia():modoTela())+'</div>';
    try{D.getElementById('pageTitle').textContent='Treinar'}catch(e){}
    W.scrollTo&&W.scrollTo(0,0);
  }
  function go(v,p){for(var k in p||{})ST[k]=p[k];ST.v=v;draw()}
  function launch(modo,name,k,g){
    name=name||ST.name;k=k===undefined?ST.k:k;g=g===undefined?ST.g:g;
    try{localStorage.setItem(KEY,JSON.stringify({name:name,k:k,g:g,modo:modo,area:ST.area}))}catch(e){}
    if(modo==='guiados')return W.nav('mapas');
    /* openSubject e setTab passam por uma fila assíncrona (checagem de acesso): só aplicamos modo e destino depois que a matéria abriu */
    var d=k&&DK()[k],modeArea=(ST.area||(d&&d.area)||'teoria')==='pratica'?'practice':'theory';
    Promise.resolve(W.openSubject(name)).then(function(){
      UI.mode=modeArea;
      if(modo==='estudar')return W.renderSubject();
      if(modo==='cartoes'){
        if(W.sxTreinoAbrir)W.sxTreinoAbrir(k,g);
        return W.setTab('cartoes');
      }
      if(modo==='exercicios'){
        if(W.sxTreinoAbrir)W.sxTreinoAbrir(k,g);
        if(W.renderExercicios) return W.renderExercicios();
        return W.setTab('cartoes');
      }
      if(modo==='mindmaps')return W.setTab('mapas');
      return W.setTab('review');
    });
  }
  D.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('[data-th],[data-th-mat],[data-th-tab],[data-th-area],[data-th-as],[data-th-all],[data-th-modo]');
    if(!t||!box()||!box().contains(t))return;
    if(t.hasAttribute('data-th-mat'))return go('mat',{name:t.getAttribute('data-th-mat'),tab:'',k:'',g:'',area:''});
    if(t.hasAttribute('data-th-area'))return go('mat',{area:t.getAttribute('data-th-area'),tab:''});
    if(t.hasAttribute('data-th-tab'))return go('mat',{tab:t.getAttribute('data-th-tab')});
    if(t.hasAttribute('data-th-as')){var a=ST._as[Number(t.getAttribute('data-th-as'))];ST.k=a.k;ST.g=a.g;ST.titulo=a.t;return launch('cartoes')}
    if(t.hasAttribute('data-th-all')){
      var ks=ST._as.map(function(x){return x.k}).filter(function(v,i,arr){return arr.indexOf(v)===i});
      ST.k=ks[0];ST.g='';ST.titulo='Todos os assuntos';return launch('cartoes');
    }
    if(t.hasAttribute('data-th-modo'))return launch(t.getAttribute('data-th-modo'));
    var act=t.getAttribute('data-th');
    if(act==='voltar'){if(ST.v==='modo')return go('mat');if(ST.v==='mat'&&ST.area&&temPratica(ST.name))return go('mat',{area:'',tab:''});return go('home')}
    if(act==='continuar'){var u=ultimo();if(u){ST.area=u.area||(u.k&&DK()[u.k]&&DK()[u.k].area)||'';launch(u.modo||'cartoes',u.name,u.k,u.g)}}
    if(act==='pendentes'){var p=pendTotal();if(p.best){ST.area=DK()[p.best.k].area||'teoria';launch('cartoes',p.best.name,p.best.k,'')}}
  });
  function render(){ST.v='home';draw()}
  W.renderV11Hub=render;W.renderStudy=render;
  try{HUB_LABELS.study='Treinar'}catch(e){}
})();
