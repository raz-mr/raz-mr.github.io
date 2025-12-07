const CACHE_NAME = "raz-app-v2"; // വേർഷൻ മാറ്റി v2 ആക്കി
const urlsToCache = [
  "index.html",
  "home.html",
  "signup.html",
  "forgot.html",
  "icon.png",
  "wifi.png",
  "update.png",
  "cleaner.png",     // പുതിയത്
  "locker.png",      // പുതിയത്
  "organizer.png",   // പുതിയത്
  "netinfo.png"      // പുതിയത്
];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate & Clean old cache
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
