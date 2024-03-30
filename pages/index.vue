<template>
  <pre>{{ data }}</pre>
</template>

<script setup>
const { data } = useAsyncData("data", async (_) => {
  const data = await useFetchWithCache("/api/home");

  return data;
});
</script>
