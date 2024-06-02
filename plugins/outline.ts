export default defineNuxtPlugin(async () => {
  const { data: outline } = await useFetch("/api/outline");

  return {
    provide: {
      outline,
    },
  };
});
