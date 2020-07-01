import idb from "/js/lib/idb.js";
import loadPage from '/js/loader/pageLoader.js';

//initialize
const dbPromised = idb.open("infoSoccer", 1, function (upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "match.id",
    });
    articlesObjectStore.createIndex("post_title", "post_title", {
        unique: false,
    });
});

//save
const saveForLater = (article) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("articles", "readwrite");
            const store = tx.objectStore("articles");
            store.add(article);
            return tx.complete;
        })
        .then(() => {
            console.log("Artikel berhasil di simpan.");
            M.toast({
                html: "Match Tersimpan",
                classes: "rounded",
            });
        })
        .catch((e) => {
            M.toast({
                html: `Match Gagal Tersimpan`,
                classes: "rounded",
            });
        });
};

const deleteThis = (data) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("articles", "readwrite");
            const store = tx.objectStore("articles");
            store.delete(data.match.id);
            return tx.complete;
        })
        .then(() => {
            M.toast({
                html: "Match dihapus",
                classes: "rounded",
            });
            let path = {};
            path.target = 'savedMatch';
            loadPage(path);
        })
        .catch((e) => {
            M.toast({
                html: `Match Gagal dihapus`,
                classes: "rounded",
            });
        });
};

//get all match saved
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction("articles", "readonly");
                const store = tx.objectStore("articles");
                return store.getAll();
            })
            .then((articles) => {
                resolve(articles);
            });
    });
};

//get match saved by id
const getById = (id) => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("articles", "readonly");
                const store = tx.objectStore("articles");
                return store.get(Number(id));
            })
            .then(function (article) {
                resolve(article);
            });
    });
};

export default {
    getAll,
    getById,
    deleteThis,
    saveForLater,
};