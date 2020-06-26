import fbAPI from './fbApi.js';
import dateGet from '../date.js';

let comp = new fbAPI('42a847b581334122919c6632a0d07ced');

// comp.call('competitions')
//     .then(data => console.log(data));

comp.comp(`PD`)
    .then(result => console.log(result));

// comp.compStandings(2021)
//     .then(result => console.log(result));

// comp.compMatches(2021)
//     .then(result => console.log(result));

// comp.compTeams(2019)
//     .then(data => console.log(data));

// comp.compScorers(2019)
//     .then(data => console.log(data));

// comp.team(1)
//     .then(data => console.log(data));

// comp.player(1)
//     .then(data => console.log(data));

// comp.matches()
//     .then(data => console.log(data));

// comp.matchInfo(264650)
//     .then(data => console.log(data));


console.log(dateGet());
console.log(dateGet(-2));
console.log(dateGet(2));