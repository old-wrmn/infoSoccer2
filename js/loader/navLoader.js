import loadPage from './pageLoader.js';
import pathHandler from './../handler/pathHandler.js';

const loadNav = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            //menu load
            document.querySelectorAll(".tabs, .sidenav").forEach((elm) => {
                elm.innerHTML = xhttp.responseText;
            });

            //event listener
            document.querySelectorAll(".sidenav a, .tabs a").forEach((elm) => {
                elm.addEventListener("click", (event) => {
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    const urlHash = event.target.getAttribute("href");
                    const path = pathHandler(urlHash.substr(1));
                    loadPage(path);
                });
            });
        }
    };
    xhttp.open("GET", "/html/nav.html", true);
    xhttp.send();
};

export default loadNav;