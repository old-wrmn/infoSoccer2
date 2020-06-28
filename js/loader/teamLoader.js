import fbAPI from '/js/data/fbApi.js';
import fbCache from '/js/data/fbCache.js';
import loadMatch from './matchLoader.js';
import dateHandler from '/js/handler/dateHandler.js';

//class call
const api = new fbAPI();
const fbC = new fbCache();

//call team detail by id
const teamDetail = (id) => {
    fbC.team(id)
        .then(data => {
            if (data !== undefined) {
                detailTeam(data);
                getMember(data.squad);
            }
        });
    api.team(id)
        .then(data => {
            detailTeam(data);
            getMember(data.squad);
        });
    loadMatch.getTeamMatches(id);
}

//detail team render
const detailTeam = (data) => {
    let teamHtml = `
        <h4>${data.name}</h4>
        <div class="row">
            <div class="col s12 m3">
                <img class="responsive-img" style="max-height:300px;" src="${data.crestUrl}" />
            </div>
            <div class="col s12 m9">
                <div class="row">
                    <div class="col s3">
                        Short Name
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.shortName}(${data.tla})
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        Coach
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${getCoaches(data.squad)}
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        Venue
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.venue}
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        Founded
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.founded}
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        e-mail
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.email}
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        Phone
                    </div>
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.phone}
                    </div>
                </div>
                <div class="row">
                    <div class="col s3">
                        Website
                    </div> 
                    <div class="col s1">
                      :
                    </div>
                    <div class="col s8">
                        ${data.website}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('team').innerHTML = teamHtml;
}

//get squad member with role coach
const getCoaches = (data) => {
    let res = [];
    data.forEach((member) => {
        if (member.role === "COACH") {
            res.push(member.name);
        }
    })
    //in case coach more than 1
    return res.join(', ')
}

//get squad member with role player
const getMember = (data) => {
    let membersHTML = '';
    data.forEach((member) => {
        if (member.role === "PLAYER") {
            membersHTML += `
            <tr>
                <td>${+member.shirtNumber}</td>
                <td>${member.name}</td>
                <td>${member.position}</td>
                <td>${dateHandler.getAge(member.dateOfBirth)}</td>
            </tr>
            `;
        }
    });

    document.getElementById('member').innerHTML = membersHTML;
}

export default {
    teamDetail
};