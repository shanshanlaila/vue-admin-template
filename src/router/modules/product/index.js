import Layout from '@/layout/index.vue'
import ThreeLayout from '@/layout/threeLayout.vue'

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
      component: () => import('@/views/modules/product/category/index.vue'),
      meta: { title: '商品分类维护', icon: 'tree' }
    },
    {
      path: '/brand',
      name: 'Brand',
      component: () => import('@/views/modules/product/brand/brand.vue'),
      meta: { title: '品牌管理', icon: 'el-icon-platform-eleme' }
    },
    {
      path: '/attr',
      redirect: '/attrGroup',
      component: ThreeLayout,
      meta: { title: '平台属性', icon: 'el-icon-platform-eleme' },
      children: [
        {
          path: '/attrGroup',
          name: 'AttrGroup',
          component: () => import('@/views/modules/product/attrgroup.vue'),
          meta: { title: '属性分组', icon: 'tree' }
        },
        {
          path: '/attr',
          name: 'Attr',
          component: () => import('@/views/modules/product/baseattr.vue'),
          meta: { title: '规格参数', icon: 'tree' }
        }
      ]
    }
  ]

}
