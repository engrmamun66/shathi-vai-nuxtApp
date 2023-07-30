import moment from "moment-timezone";
import isPendingAnyApi from '~/apis/AllEndPoints'
import objectValidation from "./object-validation/validator";

export const log = (...args) => console.log(...args)
export const dir = (data) => console.dir(data)
export const warn = (data) => console.warn(data)

export const H = {
    // With Field Validation
    objectValidation,
    hasError: function(errors){
        if(errors instanceof Object){
            useNuxtApp().$eventBus('v-validation')
            return Object.keys(errors).length
        }
    },
    getRedStar: function() {
        return '<span class="text-danger ps-1">*</span>'
    },
    // End
    // Start Role check
    isSuper: () => useCookie('role').value === 'superadmin',
    isDispatcher: () => useCookie('role').value === 'dispatcher',
    isCompany: () => useCookie('role').value === 'companyadmin',
    isGuard: () => useCookie('role').value === 'guard',
    //End role
    isRegexPattern: function (text_or_regex) {
        try {
            new RegExp(text_or_regex);
            return true;
        } catch (error) {
            return false;
        }
    },
    randomBetween: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },    
    toggleLoopItem: function (data, index, key = 'isShow') {
        if (!data) return
        data?.forEach((item, i) => {
            if (i == index) {
                item[key] = !(item[key] ?? false)
            } else {
                item[key] = false
            }
        })
    },
    filterText: function (text) {
        let tt = text?.toString()?.replaceAll('_', ' ');
        let result = tt?.[0]?.toUpperCase() + tt?.slice(1)?.toLowerCase();
        return result || text
    },
    formatDate: function (date, format = 'YYYY-MM-DD') {
        if (date) return moment(date).format(format);
    },
    timeFromNow: function (date) {
        if (date){
            let timeText = moment(date).fromNow();
            return timeText.replace('ago', '')
        }
    },
    dateByTimezone: function (utcDateTime, timezone, format = 'YYYY-MM-DD') {
        try {
            let utcMoment = moment.utc(utcDateTime)
            let targetMoment = utcMoment.tz(timezone)
            return targetMoment.format(format)
        } catch (error) {
            return error
        }
    },
    delay: function (callback, time = 1000, ...args) {
        setTimeout(() => {
            callback(...args)
        }, time);
    },
    wordForm: function (word, number) {
        if (number >= -1 && number <= 1) return word
        else return `${word}s`
    },
    getCookie: function (key) {
        return useCookie(key).value
    },
    setCookie: function (key, value = null) {
        useCookie(key).value = value
    }, 
    isPendingAnyApi: function(endPoints){
        return isPendingAnyApi(endPoints)
    },
    back: function(){
        useRouter().back()
    },
    goFullScreen: function(element){
        if(!process.client) return
        const elem = element
        const isFullscreen = document.fullscreenElement 
            || document.mozFullScreenElement 
            || document.webkitFullscreenElement 
            || document.msFullscreenElement;

        if (!isFullscreen) {
            if (elem.requestFullscreen) {
            elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            }
        }
    },
}
