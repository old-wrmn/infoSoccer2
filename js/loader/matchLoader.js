import fbAPI from './../data/fbApi.js';
import dateGet from './../date.js';
import loadPage from './pageLoader.js';


const api = new fbAPI('42a847b581334122919c6632a0d07ced');

const getTodayMatches = () => {
    // console.log('nice');
    api.matches()
        .then(data => displayMatch(data));
}


const getMatches = () => {
    console.log('mantap');
}

const displayMatch = (data) => {
    console.log('display');
    console.log(data);
    let articlesHTML = "";

    data.matches.forEach(function (match) {
        articlesHTML += `
            <div class="col s12 m6">
                <div class="card">
                <a href="./article.html?id=${match.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                    </div>
                </a>
                <div class="card-content">
                    <a href="/#teams?teamId=${match.awayTeam.id}">${match.awayTeam.name}</a>
                    <p>${match.homeTeam.name}</p>
                </div>
                </div>
            </div>
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("matches").innerHTML = articlesHTML;
    document.querySelectorAll(".card-content a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
            let page = getParams(window.location.href);;
            // var page = urlParams.get("teamId");
            console.log(page);
        });
    });
}

const getParams = (url) => {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

export default {
    getTodayMatches,
    getMatches
};