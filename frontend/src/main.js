import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueGoogleCharts from 'vue-google-charts'
import axios from 'axios'

Vue.use(VueGoogleCharts)
Vue.use(axios)

axios.defaults.baseURL = "http://localhost:3000"

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
