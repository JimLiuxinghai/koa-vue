import List from './app/list/index.vue'
import Checker from './app/checker/index.vue'
import Order from './app/order/index.vue' 
import TicketBase from './app/ticket/index.vue'
import TicketPrice from './app/ticket-price/index.vue'
import Person from './app/person/index.vue'
import Report from './app/report/index.vue'
import Analysis from './app/analysis/index.vue'
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
        {
            path: '/ticketprice',
            component: TicketPrice
        },
        {
            path: '/person',
            component: Person
        },
        {
            path: '/report',
            component: Report
        },
        {
            path: '/analysis',
            component: Analysis
        },
        {
            path: '/seckill',
            
        },
        {
            path: '*', 
            redirect: '/order'
        },
      ]
}