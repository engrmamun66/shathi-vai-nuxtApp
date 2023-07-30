import Auth from '~/apis/Auth';

function authMethods(functionName = '', ...args) {
    const methods = {
        login(payload = {}) {
            let authState = State('auth')
            Auth.login(payload)
                .then(async (response) => {
                    if (response.status == 200) {
                        useCookie('accessToken').value = response.data.access_token
                        let user = JSON.parse(response.data.user)
                        let guard =  null
                        let dispatcher =  null
                        if (response.data?.guard){
                            guard = JSON.parse(response.data.guard)
                        }
                        if (response.data?.dispatcher){
                            dispatcher = JSON.parse(response.data.dispatcher)
                            dispatcher.id = dispatcher?.dispatcher_id
                        }
                        useCookie('user').value = user
                        State('role').role = user?.role
                        useCookie('role').value = user?.role
                        if (State('role').role == 'guard'){
                            useCookie('guard').value = guard
                            useCookie('dispatcher_id').value = guard?.dispatcher_id
                            useCookie('dispatcher').value = dispatcher
                        }
                        useCookie('tokenType').value = response.data.token_type
                        useCookie('ID-token').value = btoa(payload.email + ',' + payload.password)
                        let seconds = (new Date().getTime() / 1000) //will give you the seconds since midnight, 1 Jan 1970
                        useCookie('tokenExpire').value = seconds + response.data.expires_in
                        
                        let redirect_to = useRoute().query?.redirect_to ? decodeURI(useRoute().query?.redirect_to) : ''
                        let redirectable = roleMethods().checkRedirectRouteAccess(redirect_to ?? '/')
                        if (redirect_to && redirectable){
                            location.replace(redirect_to)
                        }else{
                            location.replace(roleMethods().getHomeUrl())
                        }
                    } else {
                        Common().toaster('warning', response)
                    }
                }).catch((error) => {
                    if (error.response.status == 401 ){
                        authState.error.type = 401
                        authState.error.message = error.response.data.error
                        Common().toaster('error', error.response.data.error)
                    }else{
                        authState.error.type = 422
                        authState.error.message = error.response.data.errors
                    }
                }).finally(()=>{
                    State('auth').loading = false
                });
        },
        loginFromInspectDeploy(){
            if(useRoute().query.hasOwnProperty('token')){
                let token = useRoute().query.token
                let [email, password] = atob(token).split(',')
                if(email && password){
                    authMethods().resetCookies()
                    authMethods().login({email, password})
                }
            }
        },
        logout() {
            Auth.logout()
                .then((response) => {
                    if (response.status == 200) {
                        authMethods().resetCookies()
                        State('menu').showProfilePopup = false
                        navigateTo('/login')
                    }
                }).catch(error => {
                    if(error != 'Assess token has expired') Common().toaster('error', error)
                }).finally(()=>{
                    State('auth').loading = false
                });
        },
        logoutIfExpireToken(){
            if(useCookie('tokenExpire').value <= (new Date().getTime() / 1000) || useCookie('tokenExpire').value == undefined){
                authMethods().resetCookies()
                if(useRoute().path != '/login'){
                    navigateTo('/login?' + (
                        encodeURI(useRoute().path != '/' ?
                            ('redirect_to=' + encodeURI(useRoute().fullPath)) : ''))
                    )
                }
            }
        },
        resetCookies() {
            useCookie('accessToken').value = null
            useCookie('user').value = null
            useCookie('role').value = null
            useCookie('guard').value = null
            useCookie('tokenType').value = null
            useCookie('ID-token').value = null
            useCookie('tokenExpire').value = null
            useCookie('dispatcher_id').value = null
            useCookie('dispatcher').value = null
            useNuxtApp().$setLocal('header:company', '')
            useNuxtApp().$setLocal('header:site', '')
        },
        isLogin() {
            return (useCookie('accessToken').value)
        },
    };

    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if (functionName && methods.hasOwnProperty(functionName)) {
        return methods[functionName](...args)
    } else {
        return methods
    }
}

export { authMethods }; // We can call this function globally

export default function () {
    return useState('auth', () => ({
        user: null,
        error: { type: 401, message: null },
        loading:false,
    }))
}

