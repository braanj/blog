export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory: any = useLocalStorage("history", []);
  navigationHistory.value.push(to.fullPath);
});
