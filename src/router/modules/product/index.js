import Layout from '@/layout/index.vue'

/**
 * 商品路由
 */
export default {
  path: '/',
  component: Layout,
  redirect: '/category',
  meta: { title: '后台数据管理', icon: 'el-icon-s-tools' },
  children: [
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/category/index.vue'),
      meta: { title: '分类数据管理', icon: 'tree' }
    }
  ]

}
