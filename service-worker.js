importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`ok`);
else
    console.log(`Workbox fail to load`);

workbox.precaching.precacheAndRoute([{
        url: '/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
        revision: '1'
    },
    {
        url: '/css/icon.css',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/css/style.css',
        revision: '1'
    },
    {
        url: '/html/nav.html',
        revision: '1'
    },
    {
        url: '/html/pages/about.html',
        revision: '1'
    },
    {
        url: '/html/pages/competition.html',
        revision: '1'
    },
    {
        url: '/html/pages/home.html',
        revision: '1'
    },
    {
        url: '/html/pages/match.html',
        revision: '1'
    },
    {
        url: '/html/pages/savedMatch.html',
        revision: '1'
    },
    {
        url: '/html/pages/smatch.html',
        revision: '1'
    },
    {
        url: '/html/pages/team.html',
        revision: '1'
    },
    {
        url: '/js/lib/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/lib/idb.js',
        revision: '1'
    },
    {
        url: '/js/date.js',
        revision: '1'
    },
    {
        url: '/js/script.js',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    }
]);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.cacheFirst({
        cacheName: 'js'
    })
);
workbox.routing.registerRoute(
    new RegExp('/images/icons/'),
    workbox.strategies.cacheFirst({
        cacheName: 'images'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.networkFirst({
        cacheName: 'football-data'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/upload\.wikimedia\.org/,
    workbox.strategies.cacheFirst({
        cacheName: 'club-logo'
    })
);

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'images/icons/icon-32x32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});