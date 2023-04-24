import request from '@/utils/request'

export const reqGetSkuList = (data) => {
  return request.get(`product/skuInfo/list`, {
    params: data
  })
}
