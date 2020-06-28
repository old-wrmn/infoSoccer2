import idb from '/js/lib/idb.js';

var dbPromised = idb.open("infoSoccer", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "match.id"
    });
    articlesObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
});

function saveForLater(article) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("articles", "readwrite");
            var store = tx.objectStore("articles");
            console.log(article);
            store.add(article);
            return tx.complete;
        })
        .then(function () {
            console.log("Artikel berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles);
            });
    });
}


function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.get(Number(id));
            })
            .then(function (article) {
                resolve(article);
            });
    });
}

export default {
    getAll,
    getById,
    saveForLater
};