import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(ElementUI);

//无比关键
Vue.http.options.emulateJSON = true;


import App from './App.vue'
import routes from './router'

const router = new VueRouter(routes);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
