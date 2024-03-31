<script setup>
const props = defineProps({
  content: {
    type: {},
  },
});

const name = computed(() => {
  return props.content.externalName;
});

const url = computed(() => {
  if (props.content.link.ctaPageUrl) {
    return props.content.link.ctaPageUrl.slug;
  }
});
</script>

<template>
  <NuxtLink :to="url">{{ name }}</NuxtLink>
  <pre>{{ content }}</pre>
</template>
