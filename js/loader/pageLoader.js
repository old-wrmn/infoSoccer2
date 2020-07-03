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
                content.innerHTML = `<div class='center'><h3>Halaman Tidak Ditemukan</h3><h5>Error code  <br>${this.status}</h5></div>`;
            } else {
                content.innerHTML = `<div class='center'><h3>Halaman Tidak Dapat Diakses</h3><h5>Error code <br> ${this.status}</h5></div>`;
            }
        }
    };
    //page call
    xhttp.open("GET", "/html/pages/" + path.target + ".html", true);
    xhttp.send();
}

export default loadPage;