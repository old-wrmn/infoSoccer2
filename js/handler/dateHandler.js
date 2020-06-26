const format = (date) => {
    const res = date.split('-');
    return [res[2], res[1], res[0]].join('-');
}
const time = (time) => {
    const format = time.replace(/[TZ]+/g, ' ');
    const res = new Date(format);
    res.setHours(res.getHours() + 7);
    let minutes = res.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    const fRes = `${res.getHours()}:${minutes}`
    return fRes;
}
export default {
    format,
    time
};