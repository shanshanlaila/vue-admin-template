import request from '@/utils/request'

export const reqGetWareInfoList = (page, limit, key) => {
  return request.get(`ware/wareInfo/list`, {
    params: {
      page,
      limit,
      key
    }
  })
}

// 删除仓库
export const reqRemoveWare = (ids) => request.post(`ware/wareInfo/remove`, ids)

// 修改或增加仓库
export const reqAddOrEditWare = (data) => {
  if (data.id) {
    // 修改的请求
    return request.put('ware/wareInfo/update', data)
  } else {
    return request.post('ware/wareInfo/save', data)
  }
}

// 获取单个仓库的数据
export const reqWareById = (id) => request.get(`ware/wareInfo/info/${id}`)

export const reqGetWareSkuList = (params) => {
  return request.get(`ware/wareSku/list`, {
    params: params
  })
}
