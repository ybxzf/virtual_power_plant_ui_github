import request from '@/utils/request'

// 查询企业用户信息列表
export function listCorporation(query) {
  return request({
    url: '/sc/corporation/list',
    method: 'get',
    params: query
  })
}

// 查询企业用户信息详细
export function getCorporation(id) {
  return request({
    url: '/sc/corporation/' + id,
    method: 'get'
  })
}

// 新增企业用户信息
export function addCorporation(data) {
  return request({
    url: '/sc/corporation',
    method: 'post',
    data: data
  })
}

// 修改企业用户信息
export function updateCorporation(data) {
  return request({
    url: '/sc/corporation',
    method: 'put',
    data: data
  })
}

// 删除企业用户信息
export function delCorporation(id) {
  return request({
    url: '/sc/corporation/' + id,
    method: 'delete'
  })
}
