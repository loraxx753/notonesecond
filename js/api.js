import config from './config.js'

let base, key = ""

var handler = {
    get: function(obj, prop) {
        if(obj[prop]) {
            return obj[prop]
        } else {
            let queryString = ''
            return async function(requestArguments) {
                const queryArray = [];
                for(let key in requestArguments) {
                    queryArray.push(`${key}=${encodeURIComponent(requestArguments[key])}`)
                }
                queryArray.push(`key=${key}`)

                queryString = queryArray.join('&')

                const response = await fetch(`${base}${prop}?${queryString}`)
                  .then(res => res.json())
                return response

            }
        }
    }
};

const api = new Proxy({
    response: {},
    setConfig: (name) => {
        base = config.api[name].base;
        key = config.api[name].key;
        return this
    }
}, handler);



export default api
