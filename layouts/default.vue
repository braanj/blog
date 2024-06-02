<template>
  <speed-insights />
  <nav class="fixed top-0 left-0 right-0 z-40 bg-base-100">
    <div class="navbar container">
      <div class="flex-none relative z-50">
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

            <div class="w-80 min-h-full bg-base-200">
              <div
                class="prose p-4 flex w-full items-center min-h-[57px] border-b"
                :style="headerOffsetStyles"
              >
                <!-- TODO: replace with the logo -->
                <nuxt-link to="/" class="prose link">Nuxt Blog</nuxt-link>
              </div>
              <ul class="prose menu p-0 flex">
                <nuxt-link
                  v-for="(item, index) in outline"
                  :key="`main-menu-${item.path}`"
                  :to="item.path"
                  class="no-underline text-lg transition-all px-4 py-3 hover:bg-slate-200 opacity-100"
                  >{{ item.label }}</nuxt-link
                >
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-none ml-4">
        <nuxt-link to="/" class="prose link">Nuxt Blog</nuxt-link>
      </div>

      <div class="flex-1 sm:block hidden">
        <ul class="prose flex gap-4 mx-auto">
          <nuxt-link
            v-for="(item, index) in outline"
            :key="item.path"
            :to="item.path"
            class="link"
            >{{ item.label }}</nuxt-link
          >
        </ul>
      </div>

      <div class="flex-none px-2">
        <div v-for="mode in themes" :key="mode.value">
          <nuxt-img
            :src="mode.icon"
            :alt="mode.value"
            height="1"
            width="1"
            class="h-6 w-6 m-0"
            v-show="mode.value !== theme"
            @click="changeTheme(mode.value)"
          />
        </div>
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
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
const headerOffset = ref(0);
const drawer = ref(false);
const { $outline: outline } = useNuxtApp();

const headerOffsetStyles = computed(() => ({
  height: `${headerOffset.value}px`,
}));

const theme = useState("theme", () => "light");
const themes = [
  { value: "light", label: "Light", icon: "/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/icons/moon.svg" },
];

onMounted(() => {
  headerOffset.value = document.querySelector("nav").offsetHeight;
  handleThemeChange();
});

const route = useRoute();
watch(
  () => route.path,
  (value) => {
    drawer.value = false;
  }
);

watch(
  theme,
  () => {
    if (document)
      document.querySelector("html").setAttribute("data-theme", theme.value);
  },
  { deep: true, immediate: true }
);

function handleThemeChange() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    changeTheme("dark");
  } else {
    changeTheme("light");
  }
}

function changeTheme(mode) {
  theme.value = mode;
  localStorage.setItem("theme", mode);
}
</script>

<style scoped>
.link {
  @apply no-underline text-xl opacity-75 hover:opacity-100;
}

.link.router-link-exact-active {
  @apply opacity-100;
}
</style>
