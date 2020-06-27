import fbAPI from '/js/data/fbApi.js';
import dateGet from '/js/date.js';
import loadPage from './pageLoader.js';
import pathHandler from '/js/handler/pathHandler.js';
import dateHandler from '/js/handler/dateHandler.js';

//api call
const api = new fbAPI('42a847b581334122919c6632a0d07ced');

//today match in utc +7
const getTodayMatches = () => {
    api.matches(dateGet(-1), dateGet())
        .then(data => displayMatch(data));
}

//detail match
const getMatch = (id) => {
    api.matchInfo(id)
        .then(data => detailMatch(data));
}

const getTeamMatches = (id) => {
    api.teamMatches(id)
        .then(data => displayMatch(data))
}

//match displayer
const displayMatch = (data) => {
    let matchesHTML = `<h4>${dateHandler.format(dateGet())}</h4>`;

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
}

//matches render
const callMatch = (match) => {
    const res = `    
    <div class="col s12 m6">
        <div class="card grey lighten-4">
            <div class="card-action">
                <a href="#match?id=${match.id}">
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
                <a href="#match?id=${match.id}">
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
                    <span>${dateHandler.date(data.match.utcDate)} WIB (${data.match.status})</span>
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
                        1 st Half
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
    getMatch
};