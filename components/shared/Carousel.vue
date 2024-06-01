<script setup>
const isMounted = ref(false);
const props = defineProps({
  content: {
    type: {},
  },
});

onMounted(() => {
  isMounted.value = true;
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
  <div class="container py-8 px-4">
    <h2 class="mt-0">{{ name }}</h2>
    <MDC
      v-if="content.description"
      :value="content.description"
      tag="article"
    />
    <Swiper
      v-if="isMounted"
      :modules="[
        SwiperAutoplay,
        SwiperNavigation,
        SwiperPagination,
        SwiperA11y,
      ]"
      :lazy="true"
      :loop="false"
      :grabCursor="true"
      navigation
      :pagination="{ clickable: true }"
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
          <div class="absolute bottom-0 left-0 w-[100%] px-4 py-6 gradient">
            <h2 class="m-0 text-white">
              {{ slide.internalName }}
            </h2>
          </div>
        </nuxt-link>
      </SwiperSlide>
    </Swiper>
    <loading v-else />
  </div>
</template>

<style>
.gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent);
}

.swiper {
  padding-bottom: 2.5rem !important;
}

.swiper-pagination-bullet {
  @apply bg-slate-400;
}

.swiper-button-next,
.swiper-button-prev {
  @apply w-8 h-8 bg-white rounded-full;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  @apply text-base leading-none font-bold text-black absolute top-[50%] left-[50%] translate-y-[-50%];
}

.swiper-button-next::after {
  @apply translate-x-[-30%];
}

.swiper-button-prev::after {
  @apply translate-x-[-70%];
}
</style>
