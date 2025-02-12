import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css: [
    'vuetify/styles', 
    '@mdi/font/css/materialdesignicons.css', 
    '@/assets/css/fonts.css',
    '@/assets/css/main.css',
  ],

  build: {
    transpile: ['vuetify'], 
  },

  vite: {
    plugins: [
      vuetify({
        autoImport: true, 
      }),
    ],
  },

  compatibilityDate: '2025-02-11',
});
