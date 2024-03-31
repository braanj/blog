<script setup>
const props = defineProps({
  content: {
    type: {},
  },
});

const alt = computed(() => {
  return props.content.altText;
});

const imageUrl = computed(() => {
  if (props.content.media) {
    return props.content.media.url;
  }
});

const ratio = computed(() => {
  if (props.content.media) {
    return {
      width: props.content.media.width,
      height: props.content.media.height,
    };
  }
});
</script>

<template>
  <nuxt-img
    :src="imageUrl"
    :alt="alt"
    :width="ratio.width"
    :height="ratio.height"
    provider="contentful"
    format="webp"
  />
</template>
