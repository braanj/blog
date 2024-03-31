<template>
  <section v-for="(container, index) in data" :key="index">
    <div v-if="container">
      <h1>{{ container.internalName }}</h1>
      <div v-for="content in container.content">
        <component :is="`content-${content.type}`" :content="content" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { data } = useAsyncData("contentContainers", async (_) => {
  const contentContainers = await useFetchWithCache("/api/pages/home");
  return contentContainers;
});
</script>
