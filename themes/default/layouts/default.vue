<template> 
    <div class="softpro-app">
      <MyCanvas use="background"></MyCanvas>
      <slot />
    </div>
</template>

<script setup>
useHead({
  title: "AGSQA",
  titleTemplate: '%s',
  meta: [{ name: "description", content: "My amazing site" }],
  link:[
    {rel: 'icon', type: 'image/x-icon', href:'/img/favicon.png'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'},
    {type:'text/css', rel:'stylesheet', href:'//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/1.0.1/LineIcons.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/2.0/LineIcons.css'},
    {type:'text/css', rel:'stylesheet', href:'//maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//unpkg.com/boxicons@2.1.4/css/boxicons.min.css'},
    // {type:'text/css', rel:'stylesheet', href:'//cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/bootstrap.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/tooltip.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/color/light.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/common.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/transition.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/keyframes.css'},
  ],
});  
</script>

<style scoped>
</style>
