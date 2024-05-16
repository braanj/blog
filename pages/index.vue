<template>
  <section v-for="(container, index) in data" :key="index">
    <template v-if="container" v-for="content in container.content">
      <component :is="content.type" :content="content" />
    </template>
  </section>
</template>

<script setup>
const data = await useHomepage();
</script>
