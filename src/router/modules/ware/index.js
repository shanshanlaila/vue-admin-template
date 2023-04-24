import ThreeLayout from '@/layout/threeLayout.vue'

/**
 * 仓库路由
 */
export default {
  path: '/wares',
  redirect: '/wareInfo',
  component: ThreeLayout,
  meta: { title: '仓库管理', icon: 'el-icon-s-tools' },
  children: [
    {
      path: '/wareInfo',
      name: 'WareInfo',
      component: () => import('@/views/modules/ware/wareinfo.vue'),
      meta: { title: '仓库维护', icon: 'tree' }
    },
    {
      path: '/sku',
      name: 'Sku',
      component: () => import('@/views/modules/ware/sku.vue'),
      meta: { title: '商品库存', icon: 'tree' }
    },
    {
      path: '/purchases',
      redirect: 'purchase',
      component: ThreeLayout,
      meta: { title: '采购单维护', icon: 'tree' },
      children: [
        {
          path: '/purchase',
          name: 'Purchase',
          component: () => import('@/views/modules/ware/purchase.vue'),
          meta: { title: '采购单', icon: 'tree' }
        }
      ]
    }
  ]

}
