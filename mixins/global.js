export default {
    mounted() {
        setTimeout(() => {
            let loader = document.getElementById('site_loader')
            if (loader != null) {
                document.getElementById('site_loader').style.display = 'none'
                State('common').DOM_LOADED = true
            }
        }, 500);
    },
    data() {
        return {
            
        }
    },
    methods: {        
                
    },
}
