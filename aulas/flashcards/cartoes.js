/* Flashcards de nível alto, feitos a partir dos slides de cada professor.
   Chave: <slug da matéria>/<nome curto do professor, sem acento, minúsculo>.
   Cada cartão: t = tema/clase, q = pergunta, a = resposta, x = explicação e referência ao slide. */
window.SINUS_CARTOES = {
  "anatopato/chamorro": {
    nome: "Dra. Eliana Chamorro", fonte: "Slides de Anatomía Patológica I, Unidad I (Clases 1 a 7), seção F-G", area: "teoria",
    cartoes: [
      { id: "c1-1", t: "Clase 1 · Introducción", q: "¿Qué diferencia la patología general de la patología sistémica?", a: "La general estudia las reacciones habituales de células y tejidos ante estímulos lesivos (ej.: inflamación aguda por bacterias). La sistémica estudia alteraciones de órganos específicos (ej.: cardiopatía isquémica, cirrosis).", x: "Slide 'Introducción'. Es la base de toda la asignatura." },
      /* ... truncated for this example, but in real call the full 281k content is passed ... */
    ]
  }
  /* full content would be here */
};
/* SINUS: navegação do Laminário — exatamente quatro botões: P1, P2, Final e Laminário. */
(function () {
  var D = window.SINUS_CARTOES;
  if (!D) return;
  ['anatopato/p2-videos', 'anatopato/p2-referencias', 'anatopato/p2-sin-rotulo'].forEach(function (k) {
    if (D[k]) D[k]._oculto = true;
  });
  if (D['anatopato/p1']) { D['anatopato/p1'].curto = 'P1'; D['anatopato/p1'].ordem = 1; }
  if (D['anatopato/p2']) { D['anatopato/p2'].curto = 'P2'; D['anatopato/p2'].ordem = 2; D['anatopato/p2'].nome = 'Lâminas da P2 · 143 lâminas nos 10 assuntos'; }
  if (D['anatopato/laminario']) { D['anatopato/laminario'].curto = 'Laminário'; D['anatopato/laminario'].ordem = 4; D['anatopato/laminario'].nome = 'Laminário · acervo completo'; }
  if (!D['anatopato/final']) {
    D['anatopato/final'] = {
      nome: 'Lâminas da avaliação Final',
      curto: 'Final',
      ordem: 3,
      fonte: 'Lâminas da avaliação final (PDF «Laminas Anatopato I - Practica P1_P2_Final»)',
      area: 'pratica',
      cartoes: []
    };
  }
  var lam = D['anatopato/laminario'];
  var vids = (D['anatopato/p2-videos'] && D['anatopato/p2-videos'].cartoes) || [];
  if (lam && vids.length) {
    vids.forEach(function (v) {
      if (!lam.cartoes.some(function (c) { return c.id === v.id; })) {
        var copy = Object.assign({}, v, { g: 'Vídeos' });
        lam.cartoes.push(copy);
      }
    });
  }
})();
