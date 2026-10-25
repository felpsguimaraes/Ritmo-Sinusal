/* SINUS · Transcrição real, no próprio navegador. Sem texto simulado. */
(function(W,D){'use strict';
const MODULE='https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
const MODEL='onnx-community/whisper-tiny';
const MAX_SECONDS=900;
const $=id=>D.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={source:null,srcUrl:'',subject:'',busy:false,mic:null,micStream:null,micChunks:[],speech:null,preview:null};
let engine=null,enginePromise=null;
function subject(){return typeof UI==='undefined'?'':String(UI.subject||'');}
function mode(){return typeof UI==='undefined'?'theory':UI.mode;}
function notify(text,error=false){const el=$('sxTransStatus');if(el){el.textContent=text;el.classList.toggle('sxTransError',!!error);} }
function statusProgress(value){const el=$('sxTransBar');if(el)el.style.width=Math.max(0,Math.min(100,Number(value)||0))+'%';}
function busy(value){state.busy=value;for(const b of D.querySelectorAll('[data-sx-trans-action]'))b.disabled=value;}
function existingText(){try{return SAFE_STORE.getItem('trans_'+subject())||''}catch{return ''}}
function saveText(s){try{SAFE_STORE.setItem('trans_'+subject(),s)}catch{}}
function currentFile(){return state.source?.file||null;}
function localSource(){
 if(typeof localMedia==='undefined')return null;
 const candidates=[localMedia.source,localMedia.audio,localMedia.video].filter(Boolean);
 return candidates.find(x=>x.localUrl)||null;
}
function clearUrl(){if(state.srcUrl){URL.revokeObjectURL(state.srcUrl);state.srcUrl='';}}
function render(){
 const subj=subject();if(state.subject!==subj){clearUrl();state.source=null;state.subject=subj;}
 const recent=localSource();
 if(!state.source&&recent)state.source={file:null,url:recent.localUrl,title:recent.title||'Aula carregada',type:recent.kind?.toLowerCase().includes('vídeo')?'video':'audio'};
 const src=state.source;
 const saved=existingText();
 const host=$('subjectContent');if(!host)return;
 host.innerHTML='<section class="sxTrans" aria-label="Transcrição de áudio e vídeo">'+
 '<div class="sxTransHead"><div><span>FERRAMENTA DA MATÉRIA · '+esc(mode()==='practice'?'PRÁTICA':'TEORIA')+'</span><h2>Transcrição de áudio e vídeo</h2><p>Transforme aulas gravadas em texto real. Revise nomes e termos médicos antes de estudar.</p></div><div class="sxTransState">● Disponível</div></div>'+
 '<div class="sxTransGrid"><article class="sxTransPanel"><h3>1. Fonte do conteúdo</h3>'+
 '<label class="sxTransPick" for="sxTransFile"><span>↥</span><b>Selecionar áudio ou vídeo</b><small>MP3, M4A, WAV, OGG, WebM, MP4 ou MOV</small></label>'+
 '<input id="sxTransFile" type="file" accept="audio/*,video/*,.mp3,.m4a,.wav,.ogg,.webm,.mp4,.mov" hidden onchange="SinusTranscricaoReal.choose(this.files[0])">'+
 '<div class="sxTransSource" id="sxTransSource">'+(src?'<b>'+esc(src.title)+'</b><small>Arquivo selecionado</small>':'Nenhum arquivo selecionado')+'</div>'+
 '<div class="sxTransPreview" id="sxTransPreview">'+(src?.url?'<'+(src.type==='video'?'video':'audio')+' id="sxTransPlayer" src="'+esc(src.url)+'" controls playsinline preload="metadata"></'+(src.type==='video'?'video':'audio')+'>':'')+'</div>'+
 '<button type="button" class="sxTransMic" id="sxTransMic" onclick="SinusTranscricaoReal.toggleMic()">● Gravar pelo microfone</button>'+
 '<p class="sxTransNote">Gravação pelo microfone ou arquivo do aparelho. Arquivos particulares do Drive precisam ser baixados ou enviados aqui pelo aluno.</p>'+
 '<label class="sxTransLangLabel" for="sxTransLang">Idioma da aula</label><select id="sxTransLang"><option value="portuguese">Português</option><option value="spanish">Español</option><option value="english">English</option><option value="auto">Detectar automaticamente</option></select>'+
 '<button class="sxTransStart" type="button" data-sx-trans-action onclick="simulateTranscription()">Gerar transcrição real</button>'+
 '<div class="sxTransProgress"><span id="sxTransBar"></span></div><p id="sxTransStatus" role="status" aria-live="polite">Pronto para transcrever. Na primeira utilização será necessário carregar o modelo de reconhecimento de fala.</p>'+
 '</article><article class="sxTransPanel sxTransResult"><h3>2. Texto da aula</h3><textarea id="transText" spellcheck="true" placeholder="Sua transcrição aparecerá aqui. Você também pode editar e corrigir os termos médicos.">'+esc(saved)+'</textarea>'+
 '<div class="sxTransActions"><button onclick="saveTranscript()" type="button">Salvar</button><button type="button" onclick="SinusTranscricaoReal.copy()">Copiar texto</button><button type="button" onclick="SinusTranscricaoReal.download()">Baixar .txt</button><button type="button" onclick="sendTranscriptToNotebook()">Levar ao caderno</button></div>'+
 '<p class="sxTransNote">Reconhecimento de fala local com Whisper; pode levar algum tempo e depende da capacidade do dispositivo e da conexão inicial. O conteúdo da transcrição pode ser editado.</p></article></div></section>';
 const lang=(()=>{try{return localStorage.getItem('sxTransLang')||'portuguese'}catch{return 'portuguese'}})();
 $('sxTransLang').value=lang;
 $('sxTransLang').onchange=e=>{try{localStorage.setItem('sxTransLang',e.target.value)}catch{}};
 if(state.busy){busy(true);notify('Transcrição em andamento.');}
 if(state.mic){const b=$('sxTransMic');b.textContent='■ Encerrar gravação';b.classList.add('recording');}
}
function choose(file){
 if(!file)return;
 if(state.busy){notify('Conclua a transcrição em andamento antes de trocar o arquivo.',true);return;}
 const kind=file.type.startsWith('video/')||/\.(mov|mp4|m4v)$/i.test(file.name)?'video':'audio';
 if(file.size>400*1024*1024){notify('Arquivo maior que 400 MB. Divida a gravação.',true);return;}
 clearUrl();state.srcUrl=URL.createObjectURL(file);state.source={file,url:state.srcUrl,title:file.name,type:kind};
 const recentText=$('transText')?.value||'';render();if(recentText)$('transText').value=recentText;notify('Arquivo pronto. Clique em Gerar transcrição real.');
}
async function prepareEngine(){
 if(engine)return engine;
 if(!enginePromise)enginePromise=(async()=>{
  notify('Carregando o reconhecedor de fala. Na primeira vez, isso exige baixar um modelo de IA.');
  const {pipeline}=await import(MODULE);
  const opts={dtype:'q8',device:'wasm',progress_callback:(p)=>{if(p?.status==='progress'){notify('Baixando modelo de transcrição: '+Math.round(p.progress||0)+'%');statusProgress(Math.min(35,(p.progress||0)*.35));}else if(p?.status==='ready')notify('Modelo carregado, preparando áudio…');}};
  if(navigator.gpu){try{engine=await pipeline('automatic-speech-recognition',MODEL,{...opts,device:'webgpu',dtype:'fp16'});return engine;}catch{notify('Aceleração indisponível. Tentando a opção compatível com o dispositivo.');}}
  engine=await pipeline('automatic-speech-recognition',MODEL,opts);return engine;
 })().catch(e=>{enginePromise=null;throw e;});
 return enginePromise;
}
function toMono(buffer){
 const data=new Float32Array(buffer.length),num=buffer.numberOfChannels;
 for(let c=0;c<num;c++){const ch=buffer.getChannelData(c);for(let i=0;i<data.length;i++)data[i]+=ch[i]/num;}
 return data;
}
async function resample(data,from){
 if(from===16000)return data;
 const len=Math.max(1,Math.floor(data.length*16000/from));
 const ctx=new (W.OfflineAudioContext||W.webkitOfflineAudioContext)(1,len,16000);
 const b=ctx.createBuffer(1,data.length,from);b.copyToChannel(data,0);
 const source=ctx.createBufferSource();source.buffer=b;source.connect(ctx.destination);source.start(0);
 return new Float32Array((await ctx.startRendering()).getChannelData(0));
}
async function decodeAudio(file){
 const AudioCtx=W.AudioContext||W.webkitAudioContext;if(!AudioCtx)throw Error('Este navegador não permite decodificar áudio.');
 const ac=new AudioCtx();
 try{
  const decoded=await ac.decodeAudioData(await file.arrayBuffer());
  if(decoded.duration>MAX_SECONDS)throw Error('Áudio muito longo. Envie trechos de até 15 minutos.');
  return await resample(toMono(decoded),decoded.sampleRate);
 }finally{await ac.close().catch(()=>{});}
}
async function captureMedia(){
 const media=$('sxTransPlayer');if(!media)throw Error('Escolha um vídeo para transcrever.');
 const AudioCtx=W.AudioContext||W.webkitAudioContext;if(!AudioCtx)throw Error('O navegador não disponibiliza captura de áudio de vídeo.');
 media.currentTime=0;media.pause();media.playsInline=true;
 const ctx=new AudioCtx(),source=ctx.createMediaElementSource(media),processor=ctx.createScriptProcessor(4096,2,1),sink=ctx.createGain();
 const parts=[];let length=0;
 processor.onaudioprocess=evt=>{
  const input=evt.inputBuffer,count=input.length,result=new Float32Array(count);
  for(let c=0;c<input.numberOfChannels;c++){const ch=input.getChannelData(c);for(let i=0;i<count;i++)result[i]+=ch[i]/input.numberOfChannels;}
  parts.push(result);length+=count;
  if(media.duration)statusProgress(Math.min(53,Math.floor(media.currentTime/media.duration*50)));
 };
 sink.gain.value=0;source.connect(processor);processor.connect(sink);sink.connect(ctx.destination);
 try{
  await ctx.resume();
  if(!Number.isFinite(media.duration))await new Promise((ok,no)=>{media.onloadedmetadata=ok;media.onerror=()=>no(Error('Não foi possível ler o vídeo.'));});
  if(media.duration>MAX_SECONDS)throw Error('Vídeo muito longo. Envie trechos de até 15 minutos.');
  notify('Lendo a faixa de áudio do vídeo em tempo real. Mantenha esta tela aberta até terminar.');
  await new Promise((resolve,reject)=>{media.onended=resolve;media.onerror=()=>reject(Error('Não foi possível reproduzir o áudio do vídeo.'));media.play().catch(reject);});
  if(!length)throw Error('Nenhum áudio foi detectado no vídeo.');
  const all=new Float32Array(length);let off=0;for(const p of parts){all.set(p,off);off+=p.length;}
  return await resample(all,ctx.sampleRate);
 }finally{media.pause();media.onended=null;media.onerror=null;media.onloadedmetadata=null;processor.disconnect();source.disconnect();sink.disconnect();await ctx.close().catch(()=>{});}
}
async function transcribe(){
 if(state.busy)return;
 const source=state.source;
 if(!source)return notify('Escolha um arquivo de áudio ou vídeo, ou grave pelo microfone.',true);
 if(state.mic)return notify('Encerre a gravação antes de transcrever.',true);
 const targetSubject=subject();const textEl=$('transText');
 const before=textEl?.value||'';busy(true);statusProgress(2);
 try{
  notify('Preparando áudio real para reconhecimento…');
  let samples;
  if(source.type==='video')samples=await captureMedia();
  else if(source.file){try{samples=await decodeAudio(source.file);}catch(err){if(source.url&&$('sxTransPlayer'))samples=await captureMedia();else throw err;}}
  else if(source.url){const response=await fetch(source.url);if(!response.ok)throw Error('Não foi possível ler o arquivo local.');samples=await decodeAudio(await response.blob());}
  if(!samples||samples.length<8000)throw Error('O arquivo não contém pelo menos meio segundo de áudio.');
  const model=await prepareEngine();
  notify('Reconhecendo a fala em português, espanhol ou inglês…');statusProgress(60);
  const lang=$('sxTransLang')?.value||'portuguese';
  const options={task:'transcribe',chunk_length_s:25,stride_length_s:5};
  if(lang!=='auto')options.language=lang;
  const result=await model(samples,options);
  const text=String(result?.text||'').trim();
  if(!text)throw Error('Nenhuma fala foi reconhecida. Confira o áudio e tente novamente.');
  // Nunca sobrescrever texto de outra matéria ou notas digitadas durante o processamento.
  if(subject()===targetSubject&&$('transText'))$('transText').value=(before?before.trim()+'\n\n':'')+text;
  saveText((before?before.trim()+'\n\n':'')+text);
  statusProgress(100);notify('Transcrição real concluída. Revise os termos médicos e salve suas correções.');
 }catch(err){statusProgress(0);notify('Não foi possível transcrever: '+String(err?.message||err)+'. Se necessário, use um arquivo MP3, M4A ou WAV menor.',true);}
 finally{busy(false);}
}
async function toggleMic(){
 if(state.mic){
  state.mic.stop();return;
 }
 if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined')return notify('Este dispositivo não oferece gravação de áudio no navegador.',true);
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  const types=['audio/webm;codecs=opus','audio/mp4','audio/webm'];
  const mime=types.find(t=>MediaRecorder.isTypeSupported(t))||'';
  state.micStream=stream;state.micChunks=[];
  state.mic=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);
  state.mic.ondataavailable=e=>{if(e.data?.size)state.micChunks.push(e.data);};
  state.mic.onerror=()=>notify('Não foi possível concluir a gravação.',true);
  state.mic.onstop=()=>{
   const type=state.mic.mimeType||mime||'audio/webm',blob=new Blob(state.micChunks,{type});
   state.micStream?.getTracks().forEach(t=>t.stop());state.mic=null;state.micStream=null;state.micChunks=[];
   if(blob.size)choose(new File([blob],'Gravação do microfone.'+(type.includes('mp4')?'m4a':'webm'),{type}));
   else notify('A gravação ficou vazia.',true);
  };
  state.mic.start(500);
  const b=$('sxTransMic');if(b){b.textContent='■ Encerrar gravação';b.classList.add('recording');}
  notify('Gravando voz real. Ao terminar, clique em Encerrar e depois em Gerar transcrição real.');
 }catch(err){notify('Microfone indisponível: '+String(err?.message||err),true);}
}
function copy(){const text=$('transText')?.value||'';if(!text.trim())return notify('Não existe texto para copiar.',true);navigator.clipboard?.writeText(text).then(()=>notify('Transcrição copiada.'),()=>notify('Selecione o texto para copiar manualmente.',true));}
function download(){const value=$('transText')?.value||'';if(!value.trim())return notify('Não existe texto para baixar.',true);const blob=new Blob([value],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=D.createElement('a');a.href=url;a.download='SINUS-Transcricao-'+subject().replace(/[^\w-]/g,'_')+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
W.SinusTranscricaoReal={render,choose,transcribe,toggleMic,copy,download};
D.head.insertAdjacentHTML('beforeend','<style>.sxTrans{color:#213c2b}.sxTransHead{display:flex;justify-content:space-between;gap:20px;align-items:start;margin:0 0 22px}.sxTransHead>div>span{letter-spacing:.13em;color:#70927b;font-size:10px;font-weight:800}.sxTransHead h2{font-size:clamp(21px,2.5vw,29px);margin:7px 0}.sxTransHead p,.sxTransNote{font-size:12px;color:#72857a;line-height:1.6}.sxTransState{background:#e8f5eb;color:#287647;padding:9px 13px;white-space:nowrap;border-radius:30px;font-size:11px}.sxTransGrid{display:grid;grid-template-columns:minmax(250px,.88fr) minmax(300px,1.25fr);gap:16px}.sxTransPanel{background:#fff;border:1px solid #dce8df;border-radius:17px;padding:23px}.sxTransPanel h3{font-size:16px;margin:0 0 17px}.sxTransPick{background:#f6faf7;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;padding:24px 12px;text-align:center;border:1px dashed #a8c8af;border-radius:13px}.sxTransPick span{font-size:23px}.sxTransPick b{font-size:13px}.sxTransPick small{font-size:11px;color:#7a8a80}.sxTransSource{margin:15px 0;font-size:12px;overflow-wrap:anywhere}.sxTransSource small{display:block;color:#819087;margin-top:3px}.sxTransPreview audio,.sxTransPreview video{max-width:100%;width:100%;border-radius:10px;max-height:210px;background:#f2f5f2}.sxTransMic{border:1px solid #d5e4d9;border-radius:10px;padding:12px;background:#fff;color:#245b39;margin:10px 0 0;width:100%}.sxTransMic.recording{border-color:#b63c37;color:#b63c37;background:#fff6f5}.sxTransLangLabel{display:block;font-weight:700;font-size:12px;margin-top:17px}.sxTrans select{width:100%;margin:8px 0 12px;padding:11px;border:1px solid #d9e5db;background:#fff;border-radius:9px;color:#254630}.sxTransStart{width:100%;background:#207c50;color:#fff;font-weight:750;border:0;padding:14px;border-radius:10px;margin-top:4px}.sxTransStart:disabled{opacity:.55}.sxTransProgress{height:5px;background:#e5eee7;overflow:hidden;border-radius:6px;margin-top:17px}.sxTransProgress span{display:block;width:0;height:100%;background:#4da66d;transition:width .3s}#sxTransStatus{font-size:12px;color:#51745b;margin-top:10px;line-height:1.5}.sxTransError{color:#ad4a36!important}.sxTransResult{display:flex;flex-direction:column}.sxTransResult textarea{width:100%;flex:1;min-height:370px;font:13px/1.7 ui-sans-serif,system-ui;color:#283e30;background:#fafcfb;border:1px solid #dfebdf;border-radius:11px;padding:16px;resize:vertical}.sxTransActions{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}.sxTransActions button{font-size:12px;border:1px solid #d5e4db;background:white;color:#2d6444;padding:9px 11px;border-radius:9px}@media(max-width:800px){.sxTransGrid{grid-template-columns:1fr}.sxTransHead{flex-wrap:wrap}.sxTransPanel{padding:17px}}</style>');
})(window,document);
