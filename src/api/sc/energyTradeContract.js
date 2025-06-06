import request from '@/utils/request'

// 查询电能量交易合同1列表
export function listEnergyTradeContract(query) {
  return request({
    url: '/sc/energyTradeContract/list',
    method: 'get',
    params: query
  })
}

// 查询电能量交易合同1详细
export function getEnergyTradeContract(contractId) {
  return request({
    url: '/sc/energyTradeContract/' + contractId,
    method: 'get'
  })
}

// 新增电能量交易合同1
export function addEnergyTradeContract(data) {
  return request({
    url: '/sc/energyTradeContract',
    method: 'post',
    data: data
  })
}

// 修改电能量交易合同1
export function updateEnergyTradeContract(data) {
  return request({
    url: '/sc/energyTradeContract',
    method: 'put',
    data: data
  })
}

// 删除电能量交易合同1
export function delEnergyTradeContract(contractId) {
  return request({
    url: '/sc/energyTradeContract/' + contractId,
    method: 'delete'
  })
}
