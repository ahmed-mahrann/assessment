// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  ssr: true,
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
});
