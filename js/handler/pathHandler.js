//path handler
const pathHandler = (path) => {
    let res = {};
    const main = path.split('?');
    Object.assign(res, {
        "target": main[0]
    });

    //get parameter
    if (main[1] !== undefined) {
        const param = main[1].split('&');
        param.forEach(element => {
            const to = element.split('=');
            res[to[0]] = to[1]
        });
    }
    return res;
}

export default pathHandler;