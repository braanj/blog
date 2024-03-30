import vsharp from "vite-plugin-vsharp";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    contentfulBaseUrl: "",
    contentfulSpaceId: "",
    contentfulToken: "",
  },

  nitro: {
    prerender: {
      routes: ["/", "/landing"],
    },
  },

  vite: {
    plugins: [vsharp()],
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/*"], // We implement our own auth behaviour in the auth middleware
    },
  },
});
