import ThreeLayout from '@/layout/threeLayout.vue'

/**
 * 商品路由
 */
export default [
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
    path: '/attrs',
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
        path: '/baseAttr',
        name: 'BaseAttr',
        component: () => import('@/views/modules/product/baseattr.vue'),
        meta: { title: '规格参数', icon: 'tree' }
      },
      {
        path: '/saleAttr',
        name: 'SaleAttr',
        component: () => import('@/views/modules/product/saleattr.vue'),
        meta: { title: '销售属性', icon: 'tree' }
      }
    ]
  },
  {
    path: '/member',
    redirect: '/spu',
    component: ThreeLayout,
    meta: { title: '商品维护', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '/spu',
        name: 'Spu',
        component: () => import('@/views/modules/product/spu.vue'),
        meta: { title: 'spu管理', icon: 'tree' }
      },
      {
        path: '/spuadd',
        name: 'SpuAdd',
        component: () => import('@/views/modules/product/spuadd.vue'),
        meta: { title: '发布商品', icon: 'el-icon-platform-eleme' }
      },
      {
        path: '/spuInfo',
        name: 'SpuInfo',
        component: () => import('@/views/modules/product/spuinfo.vue'),
        meta: { title: '商品管理', icon: 'el-icon-platform-eleme' }
      }
    ]
  }
]


