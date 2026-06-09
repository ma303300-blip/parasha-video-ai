// Service Worker — Network First (תמיד מביא גרסה חדשה מהרשת)

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // מחק את כל ה-cache הישן בכל הפעלה
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // תמיד מהרשת — אף פעם לא מה-cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
