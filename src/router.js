import List from './app/list/index.vue'
import Detail from './app/detail/index.vue'
import Checker from './app/checker/index.vue'
import Order from './app/order/index.vue' 
import TicketBase from './app/ticket/index.vue'
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
          path: '/checker', 
          component: Checker
      },
      {
      	  path: '/detail/:id', 
      	  component: Detail
      },
      {
          path: '/order',
          component: Order
      },
      {
          path: '/ticketbase',
          component: TicketBase
      },
      // {
      //     path: '/ticketprice',
      //     component: TicketPrice
      // },
      {
          path: '*', 
          redirect: '/dealer'
      },
    ]
}