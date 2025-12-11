const CACHE_NAME = 'sales-commission-tracker-v2';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

// Instalacja service workera
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Wymuś aktywację nowego service workera
});

// Fetch - NIE cache'uj requestów API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // NIE cache'uj requestów API - zawsze pobieraj z sieci
  if (url.pathname.startsWith('/api/') || url.hostname.includes('onrender.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Dla innych requestów - cache strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - zwróć odpowiedź z cache
        if (response) {
          return response;
        }
        // Nie ma w cache - pobierz z sieci
        return fetch(event.request).then(
          (response) => {
            // Sprawdź czy odpowiedź jest poprawna
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Klonuj odpowiedź
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Aktywacja - usuń stare cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Wymuś kontrolę nad wszystkimi klientami
});



