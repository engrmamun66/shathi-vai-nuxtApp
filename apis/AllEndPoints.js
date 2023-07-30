import { AnyEndpoints } from './Any'
import { AuthEndpoints } from './Auth'

/**
 * This file will help to show 
 * loader or loading... text bease on current API calling
 */

export const AllEndPoints = {
    Any: {...AnyEndpoints},
    Auth: {...AuthEndpoints},    
}

/**
     * Check any API is calling or not
     * @param endPoints
     * @example 'Site:2' 
     * @example 'Site:2,3 '
     * @example 'Site:2,3|Company:3' etc...
     * @return Boolean
    */
function isPendingAnyApi(endPoints){
    try {
        // return true
        if(!endPoints) return false
        let END_POINTS = State('response').endPoints
        let groups = endPoints?.split('|')
        let all_endpoints = Object.keys(END_POINTS)
        let isMatched = false
        groups?.forEach(group => {
            let [prefix, keys] = group?.split(':')
            keys = keys.split(',')?.map(key => String(key))
            keys?.forEach(key => {
                let path = AllEndPoints?.[prefix]?.[String(key)]
                let pattern = new RegExp(path)
                let is__matched = all_endpoints?.some(end_point => pattern.test(end_point) === true)
                if(is__matched == true){
                isMatched = true
                }
            }) 
        })
        return isMatched
        
        } catch (error) {
        warn(error)
    }
}

export default isPendingAnyApi