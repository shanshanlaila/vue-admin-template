import Vue from 'vue'
import Router from 'vue-router'
import product from '@/router/modules/product'
import member from '@/router/modules/member'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

var arr = []
arr.concat(product)

/* 静态路由 */
export const constantRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/category',
    meta: { title: '后台数据管理', icon: 'el-icon-s-tools' },
    children: [...product,member]

  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/* 异步路由 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 临时合并静态路由和动态路由
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
