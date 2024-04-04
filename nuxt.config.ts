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
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: true,
          Inter: [400, 700],
          "Josefin+Sans": true,
          Lato: [100, 300],
        },
        useStylesheet: true,
      },
    ],
  ],

  image: {
    quality: 80,
    contentful: {},
  },

  components: { global: true, dirs: ["~/components"] },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/*"], // We implement our own auth behaviour in the auth middleware
    },
  },
});
