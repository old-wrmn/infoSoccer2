import loadNav from './navLoader.js';
import loadPage from './pageLoader.js';
import pathHandler from './../handler/pathHandler.js';

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelectorAll(".sidenav");
    const urlHash = window.location.hash;
    const path = pathHandler(urlHash.substr(1));
    console.log(path.target);
    let page = path.target;
    // console.log(page);

    M.Sidenav.init(nav);
    loadNav(page);

    if (page == '') page = 'home';
    loadPage(page);
});