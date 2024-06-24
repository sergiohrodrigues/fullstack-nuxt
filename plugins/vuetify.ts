// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import { VCalendar } from 'vuetify/labs/components'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md2,
    components:{
        VCalendar
    },
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'text',
        rounded: true,
      },
    },
    icons: {
      defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
  })
  app.vueApp.use(vuetify)
})
