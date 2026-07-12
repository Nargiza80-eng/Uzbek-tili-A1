/* Service Worker für Dono Bola - Offline-Cache */
const CACHE_NAME = 'dono-bola-v1';
const urlsToCache = [
  '/Uzbek-tili-A1/',
  '/Uzbek-tili-A1/index.html',
  '/Uzbek-tili-A1/lesson1.html',
  '/Uzbek-tili-A1/lesson2.html',
  '/Uzbek-tili-A1/lesson3.html',
  '/Uzbek-tili-A1/manifest.json',
  '/Uzbek-tili-A1/components/header.css',
  '/Uzbek-tili-A1/components/header.js'
];

// Install: Dateien cachen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch: Aus Cache oder Netzwerk laden
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});
