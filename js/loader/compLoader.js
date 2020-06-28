import fbAPI from '/js/data/fbApi.js';
import fbCache from '/js/data/fbCache.js';
import loadPage from './pageLoader.js';
import loadMatch from './matchLoader.js';
import pathHandler from '/js/handler/pathHandler.js';


const api = new fbAPI();
const fbC = new fbCache();

const compDetail = (compId) => {
    fbC.compStandings(compId)
        .then(data => {
            if (data !== undefined) {
                getInfo(data.competition);
                getStandings(data.standings[0].table);
            }
        });
    api.compStandings(compId)
        .then(data => {
            getInfo(data.competition);
            getStandings(data.standings[0].table);
        });
    loadMatch.getCompMatches(compId);
}

const getInfo = (data) => {
    let infoHTML = '';
    infoHTML += `
        <h3>${data.name}</h3>
        <h5>${data.area.name}</h5>
    `;
    document.getElementById('info').innerHTML = infoHTML;
}
const getStandings = (data) => {
    // console.log(data);
    let standingsHTML = '';
    data.forEach((teams) => {
        standingsHTML += `
        <tr>
            <td>${teams.position}</td>
            <td>
                <a href="#team?teamId=${teams.team.id}">${teams.team.name}</a>
            </td>
            <td>${teams.playedGames}</td>
            <td>${teams.won}</td>
            <td>${teams.draw}</td>
            <td>${teams.lost}</td>
            <td>${teams.points}</td>
        </tr>
        `;
    });
    document.getElementById('standing').innerHTML = standingsHTML;
    document.querySelectorAll("td a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            const urlHash = event.target.getAttribute("href");
            const path = pathHandler(urlHash.substr(1));
            loadPage(path);
        });
    });
}

export default {
    compDetail
}