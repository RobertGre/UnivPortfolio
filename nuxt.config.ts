// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  ssr: false,

  devtools: {
    enabled: true
  },

  app: {
    baseURL: '/UnivPortfolio/'
  },

  css: ['~/assets/css/main.css', '~/assets/css/portfolio.css'],

  routeRules: {
    '/': { prerender: true }
  },
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'github-pages'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
