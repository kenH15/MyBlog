import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import signup from '../views/signup.vue'
import Settings from '../views/Settings.vue'
import Article from '../views/Article.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path:'/settings',
    name:'settings',
    component:Settings,
  }, 
  {
    path:'/articles',
    name:'articles',
    component:Article,
  },
  {
    path: '/articlelists/:userid/:currentpage',props:true,
    name: 'articlelists',
    component: ArticleList,
  },
  {
    path:"/articles/:id/detail",props:true,
    name:'detail',
    component:ArticleDetail,
},
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
