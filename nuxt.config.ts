// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  ignore: ['**/src-tauri/**'],
  compatibilityDate: '2025-07-15',

  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: [
      { code: 'pt-BR', name: 'Português (Brasil)', file: 'pt-BR.json' }
    ]
  }
})
