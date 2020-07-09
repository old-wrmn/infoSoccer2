import dateGet from './../date.js';

class footBallsApi {
    constructor() {
        this.baseUrl = `https://api.football-data.org/v2/`;
        this.token = '42a847b581334122919c6632a0d07ced';
    }

    //fetch call
    async call(path) {
        const response = await fetch(this.baseUrl + path, {
            method: 'GET',
            headers: {
                'X-Auth-Token': this.token
            }
        });
        const data = await response.json();
        return data;
    }

    //competition info or competitions list
    async comp(compId = '') {
        const result = await this.call(`competitions/${compId}`);
        return result;
    }

    //comp standings
    async compStandings(compId) {
        const result = await this.call(`competitions/${compId}/standings`);
        return result;
    }

    //competition matches
    //default today
    async compMatches(compId, dateFrom = dateGet(), dateTo = dateGet()) {
        const result = await this.call(`matches?dateFrom=${dateFrom}&dateTo=${dateTo}&competitions=${compId}`);
        return result;
    }

    //competitions Teams
    async compTeams(compId) {
        const result = await this.call(`competitions/${compId}/teams`);
        return result;
    }

    //competition scorers
    async compScorers(compId) {
        const result = await this.call(`competitions/${compId}/scorers`);
        return result;
    }

    //team info
    async team(teamId) {
        const result = await this.call(`teams/${teamId}`);
        return result;
    }

    async teamMatches(teamId) {
        const result = await this.call(`teams/${teamId}/matches?status=SCHEDULED&limit=10`);
        return result;
    }

    //player info
    async player(playerId) {
        const result = await this.call(`players/${playerId}`);
        return result;
    }

    //matches
    //default today
    async matches(dateFrom = dateGet(), dateTo = dateGet()) {
        const result = await this.call(`matches?dateFrom=${dateFrom}&dateTo=${dateTo}&competitions=2002,2014,2019,2021`);
        return result;
    }

    //match info
    async matchInfo(matchId = '') {
        const result = await this.call(`matches/${matchId}`);
        return result;
    }
}


export default footBallsApi;