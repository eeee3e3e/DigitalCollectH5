import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalFilters from './filters'
import VueClipboard from 'vue-clipboard2'
import '@/assets/styles/global.less'
import 'reset.css/reset.css'
import './utils/flexible-rem'
import './utils/tip'

Vue.use(VueClipboard)
Vue.use(GlobalFilters)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
