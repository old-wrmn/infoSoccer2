var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BGLl5utwPPV4xgUIc-sgyqv-gz3v7vG9LUX4SiiiYQs5APhPA6HDEw1co90iQWgsrLuJmhFRHu0AfxYF6N4RDfU",
    "privateKey": "iLWPG2mYV5mXvSvNF_oLiTb-ulPTe_SeCkE3oDme5dE"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ccV9Oecn6qg:APA91bFsYarb38bZI4uePgKi4PeJSZrZVZY3oVzPb0D7uFUiWUJ2pDxtdN67QpxUFQ46azxnRer2jWKpo7KPf2GXtPG99yCBfUt9BBwTOEb4t_56xrInrfVh0p4PJKxLKn2p5izbbKPx",
    "keys": {
        "p256dh": "BENjarqGw0C2BqTcllDDHtlP187UPfype3jziCDJm5rbG29ksZUp/YpjKtjWc4YdZm+csiM5MxHXIpJCCPbF56o=",
        "auth": "NxXRtE1wDXy88pGvrKcjcA=="
    }
};
var payload = 'Jangan Lewatkan Liga Favorit Anda';
var options = {
    gcmAPIKey: '29759766860',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);