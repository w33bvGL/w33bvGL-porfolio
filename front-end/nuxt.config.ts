// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@nuxt/ui',
        '@pinia/nuxt',
        'nuxt-time',
        '@nuxt/image',
        '@nuxtjs/i18n',
        'nuxt-highcharts',
    ],

    i18n: {
        locales: [
            { code: 'en', iso: 'en-US', file: 'en-US.json', name: 'English' },
            { code: 'hy', iso: 'hy-AM', file: 'hy-AM.json', name: 'Հայերեն' },
            { code: 'ru', iso: 'ru-RU', file: 'ru-RU.json', name: 'Русский' },
        ],
        lazy: false,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        vueI18n: './i18n.config.ts',
    },

    compatibilityDate: '2025-02-07',
});
