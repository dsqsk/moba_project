import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import CategoryList from '../views/Category/CategoryList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/categories/create', component: CategoryEdit
      },
      {
        path: '/categories/edit/:id', component: CategoryEdit, props: true
      },
      {
        path: '/categories/list', component: CategoryList
      },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
