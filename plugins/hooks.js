//https://nuxt.com/docs/api/advanced/hooks

export default defineNuxtPlugin(nuxtApp => {
    const log = (...args) => {
        // console.log(...args)
    }

    nuxtApp.hook('app:created', (vueApp) => {
        log('app:created', vueApp);
    })
    nuxtApp.hook('app:error', (err) => {
        log('app:error');
    })
    nuxtApp.hook('app:error:cleared', ({ redirect }) => {
        log('app:error:cleared');
    })
    nuxtApp.hook('app:data:refresh', (keys) => {
        log('app:data:refresh');
    })
    nuxtApp.hook('vue:setup', () => {
        log('vue:setup');
    })
    nuxtApp.hook('vue:error', (err, target, info) => {
        // log('vue:error');
        // console.log('vue:error', err, target, info);
    })
    nuxtApp.hook('app:rendered', (renderContext) => {
        log('app:rendered');
    })
    nuxtApp.hook('app:beforeMount', (vueApp) => {
        log('app:beforeMount');
    })
    nuxtApp.hook('app:mounted', (vueApp) => {
        log('app:mounted');
    })
    nuxtApp.hook('app:suspense:resolve', (appComponent) => {
        log('app:suspense:resolve');
    })
    nuxtApp.hook('link:prefetch', (to) => {
        log('link:prefetch');
    })
    nuxtApp.hook('page:start', (pageComponent) => {
        setTimeout(()=>{
            authMethods().logoutIfExpireToken()
        }, 100)
        log('page:start');
    })
    nuxtApp.hook('page:finish', (pageComponent) => {
        log('page:finish');
    })
    nuxtApp.hook('page:transition:finish', (pageComponent) => {
        log('page:transition:finish');
    })

    return {
        provide: {

        }
    }
})