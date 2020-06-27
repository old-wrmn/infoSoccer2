//date format
const format = (date) => {
    const res = date.split('-');
    return [res[2], res[1], res[0]].join('-');
}

const localFormat = (date) => {
    const format = date.replace(/[TZ]+/g, ' ');
    const res = new Date(format);
    return res;
}

//time format 
const time = (time) => {
    const res = localFormat(time);
    res.setHours(res.getHours() + 7);
    let minutes = res.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    const fRes = `${res.getHours()}:${minutes}`
    return fRes;
}

const date = (date) => {
    const res = localFormat(date);
    res.setHours(res.getHours() + 7);
    let minutes = res.getMinutes();
    let month = res.getMonth() + 1;
    let nDate = res.getDate();
    let hour = res.getHours();
    if (minutes < 10) minutes = '0' + minutes;
    if (month < 10) month = '0' + month;
    if (nDate < 10) nDate = '0' + nDate;
    if (hour < 10) hour = '0' + hour;
    const fRes = `${nDate}-${month}-${res.getFullYear()} <br> ${hour} : ${minutes} WIB `
    return fRes;
}

const getAge = (date) => {
    const res = localFormat(date);
    const today = new Date();
    return today.getFullYear() - res.getFullYear();
}
export default {
    format,
    getAge,
    date,
    time
};