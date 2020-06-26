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
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const fRes = `Tanggal ${res.getDate()}-${month}-${res.getFullYear()} Pukul ${res.getHours()}:${minutes}`
    return fRes;
}
export default {
    format,
    date,
    time
};