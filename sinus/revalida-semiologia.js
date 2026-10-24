/* SINUS — grifos semiologicos contextuais 3.0 | recurso educacional, nao diagnostico. */
(function(W,D){
'use strict';
if(W.SinusSemiologia)return;
const sources={
  abcde:'https://www.resus.org.uk/library/abcde-approach',
  sepsis:'https://www.nice.org.uk/guidance/ng253/chapter/Evaluating-risk',
  torax:'https://linhasdecuidado.saude.gov.br/portal/dor-toracica/unidade-de-pronto-atendimento/avaliacao-conduta/',
  gestacao:'https://linhasdecuidado.saude.gov.br/portal/pre-natal-baixo-risco/unidade-de-pronto-atendimento/situacoes-urgencia/',
  cefaleia:'https://www.nice.org.uk/guidance/cg150/chapter/recommendations'
};
const types=[
 {id:'comando',name:'Comando da banca',priority:100,re:/\b(?:assinale\s+a\s+(?:alternativa|opção)\s+(?:correta|incorreta)|qual(?:is)?\s+(?:é|são|seria|seriam)|exceto|incorreta|não\s+(?:é|corresponde)\s+(?:a\s+)?(?:correto|correta))\b/giu},
 {id:'negacao',name:'Negação / ausência',priority:96,re:/\b(?:nega(?:ndo)?\s+(?:dor(?:\s+[a-zà-ÿ]+)?|febre|dispneia|tosse|sangramento|trauma|comorbidades?|história\s+de\s+[a-zà-ÿ]+)|sem\s+(?:dor(?:\s+[a-zà-ÿ]+)?|febre|dispneia|sangramento|alterações|sinais?\s+de\s+[a-zà-ÿ]+|instabilidade|irradiação|comorbidades?)|ausência\s+de\s+[a-zà-ÿ]+|afebril|assintomátic[oa]|hemodinamicamente\s+estável)\b/giu},
 {id:'perfil',name:'Perfil',priority:25,re:/\b(?:paciente|homem|mulher|menino|menina|criança|lactente|gestante)\s+(?:com\s+)?\d{1,3}\s*(?:anos?|meses?|dias?)\b|\b(?:recém-nascid[oa]|puérpera)\b/giu},
 {id:'chave',name:'Achado-chave',priority:65,re:/\b(?:drepanócitos|hemácias\s+falciformes|neutrófilos?\s+hipersegmentados?|sinal\s+de\s+(?:murphy|blumberg|kernig|brudzinski|giordano)|rigidez\s+de\s+nuca|hematúria|petéquias|anisocoria|nistagmo)\b/giu},
 {id:'sintoma',name:'Sintoma',priority:50,re:/\b(?:dor(?:\s+(?:torácica|abdominal|lombar|pélvica|epigástrica|precordial))?|febre|dispneia|tosse|cefaleia|náuseas?|vômitos?|diarreia|hemoptise|hematêmese|melena|disúria|polaciúria|síncope|convulsões?|palpitações|sangramento|astenia|fadiga)\b/giu},
 {id:'sinal',name:'Sinal no exame',priority:45,re:/\b(?:edema|icterícia|palidez|cianose|hipotensão|taquicardia|bradicardia|hepatomegalia|esplenomegalia|desidratação|estertores|crepitações|sibilos|sudorese|rigidez\s+abdominal)\b/giu},
 {id:'medida',name:'Exame / medida',priority:62,re:/\b(?:PA|pressão\s+arterial|FC|FR|SpO2|SatO2|saturação(?:\s+de\s+oxigênio)?)\s*(?::|=|de)?\s*\d{1,3}(?:\s*[/x×]\s*\d{2,3})?\s*(?:mmHg|bpm|irpm|%)?|\b(?:hemoglobina|glicemia|plaquetas|creatinina|leucócitos|potássio|lactato)\s*[:=]\s*\d+(?:[,.]\d+)?/giu},
 {id:'tempo',name:'Tempo / evolução',priority:40,re:/\b(?:há|durante|nos\s+últimos|nas\s+últimas|desde)\s+\d+\s*(?:horas?|dias?|semanas?|meses?|anos?)\b|\b(?:início\s+súbito|piora\s+progressiva|progressão\s+rápida|subitamente)\b/giu},
 {id:'risco',name:'Contexto de risco',priority:32,re:/\b(?:gestante|gestação|gravidez|puérpera|tabagismo|diabetes\s+mellitus|hipertensão\s+arterial|imunossuprimid[oa]|anticoagula(?:ção|nte)|doença\s+renal\s+crônica)\b/giu}
];
let mode='essencial';let prior={node:null,text:''};
function noAccent(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function isNegated(text,pos){let before=noAccent(text.slice(Math.max(0,pos-74),pos)).split(/[.!?;\n]/).pop();return /\b(?:nega|negou|sem|ausencia\s+de|nao\s+apresenta|descarta)\b[\s\w,/-]{0,45}$/.test(before)}
function analyze(text){
 text=String(text||'');const hits=[];
 function add(start,end,id,priority,reason,source){if(start>=end)return;hits.push({start,end,id,priority,reason:reason||'',source:source||''})}
 for(const type of types){type.re.lastIndex=0;for(const m of text.matchAll(type.re))add(m.index,m.index+m[0].length,type.id,type.priority)}
 const direct=[
  {re:/\b(?:choque\s+(?:séptico|cardiogênico|hipovolêmico|anafilático)|instabilidade\s+hemodinâmica|alteração\s+aguda\s+do\s+estado\s+mental|rebaixamento\s+do\s+nível\s+de\s+consciência|hemorragia\s+maciça|sangramento\s+incontrolável|respiração\s+agônica|déficit\s+neurológico\s+focal|afasia\s+súbita)\b/giu,source:'torax',reason:'Expressão potencialmente associada a prioridade clínica.'},
  {re:/\b(?:cefaleia\s+(?:em\s+trovoada|explosiva)|anestesia\s+em\s+sela)\b/giu,source:'cefaleia',reason:'Sinal de alarme neurológico em contexto apropriado.'}
 ];
 for(const rule of direct)for(const m of text.matchAll(rule.re))if(!isNegated(text,m.index))add(m.index,m.index+m[0].length,'alerta',130,rule.reason,rule.source);
 const lower=noAccent(text),ped=/\b(?:crianca|lactente|recem-nascid[oa]|neonato|menino\s+de\s+\d{1,2}\s+anos|menina\s+de\s+\d{1,2}\s+anos)\b/.test(lower);
 if(!ped)for(const m of text.matchAll(/\b(?:PA|pressão\s+arterial)\s*(?:de\s+|[:=]\s*)?(\d{2,3})\s*[/x×]\s*\d{2,3}\s*(?:mmHg)?/giu))
  if(Number(m[1])>=45&&Number(m[1])<=90&&!isNegated(text,m.index))add(m.index,m.index+m[0].length,'alerta',136,'Pressão sistólica baixa para adulto; correlacione perfusão e quadro clínico.','torax');
 for(const m of text.matchAll(/\b(?:SpO2|SatO2|saturação(?:\s+de\s+oxigênio)?)\s*[:=]?\s*(\d{2,3})\s*%/giu))
  if(Number(m[1])>=55&&Number(m[1])<=90&&!isNegated(text,m.index))add(m.index,m.index+m[0].length,'alerta',132,'Saturação baixa: considere a linha de base e o quadro respiratório.','torax');
 function pair(left,right,distance,reason,source){
  const a=[...text.matchAll(left)],b=[...text.matchAll(right)];
  for(const x of a){if(isNegated(text,x.index))continue;if(b.some(y=>!isNegated(text,y.index)&&Math.abs(y.index-x.index)<distance))add(x.index,x.index+x[0].length,'alerta',122,reason,source)}
 }
 pair(/\b(?:cefaleia|dor\s+de\s+cabeça)\b/giu,/\b(?:início\s+súbito|súbita\s+e\s+intensa|pior\s+dor\s+da\s+vida)\b/giu,110,'Cefaleia de início abrupto requer investigar causas secundárias.','cefaleia');
 pair(/\b(?:sangramento\s+vaginal)\b/giu,/\b(?:gestante|gestação|gravidez|grávida)\b/giu,220,'Sangramento na gestação: investigar idade gestacional e estabilidade.','gestacao');
 pair(/\b(?:dor\s+torácica)\b/giu,/\b(?:sudorese|síncope|dispneia|hipotensão)\b/giu,140,'Sintomas associados elevam a suspeita de causa grave de dor torácica.','torax');

 // Red flags contextuais: regras transparentes, conservadoras e sensíveis a negação.
 const critical=[
  {re:/\b(?:estridor|apneia|respiração\s+agônica|obstrução\s+de\s+vias?\s+aéreas?|cianose\s+central|incapacidade\s+de\s+falar\s+frases?\s+completas?)\b/giu,reason:'Possível comprometimento de via aérea ou respiração. Priorize o ABCDE.'},
  {re:/\b(?:hemorragia\s+(?:maciça|incontrolável)|hematêmese\s+volumosa|sangramento\s+ativo\s+importante|choque\s+(?:séptico|cardiogênico|hipovolêmico|hemorrágico|anafilático)|pele\s+fria\s+e\s+(?:pegajosa|moteada))\b/giu,reason:'Padrão potencial de choque ou hemorragia importante. Avalie perfusão e estabilidade.'},
  {re:/\b(?:déficit\s+neurológico\s+(?:focal|súbito)|hemiparesia\s+súbita|afasia\s+súbita|convulsão\s+prolongada|estado\s+de\s+mal\s+epiléptico|rebaixamento\s+(?:agudo\s+)?(?:do\s+nível\s+de\s+consciência|da\s+consciência))\b/giu,reason:'Alerta neurológico dependente do tempo; determine início e exame neurológico.'},
  {re:/\b(?:dor\s+torácica\s+(?:opressiva|intensa)\s+com\s+(?:sudorese|síncope|dispneia)|dor\s+abdominal\s+com\s+rigidez|abdome\s+em\s+tábua|peritonite|sinal\s+de\s+irritação\s+peritoneal)\b/giu,reason:'Achados que podem sugerir causa tempo-dependente e exigem avaliação prioritária.'}
 ];
 for(const rule of critical)for(const m of text.matchAll(rule.re)){if(!isNegated(text,m.index))add(m.index,m.index+m[0].length,'alerta',138,rule.reason,'torax')}
 // Não confundir fatores de risco isolados com instabilidade. Limiares são triagem educacional de adulto.
 if(!ped){
  for(const m of text.matchAll(/\b(?:FR|frequência\s+respiratória)\s*(?:[:=]|de)?\s*(\d{2})\s*(?:irpm|rpm|incursões?\s*\/\s*min(?:uto)?)?\b/giu))
   if(Number(m[1])>=25&&Number(m[1])<=70&&!isNegated(text,m.index))add(m.index,m.index+m[0].length,'alerta',126,'Taquipneia acentuada em adulto: correlacione com a hipótese, esforço ventilatório e demais sinais vitais.','torax');
  for(const m of text.matchAll(/\b(?:temperatura|temp\.?)\s*(?:[:=]|de)?\s*(\d{2}(?:[,.]\d)?)\s*°?\s*C\b/giu))
   if(Number(m[1].replace(',','.'))<35&&Number(m[1])>=28)add(m.index,m.index+m[0].length,'alerta',120,'Hipotermia pode acompanhar doença grave; avalie idade e contexto.','torax');
 }
 // Red flag materna: a combinação importa mais que a palavra isolada.
 pair(/\b(?:sangramento\s+vaginal|dor\s+abdominal\s+intensa)\b/giu,/\b(?:gestante|gestação|gravidez|grávida|puerpério|puérpera)\b/giu,280,'Possível alerta obstétrico: avalie estabilidade, idade gestacional e sinais associados.','gestacao');
 // Não cobrir uma negação com o alarme que ela explicitamente exclui.
 const negatives=[...hits].filter(h=>h.id==='negacao');
 for(let i=hits.length-1;i>=0;i--){const h=hits[i];if(h.id==='alerta'&&negatives.some(n=>n.start<=h.start&&n.end>=h.end))hits.splice(i,1)}


 // Contexto 3.1: nenhum parâmetro de adulto deve ser transferido a pacientes pediátricos.
 // Na dúvida sobre idade, a regra numérica conservadora fica sem alerta de gravidade.
 const ageMatches=[...lower.matchAll(/\\b(?:com|de|idade(?:\\s+de)?|tem|possui)\\s*(\\d{1,3})\\s*(anos?|meses?|dias?)\\b/g)];
 const ages=ageMatches.map(m=>({n:Number(m[1]),unit:m[2]}));
 const agePediatric=ped||ages.some(a=>a.unit!=='ano'&&a.unit!=='anos'||a.n<18);
 const hasAgeAdult=ages.some(a=>(a.unit==='ano'||a.unit==='anos')&&a.n>=18&&!agePediatric);
 const pediatricLabels=/\\b(?:pediatri[ac]|adolescente|escolar|pre.escolar|bebe|bebes|lactente|neonato|recem.nascid[oa])\\b/i.test(lower);
 if(agePediatric||pediatricLabels||!hasAgeAdult){
  // Reduzir falsos alarmes: limiares PA/FR adultos não devem acionar casos com faixa etária desconhecida.
  for(let i=hits.length-1;i>=0;i--){
   const h=hits[i];if(h.id!=='alerta')continue;
   if(/Pressão sistólica baixa para adulto|Taquipneia acentuada em adulto/.test(h.reason))hits.splice(i,1);
  }
 }
 // Sepse: infecção + disfunção, sem interpretar febre ou taquicardia isoladas como sepse.
 const infection=/\\b(?:sepse|sepsis|pneumonia|pielonefrite|meningite|infec[cç][aã]o|foco\\s+infeccioso)\\b/i;
 const dysfunction=/\\b(?:confus[aã]o\\s+(?:mental|aguda)|altera[cç][aã]o\\s+do\\s+estado\\s+mental|olig[uú]ria|an[uú]ria|hipoperfus[aã]o|lactato\\s*(?:de|[:=])\\s*[2-9](?:[,.]\\d+)?|disfun[cç][aã]o\\s+org[aâ]nica)\\b/giu;
 const infectionHit=infection.exec(text);
 if(infectionHit&&!isNegated(text,infectionHit.index)){
  for(const m of text.matchAll(dysfunction)){
   if(isNegated(text,m.index))continue;
   // Exigir relação no mesmo contexto narrativo, não apenas duas palavras dispersas no texto.
   const between=text.slice(Math.min(m.index,infectionHit.index),Math.max(m.index,infectionHit.index));
   if(between.length>280||/[.!?]\\s*[A-ZÁÉÍÓÚ]/.test(between))continue;
   add(m.index,m.index+m[0].length,'alerta',134,'Suspeita infecciosa associada a possível disfunção orgânica; verificar contexto, perfusão e critérios apropriados à idade. Não é diagnóstico automático de sepse.','sepsis');
  }
 }
 // A identificação do comando altera a orientação didática, não o gabarito.
 const commandFocus=/\\b(?:conduta|tratamento|manejo|terap[eê]utica|interven[cç][aã]o)\\b/i.test(lower)?'conduta':
 /\\b(?:exame|investiga[cç][aã]o|diagn[oó]stico|hip[oó]tese)\\b/i.test(lower)?'diagnóstico/investigação':'interpretação';
 for(const h of hits)if(h.id==='alerta'&&h.reason)h.reason+=' Foco do enunciado: '+commandFocus+'.';
 hits.sort((a,b)=>b.priority-a.priority||(b.end-b.start)-(a.end-a.start));
 const nonOverlap=[];for(const h of hits)if(!nonOverlap.some(x=>h.start<x.end&&h.end>x.start))nonOverlap.push(h);
 nonOverlap.sort((a,b)=>a.start-b.start);
 const ordered=[...nonOverlap].sort((a,b)=>b.priority-a.priority||a.start-b.start),counts={},shown=[];
 for(const h of ordered){const limit=h.id==='alerta'?20:h.id==='comando'?2:h.id==='negacao'?3:2;
  if((counts[h.id]||0)>=limit)continue;if(h.id!=='alerta'&&shown.filter(x=>x.id!=='alerta').length>=13)continue;shown.push(h);counts[h.id]=(counts[h.id]||0)+1}
 return{all:nonOverlap,shown:shown.sort((a,b)=>a.start-b.start),alerts:nonOverlap.filter(x=>x.id==='alerta')};
}
const css=[
'#sxSemioLegend{display:flex;gap:9px;flex-direction:column;margin:12px 0 16px;padding:12px;background:#f7fbf9;border:1px solid #d8e8dc;border-radius:13px}',
'#sxSemioLegend .sxModes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}',
'#sxSemioLegend button{padding:7px 10px;border:1px solid #d1ded6;border-radius:8px;background:#fff;color:#204c37;font-size:12px}',
'#sxSemioLegend button[aria-pressed=true]{background:#16644e;color:#fff}',
'#sxSemioLegend .sxLegend{display:flex;gap:6px;flex-wrap:wrap}',
'#sxSemioLegend .sxChip{font-size:10px;font-weight:700;padding:4px 7px;border-radius:5px}',
'#question mark.sxMark{padding:1px 3px;border-radius:4px;font-weight:650;box-decoration-break:clone;-webkit-box-decoration-break:clone}',
'#question mark.sx-alerta,.sxChip.sx-alerta{background:#ffd7d8!important;color:#90272d!important;border-bottom:2px solid #cc3942}',
'#question mark.sx-comando,.sxChip.sx-comando{background:#f9cce8!important;color:#762455!important}',
'#question mark.sx-negacao,.sxChip.sx-negacao{background:#e0e6ed!important;color:#344358!important;text-decoration:underline dotted}',
'#question mark.sx-perfil,.sxChip.sx-perfil{background:#e5e5ff!important;color:#494180!important}',
'#question mark.sx-chave,.sxChip.sx-chave{background:#fff0a0!important;color:#725600!important}',
'#question mark.sx-sintoma,.sxChip.sx-sintoma{background:#ffe6ae!important;color:#694408!important}',
'#question mark.sx-sinal,.sxChip.sx-sinal{background:#dbd0ff!important;color:#4d3485!important}',
'#question mark.sx-medida,.sxChip.sx-medida{background:#cde7ff!important;color:#1c4e75!important}',
'#question mark.sx-tempo,.sxChip.sx-tempo{background:#ffd8c4!important;color:#783c22!important}',
'#question mark.sx-risco,.sxChip.sx-risco{background:#ccefdc!important;color:#205a43!important}',
'#sxSemioGuide{padding:12px 14px;margin:10px 0 18px;border-left:4px solid #1e7457;border-radius:10px;background:#f0f8f3;font-size:12px;line-height:1.55;color:#244335}',
'#sxSemioGuide p{margin:4px 0}#sxSemioGuide strong{display:block;margin-bottom:7px}#sxSemioGuide a{font-size:11px;color:#126350;margin-right:12px}',
'.dark #sxSemioGuide,.dark #sxSemioLegend{background:#193025;color:#daeee1;border-color:#466151}',
'@media(max-width:760px){#sxSemioLegend{padding:9px}}'
].join('');
function n(tag,klass,content){const o=D.createElement(tag);if(klass)o.className=klass;if(content!==undefined)o.textContent=content;return o}
function draw(target,text){
 if(!target)return;prior={node:target,text:String(text||'')};
 if(!D.getElementById('sxSemioCSS')){const st=n('style');st.id='sxSemioCSS';st.textContent=css;D.head.append(st)}
 let root=D.getElementById('sxSemioLegend');
 if(!root){root=n('section');root.id='sxSemioLegend';root.setAttribute('aria-label','Leitura semiológica');
  const toolbar=n('div','sxModes');toolbar.append(n('strong','', 'Leitura semiológica ·'));
  for(const [value,label] of [['essencial','Essencial'],['completo','Completa'],['nenhum','Sem grifos']]){
   const b=n('button','',label);b.type='button';b.dataset.sxMode=value;b.onclick=()=>{mode=value;draw(prior.node,prior.text)};toolbar.append(b)}
  root.append(toolbar);const chips=n('div','sxLegend');
  for(const [id,label] of [['alerta','Red flag'],...types.map(t=>[t.id,t.name])])chips.append(n('span','sxChip sx-'+id,label));
  root.append(chips,n('small','', 'Vermelho: possível prioridade clínica. Cinza: achado negado. Os grifos não indicam diagnóstico.'));target.parentNode.insertBefore(root,target)}
 root.querySelectorAll('button[data-sx-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sxMode===mode)));
 const a=analyze(prior.text),selected=mode==='nenhum'?[]:mode==='completo'?a.all:a.shown;
 const frag=D.createDocumentFragment();let pos=0;
 for(const h of selected){if(h.start<pos)continue;frag.append(D.createTextNode(prior.text.slice(pos,h.start)));const m=n('mark','sxMark sx-'+h.id,prior.text.slice(h.start,h.end));m.setAttribute('aria-label',(h.id==='alerta'?'Alerta para avaliar: ':h.id==='negacao'?'Negação: ':'Dado clínico: ')+m.textContent);
   m.title=(h.id==='alerta'?'Possível alerta clínico':types.find(t=>t.id===h.id)?.name||'Achado')+(h.reason?' — '+h.reason:'');frag.append(m);pos=h.end}
 frag.append(D.createTextNode(prior.text.slice(pos)));target.replaceChildren(frag);
 let guide=D.getElementById('sxSemioGuide');if(!guide){guide=n('section');guide.id='sxSemioGuide';target.parentNode.insertBefore(guide,target.nextSibling)}
 guide.replaceChildren(n('strong','', 'Roteiro de leitura | 3 checagens'));
 const cmd=a.all.find(x=>x.id==='comando'),neg=a.all.filter(x=>x.id==='negacao').slice(0,2),alerts=a.alerts.slice(0,3);
 guide.append(n('p','', '1. O que a banca pede? '+(cmd?'“'+prior.text.slice(cmd.start,cmd.end)+'”':'Leia o comando final antes de escolher a conduta.')));
 guide.append(n('p','', '2. O que muda a prioridade? '+(alerts.length?alerts.map(h=>'“'+prior.text.slice(h.start,h.end)+'”').join('; '):'Nenhum padrão de alarme detectado automaticamente — isso não exclui risco.')));
 guide.append(n('p','', '3. O que está ausente? '+(neg.length?neg.map(h=>'“'+prior.text.slice(h.start,h.end)+'”').join('; '):'Revise negações e dados normais.')));

 const qualifier=/(?:\b(?:súbito|subitamente|agudo|crônico|progressivo|recorrente|unilateral|bilateral|intenso|persistente|estável|instável)\b)/giu;
 const semantic=[...prior.text.matchAll(qualifier)].slice(0,5).map(m=>m[0]);
 guide.append(n('p','', '4. Qual dado diferencia as hipóteses? '+(semantic.length?semantic.join(' · ')+' — relacione com idade, tempo e exame.':'Procure localização, início, evolução e achados discriminativos.')));
 guide.append(n('p','', 'Os destaques são pistas de leitura, não diagnósticos nem confirmação de gravidade. Ausência de destaque não exclui urgência.'));

 const details=n('details');details.append(n('summary','', 'Limites e diretrizes de apoio'));
 details.append(n('p','', 'Regras educacionais. Intensidade, idade, duração e contexto definem a relevância. Não use estas marcações para tomar decisões clínicas reais.'));
 for(const [key,label] of [['torax','MS · dor torácica'],['gestacao','MS · sangramento gestacional'],['cefaleia','NICE · cefaleia'],['abcde','ABCDE · RCUK'],['sepsis','NICE · gravidade']]){const link=n('a','',label);link.href=sources[key];link.target='_blank';link.rel='noopener noreferrer';details.append(link)}
 guide.append(details);
}
W.SinusSemiologia={render:draw,analyze,getMode:()=>mode};
})(window,document);