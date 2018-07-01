let cacheName = 'currency_converter_v1';

let cacheFiles =[
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/idb.js',
    './js/currency.js',  
];

self.addEventListener('install', function(e){
   // console.log("{Service Worker}: Installed");
    e.waitUntil (
        caches.open(cacheName)
        .then(function(cache){
        //    console.log("{Service Worker}: Caching Files...");
         return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate', function(e){
    console.log("{Service Worker}: Activated")
});

self.addEventListener('fetch', function(e){
    let  request = new URL(e.request.url);
    if (request.origin === location.origin) {
       
        if (request.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;
        }
    }

     console.log("{Service Worker}: Installed",e.request.url);
});

