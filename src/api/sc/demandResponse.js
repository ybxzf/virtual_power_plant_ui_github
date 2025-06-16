import request from '@/utils/request'

// 查询市场交易申报列表
export function listDemandResponse(query) {
  return request({
    url: '/sc/demandResponse/list',
    method: 'get',
    params: query
  })
}

// 查询市场交易申报详细
export function getDemandResponse(id) {
  return request({
    url: '/sc/demandResponse/' + id,
    method: 'get'
  })
}

// 新增市场交易申报
export function addDemandResponse(data) {
  return request({
    url: '/sc/demandResponse',
    method: 'post',
    data: data
  })
}

// 修改市场交易申报
export function updateDemandResponse(data) {
  return request({
    url: '/sc/demandResponse',
    method: 'put',
    data: data
  })
}

// 删除市场交易申报
export function delDemandResponse(id) {
  return request({
    url: '/sc/demandResponse/' + id,
    method: 'delete'
  })
}
