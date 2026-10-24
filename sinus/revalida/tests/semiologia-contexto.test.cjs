// Executar: node --test sinus/revalida/tests/semiologia-contexto.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const code = fs.readFileSync(path.resolve(__dirname,'../../revalida-semiologia.js'),'utf8');
const window = {};
vm.runInNewContext(code,{ window, document:{} });
const alerts = text => window.SinusSemiologia.analyze(text).alerts.map(x=>text.slice(x.start,x.end));
test('criança não usa limiar de pressão de adulto',()=>{
 assert.equal(alerts('Criança de 5 anos, PA 80/50 mmHg. Qual a conduta?').length,0);
});
test('idade abaixo de 18 anos sem palavra criança permanece pediátrica',()=>{
 assert.equal(alerts('Paciente de 12 anos, PA 80/50 mmHg.').length,0);
});
test('sem idade explícita não atribui limiar adulto de PA',()=>{
 assert.equal(alerts('Paciente apresenta PA 80/50 mmHg.').length,0);
});
test('adulto: pressão baixa sinalizada',()=>{
 assert.ok(alerts('Homem de 54 anos, PA 80/50 mmHg.').some(x=>/80\/50/.test(x)));
});
test('febre isolada não é classificada como sepse',()=>{
 assert.equal(alerts('Paciente de 48 anos, febre há 2 dias.').length,0);
});
test('infecção com oligúria combina sinais para alerta contextual',()=>{
 assert.ok(alerts('Paciente de 65 anos, pneumonia e oligúria. Qual a conduta?').includes('oligúria'));
});
test('oligúria negada não dispara regra de sepse',()=>{
 assert.equal(alerts('Paciente de 65 anos, pneumonia, sem oligúria.').length,0);
});
test('ausência de infecção não cria alerta de sepse',()=>{
 assert.equal(alerts('Paciente de 65 anos, oligúria isolada.').length,0);
});
