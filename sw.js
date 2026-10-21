// Service worker mínimo do Sinus.
// Não guarda nada em cache de propósito: o site muda com frequência e o aluno
// precisa ver sempre a versão nova. Ele existe para o navegador reconhecer o
// site como aplicativo e oferecer "adicionar à tela de início".
self.addEventListener('install', function () { self.skipWaiting() })
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()) })
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)) })
