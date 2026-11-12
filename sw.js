const NAME='sinus-shell-v14';
const PRECACHE=['./favicon.ico','./favicon.svg','./favicon.png','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./icons/sinus-app-192-v3.png','./icons/sinus-app-512-v3.png','./icons/sinus-app-maskable-512-v3.png','./og/sinus-card.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(NAME).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sinus-')&&k!==NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(url.pathname.startsWith('/admin/'))return;
  if(event.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname==='/'||url.pathname==='/sw.js'){
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
    return;
  }
  if(/\.(?:js|css|png|svg|webp|ico|jpg|jpeg|woff2)$/.test(url.pathname)){
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(NAME).then(cache=>cache.put(event.request,copy))}
      return res;
    })));
  }
});
