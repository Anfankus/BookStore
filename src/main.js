import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false
Vue.use(bootstrap);
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
