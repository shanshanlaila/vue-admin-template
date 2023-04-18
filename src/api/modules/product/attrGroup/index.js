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