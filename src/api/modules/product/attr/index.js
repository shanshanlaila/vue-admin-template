import request from '@/utils/request'

// 获取属性分组列表
export const reqGetAttrList = (catId, page, limit, key, attrType) => {
  return request.get(`/product/attr/list/${catId}`, {
    params: {
      page,
      limit,
      key,
      attrType
    }
  })
}

// 根据spuId获取基础属性
export const reqGetAttrValueBySpuId = (spuId) => {
  return request.get(`product/attr/base/listforspu/${spuId}`)
}

// 根据spuId更新属性
export const reqUpdateAttrBySkuId = (skuId, data) => {
  return request.post(`product/attr/update/${skuId}`, data)
}

// 删除属性
export const reqRemoveAttr = (ids) => request.post(`/product/attr/remove`, ids)

// 修改或增加属性
export const reqAddOrEditAttr = (data) => {
  if (data.attrGroupId) {
    // 修改的请求
    return request.put('/product/attr/update', data)
  } else {
    return request.post('/product/attr/save', data)
  }
}

// 获取单个属性分组
export const reqAttrById = (attrId) => request.get(`/product/attr/info/${attrId}`)
