function roleMethods(functionName = '', ...args) {
    const methods = {
        checkAccess() {

            function isDenied (denieds_arr){
                let {path} = useRoute()
                if(!denieds_arr?.length) return false
                let isDenieded = denieds_arr.some(pattern => new RegExp(pattern).test(path))
                return isDenieded
            }

            let routeFirstSegment = useRoute().path.split('/').splice(1)[0]

            if (H.isSuper()) {
                if (!State('role').superAdminRoutes.pages.includes(routeFirstSegment) || isDenied(State('role').superAdminRoutes.denied)){
                    navigateTo(roleMethods('getHomeUrl'))
                }
            }
            else if (H.isDispatcher()) {
                if (!State('role').dispatcherRoutes.pages.includes(routeFirstSegment) || isDenied(State('role').dispatcherRoutes.denied)){
                    navigateTo(roleMethods('getHomeUrl'))
                }
            }
            else if (H.isCompany()) {
                if (!State('role').companyadminRoutes.pages.includes(routeFirstSegment) || isDenied(State('role').companyadminRoutes.denied)){
                    navigateTo(roleMethods('getHomeUrl'))
                }
            }
            else if (H.isGuard()) {
                if (!State('role').guardRoutes.pages.includes(routeFirstSegment) || isDenied(State('role').guardRoutes.denied)){
                    navigateTo(roleMethods('getHomeUrl'))
                }
            }
        },
        checkRedirectRouteAccess(redirectRoute) { // /checkpoitn  /
            if (!redirectRoute) return false
            let parts, _1stSegment, pages, role
            parts = redirectRoute.split('/')
            _1stSegment = redirectRoute?.startsWith('/') ? (parts[1] || '/') : parts[0]
            
            if (H.isSuper()) pages = State('role').superAdminRoutes.pages
            if (H.isDispatcher()) pages = State('role').dispatcherRoutes.pages
            if (H.isCompany()) pages = State('role').companyadminRoutes.pages
            if (H.isGuard()) pages = State('role').guardRoutes.pages
            
            return pages.includes(_1stSegment) 
        },
        getHomeUrl() {
            if ( H.isGuard()) {
                return State('role').guardRoutes.homeRoute
            } else {
                return '/'
            }
        },
        showMenu(menu){
            if ( H.isGuard()) {
                return State('role').guardRoutes.pages.includes(menu)
            } else if (H.isDispatcher()){
                return State('role').dispatcherRoutes.pages.includes(menu)
            } else if (H.isCompany()) {
                return State('role').companyadminRoutes.pages.includes(menu)
            }else if (H.isSuper()) {
                return State('role').superAdminRoutes.pages.includes(menu)
            }
        }
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

export { roleMethods }; // We can call this function globally

export default function () {
    return useState('role', () => ({
        role: null,
        superAdminRoutes: {
            homeRoute: '/',
            pages: ['', 'users', 'guards', 'checkpoints', 'clusters', 'sites', 'cameras', 'companies', 'login', 'dispatchers', 'reports', 'sites-mapping', 'sites-shift','work-diary'],
            denied: [],
        }, 
        dispatcherRoutes:{
            homeRoute: '/',
            pages: ['', 'guards', 'login', 'dispatchers', 'clusters',  'users', 'sites-mapping', 'work-diary'],
            denied: ['^/users$', 'users/create', 'guards/create'], // pattern supported
        },
        companyadminRoutes:{
            homeRoute: '/',
            pages: ['', 'sites', 'clusters', 'guard-working-schedule', 'sites-mapping'],
            denied: [], // pattern supported
        },
        guardRoutes:{
            homeRoute: '/dashboard-guard',
            pages: ['dashboard-guard','images','login','working-schedules'],
            denied: [],
        },
        isAccessiable: false
    }))
}

