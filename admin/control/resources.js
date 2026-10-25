/* SINUS · Edição dos balões por período, turma e matéria */
(function(W,D){'use strict';
const END='https://qyioizupudjrwmtasrue.supabase.co/functions/v1/sinus-subject-resources';
const C=[['overview','Visão geral'],['resumos','Resumos e apostilas'],['slides','Slides'],['provas','Provas e gabaritos'],['audios','Áudios'],['videos','Vídeos'],['pratica','Materiais práticos'],['laminas','Lâminas e imagens'],['complementares','Complementares'],['livros','Livros'],['training','Exercícios e treino'],['review','Revisão'],['transcribe','Transcrição'],['notebook','Caderno'],['lembretes','Lembretes']];
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S={period:5,cohort:'*',subject:'',section:'resumos',configs:[],loading:false};
const root=()=>D.getElementById('view');
const grade=(p,c)=>{const motor=W.SinusTimetable;if(!motor)return[];const cohorts=c==='*'?(motor.cohorts(p)||[]):[c];return [...new Set(cohorts.flatMap(t=>motor.academicOptions(p,t)||[]).map(x=>x.title))].sort((a,b)=>a.localeCompare(b,'pt'));};
function options(){let official=W.SinusTimetable?.cohorts(S.period)||[];const cs=[...new Set([...official,...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')])];return '<option value="*">Todas as turmas (padrão)</option>'+cs.map(t=>'<option value="'+t+'" '+(t===S.cohort?'selected':'')+'>Turma '+t+(official.includes(t)?'':' · sem grade confirmada')+'</option>').join('');}
async function api(action,body){const {data:{session}}=await W.SinusBackend.client.auth.getSession();if(!session)throw Error('Entre com a sua conta administrativa.');const r=await fetch(END,{method:'POST',headers:{Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'},body:JSON.stringify({action,...body})});const data=await r.json();if(!r.ok)throw Error(data.error||'Não foi possível salvar.');return data;}
const scope=()=>({period:S.period,cohort:S.cohort,subject:S.subject});
const direct=()=>S.configs.find(x=>x.cohort===S.cohort&&x.section===S.section);
const inherited=()=>S.configs.find(x=>x.cohort==='*'&&x.section===S.section);
const chosen=()=>direct()||(S.cohort==='*'?null:inherited());
function alertText(value,err){const x=D.getElementById('resources-status');if(x){x.textContent=value;x.classList.toggle('is-error',!!err);}}
function drawLinks(links){return (links||[]).map((item,i)=>'<div class="res-link"><label>Título<input class="res-link-title" maxlength="100" placeholder="Ex.: Slides da semana" value="'+esc(item.title||'')+'"></label><label>Link do Drive<input class="res-link-url" type="url" maxlength="1800" placeholder="https://drive.google.com/drive/folders/…" value="'+esc(item.url||'')+'"></label><button class="res-remove" type="button" data-res-remove="'+i+'" aria-label="Remover link">×</button></div>').join('');}
function renderEditor(){
 const cfg=chosen()||{visible:true,label:'',links:[]},owned=direct();
 const here=D.getElementById('res-editor');if(!here)return;
 here.innerHTML='<div class="res-edit-head"><div><small>EDITANDO BALÃO</small><h2>'+esc(C.find(c=>c[0]===S.section)?.[1]||S.section)+'</h2></div><span class="res-indicator">'+(owned?'Personalizado':S.cohort!=='*'&&inherited()?'Herdado do período':'Padrão do portal')+'</span></div>'+
 '<form id="res-editor-form"><label class="res-check"><input id="res-visible" type="checkbox" '+(cfg.visible?'checked':'')+'> Exibir esta aba ou balão na matéria</label>'+
 '<label>Nome exibido (opcional)<input id="res-label" maxlength="65" value="'+esc(cfg.label||'')+'" placeholder="'+esc(C.find(c=>c[0]===S.section)?.[1]||'')+'"></label>'+
 '<div class="res-links-head"><h3>Links dos materiais</h3><button type="button" id="res-add">+ Adicionar link</button></div>'+
 '<p class="res-hint">Cole a pasta ou o arquivo do Google Drive. Até 10 links por balão. Não é necessário mudar o código para atualizar depois.</p>'+
 '<div id="res-link-list">'+drawLinks(cfg.links)+'</div>'+
 '<div class="res-actions"><button class="primary" type="submit">Salvar esta aba</button><button type="button" id="res-reset" '+(owned?'':'disabled')+'>Restaurar padrão</button></div></form>';
 const list=D.getElementById('res-link-list');
 D.getElementById('res-add').onclick=()=>{if(list.children.length>=10){alertText('Cada balão aceita até 10 links.',true);return}const wrap=D.createElement('div');wrap.innerHTML=drawLinks([{title:'',url:''}]);list.append(wrap.firstElementChild);};
 list.onclick=e=>{const b=e.target.closest('[data-res-remove]');if(b)b.closest('.res-link').remove();};
 D.getElementById('res-reset').onclick=async()=>{if(!confirm('Remover a personalização desta aba e voltar ao padrão?'))return;try{await api('delete',{...scope(),section:S.section});await refresh();alertText('Configuração restaurada.');}catch(e){alertText(e.message,true);}};
 D.getElementById('res-editor-form').onsubmit=async e=>{e.preventDefault();const links=[...list.querySelectorAll('.res-link')].map(r=>({title:r.querySelector('.res-link-title').value.trim(),url:r.querySelector('.res-link-url').value.trim()}));const btn=e.target.querySelector('[type=submit]');btn.disabled=true;try{await api('save',{...scope(),section:S.section,label:D.getElementById('res-label').value.trim(),visible:D.getElementById('res-visible').checked,links});await refresh();alertText('Balão atualizado para '+S.period+'º período · '+(S.cohort==='*'?'todas as turmas':'turma '+S.cohort)+' · '+S.subject+'.');}catch(ex){alertText(ex.message,true);}finally{btn.disabled=false;}};
}
function drawTiles(){const grid=D.getElementById('res-section-grid');if(!grid)return;grid.innerHTML=C.map(([id,label])=>{const d=S.configs.find(x=>x.cohort===S.cohort&&x.section===id);const inher=S.cohort==='*'?null:S.configs.find(x=>x.cohort==='*'&&x.section===id);const x=d||inher;return '<button type="button" class="res-tile '+(S.section===id?'on':'')+'" data-section="'+id+'"><span>'+esc(label)+'</span><small>'+(x?.visible===false?'Oculto':(x?.links?.length||0)+' link(s)')+' · '+(d?'Turma':inher?'Padrão geral':'Original')+'</small></button>';}).join('');grid.onclick=e=>{const b=e.target.closest('[data-section]');if(!b)return;S.section=b.dataset.section;drawTiles();renderEditor();};}
async function refresh(){if(!S.subject){alertText('Selecione uma matéria.',true);return;}S.configs=(await api('list',scope())).configs||[];drawTiles();renderEditor();}
function setupSubjects(){const list=grade(S.period,S.cohort);const input=D.getElementById('res-subject'),dl=D.getElementById('res-subject-list');dl.innerHTML=list.map(x=>'<option value="'+esc(x)+'"></option>').join('');if(!list.includes(S.subject))S.subject=list[0]||'';input.value=S.subject;D.getElementById('res-academic-count').textContent=list.length?list.length+' matérias disponíveis na grade':'Grade ainda não confirmada para esta combinação · digite o nome exato da matéria';}
async function updateScope(){setupSubjects();try{await refresh();alertText('Escolha um balão para editar.');}catch(e){alertText(e.message,true);}}
function render(){const view=root();if(!view)return;
 view.innerHTML='<div class="res-dashboard"><div class="res-intro"><span>GESTÃO ACADÊMICA · 1º AO 10º PERÍODO</span><h2>Conteúdo de cada matéria</h2><p>Determine quais balões aparecem para cada turma. Associe pastas e arquivos do Drive à aba correspondente — um padrão para o período inteiro ou uma configuração exclusiva por turma.</p></div>'+
 '<div class="res-filters"><label>Período<select id="res-period">'+Array.from({length:10},(_,i)=>'<option value="'+(i+1)+'" '+(S.period===i+1?'selected':'')+'>'+(i+1)+'º período</option>').join('')+'</select></label><label>Turma<select id="res-cohort">'+options()+'</select></label><label>Matéria<input type="text" id="res-subject" list="res-subject-list" placeholder="Selecione ou digite a matéria"><datalist id="res-subject-list"></datalist></label></div>'+
 '<div class="res-grade-note" id="res-academic-count"></div><div class="res-main"><div class="res-panes"><div class="res-panes-title"><h3>Balões da matéria</h3><span>Escolha um para configurar</span></div><div id="res-section-grid"></div></div><article id="res-editor" class="res-editor"></article></div>'+
 '<p class="res-foot">“Todas as turmas” define o padrão. Uma turma específica pode ter links ou visibilidade diferentes. Recursos sem personalização permanecem como estão hoje; ocultar um balão não revoga o compartilhamento original do Drive.</p><div id="resources-status" role="status" aria-live="polite"></div></div>';
 const input=D.getElementById('res-subject');let debounce;
 D.getElementById('res-period').onchange=e=>{S.period=Number(e.target.value);S.cohort='*';D.getElementById('res-cohort').innerHTML=options();updateScope();};
 D.getElementById('res-cohort').onchange=e=>{S.cohort=e.target.value;updateScope();};
 input.onchange=()=>{S.subject=input.value.trim();refresh().catch(e=>alertText(e.message,true));};
 input.oninput=()=>{clearTimeout(debounce);debounce=setTimeout(()=>{if(input.value.trim()){S.subject=input.value.trim();refresh().catch(e=>alertText(e.message,true));}},700);};
 setupSubjects();if(S.subject)refresh().catch(e=>alertText(e.message,true));else{drawTiles();renderEditor();}
}
W.SinusResourceAdmin={render,sections:C};
})(window,document);
