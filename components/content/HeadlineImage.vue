<script setup lang="ts">
const props = defineProps({
  content: {
    type: {},
  },
});

const nuxtImg = useImage();
const { data: featuredImage } = useAsyncData("featuredImage", (_) => {
  return useNuxtImg(props.content.featuredImage.media);
});

const bgStyles = computed(useBackgroundImage);

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: featuredImage.value,
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
  return { backgroundImage: `url('${featuredImage.value}')` };
}
</script>

<template>
  <div class="not-prose pt-80 bg-cover bg-center" :style="bgStyles">
    <div class="bottom-0 p-6 max-w-[1200px] mx-auto">
      <h1 class="text-white font-bold text-4xl">{{ content.externalName }}</h1>
      <p class="text-white text-xl">{{ content.subtitle }}</p>
    </div>
  </div>
</template>
