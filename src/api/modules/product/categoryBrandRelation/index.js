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

export const reqAddCategoryBrandRelation = (brandId, catelogId) => request.post('product/categoryBrandRelation/save', {
  brandId,
  catelogId
})

export const reqRemoveCategoryBrandRelation = (id) => request.delete(`product/categoryBrandRelation/remove/${id}`)

export const reqGetBrands = (catId) => {
  return request.get(`product/categoryBrandRelation/brands/list`, {
    params: {
      catId
    }
  })
}
