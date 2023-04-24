import request from '@/utils/request'

export const reqSaveSpuInfo = (data) => {
  return request.post(`product/spuInfo/save`, data)
}

export const reqGetSpuList = (data) => {
  return request.get(`product/spuInfo/list`, {
    params: data
  })
}
