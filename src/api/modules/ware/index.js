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

export const reqGetWarePurchaseList = (params) => {
  return request.get(`ware/purchase/list`, {
    params: params
  })
}

// 合并到采购单
export const reqPostPurchaseMerge = (mergeVo) => {
  return request.post(`ware/purchase/merge`, mergeVo)
}

export const reqGetUnreceivedPurchase = (params) => {
  return request.get(`ware/purchase/unreceived/list`, {
    params: params
  })
}

// 删除采购
export const reqRemovePurchase = (ids) => request.post(`ware/purchase/remove`, ids)

export const reqGetWarePurchaseById = (id) => {
  return request.get(`ware/purchase/info/${id}`)
}

export const reqAddOrEditPurchase = (data) => {
  if (data.id) {
    // 修改的请求
    return request.put('ware/purchase/update', data)
  } else {
    return request.post('ware/purchase/save', data)
  }
}

export const reqGetWarePurchaseDetailList = (params) => {
  return request.get(`ware/purchaseDetail/list`, {
    params: params
  })
}

export const reqAddOrEditPurchaseDetail = (data) => {
  if (data.id) {
    // 修改的请求
    return request.put('ware/purchaseDetail/update', data)
  } else {
    return request.post('ware/purchaseDetail/save', data)
  }
}

export const reqWarePurchaseDetailById = (id) => {
  return request.get(`ware/purchaseDetail/info/${id}`)
}

// 删除采购项
export const reqRemovePurchaseDetail = (ids) => request.post(`ware/purchaseDetail/remove`, ids)
