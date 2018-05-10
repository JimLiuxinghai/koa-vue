import List from './app/list/index.vue'
import Detail from './app/detail/index.vue'
// 配置路由规则
export default {
    mode: 'hash',//history|hash
    base: __dirname,
    routes: [
      {
          path: '/dealer', 
      	  component: List
      },
      {
      	  path: '/detail/:id', 
      	  component: Detail
      },
      {
          path: '*', 
          redirect: '/dealer'
      },
    ]
}