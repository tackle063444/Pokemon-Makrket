// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // ✅ Import MDI Icons

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#6200ea',
            secondary: '#03dac6',
            background: '#f5f5f5', 
            surface: '#ffffff',
            error: '#b00020',
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: '#bb86fc',
            secondary: '#03dac6',
            background: '#121212', 
            surface: '#1e1e1e',
            error: '#cf6679',
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi', 
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
