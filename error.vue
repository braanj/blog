<template>
  <NuxtLayout>
    <div class="container flex flex-col m-auto text-center items-center p-4">
      <div v-if="error.statusCode === '404'" class="porse">
        <h1 class="font-bold">404</h1>
        <p>Page not found!</p>
      </div>
      <div v-else class="porse">
        <h1 class="font-bold">Ooops!</h1>
        <p>Oh no! It looks like somthing went wrong!</p>
      </div>
      <pre>{{ error.message }}</pre>
      <p>Go to <a href="#" @click="handleError"> home</a></p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>
