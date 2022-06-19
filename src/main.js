import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalFilters from './filters'
import VueClipboard from 'vue-clipboard2'
import VConsole from 'vconsole';
import '@/assets/styles/global.less'
import 'reset.css/reset.css'
import './utils/flexible-rem'
import './utils/tip'
import './utils/ban-zoom'
import SlideVerify from 'vue-monoplasty-slide-verify'
import Verify from 'vue2-verify'
import { VueJsonp } from 'vue-jsonp'
Vue.use(Verify)
Vue.use(SlideVerify)
Vue.use(VueJsonp)
// if (process.env.NODE_ENV === 'development') {
  // new VConsole();
// }
new VConsole();

Vue.use(VueClipboard)
Vue.use(GlobalFilters)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
