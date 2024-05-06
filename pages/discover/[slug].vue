<template>
  <section v-for="(container, index) in data" :key="index">
    <div v-if="container">
      <div v-for="content in container.content">
        <component :is="`content-${content.type}`" :content="content" />
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const { slug } = route.params;
const { data } = useAsyncData("contentContainers", async (_) => {
  const contentContainers = await useFetchWithCache(`/api/discover/${slug}`);
  return contentContainers;
});
</script>
