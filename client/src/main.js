import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePrism from 'vue-prism'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'prismjs/themes/prism.css'
import '@/assets/scss/index.scss'

library.add(faSpinner, faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VuePrism)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
