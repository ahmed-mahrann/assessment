// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  ssr: true,
  runtimeConfig: {
    public: {
      api_url: process.env.API_SINGLE_PRODUCT_URL,
      api_variant_url: process.env.API_VARIANT_URL,
      api_products_url: process.env.API_PRODUCTS_URL,
      api_categories_url: process.env.API_CATEGORIES_URL,
      api_subcategories_url: process.env.API_SUBCATEGORIES_URL,
      api_options_url: process.env.API_OPTIONS_URL,
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
