import request from '@/utils/request'

// 获取分类节点
export const reqGetCategoryList = () => request.get('/product/category/list')

// 删除节点
export const reqRemoveCategoryNode = (ids) => request.post(`/product/category/remove`, ids)

// 修改节点
export const reqAddOrEditCategory = (data) => {
  if (data.catId) {
    // 修改的请求
    return request.put('/product/category/edit', data)
  } else {
    return request.post('/product/category/save', data)
  }
}

// 获取单个节点的数据
export const reqCategoryById = (catId) => request.get(`/product/category/info/${catId}`)
