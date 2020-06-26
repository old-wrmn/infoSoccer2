import loadNav from './navLoader.js';
import loadPage from './pageLoader.js';

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelectorAll(".sidenav");
    let page = window.location.hash.substr(1);

    M.Sidenav.init(nav);
    loadNav();

    if (page == "") page = "home";
    loadPage(page);
});