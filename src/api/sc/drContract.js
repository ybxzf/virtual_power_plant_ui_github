import request from '@/utils/request'

// 查询负荷响应合同列表
export function listDrContract(query) {
  return request({
    url: '/sc/drContract/list',
    method: 'get',
    params: query
  })
}

// 查询负荷响应合同详细
export function getDrContract(contractId) {
  return request({
    url: '/sc/drContract/' + contractId,
    method: 'get'
  })
}

// 新增负荷响应合同
export function addDrContract(data) {
  return request({
    url: '/sc/drContract',
    method: 'post',
    data: data
  })
}

// 修改负荷响应合同
export function updateDrContract(data) {
  return request({
    url: '/sc/drContract',
    method: 'put',
    data: data
  })
}

// 删除负荷响应合同
export function delDrContract(contractId) {
  return request({
    url: '/sc/drContract/' + contractId,
    method: 'delete'
  })
}
