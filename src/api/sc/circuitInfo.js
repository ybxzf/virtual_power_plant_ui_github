import request from '@/utils/request'

// 查询回路信息列表
export function listCircuitInfo(query) {
  return request({
    url: '/sc/circuitInfo/list',
    method: 'get',
    params: query
  })
}

// 查询回路信息详细
export function getCircuitInfo(id) {
  return request({
    url: '/sc/circuitInfo/' + id,
    method: 'get'
  })
}

// 新增回路信息
export function addCircuitInfo(data) {
  return request({
    url: '/sc/circuitInfo',
    method: 'post',
    data: data
  })
}

// 修改回路信息
export function updateCircuitInfo(data) {
  return request({
    url: '/sc/circuitInfo',
    method: 'put',
    data: data
  })
}

// 删除回路信息
export function delCircuitInfo(id) {
  return request({
    url: '/sc/circuitInfo/' + id,
    method: 'delete'
  })
}
