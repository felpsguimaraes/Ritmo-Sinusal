/* SINUS · Curadoria pública de videoaulas por disciplina e professor.
 * A classificação é independente do catálogo: novas aulas entram na sincronização diária.
 * Nomes de professores não constituem vínculo com professores da turma do aluno.
 */
(function(W){
'use strict';
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const TEACHERS=[
 ['Dr. Víctor Benítez',/\bvictor\s+benitez\b/,'anatomia'],
 ['Dr. Ronald Martínez',/\bronald(?:\s+martinez)?\b/,'anatomia'],
 ['Dr. Gregório Meaurio',/\bgregorio\s+meaurio\b/,'anatomia'],
 ['Dr. Eduardo Oviedo',/\beduardo\s+oviedo\b/,'histologia'],
 ['Dr. Federico Hogë',/\bfederi(?:co|vo)(?:\s+hog[ea])?\b/,'fisiologia'],
 ['Dr. Carlos Ariel',/\bcarlos\s+ariel\b/,'fisiologia'],
 ['Dr. Josué Schmidt',/\bjosue\s+sch(?:i)?m(?:i)?dt\b/,'biofisica'],
 ['Dra. Andrea López',/\bandrea\s+lopez\b/,'bioquimica'],
 ['Dra. Glória Martínez',/\bgloria\s+martinez\b/,'bioquimica'],
 ['Dra. Andrea Isasi',/\bandrea\s+isasi\b/,'inmunologia'],
 ['Dra. Andrea Villamayor',/\bandrea\s+villamayor\b/,'epidemiologia'],
 ['Dra. Noelia Scappini',/\bnoe(?:lia|li?a)\s+scappini\b/,'microbiologia'],
 ['Dra. Nilse Cubilla',/\bnils(?:e|on)\s+cubilla\b/,'microbiologia'],
 ['Dra. Noeli Marmori',/\bnoeli\s+marmori\b/,'microbiologia'],
 ['Dr. Arturo Alexander',/\barturo\s+alexander\b/,'microbiologia'],
 ['Dra. Milva Cardozo',/\bmilva\s+cardozo\b/,'nutricion']
];
const LABELS={anatomia:'Anatomía',histologia:'Histología',fisiologia:'Fisiología',biofisica:'Biofísica',bioquimica:'Bioquímica',inmunologia:'Inmunología',epidemiologia:'Epidemiología y Salud Pública',microbiologia:'Microbiología y Parasitología',nutricion:'Nutrición',farmacologia:'Farmacología',semiologia:'Semiología',anatopato:'Anatomía Patológica',fisiopatologia:'Fisiopatología',genetica:'Genética'};
function explicit(n){
 if(/\banatomia\s+patologica\b|\banatopato\b/.test(n))return 'anatopato';
 if(/\bmicrobiolog|\bmicrobiology|\bmicro\s+practica|\bmicolog|\bmicosis|\bparasitolog|\bprotozoarios|\bbacteriolog|\benterobacterias\b/.test(n))return 'microbiologia';
 if(/\bhistolog/.test(n))return 'histologia';
 if(/\bfisiopatolog/.test(n))return 'fisiopatologia';
 if(/\bfarmacolog/.test(n))return 'farmacologia';
 if(/\bsemiolog/.test(n))return 'semiologia';
 if(/\binmunolog|\binmunidad|\bhistocompatibilidad/.test(n))return 'inmunologia';
 if(/\bepidemiolog|\bepidemolog|\bsalud publica|\batencion primaria|\bprimary health care|\bdeterminantes de la salud/.test(n))return 'epidemiologia';
 if(/\bbioquimic|\bbiochemistry|\bciclo de krebs|\bglucogenolisis|\bglucogenesis|\bvia de las pentosas/.test(n))return 'bioquimica';
 if(/\bbiofisic|\bbiophysics/.test(n))return 'biofisica';
 if(/\bfisiolog|\bphysiology/.test(n))return 'fisiologia';
 if(/\bnutricion|\bnutrition/.test(n))return 'nutricion';
 if(/\bgenetic|\bgenetica/.test(n))return 'genetica';
 if(/\banatomia\b|\bcraneo\b|\bcraneales\b|\bviscerocraneo\b|\bhuesos\b|\bperitoneo\b/.test(n))return 'anatomia';
 return '';
}
const ORDER={
 anatomia:[/generalidades|generalities|introduccion/,/craneo|cranial|craneales|cabeza|cara|esfenoid|viscerocraneo/,/vertebras|sacro|coccix/,/abdomen|inguinal|lombar/,/peritoneo/,/estomago|duodeno/,/intestino delgado|small intestine/,/ciego|colon|intestino grueso/,/higado|vesicula|pancreas|bazo/,/rins|renal/,/cintura pelvica|pelviana/,/miembro inferior|muslo|pierna/],
 histologia:[/histologia|generalidades/,/sistema digestivo/,/sistema urinario/,/sistema genital/,/sistema endocrino/],
 fisiologia:[/transporte a traves|potencial de membrana/,/excitacion del musculo|contraccion muscular/,/musculo cardiaco|excitacion ritmica/,/electrocardiograma|eletrocardiograma/,/circulacion|circulatorio|gasto cardiaco|ventricular|sanguineo/,/respiratoria|respiratory/,/renal/,/neuro|somatosens|dolor|motor somatico/],
 bioquimica:[/agua|aminoacidos/,/proteinas/,/enzimas/,/carbohidratos|glucolisis|glucogenolisis|glucogenesis/,/krebs|pentosas/,/lipidos/,/vitaminas/,/hemograma/],
 microbiologia:[/metabolismo bacteriano/,/bacilos|enterobacterias|gardnerella|chlamydia/,/micologia|micosis/,/parasitologia|protozoarios/,/revision|repaso/],
 biofisica:[/sistema disperso/,/equilibrio acido/,/respiracion/,/circulacion/,/sonido|audicion/,/revision|repaso/],
 inmunologia:[/antigenos|anticuerpos/,/histocompatibilidad/,/inflamacion/,/hipersensibilidad|autoinmunes/,/antitumoral|transplante/],
 epidemiologia:[/epidemiologia|salud publica/,/atencion primaria|primary health care/,/determinantes/,/vacunas/]
};
function rank(title,subject){
 const n=norm(title),rules=ORDER[subject]||[];
 const ix=rules.findIndex(rx=>rx.test(n));
 const nums=n.match(/\b(?:parte|part|ii|iii|iv|v|vi|vii|viii|i)\s*(?:[ivx]+|\d+)\b/);
 const roman=n.match(/\b(?:viii|vii|vi|iv|iii|ii|v|i)\b/g);
 const romanNumber={i:1,ii:2,iii:3,iv:4,v:5,vi:6,vii:7,viii:8};
 const part=n.match(/\b(?:parte|part)\s*(\d+|viii|vii|vi|iv|iii|ii|v|i)\b/)||n.match(/\b(?:i|ii|iii|iv|v|vi|vii|viii)\b(?!.*\b(?:i|ii|iii|iv|v|vi|vii|viii)\b)/);
 const p=part?(Number(part[1]||part[0])||romanNumber[part[1]||part[0]]||0):0;
 return (ix===-1?95:ix)*100+Math.min(p,40);
}
function classify(video){
 const title=typeof video==='string'?video:String(video?.title||'');
 const n=norm(title),teacher=TEACHERS.find(x=>x[1].test(n));
 const subject=explicit(n)||teacher?.[2]||'';
 const isPractice=/\bpractica\b|\bpratica\b|\blaboratorio\b|\blab\b|\bsimulado\b|\bactividad de evaluacion grupal\b/.test(n);
 return {subject,subjectLabel:LABELS[subject]||(teacher?'Aulas · '+teacher[0]:'Outras aulas'),
  professor:teacher?.[0]||'',isPractice,rank:rank(title,subject),
  confidence:explicit(n)?'assunto':teacher?'professor':'revisar'};
}
W.SinusVideoCuradoria={classify,labels:LABELS,normalize:norm};
})(window);
