import fbAPI from '/js/data/fbApi.js';
import fbCache from '/js/data/fbCache.js';
import fbDb from '/js/data/fbDb.js';
import dateGet from '/js/date.js';
import loadPage from './pageLoader.js';
import pathHandler from '/js/handler/pathHandler.js';
import dateHandler from '/js/handler/dateHandler.js';

//api call
const api = new fbAPI();
const fbC = new fbCache();

//today match in utc +7
const getTodayMatches = () => {
    fbC.matches(dateGet(-1), dateGet())
        .then(data => {
            if (data !== undefined) displayMatch(data);
        });
    api.matches(dateGet(-1), dateGet())
        .then(data => displayMatch(data));
}

//detail match
const getMatch = (id) => {

    fbC.matchInfo(id)
        .then(data => {
            if (data !== undefined) detailMatch(data);
        });
    api.matchInfo(id)
        .then(data => detailMatch(data));
}

//get team matches for team page
const getTeamMatches = (id) => {
    fbC.teamMatches(id)
        .then(data => {
            if (data !== undefined) displayMatch(data);
        });
    api.teamMatches(id)
        .then(data => displayMatch(data));
}

//get competition matches for competition page
const getCompMatches = (id) => {
    fbC.compMatches(id, dateGet(-2), dateGet(2))
        .then(data => {
            if (data !== undefined) displayMatch(data);
        });
    api.compMatches(id, dateGet(-2), dateGet(2))
        .then(data => displayMatch(data));
}

//get all saved match from index db
const getSavedMatches = () => {
    fbDb.getAll()
        .then(data => displaySavedMatch(data));
}

//get saved match from index db
const getSavedMatch = (id) => {
    fbDb.getById(id)
        .then(data => detailMatch(data));
}

//saved match data displayer
const displaySavedMatch = (data) => {
    let matchesHTML = ``;

    data.forEach((match) => {
        matchesHTML += callSavedMatch(match.match);
    });
    document.getElementById("matches").innerHTML = matchesHTML;
    document.querySelectorAll(".card-content a, .card-action a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            const urlHash = event.target.getAttribute("href");
            const path = pathHandler(urlHash.substr(1));
            loadPage(path);
        });
    });
}

//match displayer
const displayMatch = (data) => {
    let matchesHTML = ``;

    if (data.count == 0) {
        matchesHTML += 'Tidak ada pertandingan hari ini'
    }

    data.matches.forEach((match) => {
        matchesHTML += callMatch(match);
    });
    document.getElementById("matches").innerHTML = matchesHTML;
    document.querySelectorAll(".card-content a, .card-action a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            const urlHash = event.target.getAttribute("href");
            const path = pathHandler(urlHash.substr(1));
            loadPage(path);
        });
    });
}

//match detail displayer
const detailMatch = (data) => {
    let matchHTML = '';
    matchHTML += callDetail(data);
    document.getElementById("detail").innerHTML = matchHTML;
    document.querySelectorAll(".card-content a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            const urlHash = event.target.getAttribute("href");
            const path = pathHandler(urlHash.substr(1));
            loadPage(path);
        });
    });
    let save = document.getElementById("save");
    let delThis = document.getElementById("delete");
    if (save) {
        save.onclick = function () {
            M.toast({
                html: 'Menyimpan Match...',
                classes: 'rounded'
            });
            fbDb.saveForLater(data);
        }
    }

    if (delThis) {
        delThis.onclick = function () {
            M.toast({
                html: 'Menghapus Match...',
                classes: 'rounded'
            });
            fbDb.deleteThis(data);
        }
    }
}

//matches render
const callMatch = (match) => {
    const res = `    
    <div class="col s12 m6">
        <div class="card blue lighten-5">
            <div class="card-content white">
                <a class="blue-text text-darken-2" href="#match?id=${match.id}">
                    ${match.competition.name}
                    <div class="right">${dateHandler.date(match.utcDate)}<br> </div>
                </a>
            </div>
            <div class="card-content">
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#team?teamId=${match.homeTeam.id}">
                            ${match.homeTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        ${+[match.score.fullTime.homeTeam]}
                    </div>
                </div>
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#team?teamId=${match.awayTeam.id}">
                            ${match.awayTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        ${+[match.score.fullTime.awayTeam]}
                    </div>
                </div>
                <h6 class="right">${match.status}</h6>
                <br>
            </div>
            <div class="card-action white">
                <a class="blue-text text-lighten-2" href="#match?id=${match.id}">
                    Detail >>
                </a>
            </div>
        </div>
    </div>
    `;
    return res;
}

//saved matches render
const callSavedMatch = (match) => {
    const res = `    
    <div class="col s12 m6">
        <div class="card grey lighten-4">
            <div class="card-action">
                <a class="blue-text text-lighten-2" href="#match?id=${match.id}">
                    ${match.competition.name}
                    <div class="right">${dateHandler.date(match.utcDate)}</div>
                </a>
            </div>
            <div class="card-content">
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#team?teamId=${match.homeTeam.id}">
                            ${match.homeTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        ${+[match.score.fullTime.homeTeam]}
                    </div>
                </div>
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#team?teamId=${match.awayTeam.id}">
                            ${match.awayTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        ${+[match.score.fullTime.awayTeam]}
                    </div>
                </div>
                <h6 class="right">${match.status}</h6>
                <br>
            </div>
            <div class="card-action">
                <a class="blue-text text-lighten-2" href="#smatch?id=${match.id}">
                    Detail >>
                </a>
            </div>
        </div>
    </div>
    `;
    return res;
}

//detail render
const callDetail = (data) => {
    const res = `
        <div class="card grey lighten-4">
            <div class="card-content center">
                <div class="row">
                    <span class="card-title">${data.match.competition.name}</span>
                    <span>${dateHandler.date(data.match.utcDate)} (${data.match.status})</span>
                </div>
                <div class="row">
                    <div class="col s4">
                        <a class="link-to" href="#team?teamId=${data.match.homeTeam.id}">
                            ${data.match.homeTeam.name}
                        </a>
                    </div>
                    <div class="col s4">
                        v
                    </div>
                    <div class="col s4">
                        <a class="link-to" href="#team?teamId=${data.match.awayTeam.id}">
                            ${data.match.awayTeam.name}
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.match.score.fullTime.homeTeam]}
                    </div>
                    <div class="col s4">
                        Full Time
                    </div>
                    <div class="col s4">
                        ${+[data.match.score.fullTime.awayTeam]}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.match.score.halfTime.homeTeam]}
                    </div>
                    <div class="col s4">
                        1st Half
                    </div>
                    <div class="col s4">
                        ${+[data.match.score.halfTime.awayTeam]}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${0+data.match.score.fullTime.homeTeam-data.match.score.halfTime.homeTeam-data.match.score.extraTime.homeTeam-data.match.score.penalties.homeTeam}
                    </div>
                    <div class="col s4">
                        2nd Half
                    </div>
                    <div class="col s4">
                        ${0+data.match.score.fullTime.awayTeam-data.match.score.halfTime.awayTeam-data.match.score.extraTime.awayTeam-data.match.score.penalties.awayTeam}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.match.score.extraTime.homeTeam]}
                    </div>
                    <div class="col s4">
                        Extra Time
                    </div>
                    <div class="col s4">
                        ${+[data.match.score.extraTime.awayTeam]}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.match.score.penalties.homeTeam]}
                    </div>
                    <div class="col s4">
                        Penalty
                    </div>
                    <div class="col s4">
                        ${+[data.match.score.penalties.awayTeam]}
                    </div>
                </div>
                <div class="row">
                    <span>Head 2 Head</span>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.head2head.homeTeam.wins]}
                    </div>
                    <div class="col s4">
                        Win
                    </div>
                    <div class="col s4">
                        ${+[data.head2head.awayTeam.wins]}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.head2head.homeTeam.draws]}
                    </div>
                    <div class="col s4">
                        Draw
                    </div>
                    <div class="col s4">
                        ${+[data.head2head.awayTeam.draws]}
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        ${+[data.head2head.homeTeam.losses]}
                    </div>
                    <div class="col s4">
                        Lose
                    </div>
                    <div class="col s4">
                        ${+[data.head2head.awayTeam.losses]}
                    </div>
                </div>
                
            </>
        </div>`;
    return res;
}


export default {
    getTodayMatches,
    getTeamMatches,
    getCompMatches,
    getSavedMatches,
    getSavedMatch,
    getMatch
};