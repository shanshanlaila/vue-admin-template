import request from '@/utils/request'


// 获取品牌列表
export const reqGetBrandList = (page, limit, key) => request.get('/product/brand/list', {
  params: {
    page,
    limit,
    key
  }
})

// 删除品牌
export const reqRemoveBrand = (ids) => request.post(`/product/brand/remove`, ids)

// 修改或增加品牌
export const reqAddOrEditBrand = (data) => {
  if (data.brandId) {
    // 修改的请求
    return request.put('/product/brand/update', data)
  } else {
    return request.post('/product/brand/save', data)
  }
}

// 获取单个品牌的数据
export const reqBrandById = (brandId) => request.get(`/product/brand/info/${brandId}`)

// 更新状态
export const reqUpdateBrandShowStatus = (data) => request.put(`/product/brand/update/status`, data)
