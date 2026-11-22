/* Go Life Lab — PWA offline shell. Does not clear or change student records. */
const CACHE_NAME = 'go-life-lab-stage11-pwa-v1';
const SHELL = [
  './', './index.html', './manifest.webmanifest', './favicon.png',
  './icon.png', './icon-192.png', './icon-maskable.png', './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('go-life-lab-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.endsWith('/sw.js')) return;
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  // Network-first avoids the common GitHub Pages problem of showing an old update.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(req);
      if (response && response.ok && response.type === 'basic') {
        // A quota or private-mode cache failure must not hide a good online response.
        await cache.put(req, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      return await cache.match(req) ||
        (req.mode === 'navigate' ? await cache.match('./index.html') : undefined) ||
        Response.error();
    }
  })());
});
