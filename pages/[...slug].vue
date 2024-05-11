<template>
  <section v-for="(container, index) in data" :key="index">
    <div v-if="container">
      <div v-for="content in container.content">
        <component :is="content.type" :content="content" />
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const { slug } = route.params;
const currentSlug = ref([...slug].pop());

const data = await usePage(currentSlug.value);
</script>
