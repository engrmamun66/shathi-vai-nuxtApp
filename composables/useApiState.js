import axios from 'axios'


function fullURL(config) {
    return config.url + "?" + JSON.stringify(config?.params || [])
}

function endPoint(config) {
    return config.url
}

function Api(accessToken = true) {
    let options = { 
        baseURL: useRuntimeConfig()?.public?.API_BASE_URL || 'https://guard-api-dev.inspectdeploy.io/api',
        timeout: 12000
    }
    
    if (accessToken) options['headers'] = { authorization: useCookie('tokenType').value + " " + useCookie('accessToken').value }
    let api = axios.create(options)
    let loader_timeout = 12000
    api.interceptors.request.use((config) => {
        if (config.url != 'auth/logout') {
            authMethods().logoutIfExpireToken()
        }
        /* -------------------------------------------------------------- */
        /*           Page Loader Control With API response                */
        /* -------------------------------------------------------------- */
        let sms_api = fullURL(config)?.match(/^message\/\d+/g)
        let selectedUserListApi = fullURL(config)?.match(/^user\/selected-list/g)
        if(!sms_api && !selectedUserListApi){                
            State('response').endPoints[endPoint(config)] = true //Pusing in endPoints  
            clearTimeout( State('response').pendings[fullURL(config)] )   
            State('response').pendings[fullURL(config)] = setTimeout(() => {
                    delete State('response').pendings[fullURL(config)] || false
                    delete State('response').endPoints[endPoint(config)] || false
                }, loader_timeout);
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    api.interceptors.response.use((response) => {
        /* -------------------------------------------------------------- */
        /*           Page Loader Control With API response                */
        /* -------------------------------------------------------------- */
        setTimeout(() => {
            delete State('response').pendings[fullURL(response.config)] || false
            delete State('response').endPoints[endPoint(response.config)] || false
        }, 100);
        return response
    }, (error) => {
        return Promise.reject(error);
    })
    return api
}
export { Api }

