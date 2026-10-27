#!/usr/bin/env node
/* Valida aulas/exercicios/banco.js: campos, fonte, duplicados. Uso: node tools/robo-questoes/validar.js */
const fs=require('fs'),path=require('path');
const w={};new Function('window',fs.readFileSync(path.join(__dirname,'../../aulas/exercicios/banco.js'),'utf8'))(w);
const L=w.SINUS_EXERCICIOS||[];
const TIPOS=['multiple','cita','complete','image','match','flashcard','truefalse'];
const MATERIAS=['Anatomía Patológica I','Semiología Médica I','Fisiopatología I','Imagenología','Medicina de la Familia','Farmacología I'];
const erros=[],ids=new Set(),prompts=new Set();
const bad=/lorem|todo|xxx|\?\?\?|exemplo de/i;
L.forEach((q,i)=>{
  const e=m=>erros.push(`#${i} ${q.id||'?'}: ${m}`);
  if(!q.id)e('sem id');else if(ids.has(q.id))e('id duplicado');ids.add(q.id);
  if(!MATERIAS.includes(q.subject))e('matéria inválida: '+q.subject);
  if(!TIPOS.includes(q.type))e('tipo inválido');
  if(!['theory','practice'].includes(q.mode))e('mode deve ser theory|practice');
  if(!q.prompt||q.prompt.length<15)e('enunciado curto');
  if(!q.answer)e('sem resposta');
  if(q.type==='multiple'){if(!Array.isArray(q.options)||q.options.length<3||q.options.length>6)e('opções 3-6');else if(!q.options.includes(q.answer))e('resposta fora das opções');else if(new Set(q.options).size!==q.options.length)e('opções repetidas')}
  if(!q.explanation||q.explanation.length<40)e('explicação ausente/curta');
  if(!q.fonte||!q.fonte.arquivo||!(q.fonte.pagina||q.fonte.slide))e('fonte obrigatória (arquivo + slide/pagina)');
  if(q.prova&&(!q.prova.ref))e('prova sem ref');
  if(q.prova&&q.prova.img&&!/^[A-Za-z0-9_-]{20,}$/.test(q.prova.img))e('prova.img deve ser id do Drive');
  [q.prompt,q.answer,q.explanation,q.why||''].join(' ').match(bad)&&e('texto de rascunho');
  const k=(q.subject+'|'+String(q.prompt).toLowerCase().replace(/\W+/g,' ').trim());
  if(prompts.has(k))e('enunciado duplicado');prompts.add(k);
});
console.log(`${L.length} exercícios · ${erros.length} erros`);erros.forEach(x=>console.log(' -',x));
const por={};L.forEach(q=>{por[q.subject]=(por[q.subject]||0)+1});console.log(por);
process.exit(erros.length?1:0);
