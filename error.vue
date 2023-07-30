<template>  
   <div class="d-flex align-items-center justify-content-center vh-100" >
        <div class="text-center">
            <h1 class="display-1 fw-bold text-white-50">{{ error.statusCode }}</h1>
            <p class="fs-3"> <span class="text-danger">Opps!</span> {{ error.statusMessage }}</p>
            <p class="lead mt-1">
                {{ error.message }}
            </p>
            <button @click="handleError"  class="btn btn-success mt-3"> Go Home </button>
        </div>
    </div>
</template>
<script setup>
defineProps(['error'])
useHead({
    title: 'Error',
    meta: [{ name: "error-page", content: "My amazing site434." }],
    bodyAttrs: [{"class": "softpro-theme-light"},],
    link:[
        {rel: 'icon', type: 'image/x-icon', href:'/img/favicon.png'},
        {type:'text/css', rel: 'stylesheet', href:'/css/bootstrap.min.css'},
        {type:'text/css', rel: 'stylesheet', href:'/css/style-admin.css'},
        {type:'text/css', rel: 'stylesheet', href:'/css/sass/style.scss'},
    ]
});

    
    const handleError = () => {
        clearError()
        window.location.replace('/')
    }
    
</script>