import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Details from '../components/details.vue'
import Demand from '../components/demand.vue'
import Gather from '../components/imgGather.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },{
       path: '/index', 
       component:Index 
    },{
      path: '/details',
      name: 'Details',
      component: Details
    },{
      path: '/demand',
      name: 'Demand',
      component: Demand
    },{
      path: '/gather',
      name: 'Gather',
      component: Gather
    }
  ]
})
