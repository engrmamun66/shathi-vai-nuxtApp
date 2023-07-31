<template>
  <div class="position-relative">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Times</th>
          <th scope="col">Times</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in 100" :key="x + 1">
          <td>
            <ul>
              <li>Abdullah</li>
              <li>01962737747</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>৩ চিল্লা</li>
              <li>সবগুজারি করনেওয়ালা</li>
              <li>সবগুজারি করনেওয়ালা</li>
            </ul>
          </td>
          <td>
            <ul>
              <li class="text-center"><i class="las la-share p-1"></i></li>
              <li class="text-center"><i class="las la-phone-alt p-1 fs-5"></i></li>
              <li class="text-center"><i class="las la-edit p-1 fs-5"></i></li>
            </ul>
          </td>
        </tr>        
      </tbody>
    </table>
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
