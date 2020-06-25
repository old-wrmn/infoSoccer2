const dateGet = (itr = 0) => {
    const d = new Date();
    const f = modDate(d, itr);
    return f;
}

const modDate = (date, itr) => {
    date.setDate(date.getDate() + itr);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default dateGet;