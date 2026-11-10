CSS = r'''
/* ===== estilo 3D (padrão Fisiopatología I | SINUS) ===== */
.defs3d{position:absolute;width:0;height:0;overflow:hidden}
figure.photo.gem{padding:12px 12px 10px;background:#fff;border-radius:22px;box-shadow:0 10px 30px rgba(74,16,48,.10);border:1px solid #f3e1e6}
figure.photo.gem img{max-height:none;width:100%;max-width:100%;border-radius:14px;background:#fff}
figure.photo.gem figcaption{font-size:13px;color:#6b4a55;font-weight:600;text-align:center;margin-top:8px;line-height:1.45}
.gbadge{display:inline-block;font-size:10px;font-weight:900;letter-spacing:1.1px;text-transform:uppercase;color:var(--acc);background:var(--accs);border-radius:7px;padding:3px 8px;margin:0 0 8px 2px}
.gem-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:16px 0}
.gem-row figure.photo.gem{margin:0}
.facil{background:linear-gradient(135deg,#fff7ec,#fdecd9);border-left:6px solid #f08a24;border-radius:18px;padding:15px 18px;margin:16px 0}
.facil .t{display:block;font-size:11px;font-weight:900;letter-spacing:1.4px;color:#b25a06;text-transform:uppercase;margin-bottom:6px}
.facil .t:before{content:"";display:inline-block;width:14px;height:14px;margin:-2px 6px 0 0;vertical-align:middle;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3c4,#f5b52e 60%,#c97a06)}
.facil p,.facil li{color:#40260b;font-size:14.5px}
.facil ul{margin:4px 0 0;padding-left:20px}
/* galeria */
.g3d{background:#fff;border:1px solid #f1dfe4;border-radius:22px;padding:14px 14px 12px;margin:18px 0;box-shadow:0 8px 24px rgba(74,16,48,.06)}
.g3d-h{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:2px 4px 10px}
.g3d-t{font-weight:850;font-size:15px;color:var(--ink)}
.tap{display:inline-flex;align-items:center;font-size:10.5px;font-weight:900;letter-spacing:.8px;text-transform:uppercase;color:#fff;background:var(--acc);border-radius:7px;padding:3px 8px}
.g3d-cells{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:10px;background:linear-gradient(180deg,#fff,var(--accs));border-radius:16px;padding:12px}
.g3c{appearance:none;border:1px solid #f0d6dd;background:#fff;border-radius:16px;padding:6px 6px 9px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;font:inherit;color:var(--ink);transition:transform .15s,box-shadow .15s,border-color .15s;text-align:center}
.g3c:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(74,16,48,.12)}
.g3c[aria-pressed="true"]{border-color:var(--acc);box-shadow:0 0 0 3px var(--accs),0 8px 18px rgba(74,16,48,.12)}
.g3c svg{width:100%;max-width:150px;height:auto;display:block}
.g3c img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:11px;display:block;margin-bottom:4px;background:#f6eef1}
.g3c b{font-size:13px;line-height:1.2;font-weight:850;margin-top:2px}
.g3c small{font-size:11px;color:#7a5a63;line-height:1.25}
.g3d-info{margin-top:10px;background:#1c0b14;color:#f3e7ec;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.55;min-height:48px}
.g3d-info b{color:#fff}.g3d-info i{color:#ffc9d6}
.g3d-hint{color:#d7b9c4;font-size:13px}
/* fluxo */
.flow{background:radial-gradient(circle at 20% 0%,#fdf0f0 0,#fbf7f7 45%,#fff 100%);border:1px solid #f1dcdd;border-radius:18px;padding:18px 14px;margin:16px 0;text-align:center}
.flow-t{font-size:11px;font-weight:900;letter-spacing:1.3px;text-transform:uppercase;color:var(--acc);margin-bottom:10px}
.flow .node{display:inline-block;position:relative;background:#fff;border:1px solid #f0dcdd;border-radius:14px;padding:10px 15px;margin:2px auto;font-size:13.5px;font-weight:650;color:#2a1a20;box-shadow:0 3px 10px rgba(74,11,18,.07),inset 4px 0 0 #e8b4b8;text-align:left;max-width:100%}
.flow .node.r{background:linear-gradient(135deg,#fff5f5,#fde6e7);border-color:#f3c9cc;box-shadow:0 3px 10px rgba(179,20,28,.10),inset 4px 0 0 #b3141c}
.flow .node.g{background:linear-gradient(135deg,#f1faf5,#e2f4ea);border-color:#c3e5d2;box-shadow:0 3px 10px rgba(22,132,91,.10),inset 4px 0 0 #16845b}
.flow .node.a{background:linear-gradient(135deg,#fffaf0,#fdf0d8);border-color:#efd9ad;box-shadow:0 3px 10px rgba(183,121,31,.10),inset 4px 0 0 #b7791f}
.flow .node.p{background:linear-gradient(135deg,#f7f4fe,#ece6fb);border-color:#d6cbf3;box-shadow:0 3px 10px rgba(107,79,192,.10),inset 4px 0 0 #6b4fc0}
.flow .node.b{background:linear-gradient(135deg,#f2f7fe,#e5effc);border-color:#c8daf1;box-shadow:0 3px 10px rgba(40,103,216,.10),inset 4px 0 0 #2867d8}
.flow .down{display:block;width:30px;height:30px;margin:6px auto;border-radius:50%;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 5v13m0 0-5-5m5 5 5-5' fill='none' stroke='%23b3141c' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/18px no-repeat;border:1px solid #f0c8cb;box-shadow:0 2px 6px rgba(179,20,28,.15)}
.flow .node{display:table}
.flow .down{width:24px;height:24px;margin:4px auto;background-size:15px}
@media (min-width:700px){.flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 6px}.flow-t{flex:0 0 100%;margin-bottom:4px}.flow .node{display:block;margin:0;max-width:260px}.flow .down{margin:0;transform:rotate(-90deg);flex:0 0 24px}}
/* vs */
.vs2{display:grid;grid-template-columns:1fr 46px 1fr;gap:10px;align-items:stretch;margin:14px 0}
.vs2 .side{border-radius:16px;padding:14px;font-size:14px;line-height:1.5}
.vs2 .bad{background:#fde7e9;border:2px dashed #e11d48;color:#5f1020}
.vs2 .good{background:#e3f0ff;border:2px solid #3b6fd6;color:#10284f}
.vs2 .mid{align-self:center;text-align:center;font-size:30px;font-weight:900;color:var(--acc)}
.vs2 .tag{display:inline-block;font-size:10.5px;font-weight:900;letter-spacing:.06em;padding:3px 9px;border-radius:999px;margin-bottom:8px;text-transform:uppercase;color:#fff}
.vs2 .bad .tag{background:#e11d48}.vs2 .good .tag{background:#3b6fd6}
.vs2 b{display:block;font-size:15.5px;margin-bottom:4px}
.vs2 ul{margin:4px 0 0;padding-left:18px}
/* textos literais do slide e do repaso, recolhidos */
details.slidebox,details.repbox{border-radius:14px;margin:12px 0;background:#f6f7fb;border:1px solid #e6e9f2}
details.repbox{background:#fff8eb;border-color:#f1dcae}
details.slidebox>summary,details.repbox>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:9px;padding:10px 14px;font-size:12.5px;font-weight:800;color:#3c4a66}
details.repbox>summary{color:#8a5300}
details.slidebox>summary::-webkit-details-marker,details.repbox>summary::-webkit-details-marker{display:none}
details.slidebox>summary:before,details.repbox>summary:before{content:"";flex:none;width:22px;height:22px;border-radius:7px;background:#e3e7f1 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='4' y='5' width='16' height='12' rx='2' fill='none' stroke='%233c4a66' stroke-width='2'/%3E%3Cpath d='M9 21h6' stroke='%233c4a66' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") center/15px no-repeat}
details.repbox>summary:before{background:#f6e2b8 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='9' y='3' width='6' height='11' rx='3' fill='none' stroke='%238a5300' stroke-width='2'/%3E%3Cpath d='M6 11a6 6 0 0 0 12 0M12 17v4' fill='none' stroke='%238a5300' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") center/15px no-repeat}
details.slidebox>summary:after,details.repbox>summary:after{content:"ver";margin-left:auto;font-size:11px;font-weight:800;color:#7b879e;background:#fff;border:1px solid #e1e5ee;border-radius:999px;padding:2px 9px}
details[open].slidebox>summary:after,details[open].repbox>summary:after{content:"ocultar"}
details.slidebox>.callout,details.repbox>.callout{margin:0 10px 10px;border-radius:0 12px 12px 0}
/* lâminas do slide em miniatura */
.laminas{margin:14px 0;background:#fbfbfd;border:1px solid #eceef5;border-radius:16px;padding:10px 12px}
.laminas .lam-t{display:block;font-size:10.5px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:#6d7891;margin:0 0 8px 2px}
.lam-row{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin}
.lam-row figure.photo{flex:none;margin:0;padding:4px;border-radius:12px;box-shadow:0 2px 8px rgba(15,27,51,.08);background:#fff;max-width:240px}
.lam-row figure.photo img{height:130px;width:auto;max-width:230px;object-fit:cover;max-height:none;border-radius:9px}
.lam-row figure.photo figcaption{font-size:11px;color:#6d7891;max-width:220px;margin:4px 2px 0;line-height:1.3}
/* passo a passo (recrutamento) */
.stp{background:#fff;border:1px solid #f1dfe4;border-radius:22px;padding:14px;margin:18px 0;box-shadow:0 8px 24px rgba(74,16,48,.06)}
.stp-bar{display:flex;gap:6px;overflow-x:auto;padding:2px 2px 8px;scrollbar-width:thin}
.stp-bar button{flex:none;appearance:none;border:1px solid #f0d6dd;background:#fff;color:#5a2a36;border-radius:999px;padding:7px 12px;font:inherit;font-size:12.5px;font-weight:800;cursor:pointer}
.stp-bar button[aria-pressed="true"]{background:var(--acc);border-color:var(--acc);color:#fff}
.stp-svg{border-radius:16px;overflow:hidden;background:#fff}
.stp-svg svg{display:block;width:100%;height:auto}
.stp .sg{transition:opacity .35s}
.stp.foco .sg:not(.on){opacity:.18}
.stp .ring{opacity:0;transition:opacity .3s}
.stp .sg.on .ring{opacity:1}
.stp-info{margin-top:10px;background:#1c0b14;color:#f3e7ec;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.55;min-height:70px}
.stp-info b{color:#fff}
.stp-info .chip{display:inline-block;background:#3a1626;color:#ffd3df;border-radius:8px;padding:2px 8px;margin:4px 4px 0 0;font-size:12px;font-weight:800}
.stp-nav{display:flex;justify-content:space-between;gap:8px;margin-top:10px}
.stp-nav button{appearance:none;border:1px solid #f0d6dd;background:#fff;border-radius:12px;padding:8px 14px;font:inherit;font-weight:800;color:#5a2a36;cursor:pointer}
/* exsudato x transudato e sinais cardinais */
.exu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:16px 0}
.exu figure{margin:0;background:#fff;border:1px solid #eef0f6;border-radius:18px;padding:10px;box-shadow:0 6px 18px rgba(15,27,51,.06)}
.exu svg{display:block;width:100%;height:auto;border-radius:12px}
.exu figcaption{font-size:13px;line-height:1.5;margin-top:8px;color:#37304a;text-align:left}
.exu figcaption .ttl{display:block;font-size:14.5px;margin-bottom:2px}
.sig{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:16px 0}
.sig>div{background:#fff;border:1px solid #f1e3e7;border-radius:16px;padding:10px 10px 12px;text-align:center;box-shadow:0 4px 14px rgba(74,16,48,.05)}
.sig svg{width:58px;height:58px;display:block;margin:0 auto 4px}
.sig b{display:block;font-size:14px}
.sig i{display:block;font-style:normal;font-size:10.5px;font-weight:800;color:#9a7480;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.sig span{display:block;font-size:12px;color:#5b4a52;line-height:1.35}
@media (max-width:760px){
 .gem-row,.exu{grid-template-columns:1fr}
 .vs2{grid-template-columns:1fr}.vs2 .mid{display:none}
 .sig{grid-template-columns:repeat(2,minmax(0,1fr))}
 .g3d-cells{grid-template-columns:repeat(2,minmax(0,1fr));padding:8px;gap:8px}
 .stp{padding:10px}
 .flow .node{font-size:13px}
}
'''
CSS += r'''
.aud3d{margin:14px 0 18px;border-radius:18px;padding:14px;background:linear-gradient(160deg,#fff 0%,var(--accs,#f3f6fb) 100%);border:1px solid rgba(0,0,0,.07);box-shadow:0 10px 26px -14px rgba(20,30,60,.35),inset 0 1px 0 #fff}
.aud-h{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.aud-h b{display:block;font-size:15px;font-weight:800;color:#1c2333}
.aud-h small{display:block;font-size:12px;color:#5b6474;margin-top:2px}
.aud-ico{width:42px;height:42px;flex:0 0 42px;filter:drop-shadow(0 4px 6px rgba(11,92,87,.35))}
.aud-list{display:grid;gap:10px}
.aud-it{background:#fff;border:1px solid #e6e9f0;border-radius:14px;padding:10px 12px;box-shadow:0 2px 8px rgba(20,30,60,.05)}
.aud-top{display:flex;justify-content:space-between;gap:8px;align-items:baseline;margin-bottom:6px}
.aud-top .t{font-weight:750;font-size:13.5px;color:#1c2333}
.aud-top .d{font-size:12px;color:#6b7383;white-space:nowrap}
.aud-it audio{width:100%;height:40px;display:block}
.aud-ctl{display:flex;flex-wrap:wrap;gap:6px 10px;margin-top:8px}
.aud-ctl .grp{display:inline-flex;border:1px solid #dfe3ea;border-radius:10px;overflow:hidden}
.aud-ctl button{border:0;background:#f7f8fb;padding:6px 10px;font:600 12px/1 inherit;color:#334;cursor:pointer;min-height:32px}
.aud-ctl button+button{border-left:1px solid #dfe3ea}
.aud-ctl button[aria-pressed=true]{background:var(--acc,#0c8f8a);color:#fff}
.aud-caps{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}
.aud-caps .lbl{flex:0 0 100%;font-size:10.5px;font-weight:900;letter-spacing:1.1px;text-transform:uppercase;color:var(--acc,#0c8f8a)}
.aud-caps button{border:1px solid #e3e6ee;background:#fbfcfe;border-radius:999px;padding:5px 10px;font:500 12px/1.2 inherit;color:#2a3242;cursor:pointer;text-align:left}
.aud-caps button b{color:var(--acc,#0c8f8a);font-variant-numeric:tabular-nums;margin-right:3px}
.aud-caps button:hover{border-color:var(--acc,#0c8f8a)}
.vid3d{background:#0f1420;border-radius:14px;padding:10px;margin-bottom:10px;box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}
.vid-t b{display:block;color:#fff;font-size:13.5px}.vid-t small{display:block;color:#aab3c5;font-size:11.5px;margin:2px 0 8px}
.vid-fr{position:relative;padding-top:56.25%;border-radius:10px;overflow:hidden;background:#000}
.vid-fr iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.vid-a{display:inline-block;margin-top:8px;color:#9fe8e1;font-size:12px;font-weight:700;text-decoration:none}
'''
CSS += r'''
/* ---------- versão impressa / PDF: mesmo visual da tela ---------- */
.g3d-print,.stp-print,.qprint{display:none}
.pill.pdf-dl{background:#fff;color:#1b3478;border-color:#fff;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.pill.pdf-dl:hover{background:#eef2fd}
@media print{
  @page{size:A4;margin:12mm 10mm 14mm}
  *,*::before,*::after{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
  html{scroll-behavior:auto}
  body{background:#fff!important;font-size:14.5px}
  .topbar,.sidebar,.toc,.topic-nav,.complete-btn,.progress-card,.lightbox,.aud3d,.stp-bar,.stp-nav,.stp-info,.g3d-info,.g3d-h .tap,.quiz,.mobile-menu,.search-wrap{display:none!important}
  .layout{display:block!important;max-width:none!important;padding:0!important;margin:0!important}
  main{width:auto!important}
  .topic{display:block!important}
  .topic+.topic{break-before:page}
  .section{box-shadow:none!important;border:1px solid #e7eaf2;border-radius:18px;padding:20px 22px;margin:12px 0}
  .section-head,.sum60,.photo,.gem,.flow,.vs2,.exu,.sig,.stp-svg,.g3d-cells,.gp-i,.qp-l>li,.qp-g li,tr,figure{break-inside:avoid}
  h2,h3,h4,.flow-t,.qp-t,.qp-gt,summary{break-after:avoid}
  .section{padding-bottom:6px}.section>:last-child,.qprint,.qp-g{margin-bottom:0}
  figure.photo img{cursor:auto;max-height:640px}
  details>summary .pill,details>summary::after{display:none!important}
  details>summary{pointer-events:none}
  .lam-row{flex-wrap:wrap!important;overflow:visible!important}
  .lam-row figure.photo{max-width:200px}
  .tbl-wrap,.org{overflow:visible!important}
  table{width:100%!important}
  .g3d-cells{grid-template-columns:repeat(4,1fr)!important}
  .g3d-print{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
  .gp-i{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:12px;padding:8px 10px;font-size:12.5px;line-height:1.45}
  .gp-i b{display:inline;color:inherit}
  .gp-tx>b:first-child{font-size:13.5px;color:var(--acc)}
  .gp-i small{display:block;font-size:10px;color:#6b7383;margin-bottom:2px;text-transform:uppercase;letter-spacing:.6px}
  .hero{break-inside:avoid}
  #inicio .btn,#inicio .section:has(.grid4),.pdf-dl{display:none!important}
  .hero:after{display:none}
  .stp-print{display:block;margin:10px 0 0;padding-left:22px;font-size:13px;line-height:1.5}
  .stp-print li{margin:0 0 8px}
  .stp-print .chip{display:inline-block;margin:3px 4px 0 0;padding:2px 8px;border-radius:999px;background:var(--accs);color:var(--acc);font-size:10.5px;font-weight:800}
  .qprint{display:block;margin:14px 0}
  .qp-t{font-size:16px;font-weight:900;color:var(--acc);margin:4px 0 10px}
  .qp-t small{font-size:11px;font-weight:600;color:#6b7383;margin-left:6px}
  .qp-l{padding-left:24px;margin:0}
  .qp-l>li{margin:0 0 12px;font-size:13.5px}
  .qp-q{font-weight:700}
  .qp-c{background:#f3f6fb;border-left:3px solid var(--acc);border-radius:0 10px 10px 0;padding:6px 10px;margin:5px 0;font-size:12.5px}
  .qp-o{list-style:none;padding:0;margin:5px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:3px 14px}
  .qp-o li{font-size:12.8px}
  .qp-o b{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:6px;background:var(--accs);color:var(--acc);font-size:10.5px;margin-right:4px}
  .qp-g{margin-top:14px;background:#f7f9fc;border:1px solid #e3e8f1;border-radius:14px;padding:12px 14px;break-before:auto}
  .qp-gt{display:block;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--acc);margin-bottom:6px}
  .qp-g ol{list-style:none;padding:0;margin:0;font-size:12.3px;line-height:1.45}
  .qp-g li{margin:0 0 5px}
  .footer{padding-top:14px}
}
'''
