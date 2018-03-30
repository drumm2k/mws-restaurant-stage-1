let cacheName = 'rest-reviews-v1';
let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(cacheNames.map(function(currentCacheName){
        if (currentCacheName !== cacheName) {
          caches.delete(currentCacheName);
        }
      }))
    })
  )
})

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(e.request).then(response => {
        return (
          response ||
          fetch(e.request).then(response => {
            cache.put(e.request, response.clone());
            return response;
          })
          .catch(function (err) {
            console.log("[ServiceWorker] Error fetching and caching", err);
          })
        );
      });
    })
  );
})