import request from '@/utils/request'

// 查询分布式光伏列表
export function listPv(query) {
  return request({
    url: '/sc/pv/list',
    method: 'get',
    params: query
  })
}

// 查询分布式光伏详细
export function getPv(id) {
  return request({
    url: '/sc/pv/' + id,
    method: 'get'
  })
}

// 新增分布式光伏
export function addPv(data) {
  return request({
    url: '/sc/pv',
    method: 'post',
    data: data
  })
}

// 修改分布式光伏
export function updatePv(data) {
  return request({
    url: '/sc/pv',
    method: 'put',
    data: data
  })
}

// 删除分布式光伏
export function delPv(id) {
  return request({
    url: '/sc/pv/' + id,
    method: 'delete'
  })
}
