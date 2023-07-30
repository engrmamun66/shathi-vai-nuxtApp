export default defineNuxtRouteMiddleware((to, from) => {
  authMethods().logoutIfExpireToken()
});
