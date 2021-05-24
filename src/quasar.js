import Vue from 'vue'

import './styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar,Notify,Dialog } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Dialog
  }
 })
