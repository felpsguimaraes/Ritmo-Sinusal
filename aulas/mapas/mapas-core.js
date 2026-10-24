/* Sinus · Mapas guiados — núcleo (sem DOM): leitura dos dados, lacunas e correção por palavras-chave.
   Usado pela tela (mapas.js) e pelo teste automático (tools/testar-mapas.js). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MapasCore = factory();
})(this, function () {
  'use strict';

  /* minúsculas e sem acentos: "Cariólisis" e "cariolisis" valem o mesmo */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
  }

  /* distância de edição ≤ 1 (tolera um erro de digitação em palavras longas) */
  function within1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, d = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++d > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return d + (la - i) + (lb - j) <= 1;
  }
  function fuzzyHas(n, k) {
    if (k.length < 6) return false;
    for (var L = k.length - 1; L <= k.length + 1; L++) {
      for (var s = 0; s + L <= n.length; s++) { if (within1(n.substr(s, L), k)) return true; }
    }
    return false;
  }
  function has(n, k) { return n.indexOf(k) > -1 || fuzzyHas(n, k); }

  /* "a|b;c|d!x|y": grupos separados por ";" (todos precisam aparecer),
     alternativas por "|" (basta uma) e proibidas depois de "!" */
  function parseKeys(spec) {
    var parts = String(spec).split('!');
    var groups = parts[0].split(';').map(function (g) {
      return g.split('|').map(norm).map(function (x) { return x.trim(); }).filter(Boolean);
    }).filter(function (g) { return g.length; });
    var not = parts[1] ? parts[1].split('|').map(norm).map(function (x) { return x.trim(); }).filter(Boolean) : [];
    return { keys: groups, not: not };
  }

  function esc(k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  /* A resposta inteira é obrigatória. Somente caixa e espaços são normalizados.
     Palavras-chave servem apenas para sinalizar resposta parcial, nunca acerto. */
  function exactNorm(s) {
    return String(s == null ? '' : s).normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
  }
  function evaluate(item, value, free) {
    var n = exactNorm(value);
    if (!n) return 'empty';
    if (item.mc) return n === exactNorm(item.ans).charAt(0) || n === exactNorm(item.ans) ? 'ok' : 'miss';
    if (item.answerSet) {
      var options = item.answerSet.map(exactNorm);
      var entries = String(value).split(/[;\n]+/).map(exactNorm).filter(Boolean);
      var unique = entries.filter(function(v,i){return entries.indexOf(v) === i;});
      var valid = unique.filter(function(v){return options.indexOf(v) >= 0;});
      if (valid.length >= item.minimum && (free || valid.length === unique.length)) return 'ok';
      return valid.length ? 'part' : 'miss';
    }
    var accepted = item.acceptedAnswers && item.acceptedAnswers.length ? item.acceptedAnswers : [item.ans];
    // Em memória, escreva uma resposta por linha. Não se procura uma resposta dentro de uma frase contraditória.
    var candidates = free ? String(value).split(/[\n;]+/).map(exactNorm) : [n];
    if (accepted.some(function (answer) { return candidates.indexOf(exactNorm(answer)) >= 0; })) return 'ok';
    var legacy = norm(value).trim();
    var hit = (item.keys || []).some(function (g) { return g.some(function (k) { return legacy.indexOf(k) >= 0; }); });
    return hit ? 'part' : 'miss';
  }

  /* texto com lacunas: "entra [[sodio::sodio|na+]] e água" -> partes */
  var RX = /\[\[(.+?)::(.+?)\]\]/g;
  function tokenize(text, mod, label) {
    var out = [], last = 0, m;
    RX.lastIndex = 0;
    while ((m = RX.exec(text))) {
      if (m.index > last) out.push({ s: text.slice(last, m.index) });
      var pk = parseKeys(m[2]);
      var item = { id: mod.id + '.' + (mod._items.length + 1), ans: m[1], keys: pk.keys, not: pk.not, label: label };
      mod._items.push(item);
      out.push({ b: item });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ s: text.slice(last) });
    return out;
  }

  function compileStep(st, mod, label) {
    if (typeof st === 'string') return { k: 'n', p: tokenize(st, mod, label) };
    if (st.f != null) return { k: 'f', p: [{ s: st.f }] };
    if (st.end != null) return { k: 'end', p: tokenize(st.end, mod, label) };
    if (st.note != null) return { k: 'note', title: st.title || '', p: tokenize(st.note, mod, label) };
    if (st.cols) {
      return {
        k: 'split', q: st.q || '', join: !!st.join,
        cols: st.cols.map(function (c) {
          return { l: c.l || '', s: c.s.map(function (x) { return compileStep(x, mod, (c.l || label)); }) };
        })
      };
    }
    throw new Error('passo desconhecido em ' + mod.id);
  }

  function plain(parts) { return parts.map(function (p) { return p.s != null ? p.s : p.b.ans; }).join(''); }

  /* modelo Desafío das tabelas: a célula inteira fica escondida e vale as chaves de todas as suas lacunas */
  function cellItem(mod, parts, label) {
    var blanks = parts.filter(function (p) { return p.b; }).map(function (p) { return p.b; });
    if (!blanks.length) return null;
    var keys = [], not = [];
    blanks.forEach(function (b) { b.keys.forEach(function (g) { keys.push(g); }); b.not.forEach(function (n) { not.push(n); }); });
    var it = { id: mod.id + '.d' + (mod._ditems.length + 1), ans: plain(parts), keys: keys, not: not, label: label, hint: label };
    mod._ditems.push(it);
    return it;
  }

  /* prepara um módulo: lista de lacunas (mod._items) e estrutura pronta para desenhar (mod._tree) */
  function compile(mod) {
    if (mod._tree) return mod;
    mod._items = [];
    if (mod.tipo === 'mapa') {
      mod._tree = mod.ramas.map(function (r, i) {
        return {
          t: r.t,
          leaves: r.hojas.map(function (h, j) {
            var pk = parseKeys(h[2]);
            var item = { id: mod.id + '.' + (mod._items.length + 1), hint: h[0], ans: h[1], keys: pk.keys, not: pk.not, label: r.t + ' · ' + (j + 1) };
            mod._items.push(item);
            return item;
          })
        };
      });
    } else if (mod.tipo === 'fluxo') {
      mod._tree = mod.pasos.map(function (s, i) { return compileStep(s, mod, 'Etapa ' + (i + 1)); });
      mod._linear = mod._tree.every(function (st) { return st.k !== 'split'; });
      mod._ord = mod._linear ? mod._tree.filter(function (st) { return st.k !== 'note'; }).map(function (st) { return plain(st.p).trim(); }) : null;
    } else if (mod.tipo === 'tabla') {
      mod._tree = {
        cols: mod.columnas,
        rows: mod.filas.map(function (f) {
          return f.map(function (cell, ci) { return tokenize(String(cell), mod, f[0].replace(/\[\[|::.*?\]\]/g, '').slice(0, 40)); });
        })
      };
      mod._ditems = [];
      mod._tree.rows.forEach(function (row, ri) {
        var rowLabel = plain(row[0]);
        row.forEach(function (cell, ci) {
          if (ci > 0) cell._d = cellItem(mod, cell, rowLabel + ' · ' + (mod.columnas[ci] || ''));
        });
      });
    } else if (mod.tipo === 'casos') {
      mod._tree = mod.casos.map(function (c, i) {
        // c = [caso, pergunta, resposta, chaves, explicação, opções?]
        var pk = parseKeys(c[3]);
        var item = { id: mod.id + '.' + (mod._items.length + 1), hint: c[1], caso: c[0], ans: c[2], keys: pk.keys, not: pk.not, exp: c[4] || '', opts: c[5] || null, label: 'Caso ' + (i + 1) };
        if (item.opts) { item.keys = [[norm(c[2]).charAt(0)]]; item.not = []; item.mc = true; }
        mod._items.push(item);
        return item;
      });
    } else {
      throw new Error('tipo desconhecido: ' + mod.tipo);
    }
    return mod;
  }

  return { norm: norm, exactNorm: exactNorm, parseKeys: parseKeys, evaluate: evaluate, compile: compile, tokenize: tokenize, plain: plain };
});
