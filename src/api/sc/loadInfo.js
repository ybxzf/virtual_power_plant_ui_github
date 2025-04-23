import request from '@/utils/request'

// 查询负荷信息列表
export function listLoadInfo(query) {
  return request({
    url: '/sc/loadInfo/list',
    method: 'get',
    params: query
  })
}

// 查询负荷信息详细
export function getLoadInfo(id) {
  return request({
    url: '/sc/loadInfo/' + id,
    method: 'get'
  })
}

// 新增负荷信息
export function addLoadInfo(data) {
  return request({
    url: '/sc/loadInfo',
    method: 'post',
    data: data
  })
}

// 修改负荷信息
export function updateLoadInfo(data) {
  return request({
    url: '/sc/loadInfo',
    method: 'put',
    data: data
  })
}

// 删除负荷信息
export function delLoadInfo(id) {
  return request({
    url: '/sc/loadInfo/' + id,
    method: 'delete'
  })
}
