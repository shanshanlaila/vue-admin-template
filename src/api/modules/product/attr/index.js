import request from '@/utils/request'

// 获取属性分组列表
export const reqGetAttrList = (page, limit, key, type) => {
  if (type === 'sale') {
    return request.get(`/product/attr/sale/list`, {
      params: {
        page,
        limit,
        key
      }
    })
  } else {
    return request.get(`/product/attr/base/list`, {
      params: {
        page,
        limit,
        key
      }
    })
  }
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
