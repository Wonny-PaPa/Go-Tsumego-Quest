/* Go Life Lab — public noncommercial PWA. No uploads of learning records. */
const CACHE_NAME='go-life-lab-public-nc-2026-11-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.png','./icon-192.png','./icon-maskable.png','./apple-touch-icon.png','./favicon.png','./CREDITS_AND_LICENSE.html','./LICENSE_GoGameGuru.txt'];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('go-life-lab-public-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin||url.pathname.endsWith('/sw.js'))return;
  if(!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try{
      const response=await fetch(req);
      if(response.ok&&response.type==='basic')await cache.put(req,response.clone()).catch(()=>{});
      return response;
    }catch(e){
      return await cache.match(req)||(req.mode==='navigate'?await cache.match('./index.html'):undefined)||Response.error();
    }
  })());
});
