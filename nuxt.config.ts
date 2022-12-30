// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    POCKETBASE_HOST: process.env.POCKETBASE_HOST,
    POCKETBASE_EMAIL: process.env.POCKETBASE_EMAIL,
    POCKETBASE_PASSWORD: process.env.POCKETBASE_PASSWORD,
    POCKETBASE_PREFIX: process.env.POCKETBASE_PREFIX,
    public: {},
  },
});
