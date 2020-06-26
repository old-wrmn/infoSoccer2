import loadPage from './pageLoader.js';

const loadNav = (page) => {
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

                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open("GET", "/html/nav.html", true);
    xhttp.send();
};

export default loadNav;