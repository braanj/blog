<script setup>
defineProps({
  content: {
    type: {},
  },
});
</script>

<template>
  <div
    class="h-80 bg-cover"
    :style="`background-image: url(${content.featuredImage.media.url})`"
  >
    <h1>{{ content.externalName }}</h1>
    <p>{{ content.subtitle }}</p>
  </div>
</template>
