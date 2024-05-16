<template>
  <div>
    <speed-insights />
    <nav
      class="fixed top-0 left-0 right-0 z-50 bg-black border-b border-slate-700"
    >
      <div class="container px-4">
        <div class="mx-auto max-w-7xl">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex items-center mr-3">
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800/60 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                @click="openMobileMenu"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center sm:items-center justify-start">
              <div class="flex flex-shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div class="hidden sm:mx-auto sm:flex items-center">
                <div class="flex space-x-4">
                  <nuxt-link
                    to="/"
                    class="text-slate-400 hover:text-slate-200 block rounded-md px-3 py-2 text-base font-medium"
                    aria-current="page"
                    >Home</nuxt-link
                  >
                  <nuxt-link
                    to="/red-rose"
                    class="text-slate-400 hover:text-slate-200 block rounded-md px-3 py-2 text-base font-medium"
                    aria-current="page"
                    >Red rose</nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="relative ml-3">
              <button
                type="button"
                class="relative flex rounded-full hover:bg-slate-800/60 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                @click="openProfileDropdown"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full m-0"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>

              <div
                class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
                v-if="isProfileDropdown"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  >Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          class="absolute top-0 left-0 bg-black min-h-[100vh] w-full max-w-[350px] border-r border-slate-700"
          v-if="isMobileMenuOpen"
        >
          <div class="p-3 flex justify-between border-b border-slate-700">
            <img
              class="h-8 w-auto m-0"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800/60 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="openMobileMenu"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-show="isMobileMenuOpen"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="space-y-1 px-2 pb-3 pt-4">
            <nuxt-link
              to="/"
              class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 block rounded px-3 py-2 text-base font-medium"
              aria-current="page"
              >Home</nuxt-link
            >
            <nuxt-link
              to="/red-rose"
              class="text-slate-400 hover:text-slate-200 hover:bg-slate-800 block rounded px-3 py-2 text-base font-medium"
              aria-current="page"
              >Red rose</nuxt-link
            >
          </div>
        </div>
      </div>
    </nav>
    <div class="flex w-full min-h-[57px]" :style="headerOffsetStyles"></div>
    <div
      class="fixed top-0 left-0 w-full h-full z-10 bg-slate-400/50"
      v-if="isProfileDropdown || isMobileMenuOpen"
      @click="closeDropdowns"
    ></div>

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
const isProfileDropdown = ref(false);
const isMobileMenuOpen = ref(false);
const headerOffset = ref(0);

const headerOffsetStyles = computed(() => ({
  height: `${headerOffset.value}px`,
}));

onMounted(() => {
  console.log("Mounted");
  headerOffset.value = document.querySelector("nav").offsetHeight;
});

function openProfileDropdown() {
  isProfileDropdown.value = !isProfileDropdown.value;
}

function openMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeDropdowns() {
  isProfileDropdown.value = isMobileMenuOpen.value = false;
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-slate-200;
}
</style>
