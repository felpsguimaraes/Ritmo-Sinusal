/* Regras do calendário acadêmico; independentes da interface e da agenda pessoal. */
(function(W){'use strict';
const db=()=>W.SINUS_CALENDARIO;
const number=x=>String(x??'').match(/\d+/)?.[0]?.replace(/^0+/,'')||'';
const plain=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const inRanges=(day,ranges)=>!ranges?.length||ranges.some(([a,b])=>a<=day&&day<=b);
function cohorts(period){return Object.keys(db()?.periods?.[period]?.cohorts||{}).sort()}
function sourceIds(period,cohort){const p=db()?.periods?.[period];return [...new Set([...(p?.cohorts?.[cohort]?.sources||[]),...(p?.rotations||[]).filter(x=>x.cohort===cohort).map(x=>x.sourceId),...Object.entries(db()?.sources||{}).filter(([,s])=>s.period===Number(period)&&s.kind==='rotation-calendar').map(([id])=>id)])]}
function assignment(e,ctx){return ctx.practiceAssignments?.[e.title+"::"+e.kind]}
function groupFor(e,ctx){const a=assignment(e,ctx);if(a&&Object.hasOwn(a,"group"))return number(a.group);const map=ctx.subjectGroups||{};const k=Object.keys(map).find(k=>plain(k)===plain(e.title));return number(k===undefined?ctx.group:map[k])}
function subdivisionFor(e,ctx){const a=assignment(e,ctx);if(a&&Object.hasOwn(a,'subdivision'))return number(a.subdivision);return number(e.kind==='rotation'?ctx.hospitalSubdivision:ctx.subdivision)}
function cycleWeek(day){if(day<'2026-08-10'||day>'2026-12-05')return '';return String(Math.floor((Date.parse(day+'T12:00:00Z')-Date.parse('2026-08-10T12:00:00Z'))/604800000)%3+1)}
const dry=[['2026-08-10','2026-08-15'],['2026-09-07','2026-09-19'],['2026-10-05','2026-10-17'],['2026-11-02','2026-11-14']];
const organic=[['2026-08-03','2026-08-08'],['2026-08-17','2026-08-29'],['2026-09-21','2026-10-03'],['2026-10-19','2026-10-24'],['2026-11-16','2026-11-28']];
const exams=[['2026-08-31','2026-09-05'],['2026-10-26','2026-10-31'],['2026-11-30','2026-12-05']];
function events(day,ctx){const p=db()?.periods?.[ctx.period];if(!p||!/^2026-(0[7-9]|1[0-2])-/.test(day))return [];
const weekday=new Date(day+'T12:00:00').getDay();if(!weekday)return [];
const rows=[...(p.cohorts?.[ctx.cohort]?.events||[]),...(p.rotations||[]).filter(e=>e.cohort===ctx.cohort)];
return rows.filter(e=>{if(e.day!==weekday||!inRanges(day,e.ranges))return false;
const group=groupFor(e,ctx),sub=subdivisionFor(e,ctx);if(e.kind!=='theory'&&e.group&&group&&e.group!==group)return false;
if(e.subdivision&&sub&&e.subdivision!==sub)return false;
if(e.cycle==='morgue'&&!inRanges(day,dry.concat(organic)))return false;
if((e.cycle==='simulation'||e.cycle==='consultation')){const active=cycleWeek(day);if(!active)return false;if(sub&&((e.cycle==='simulation'&&sub!==active)||(e.cycle==='consultation'&&sub===active)))return false}
return true}).map(e=>{let location=e.location;if(e.cycle==='morgue')location=inRanges(day,dry)?'Morgue seca · Lab. 13 · CT2':'Morgue orgânica · Lab. 05 · Lago';return {...e,date:day,location,type:e.kind==='rotation'?'Rotação '+e.rotation:e.kind==='practice'?'Prática':'Teoria'}}).sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title)||a.group.localeCompare(b.group))}
function notices(day,ctx){if(Number(ctx.period)!==1||new Date(day+'T12:00:00').getDay()===0||!inRanges(day,exams))return [];return [{kind:'notice',title:'Semana de avaliações práticas',date:day,end:day,type:'Avaliação',note:'Calendário oficial de rotações do 1º período; consulte os horários de avaliação divulgados pela instituição.',sourceId:'16A8S3pWgLLXNhFeRchPzFgy67nuhfmBG'}]}
function academicOptions(period,cohort){const p=db()?.periods?.[period],rows=[...(p?.cohorts?.[cohort]?.events||[]),...(p?.rotations||[]).filter(e=>e.cohort===cohort)];const titles=[...new Set(rows.map(e=>e.title))].sort();return titles.map(title=>{const all=rows.filter(e=>e.title===title);return {title,theory:all.some(e=>e.kind==='theory'),activities:['practice','rotation'].map(kind=>{const events=all.filter(e=>e.kind===kind);if(!events.length)return null;return {key:title+'::'+kind,kind,groups:[...new Set(events.map(e=>e.group).filter(Boolean))].sort(),events}}).filter(Boolean)}})}
W.SinusTimetable={academicOptions,events,notices,cohorts,sourceIds,groupFor,cycleWeek,inRanges};
})(typeof window==='undefined'?globalThis:window);
