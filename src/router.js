import List from './app/list/index.vue'
import Checker from './app/checker/index.vue'
import Order from './app/order/index.vue' 
import TicketBase from './app/ticket/index.vue'
import Person from './app/person/index.vue'
export default {
    mode: 'hash',//history|hash
    base: __dirname,
    routes: [
        {
            path: '/dealer', 
            name: 0,
            component: List
        },
        {
            path: '/checker', 
            name: 1,
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
            component: List
        },
        {
            path: '/person',
            component: Person
        },
        {
            path: '*', 
            redirect: '/dealer'
        },
      ]
}