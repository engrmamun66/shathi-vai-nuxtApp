<template>
  <div class="position-relative">
    <h1>This is a name</h1>  
  </div>

</template>

<script setup>
definePageMeta({
  keepalive: false,
  middleware: ["auth"],
  key: (route) => route.fullPath,
});
useHead({
  titleTemplate: '%s | Home',
});

</script>
