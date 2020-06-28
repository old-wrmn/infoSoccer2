import fbApi from './fbApi.js';

class footBallsApi extends fbApi {
    constructor() {
        super();
    }
    //fetch call
    async call(path) {
        if ('caches' in window) {
            const nice = caches.match(this.baseUrl + path).then((response) => {
                if (response) {
                    return response.json();
                }
            })
            this.result = await nice;
            if (this.result) {
                return this.result;
            }
        }
    }

}


export default footBallsApi;