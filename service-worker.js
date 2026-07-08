const CACHE_NAME='iqra-v3-institutional-phase6';
const ASSETS=['./','./index.html','./css/style.css','./js/app.js','./manifest.json','./assets/icons/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
