const CACHE_NAME = "infoSoccer";
var urlsToCache = [
    "/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "/css/icon.css",
    "/css/materialize.min.css",
    "/css/style.css",
    "/html/nav.html",
    "/html/pages/about.html",
    "/html/pages/competition.html",
    "/html/pages/home.html",
    "/html/pages/match.html",
    "/html/pages/team.html",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-32x32.png",
    "/images/icons/icon-96x96.png",
    "/js/data/fbApi.js",
    "/js/handler/dateHandler.js",
    "/js/handler/pathHandler.js",
    "/js/lib/materialize.min.js",
    "/js/loader/compLoader.js",
    "/js/loader/loader.js",
    "/js/loader/matchLoader.js",
    "/js/loader/navLoader.js",
    "/js/loader/pageLoader.js",
    "/js/loader/teamLoader.js",
    "/js/date.js",
    "/manifest.json",
    "/index.html",
    "/"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});