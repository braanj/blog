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
  <div class="container mx-auto p-4">
    <h2 class="mt-0">{{ name }}</h2>
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
          slidesPerView: 4,
        },
      }"
    >
      <SwiperSlide
        class="rounded max-w-80 overflow-hidden shadow-lg border-[.5px] border-slate-700 p-1"
        v-for="slide in slides"
        :key="slide.slug"
      >
        <!-- TODO: handle the page path in the usePage composable -->
        <nuxt-link class="w-full rounded overflow-hidden" :to="slide.slug">
          <shared-media
            :content="slide.cover"
            class="m-0 rounded filter brightness-50"
          />
          <h2
            class="absolute top-[50%] left-[50%] text-white translate-x-[-50%] translate-y-[-50%] m-0"
          >
            {{ slide.internalName }}
          </h2>
        </nuxt-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
