// Testa sinus/drive-aluno.js + drive-sync.js com API do Drive simulada (rodar: node tests/drive-aluno.test.cjs)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repo = path.resolve(__dirname, '..');
const F = 'application/vnd.google-apps.folder';
const PDF = 'application/pdf';
const tree = {
  '1ArXk0Nk6tJ1tzSBknBa5SwKIgUSjcnyU': [
    { id: '1ACC1MttkR02tbhT6-LUZfyy5ojCLtSBj', name: 'ANATOMÍA PATOLÓGICA I', mimeType: F },
    { id: 'IGNORAR_HORARIO_0001', name: 'Horários ônibus UCP', mimeType: F },
  ],
  '1ACC1MttkR02tbhT6-LUZfyy5ojCLtSBj': [{ id: '1Lu4PuHqqoM2iRAJUV8yl16Gjyz9WaOXR', name: 'PRÁTICA', mimeType: F }],
  '1Lu4PuHqqoM2iRAJUV8yl16Gjyz9WaOXR': [
    { id: '1pdqfGD7IEq3lgRa4zQtTfRj72ahpY51H', name: 'SLIDES', mimeType: F },
    { id: '1QN1thwCgmvmcoE0hYyy4ZuHPRNeSAL_p', name: 'LAMINÁRIO P1', mimeType: F },
  ],
  '1pdqfGD7IEq3lgRa4zQtTfRj72ahpY51H': [{ id: '1CvXWWpSBeVSCRs54El47OsoeuvL-wyW9', name: 'P2', mimeType: F }],
  '1CvXWWpSBeVSCRs54El47OsoeuvL-wyW9': [{ id: '1RfsKKB8cX2BCq202hgTqJbbVRjUlae9y', name: 'clase 2-Lesión celular (anatopato prática).pdf', mimeType: PDF, size: '1731625' }],
  '1QN1thwCgmvmcoE0hYyy4ZuHPRNeSAL_p': [{ id: 'FOTO_LAMINA_000001', name: 'lamina 1.jpg', mimeType: 'image/jpeg', size: '5' }],
  'IGNORAR_HORARIO_0001': [{ id: 'HORARIO_PDF_000001', name: 'onibus.pdf', mimeType: PDF }],
};
let driveCalls = 0;
let tokenOk = true;

global.localStorage = (() => { const m = new Map(); return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), clear: () => m.clear() }; })();
global.CustomEvent = class { constructor(t, o) { this.detail = o && o.detail; } };
const W = global.window = { dispatchEvent() {} };
global.fetch = async (url) => {
  const u = String(url);
  if (u.startsWith('https://www.googleapis.com/drive/v3/files')) {
    driveCalls++;
    const q = decodeURIComponent(new URL(u).searchParams.get('q'));
    const folder = q.match(/'([^']+)' in parents/)[1];
    return { ok: true, status: 200, json: async () => ({ files: tree[folder] || [] }) };
  }
  const f = path.join(repo, u.replace(/^\//, ''));
  if (!fs.existsSync(f)) return { ok: false, status: 404, json: async () => ({}) };
  return { ok: true, status: 200, json: async () => JSON.parse(fs.readFileSync(f, 'utf8')) };
};
W.SinusBackend_driveToken = async () => (tokenOk ? 'TOKEN_DO_ALUNO' : null);
require(path.join(repo, 'sinus/drive-sync.js'));
require(path.join(repo, 'sinus/drive-aluno.js'));

const vazio = () => ({ period: 5, slides: [], provas: [], audios: [], videos: [], pratica: [], complementares: [] });
const novoDB = () => ({ subjects: { 'Anatomía Patológica I': vazio(), 'Semiología Médica I': vazio(), 'Farmacología I': vazio(), 'Fisiopatología I': vazio(), 'Imagenología': vazio(), 'Medicina de la Familia': vazio() } });
const failures = [];
const test = async (name, fn) => { try { await fn(); console.log('ok  ', name); } catch (e) { failures.push(name); console.log('FAIL', name, '\n    ', e.message); } };

(async () => {
  await W.SinusDrive.ready;
  const DB = novoDB();
  W.SinusDrive.apply(DB, 5, 'G'); // contexto do aluno (como em montarDados)

  await test('aluno com token: slide de prática da 5G entra em pratica', async () => {
    const st = await W.SinusDriveAluno.sincronizar(DB, 'G', 5);
    assert.strictEqual(st.state, 'atualizado', JSON.stringify(st));
    const slide = DB.subjects['Anatomía Patológica I'].pratica.find(i => i.id === '1RfsKKB8cX2BCq202hgTqJbbVRjUlae9y');
    assert.ok(slide, 'slide não entrou');
    assert.strictEqual(slide.studySection, 'pratica');
  });

  await test('pasta ignorada da raiz não vira item', async () => {
    const todos = Object.values(DB.subjects).flatMap(s => Object.values(s).filter(Array.isArray).flat());
    assert.ok(!todos.some(i => i.id === 'HORARIO_PDF_000001'));
  });

  await test('fotos de lâmina continuam em laminas', async () => {
    const foto = DB.subjects['Anatomía Patológica I'].pratica.find(i => i.id === 'FOTO_LAMINA_000001');
    assert.ok(foto && foto.studySection === 'laminas');
  });

  await test('segunda abertura no mesmo dia usa cache (sem chamar o Drive)', async () => {
    const antes = driveCalls;
    const DB2 = novoDB(); W.SinusDrive.apply(DB2, 5, 'G');
    const st = await W.SinusDriveAluno.sincronizar(DB2, 'G', 5);
    assert.strictEqual(st.state, 'cache-do-dia');
    assert.strictEqual(driveCalls, antes);
    assert.ok(DB2.subjects['Anatomía Patológica I'].pratica.some(i => i.id === '1RfsKKB8cX2BCq202hgTqJbbVRjUlae9y'));
  });

  await test('sem token e sem cache: não adiciona nada e avisa', async () => {
    localStorage.clear(); tokenOk = false;
    const DB3 = novoDB(); W.SinusDrive.apply(DB3, 5, 'G');
    const st = await W.SinusDriveAluno.sincronizar(DB3, 'G', 5);
    assert.strictEqual(st.state, 'sem-permissao-drive');
    assert.strictEqual(st.added, 0);
    tokenOk = true;
  });

  await test('turma sem pasta cadastrada não busca nada', async () => {
    const st = await W.SinusDriveAluno.sincronizar(novoDB(), 'Z', 5);
    assert.strictEqual(st.state, 'sem-pasta');
  });

  await test('pasta que a conta não enxerga não derruba a sincronização', async () => {
    localStorage.clear();
    tree['1ACC1MttkR02tbhT6-LUZfyy5ojCLtSBj'] = undefined; // simula 404 numa subpasta
    const real = global.fetch;
    global.fetch = async (url, opts) => {
      if (String(url).includes("'1ACC1MttkR02tbhT6-LUZfyy5ojCLtSBj' in parents")) return { ok: false, status: 404, json: async () => ({}) };
      return real(url, opts);
    };
    const DB4 = novoDB(); W.SinusDrive.apply(DB4, 5, 'G');
    const st = await W.SinusDriveAluno.sincronizar(DB4, 'G', 5);
    assert.ok(['parcial', 'sem-acesso-a-pasta'].includes(st.state), st.state);
    global.fetch = real;
  });

  if (failures.length) { console.log(`\n${failures.length} falha(s)`); process.exit(1); }
  console.log('\ntodos os testes passaram');
})();
