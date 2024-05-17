<template>
  <div>
    <speed-insights />
    <nav class="fixed top-0 left-0 right-0 z-50 bg-base-100">
      <div class="navbar container">
        <div class="flex-none">
          <div class="drawer">
            <input
              id="my-drawer"
              type="checkbox"
              class="drawer-toggle"
              v-model="drawer"
            />
            <div class="drawer-content">
              <label
                for="my-drawer"
                class="btn btn-ghost btn-square drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div class="drawer-side">
              <label
                for="my-drawer"
                aria-label="close sidebar"
                class="drawer-overlay"
              ></label>
              <ul
                class="menu p-4 w-80 min-h-full bg-base-200 text-base-content"
              >
                <nuxt-link to="/" class="text-black text-xl">Home</nuxt-link>
                <nuxt-link to="/red-rose" class="text-black text-xl"
                  >Red rose</nuxt-link
                >
              </ul>
            </div>
          </div>
        </div>

        <div class="flex-1 ml-4">
          <nuxt-link to="/" class="text-black text-xl">Nuxt Blog</nuxt-link>
        </div>

        <div class="flex-none">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <div class="flex w-full min-h-[57px]" :style="headerOffsetStyles"></div>

    <main
      class="flex flex-col w-full h-full min-h-screen prose prose-xl max-w-none"
    >
      <slot />
    </main>

    <footer class="bg-black text-center text-slate-300 p-4">
      &copy; All rights reserved
    </footer>
  </div>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
const headerOffset = ref(0);
const drawer = ref(false);

const route = useRoute();

watch(
  route,
  (value) => {
    drawer.value = false;
    console.log(drawer.value);
  },
  { deep: true, immediate: true }
);

const headerOffsetStyles = computed(() => ({
  height: `${headerOffset.value}px`,
}));

onMounted(() => {
  console.log("Mounted");
  headerOffset.value = document.querySelector("nav").offsetHeight;
});
</script>

<style scoped>
.router-link-exact-active {
  @apply text-black;
}
</style>
