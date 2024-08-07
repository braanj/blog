<template>
  <speed-insights />
  <Header />

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
