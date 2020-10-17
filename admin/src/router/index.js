import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import CategoryList from '../views/Category/CategoryList.vue'

import HeroEdit from '../views/Hero/HeroEdit.vue'
import HeroList from '../views/Hero/HeroList.vue'

import ItemEdit from '../views/Item/ItemEdit.vue'
import ItemList from '../views/Item/ItemList.vue'

import ArticleEdit from '../views/Article/ArticleEdit.vue'
import ArticleList from '../views/Article/ArticleList.vue'

import AdEdit from '../views/Ad/AdEdit.vue'
import AdList from '../views/Ad/AdList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
