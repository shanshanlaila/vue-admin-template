import request from '@/utils/request'

// 获取分类节点
export const reqGetCategoryList = () => request.get('/product/category/list')

// 删除节点
export const reqRemoveCategoryNode = (ids) => request.post(`/product/category/remove`, ids)

// 增加节点
export const reqAddCategory = (data) => request.post('/product/category/save', data)
