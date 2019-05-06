import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import './registerServiceWorker'
import '@/static/css/index.styl'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(components)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  components,
  render: h => h(App)
}).$mount('#app')
