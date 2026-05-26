// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },

  ignore: ["**/src-tauri/**"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],
});