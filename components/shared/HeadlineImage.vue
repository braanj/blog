<script setup lang="ts">
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const nuxtImg = useImage();
const featuredImage = useNuxtImg(props.content.featuredImage.media);

const bgStyles = computed(useBackgroundImage);

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: featuredImage,
    },
  ],
});

// Reusable functions specific for this component
function useNuxtImg(media: any) {
  return nuxtImg(media.url, {
    modifiers: {
      format: "webp",
      quality: 10,
      height: media.height,
    },
  });
}

function useBackgroundImage() {
  return { backgroundImage: `url('${featuredImage}')` };
}
</script>

<template>
  <div class="not-prose pt-80 bg-cover bg-center" :style="bgStyles">
    <div class="container bottom-0 p-6">
      <h1 class="text-white font-bold text-4xl">{{ content.externalName }}</h1>
      <p class="text-white text-xl">{{ content.subtitle }}</p>
    </div>
  </div>
</template>
