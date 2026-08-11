// Simple service worker for mobile performance

const CACHE_NAME = 'mutia-nandhika-portfolio-v1';

const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
];


// ============================================================
// INSTALL EVENT
// ============================================================

self.addEventListener('install', (event) => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then((cache) => {

        return cache.addAll(urlsToCache);

      })
      .catch(() => {

        // Fail silently if caching fails

      })

  );

});


// ============================================================
// ACTIVATE EVENT
// ============================================================

self.addEventListener('activate', (event) => {

  event.waitUntil(

    caches
      .keys()
      .then((cacheNames) => {

        return Promise.all(

          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })

        );

      })

  );

});


// ============================================================
// FETCH EVENT
// Network-first strategy
// ============================================================

self.addEventListener('fetch', (event) => {

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }


  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }


  event.respondWith(

    fetch(event.request)

      .then((response) => {

        // Cache successful responses
        if (response.status === 200) {

          const responseClone =
            response.clone();

          caches
            .open(CACHE_NAME)
            .then((cache) => {

              cache.put(
                event.request,
                responseClone
              );

            });

        }

        return response;

      })

      .catch(() => {

        // Fallback to cache if network fails
        return caches.match(event.request);

      })

  );

});