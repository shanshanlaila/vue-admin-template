import request from '@/utils/request'

/**
 * 根据品牌id获取品牌分类数据
 * @param brandId
 * @returns {AxiosPromise<any>}
 */
export function reqGetCateRelation(brandId) {
  return request.get('/product/categoryBrandRelation/catelog/list', {
    params: {
      brandId
    }
  })
}
