(async function(config) {

    var handler = {
        get: function(obj, prop) {
            if(obj[prop]) {
                return obj[prop]
            } else {
                let queryString = ''
                return async function(arguments) {
                    const queryArray = [];
                    for(let key in arguments) {
                        queryArray.push(`${key}=${encodeURIComponent(arguments[key])}`)
                    }
                    queryArray.push(`key=${config.api.key}`)

                    queryString = queryArray.join('&')
                    
                    const response = await fetch(`${config.api.base}${prop}?${queryString}`)
                      .then(res => res.json())
                    return response

                }
            }
        }
    };

    window.api =  new Proxy({
        raw: {},
        response: {}
    }, handler);
})(config)
