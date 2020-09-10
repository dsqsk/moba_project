import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
