// Testes do sinus/drive-sync.js com os catálogos reais do repositório (rodar: node tests/drive-sync.test.cjs)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repo = path.resolve(__dirname, '..');
global.CustomEvent = class { constructor(t, o) { this.type = t; this.detail = o && o.detail; } };
const W = global.window = { dispatchEvent() {} };
global.fetch = async (p) => {
  const f = path.join(repo, p.replace(/^\//, ''));
  if (!fs.existsSync(f)) return { ok: false, status: 404, json: async () => ({}) };
  return { ok: true, status: 200, json: async () => JSON.parse(fs.readFileSync(f, 'utf8')) };
};
require(path.join(repo, 'sinus/drive-sync.js'));

// Nomes de pastas reais observados no Drive (turmas A, B, C e G) -> matéria do app
const NOMES = {
  'Farmacologia I': 'Farmacología I', 'Anatomia patológica I': 'Anatomía Patológica I',
  'Semiologia I': 'Semiología Médica I', 'Imagenologia': 'Imagenología', 'Fisio patologia I': 'Fisiopatología I',
  'ANATOMIA PATOLÓGICA': 'Anatomía Patológica I', 'FARMACOLOGIA': 'Farmacología I', 'SEMIOLOGIA': 'Semiología Médica I',
  'MEDICINA DE LA FAMILIA': 'Medicina de la Familia', 'FISIOPATOLOGIA': 'Fisiopatología I',
  'ANATOPATOLOGIA 1': 'Anatomía Patológica I', 'SEMIOLOGÍA PRACTICA ': 'Semiología Médica I',
  'SEMIOLOGÍA 1': 'Semiología Médica I', 'FISIOPATOLOGIA 1': 'Fisiopatología I',
  'FARMACOLOGÍA': 'Farmacología I', 'MEDICINA DA FAMÍLIA': 'Medicina de la Familia',
  'FISIOPATOLOGÍA I': 'Fisiopatología I', 'ANATOMÍA PATOLÓGICA I': 'Anatomía Patológica I',
};

const failures = [];
const test = (name, fn) => { try { fn(); console.log('ok  ', name); } catch (e) { failures.push(name); console.log('FAIL', name, '\n    ', e.message); } };

(async () => {
  await W.SinusDrive.ready;

  test('catálogos carregam sem erro', () => {
    assert.deepStrictEqual(W.SinusDrive.state.errors, []);
  });

  test('todas as variações de nome de pasta caem na matéria do app', () => {
    for (const [pasta, esperado] of Object.entries(NOMES)) {
      assert.strictEqual(W.SinusDriveSubjectName(pasta), esperado, `pasta "${pasta}"`);
    }
  });

  test('pastas que não são matéria não criam matéria', () => {
    assert.strictEqual(W.SinusDriveSubjectName('Horários ônibus UCP'), 'Horários ônibus UCP');
  });

  const vazio = () => ({ slides: [], provas: [], audios: [], videos: [], pratica: [], complementares: [] });
  const DB = { subjects: {
    'Anatomía Patológica I': vazio(), 'Semiología Médica I': vazio(), 'Farmacología I': vazio(),
    'Fisiopatología I': vazio(), 'Imagenología': vazio(), 'Medicina de la Familia': vazio(),
  } };
  W.SinusDrive.apply(DB, 5, 'G');

  test('5G: slide de prática do Drive aparece em pratica (aba Aulas práticas)', () => {
    const slide = DB.subjects['Anatomía Patológica I'].pratica.find(i => i.id === '1RfsKKB8cX2BCq202hgTqJbbVRjUlae9y');
    assert.ok(slide, 'slide não encontrado');
    assert.strictEqual(slide.studySection, 'pratica');
    assert.strictEqual(slide.kind, 'PDF');
  });

  test('5G: fotos de lâminas continuam em laminas', () => {
    const fotos = DB.subjects['Anatomía Patológica I'].pratica.filter(i => /^image\//.test(i.mime || ''));
    assert.ok(fotos.length > 0);
    assert.ok(fotos.every(i => i.studySection === 'laminas'));
  });

  test('5G: nenhuma matéria duplicada criada pelos nomes de pasta', () => {
    const extras = Object.keys(DB.subjects).filter(n => !['Anatomía Patológica I','Semiología Médica I','Farmacología I','Fisiopatología I','Imagenología','Medicina de la Familia'].includes(n));
    assert.deepStrictEqual(extras, []);
  });

  if (failures.length) { console.log(`\n${failures.length} falha(s)`); process.exit(1); }
  console.log('\ntodos os testes passaram');
})();
