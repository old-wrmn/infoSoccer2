import match from './matchLoader.js';
// Load page content
function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector("#body-content");

            if (page === "home") {
                match.getTodayMatches();
            }
            // } else if (page === "saved") {
            //     getSavedArticles();
            // }

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "/html/pages/" + page + ".html", true);
    xhttp.send();
}

export default loadPage;