import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/common.less'
import './assets/css/link.less'
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(iView);

//无比关键
Vue.http.options.emulateJSON = true;


import App from './App.vue'
import routes from './router'

const router = new VueRouter(routes);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
