<template>
  <NuxtLayout>
    <div class="flex flex-col">
      <div v-if="error.statusCode === '404'" class="porse">
        <h1 class="font-bold">404</h1>
        <p>Page not found!</p>
      </div>
      <div v-else class="porse">
        <h1 class="font-bold">Ooops!</h1>
        <p>Oh no! It looks like somthing went wrong!</p>
      </div>
      <pre>{{ error.message }}</pre>
      <p>Go to the<a href="#" @click="handleError"> first lesson</a></p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();

// Clear error
const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>
