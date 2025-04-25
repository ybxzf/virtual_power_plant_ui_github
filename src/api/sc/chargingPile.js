import request from '@/utils/request'

// 查询充电桩列表
export function listChargingPile(query) {
  return request({
    url: '/sc/chargingPile/list',
    method: 'get',
    params: query
  })
}

// 查询充电桩详细
export function getChargingPile(id) {
  return request({
    url: '/sc/chargingPile/' + id,
    method: 'get'
  })
}

// 新增充电桩
export function addChargingPile(data) {
  return request({
    url: '/sc/chargingPile',
    method: 'post',
    data: data
  })
}

// 修改充电桩
export function updateChargingPile(data) {
  return request({
    url: '/sc/chargingPile',
    method: 'put',
    data: data
  })
}

// 删除充电桩
export function delChargingPile(id) {
  return request({
    url: '/sc/chargingPile/' + id,
    method: 'delete'
  })
}
