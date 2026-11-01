/* SINUS · questões baseadas nos quadros do professor (Farmacología I · Dr. Cristhiam Giménez).
   Fonte: src/quadros-prof.json (múltipla escolha, V/F, associação, ordenação, completar, caso clínico e discursiva).
   Converte os itens em (1) flashcards do baralho farmacologia/gimenez e (2) exercícios de múltipla escolha/V-F do Treino. */
export function grupoDe(q) { return q.grupo || 'SNA e pares cranianos (quadro)'; }
const L4 = 'abcd';
const limpa = (s) => String(s).replace(/\s+/g, ' ').trim();
export function toCards(Q) {
  const cards = [];
  let n = 0;
  Q.forEach((q) => {
    const g = grupoDe(q), tag = 'Quadros do professor · ' + q.tema, x = 'Questão autoral baseada nos quadros do professor e na apostila SINUS P2';
    const push = (g2, q2, a2) => cards.push({ id: 'qp-' + (++n), g: g2, t: tag, q: limpa(q2), a: limpa(a2), x });
    if (q.tipo === 'multipla_escolha') push(g, q.enunciado, `${q.resposta.toUpperCase()}) ${q.opcoes[q.resposta]} ${q.justificativa}`);
    else if (q.tipo === 'verdadeiro_falso') q.afirmacoes.forEach((a) => push(g, 'Verdadeiro ou falso? ' + a.a, `${a.r ? 'Verdadeiro' : 'Falso'}. ${a.j}`));
    else if (q.tipo === 'associacao') q.pares.forEach((p) => push(g, `${q.tema}: ${p[0]}`, p[1]));
    else if (q.tipo === 'ordenacao') push(g, q.enunciado, q.itens_na_ordem.map((s, i) => `${i + 1}) ${s}`).join(' → '));
    else if (q.tipo === 'completar') push(g, q.texto, q.lacunas.join(' · '));
    else if (q.tipo === 'caso_clinico') q.subperguntas.forEach((s) => push('Respostas abertas', `${q.enunciado} ${s.p}`, s.r));
    else if (q.tipo === 'discursiva') push('Respostas abertas', q.enunciado, q.modelo_resposta);
  });
  return cards;
}
export function toBlocos(Q) {
  const mapa = new Map();
  const add = (g, item) => { if (!mapa.has(g)) mapa.set(g, []); mapa.get(g).push(item); };
  Q.forEach((q) => {
    const g = grupoDe(q);
    if (q.tipo === 'multipla_escolha') add(g, { q: limpa(q.enunciado), ops: L4.split('').filter((k) => q.opcoes[k]).map((k) => limpa(q.opcoes[k])), r: L4.indexOf(q.resposta), ex: limpa(q.justificativa) });
    else if (q.tipo === 'verdadeiro_falso') q.afirmacoes.forEach((a) => add(g, { q: limpa(a.a), ops: ['Verdadeiro', 'Falso'], r: a.r ? 0 : 1, ex: limpa(a.j) }));
  });
  let i = 0;
  return [...mapa.entries()].map(([g, questoes]) => ({ id: 'qp' + (++i), titulo: g.replace(' (quadro)', ' · quadros'), clase: 'Quadros do professor', questoes }));
}
