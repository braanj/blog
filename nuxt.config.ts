import vsharp from "vite-plugin-vsharp";

const GTM_ENABLED = process.env.GTM_ENABLED === "true";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    contentfulBaseUrl: "",
    contentfulSpaceId: "",
    contentfulToken: "",
  },

  gtm: {
    id: `${process.env.GTM_ID}`, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    enabled: GTM_ENABLED, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
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
    GTM_ENABLED ? "@zadigetvoltaire/nuxt-gtm" : null,
    "@nuxtjs/prismic",
  ],

  prismic: {
    endpoint: "anjar",
    clientConfig: {
      accessToken: process.env.NUXT_PRISMIC_API_TOKEN,
    },
  },

  plugins: ["~/plugins/analytics.client", "~/plugins/outline"],

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
