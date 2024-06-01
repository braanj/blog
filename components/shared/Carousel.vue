<script setup>
const props = defineProps({
  content: {
    type: {},
  },
});

const name = computed(() => {
  return props.content.externalName;
});

const autoplayDelay = computed(() => props.content.autoplayTime);
// const startAutoplaying = computed(() => props.content.startAutoplaying);
// const slidesPerView = computed(() => props.content.numberToDisplayAtOneTime);

const slides = computed(() => {
  const {
    contentCollection: { items },
  } = props.content;
  return [...items];
});
</script>

<template>
  <div class="container py-6 px-4">
    <h2 class="mt-0">{{ name }}</h2>
    <MDC
      v-if="content.description"
      :value="content.description"
      tag="article"
    />
    <Swiper
      :modules="[SwiperAutoplay]"
      :lazy="true"
      :loop="false"
      :grabCursor="true"
      :autoplay="{
        delay: autoplayDelay,
        disableOnInteraction: true,
      }"
      :space-between="10"
      :breakpoints="{
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
      }"
    >
      <SwiperSlide
        class="rounded overflow-hidden"
        v-for="slide in slides"
        :key="slide.slug"
      >
        <!-- TODO: handle the page path in the usePage composable -->
        <nuxt-link class="w-full rounded overflow-hidden" :to="slide.slug">
          <shared-media :content="slide.cover" class="m-0 rounded" />
          <div class="absolute bottom-0 left-0 w-[100%] px-4 py-4 gradient">
            <h2 class="m-0 text-white">
              {{ slide.internalName }}
            </h2>
          </div>
        </nuxt-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent);
}
</style>
