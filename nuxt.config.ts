import vsharp from "vite-plugin-vsharp";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    contentfulBaseUrl: "",
    contentfulSpaceId: "",
    contentfulToken: "",
    prismicApiToken: "",
    prismicApiEndpoint: "",
  },

  nitro: {
    prerender: {
      routes: ["/"],
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
    "@nuxt/image",
    "nuxt-swiper",
    "@nuxtjs/mdc",
    "@nuxtjs/prismic",
  ],

  prismic: {
    endpoint: process.env.NUXT_PRISMIC_API_ENDPOINT,
    clientConfig: {
      accessToken: process.env.NUXT_PRISMIC_API_TOKEN,
    },
  },

  image: {
    contentful: {},
  },

  swiper: {
    modules: ["autoplay", "navigation", "pagination", "a11y"],
  },

  components: { global: true, dirs: ["~/components"] },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/*"], // We implement our own auth behaviour in the auth middleware
    },
  },

  css: ["~/assets/css/main.css"],
});
