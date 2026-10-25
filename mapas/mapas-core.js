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
  /* "^rim": só no começo de uma palavra (evita achar "rim" dentro de "primer") */
  function has(n, k) {
    if (k.charAt(0) === '^') return new RegExp('(^|[^a-z0-9])' + esc(k.slice(1))).test(n);
    return n.indexOf(k) > -1 || fuzzyHas(n, k);
  }

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
  /* TEORIA (revisão do PR #4): a resposta inteira é obrigatória; só maiúsculas e espaços são ignorados.
     As palavras-chave servem apenas para sinalizar resposta parcial, nunca acerto.
     Listas (answerSet): a quantidade pedida de itens válidos, sem repetir. Memória: uma resposta por linha. */
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
      var unique = entries.filter(function (v, i) { return entries.indexOf(v) === i; });
      var valid = unique.filter(function (v) { return options.indexOf(v) >= 0; });
      if (valid.length >= item.minimum && (free || valid.length === unique.length)) return 'ok';
      return valid.length ? 'part' : 'miss';
    }
    var accepted = item.acceptedAnswers && item.acceptedAnswers.length ? item.acceptedAnswers : [item.ans];
    var candidates = [n];
    if (free) {   /* uma resposta por linha; a linha inteira também vale (há respostas com ponto e vírgula) */
      candidates = [];
      String(value).split(/\n+/).forEach(function (line) { candidates.push(exactNorm(line)); line.split(';').forEach(function (p) { candidates.push(exactNorm(p)); }); });
    }
    if (accepted.some(function (answer) { return candidates.indexOf(exactNorm(answer)) >= 0; })) return 'ok';
    var legacy = norm(value).trim();
    var hit = (item.keys || []).some(function (g) { return g.some(function (k) { return has(legacy, k); }); });
    return hit ? 'part' : 'miss';
  }

  /* PRÁTICA (láminas): a descrição é texto livre, então a correção procura os conceitos por palavras-chave.
     free = várias respostas no mesmo texto: as palavras proibidas são removidas do texto em vez de invalidar tudo. */
  function evaluateKeys(item, value, free) {
    var n = norm(value).trim();
    if (!n) return 'empty';
    if (item.not && item.not.length) {
      if (free) {
        item.not.forEach(function (k) { n = n.replace(new RegExp('[a-z0-9]*' + esc(k) + '[a-z0-9]*', 'g'), ' '); });
        n = n.trim();
        if (!n) return 'miss';
      } else if (item.not.some(function (k) { return n.indexOf(k) > -1; })) return 'miss';
    }
    var hit = item.keys.filter(function (g) { return g.some(function (k) { return has(n, k); }); }).length;
    return hit === item.keys.length ? 'ok' : hit > 0 ? 'part' : 'miss';
  }

  /* "Taquicardia || Taquicardia sinusal": a primeira é o gabarito; todas valem como resposta completa */
  function answerOf(raw) {
    var all = String(raw).split('||').map(function (x) { return x.trim(); }).filter(Boolean);
    return { ans: all[0] || '', accepted: all.length > 1 ? all : null };
  }

  /* texto com lacunas: "entra [[sodio::sodio|na+]] e água" -> partes */
  var RX = /\[\[(.+?)::(.+?)\]\]/g;
  function tokenize(text, mod, label) {
    var out = [], last = 0, m;
    RX.lastIndex = 0;
    while ((m = RX.exec(text))) {
      if (m.index > last) out.push({ s: text.slice(last, m.index) });
      var pk = parseKeys(m[2]), an = answerOf(m[1]);
      var item = { id: mod.id + '.' + (mod._items.length + 1), ans: an.ans, keys: pk.keys, not: pk.not, label: label };
      if (an.accepted) item.acceptedAnswers = an.accepted;
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
            var pk = parseKeys(h[2]), an = answerOf(h[1]);
            var item = { id: mod.id + '.' + (mod._items.length + 1), hint: h[0], ans: an.ans, keys: pk.keys, not: pk.not, label: r.t + ' · ' + (j + 1) };
            if (an.accepted) item.acceptedAnswers = an.accepted;
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
        // c = [caso, pergunta, resposta, chaves, explicação, opções?, foto?] (foto = { src, w, h, alt } do próprio caso)
        var pk = parseKeys(c[3]), an = answerOf(c[2]);
        var item = { id: mod.id + '.' + (mod._items.length + 1), hint: c[1], caso: c[0], ans: an.ans, keys: pk.keys, not: pk.not, exp: c[4] || '', opts: c[5] || null, fig: c[6] || null, label: 'Caso ' + (i + 1) };
        if (an.accepted && !item.opts) item.acceptedAnswers = an.accepted;
        if (item.opts) { item.keys = [[norm(c[2]).charAt(0)]]; item.not = []; item.mc = true; }
        mod._items.push(item);
        return item;
      });
    } else if (mod.tipo === 'laminas') {
      /* prática: cada lâmina pede ÓRGANO, PROCESO, DESCRIPCIÓN (texto livre, um item por achado) e DX */
      mod._tree = (mod.laminas || []).map(function (L, i) {
        var base = mod.id + '.' + (L.id || ('l' + (i + 1)));
        function mk(suffix, pair, label) {
          var pk = parseKeys(pair[1]);
          var it = { id: base + '.' + suffix, ans: pair[0], keys: pk.keys, not: pk.not, label: label, lam: i };
          mod._items.push(it);
          return it;
        }
        var o = mk('o', L.organo, 'organo'), p = mk('p', L.proceso, 'proceso');
        var d = (L.desc || []).map(function (c, j) { var it = mk('d' + (j + 1), c, 'desc'); it.free = true; it.txt = base + '.d'; return it; });
        var x = mk('x', L.dx, 'dx');
        return { L: L, i: i, key: base, txt: base + '.d', o: o, p: p, d: d, x: x, g: L.g || L.id || ('l' + (i + 1)) };
      });
    } else {
      throw new Error('tipo desconhecido: ' + mod.tipo);
    }
    return mod;
  }

  return { norm: norm, exactNorm: exactNorm, parseKeys: parseKeys, evaluate: evaluate, evaluateKeys: evaluateKeys, compile: compile, tokenize: tokenize, plain: plain };
});
