import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.use(VeeValidate)

axios.defaults.baseURL = 'http://localhost:3000'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
