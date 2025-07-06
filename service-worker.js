// sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('slots-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images/cherry.png',
        '/images/bell.png',
        // Add other assets here
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
