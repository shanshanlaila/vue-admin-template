import Layout from '@/layout/index.vue'
import ThreeLayout from '@/layout/threeLayout.vue'

/**
 * 商品路由
 */
export default {
  path: '/members',
  redirect: '/level',
  component: ThreeLayout,
  meta: { title: '用户管理', icon: 'el-icon-s-tools' },
  children: [
    {
      path: '/level',
      name: 'Level',
      component: () => import('@/views/modules/member/level.vue'),
      meta: { title: '会员等级', icon: 'tree' }
    }
  ]

}
