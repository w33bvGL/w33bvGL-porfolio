// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],
  devtools: { enabled: true },

  css: ['@/assets/scss/main.scss'],

  compatibilityDate: '2025-05-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'ru', language: 'ru-RU', name: 'Русский' },
      { code: 'hy', language: 'hy-AM', name: 'Հայերեն' }
    ],
    lazy: false,
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    vueI18n: './i18n.config.ts'
  }

})
