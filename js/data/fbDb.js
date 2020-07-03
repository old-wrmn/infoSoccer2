import idb from "/js/lib/idb.js";
import loadPage from '/js/loader/pageLoader.js';

//initialize
const dbPromised = idb.open("infoSoccer", 1, function (upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("matches", {
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
            const tx = db.transaction("matches", "readwrite");
            const store = tx.objectStore("matches");
            store.put(article);
            return tx.complete;
        })
        .then(() => {
            M.toast({
                html: "Match Tersimpan",
                classes: "rounded",
            });
            document.getElementById('save').classList.add('disabled');
            document.querySelector('h3').innerHTML += ' (Saved)'
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
            const tx = db.transaction("matches", "readwrite");
            const store = tx.objectStore("matches");
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
                const tx = db.transaction("matches", "readonly");
                const store = tx.objectStore("matches");
                return store.getAll();
            })
            .then((matches) => {
                resolve(matches);
            });
    });
};

//get match saved by id
const getById = (id) => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("matches", "readonly");
                const store = tx.objectStore("matches");
                return store.get(Number(id));
            })
            .then(function (match) {
                resolve(match);
            });
    });
};

export default {
    getAll,
    getById,
    deleteThis,
    saveForLater,
};