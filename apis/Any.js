export const AnyEndpoints = {
    '1' : `test-distancematrix`,
}

export default {
    // run by command: php artisan cluster_auto_creatio
    async testDistancematrix(config = {}) {
        return await Api().get(`test-distancematrix`, {timeout: 240000/**4 minute*/, ...config})
    },
}
