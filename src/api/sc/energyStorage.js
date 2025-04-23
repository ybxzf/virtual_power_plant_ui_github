import request from '@/utils/request'

// 查询储能列表
export function listEnergyStorage(query) {
  return request({
    url: '/sc/energyStorage/list',
    method: 'get',
    params: query
  })
}

// 查询储能详细
export function getEnergyStorage(id) {
  return request({
    url: '/sc/energyStorage/' + id,
    method: 'get'
  })
}

// 新增储能
export function addEnergyStorage(data) {
  return request({
    url: '/sc/energyStorage',
    method: 'post',
    data: data
  })
}

// 修改储能
export function updateEnergyStorage(data) {
  return request({
    url: '/sc/energyStorage',
    method: 'put',
    data: data
  })
}

// 删除储能
export function delEnergyStorage(id) {
  return request({
    url: '/sc/energyStorage/' + id,
    method: 'delete'
  })
}
