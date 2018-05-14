import List from './app/list/index.vue'
import Checker from './app/checker/index.vue'
import Order from './app/order/index.vue' 
import TicketBase from './app/ticket/index.vue'

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