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
    "endpoint": "https://fcm.googleapis.com/fcm/send/e0zGElymwJQ:APA91bHTt1oiBMjIDyVFAziJ4KogkFo5T2PVJRN12GYMJ0kr_qFVdmkqZ2-L3P8ndVO4hSzUalP_2cClm7omN0e-j09Crb8jvdj9DNOANs7Hq3GCxTFFNud2pxXCot815WtignmduBNl",
    "keys": {
        "p256dh": "BH041+ybhNsMzXn3WWDKmySadoAbtqWHnJr4EpjZquYqwdPJjXpTNJXmPFvEcVlyUns7O18H7FCvRzlGMyqYS/c=",
        "auth": "iOmQwnRDAnEH2WaadcF1Fw=="
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