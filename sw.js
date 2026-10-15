/* Service worker da app Sono · Díaita. Ao cambiar a app, subir o número de versión. */
var V='sono-v3';
var ARQ=['./','index.html','manifest.webmanifest','logo.png','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(ARQ);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(caches.open(V).then(function(c){
    return c.match(e.request,{ignoreSearch:true}).then(function(r){
      var red=fetch(e.request).then(function(n){if(n&&n.ok)c.put(e.request,n.clone());return n;}).catch(function(){return r;});
      return r||red;
    });
  }));
});
