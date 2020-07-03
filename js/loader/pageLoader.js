import match from './matchLoader.js';
import team from './teamLoader.js';
import comp from './compLoader.js';
// Load page content
function loadPage(path = {}) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const content = document.querySelector("#body-content");

            //call page on condition
            if (path.target === "home") {
                match.getTodayMatches();
            } else if (path.target === "match") {
                match.getMatch(path.id);
            } else if (path.target === "team") {
                team.teamDetail(path.teamId);
            } else if (path.target === "competition") {
                comp.compDetail(path.compId);
            } else if (path.target === "savedMatch") {
                match.getSavedMatches();
            } else if (path.target === "smatch") {
                match.getSavedMatch(path.id);
            }

            //status handler
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    //page call
    xhttp.open("GET", "/html/pages/" + path.target + ".html", true);
    xhttp.send();
}

export default loadPage;