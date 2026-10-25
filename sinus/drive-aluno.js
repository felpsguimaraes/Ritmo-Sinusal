/* Sinus · sincronismo do Drive pelo próprio aluno.
   Cada aluno lê as pastas da sua turma com o token da conta Google dele (escopo somente leitura de metadados).
   Resultado em cache por 24 h; sem token e sem cache, nenhum arquivo é adicionado. Nunca baixa arquivos. */
(function (W) {
  'use strict';
  var CONFIG_URL = '/sinus/drive-turmas.json';
  var API = 'https://www.googleapis.com/drive/v3/files';
  var FOLDER = 'application/vnd.google-apps.folder';
  var DAY = 24 * 60 * 60 * 1000;
  var MAX_FOLDERS = 400; // limite de segurança por turma

  function fold(t) {
    return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  async function listChildren(token, folderId) {
    var files = [], pageToken = '';
    do {
      var q = "'" + folderId + "' in parents and trashed = false";
      var url = API + '?q=' + encodeURIComponent(q)
        + '&fields=' + encodeURIComponent('nextPageToken,files(id,name,mimeType,size)')
        + '&pageSize=1000&supportsAllDrives=true&includeItemsFromAllDrives=true'
        + (pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : '');
      var r = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
      if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      var j = await r.json();
      files = files.concat(j.files || []);
      pageToken = j.nextPageToken || '';
    } while (pageToken);
    return files;
  }

  // Percorre a raiz da turma em largura. Retorna { items, ok }.
  async function crawl(token, cfg, ignore) {
    var ignored = new Set((ignore || []).map(fold));
    var items = [], seen = new Set(), ok = true, folders = 0;
    var queue = [{ id: cfg.rootId, path: [] }];
    while (queue.length) {
      var cur = queue.shift();
      if (seen.has(cur.id)) continue;
      seen.add(cur.id);
      if (++folders > MAX_FOLDERS) { ok = false; break; }
      var children;
      try { children = await listChildren(token, cur.id); }
      catch (e) { ok = false; continue; }
      children.forEach(function (c) {
        var name = String(c.name || '').trim();
        if (c.mimeType === FOLDER) {
          if (cur.path.length === 0 && ignored.has(fold(name))) return;
          queue.push({ id: c.id, path: cur.path.concat([name]) });
          return;
        }
        var subject = cur.path[0] || 'Sem matéria';
        var sec = cur.path.slice(1).join('/') || null;
        items.push({
          id: c.id, t: name, m: c.mimeType || '', p: cfg.periodo, c: cfg.turma,
          s: subject, sec: sec, size: Number(c.size || 0), origin: 'drive-aluno-' + cfg.turma.toLowerCase()
        });
      });
    }
    return { items: items, ok: ok };
  }

  var cfgPromise = null;
  function config() {
    if (!cfgPromise) cfgPromise = fetch(CONFIG_URL, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : { turmas: [] } }).catch(function () { return { turmas: [] } });
    return cfgPromise;
  }

  function cacheKey(p, c) { return 'sinus_drive_idx_v2_' + p + '_' + c; }
  function readCache(p, c) { try { return JSON.parse(localStorage.getItem(cacheKey(p, c)) || 'null') } catch (e) { return null } }
  function writeCache(p, c, items) {
    try { localStorage.setItem(cacheKey(p, c), JSON.stringify({ at: Date.now(), items: items })) } catch (e) { /* cota cheia: segue sem cache */ }
  }

  // Ponto de entrada. Chamado ao montar os dados do aluno.
  async function sincronizar(DB, turma, periodo) {
    var status = { turma: turma, periodo: periodo, added: 0, state: 'ok' };
    var c = String(turma || '').toUpperCase(), p = Number(periodo) || 5;
    var cfg = (await config()).turmas.find(function (t) { return Number(t.periodo) === p && String(t.turma).toUpperCase() === c; });
    if (!cfg) { status.state = 'sem-pasta'; return status; }
    cfg = { periodo: p, turma: c, rootId: cfg.rootId };
    var ignore = ((await config()).ignorar) || [];
    var cache = readCache(p, c);
    var fresh = cache && (Date.now() - cache.at) < DAY;
    var items = cache ? cache.items : [];

    if (!fresh) {
      var token = W.SinusBackend_driveToken ? await W.SinusBackend_driveToken().catch(function () { return null }) : null;
      if (!token) {
        status.state = cache ? 'usando-cache' : 'sem-permissao-drive';
      } else {
        var res = await crawl(token, cfg, ignore);
        if (res.items.length && res.ok) { items = res.items; writeCache(p, c, items); status.state = 'atualizado'; }
        else if (res.items.length) { items = res.items; status.state = 'parcial'; writeCache(p, c, items); }
        else { status.state = cache ? 'usando-cache' : 'sem-acesso-a-pasta'; }
      }
    } else { status.state = 'cache-do-dia'; }

    if (W.SinusDrive && items.length) status.added = W.SinusDrive.addItems(items);
    status.total = items.length;
    return status;
  }

  W.SinusDriveAluno = { sincronizar: sincronizar, _crawl: crawl, _fold: fold };
})(window);
