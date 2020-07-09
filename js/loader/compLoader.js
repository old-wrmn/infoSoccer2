import fbAPI from './../data/fbApi.js';
import fbCache from './../data/fbCache.js';
import loadPage from './pageLoader.js';
import loadMatch from './matchLoader.js';
import pathHandler from './../handler/pathHandler.js';

//call class
const api = new fbAPI();
const fbC = new fbCache();

//detail competition loader for competition page
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

//get competition info for competition page
const getInfo = (data) => {
    let infoHTML = '';
    infoHTML += `
        <h3>${data.name}</h3>
        <h5>${data.area.name}</h5>
    `;
    document.getElementById('info').innerHTML = infoHTML;
}

//get competition standings for competition page
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