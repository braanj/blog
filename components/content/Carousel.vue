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
const startAutoplaying = computed(() => props.content.startAutoplaying);
const slidesPerView = computed(() => props.content.numberToDisplayAtOneTime);

const { data: slides } = useAsyncData("slides", (_) => {
  const {
    contentCollection: { items },
  } = props.content;
  return [...items];
});
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-4">
    <h2>{{ name }}</h2>
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="slidesPerView"
      :space-between="10"
      :loop="true"
      :autoplay="{
        delay: autoplayDelay,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide
        class="max-w-sm rounded overflow-hidden shadow-lg border-[.5px] border-slate-700 p-1"
        v-for="slide in slides"
        :key="slide.slug"
      >
        <div class="max-w-sm rounded overflow-hidden">
          <content-media :content="slide.cover" />
          <h2
            class="absolute top-[50%] left-[50%] text-white translate-x-[-50%] translate-y-[-50%] m-0"
          >
            {{ slide.internalName }}
          </h2>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
