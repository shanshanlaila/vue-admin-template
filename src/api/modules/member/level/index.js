import request from '@/utils/request'

// 获取属性分组列表
export const reqGetMemberLevelList = (page, limit, key) => request.get(`/member/memberLevel/list`, {
  params: {
    page,
    limit,
    key
  }
})

export const reqGetMemberLevelInfo = (id) => {
  return request.get(`/member/memberLevel/info/${id}`)
}

// 修改或增加属性分组
export const reqAddOrEditMemberLevel = (data) => {
  if (data.id) {
    // 修改的请求
    return request.put('/member/memberLevel/update', data)
  } else {
    return request.post('/member/memberLevel/save', data)
  }
}

export const reqRemoveMemberLevel = (ids) => request.post(`/member/memberLevel/remove`, ids)
