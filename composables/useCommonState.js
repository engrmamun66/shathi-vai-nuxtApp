function Common(functionName = '', ...args) {
    const methods = {
        toaster(type, message='', time=3000) {
            let CS = State('common')
            var message = { message: message, type: type, time: new Date().getTime() / 1000 }
            if (message.message?.length > 1 
                && message.message?.toLowerCase()?.indexOf('status code') == -1
                && message.message?.toLowerCase()?.indexOf('axios') == -1
                ){
                CS.messages.push(message)
            }
            setTimeout(() => {
                CS.messages.forEach((item, index) => {
                    if (item.time == message.time) {
                        CS.messages.splice(index, 1)
                    }
                });
            }, time);
        },
        closeToaster(index) {
            State('common').messages.splice(index, 1)
        },
        autoToaster(response, toaster = true, delay=0){
            try {
                if (response.status == 200) {
                    if (response.data.status == 'success' && response.data.data && toaster) {
                        if (typeof response.data.data == 'string') {
                            H.delay(() => Common().toaster('success', response.data.data), delay)
                        }
                        if (typeof response.data.data == 'object') {
                            response.data.data.forEach(msg => {
                                H.delay(() => Common().toaster('success', msg), delay)
                            })
                        }
                    }
                    else if (response.data.status == 'error' && response.data.message) {
                        if (typeof response.data.message == 'string') {
                            H.delay(() => Common().toaster('warning', response.data.message), delay)
                        }
                        if (typeof response.data.message == 'object') {
                            response.data.message.forEach(msg => {
                                H.delay(() => Common().toaster('warning', msg), delay)
                            })
                        }
                    }
                }
                return response.status == 200 && response.data.status == 'success'
            } catch (error) {
                console.warn(error)
            }
        },
        /* -------------------------------------------------------------------------- */
        /*                               Modal Function                               */
        /* -------------------------------------------------------------------------- */
        useMixin(mixin, exlude=true) {
            if (mixin && !useNuxtApp().vueApp._context.mixins.includes(mixin)) {
                if (exlude) useNuxtApp().vueApp._context.mixins = useNuxtApp().vueApp._context.mixins.slice(0, 1)
                useNuxtApp().vueApp.mixin(mixin)
            }
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

function formatBytes(bytes, roundType='' /**ceil/floor */, middle=false) {
    if (bytes == 0) {
        return '0 bytes';
    }
    let decimal = 2;
    let k = 1000;
    let dm = decimal + 1 || 3;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let result = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
    if (['ceil', 'floor'].includes(roundType) && roundType) 
        result = Math[roundType](result)
    return result + middle + sizes[i];
}

let LOCAL = Intl.DateTimeFormat().resolvedOptions().locale
let TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
function cloneDeep(data) {
    return JSON.parse(JSON.stringify(data))
}
function randBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let getExcerpt = (text, maxlen = 20, joiner="...") => {
    if (text.length > maxlen) {
        let slap = Math.floor(maxlen / 2)
        return Array.from(text).slice(0, slap).join('') + joiner + Array.from(text).slice(-(slap)).join('')
    } else {
        return text
    }
}

export { Common, formatBytes, getExcerpt, LOCAL, TIMEZONE, cloneDeep, randBetween }; // We can call this function globally

export default function () {
    return useState('common', () => ({
        DOM_LOADED: false,
        messages: [],
        headerActions: false,
        zoom: 16,
        queryData :{
            company_id: null,
            site_id: null,
            guard: null,
        },
        isDragging: false, //guards/assign-to-clusters
        tempGuard: null,
        center: null,
        cluserZoom: 3,
        showCheckpoints: false,
        expand_clusters: false,
        default_cluster_color: '#000000',
        clickedFirstRow: false,
    }))
}

