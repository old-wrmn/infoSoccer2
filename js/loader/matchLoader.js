import fbAPI from '/js/data/fbApi.js';
import dateGet from '/js/date.js';
import loadPage from './pageLoader.js';
import pathHandler from '/js/handler/pathHandler.js';
import dateHandler from '/js/handler/dateHandler.js';


const api = new fbAPI('42a847b581334122919c6632a0d07ced');

const getTodayMatches = () => {
    api.matches()
        .then(data => displayMatch(data));
}


const getMatches = () => {
    console.log('mantap');
}

const callMatch = (match) => {
    const res = `    
    <div class="col s12 m6">
        <div class="card">
            <div class="card-action">
                <a href="#match?id=${match.id}">
                    ${match.competition.name}
                    <div class="right">${dateHandler.time(match.utcDate)}</div>
                </a>
            </div>
            <div class="card-content">
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#teams?teamId=${match.homeTeam.id}">
                            ${match.homeTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        0
                    </div>
                </div>
                <div class="row">
                    <div class="col l11">
                        <a class="link-to" href="#teams?teamId=${match.awayTeam.id}">
                            ${match.awayTeam.name}
                        </a>
                    </div>
                    <div class="col l1 right">
                        0
                    </div>
                </div>
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

const displayMatch = (data) => {
    console.log('display');
    console.log(data);
    let matchesHTML = `<h4>${dateHandler.format(dateGet())}</h4>`;

    data.matches.forEach((match) => {
        matchesHTML += callMatch(match);
    });
    document.getElementById("matches").innerHTML = matchesHTML;
    document.querySelectorAll(".card-content a, .card-action a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            const urlHash = event.target.getAttribute("href");
            const path = pathHandler(urlHash.substr(1));
            let page = path.target;
            loadPage(page);
        });
    });
}

export default {
    getTodayMatches,
    getMatches
};