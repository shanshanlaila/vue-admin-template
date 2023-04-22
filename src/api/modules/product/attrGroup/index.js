import request from '@/utils/request'

// 获取属性分组列表
export const reqGetAttrGroupList = (page, limit, key, catId) => request.get(`/product/attrGroup/list/${catId}`, {
  params: {
    page,
    limit,
    key
  }
})

// 删除属性分组
export const reqRemoveAttrGroup = (ids) => request.post(`/product/attrGroup/remove`, ids)

// 修改或增加属性分组
export const reqAddOrEditAttrGroup = (data) => {
  if (data.attrGroupId) {
    // 修改的请求
    return request.put('/product/attrGroup/update', data)
  } else {
    return request.post('/product/attrGroup/save', data)
  }
}

// 获取单个属性分组的数据
export const reqAttrGroupById = (attrGroupId) => request.get(`/product/attrGroup/info/${attrGroupId}`)

// 查询属性分组关联的基础属性列表
export const reqGetAttrGroupRelation = (attrGroupId) => request.get(`/product/attrGroup/${attrGroupId}/attr/relation`)

// 移除属性分组关联的基础属性
export const reqRemoveAttrGroupRelation = (data) => {
  return request.post(`/product/attrGroup/attr/relation/delete`, data)
}

export const reqGetNoAttrRelation = (page, limit, key, attrGroupId) => {
  return request.get(`/product/attrGroup/${attrGroupId}/noAttr/relation`, {
    params: {
      page,
      limit,
      key
    }
  })
}
