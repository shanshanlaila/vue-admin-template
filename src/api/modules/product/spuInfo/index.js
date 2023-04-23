import request from '@/utils/request'

export const reqSaveSpuInfo = (data) => {
  return request.post(`product/spuInfo/save`, data)
}
