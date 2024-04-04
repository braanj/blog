<script setup>
const props = defineProps({
  content: {
    type: {},
  },
});

const nuxtImg = useImage();

const { data: featuredImage } = useAsyncData("featuredImage", (_) => {
  const imgUrl = nuxtImg(props.content.featuredImage.media.url, {
    modifiers: {
      format: "webp",
      quality: 10,
      height: props.content.featuredImage.media,
    },
  });

  return imgUrl;
});

const bgStyles = computed(() => ({
  backgroundImage: `url('${featuredImage.value}')`,
}));

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: featuredImage.value,
    },
  ],
});
</script>

<template>
  <div class="pt-80 bg-cover bg-center" :style="bgStyles">
    <div class="bottom-0 p-6 max-w-[1200px] mx-auto">
      <h1 class="text-white font-bold text-4xl">{{ content.externalName }}</h1>
      <p class="text-white text-xl">{{ content.subtitle }}</p>
    </div>
  </div>
</template>
