import moment from "moment";
import CustomConfig from '~/constant.config';
import global from "~/mixins/global";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.mixin(global);
    nuxtApp.vueApp.provide('config', CustomConfig);
    roleMethods('checkAccess')

    // Login from inspect deploy
    authMethods().loginFromInspectDeploy()
    // Load store data
    if (useCookie('accessToken').value) {
        State('auth').user = useCookie('user').value
    }

    // Onloade select sidebar menu
    menuMethods().onloadSelectMenu()

    return {
        provide: {
            Config: (key = '') => {
                if (!key) return CustomConfig
                else {
                    let result = CustomConfig
                    key.split('.').forEach((item, index) => {
                        if (result.hasOwnProperty(item)) result = result[item]
                    })
                    return result
                }
            },
            upper: (str) => str?.toUpperCase() || '',
            lower: (str) => str?.toLowerCase() || '',
            ucfirst: (str) => {
                if(!str) return ''
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            },
            isValidEmail: (email) => {
                let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return email.toLowerCase().match(emailPattern) != null
            },
            textTail: (text, limit = 27, tail = '...') => {
                if (text) return text.length <= limit ? text : Array.from(text).slice(0, limit).join('').trimEnd() + tail
            },
            formatDate: (date, format ='YYYY-MM-DD') => {
                if (date) return moment(date).format(format);
            },
            setLocal: (key, value) => {
                if(process.client){
                    localStorage.setItem(key, value)
                }
            },
            getLocal: (key) => {
                if(process.client){
                    return localStorage.getItem(key)
                }
            },
            last_letters: (text, limit=-15) => {
                if(text?.length){
                    let sliced_text = text.slice(limit)
                    if(text?.length > Math.abs(limit)) sliced_text = '...' + sliced_text
                    return sliced_text
                }
            },
        }
    }
})