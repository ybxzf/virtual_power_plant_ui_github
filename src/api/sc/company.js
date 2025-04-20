import request from '@/utils/request'

// 查询售电公司聚合商信息列表
export function listCompany(query) {
  return request({
    url: '/sc/company/list',
    method: 'get',
    params: query
  })
}

// 查询售电公司聚合商信息详细
export function getCompany(id) {
  return request({
    url: '/sc/company/' + id,
    method: 'get'
  })
}

// 新增售电公司聚合商信息
export function addCompany(data) {
  return request({
    url: '/sc/company',
    method: 'post',
    data: data
  })
}

// 修改售电公司聚合商信息
export function updateCompany(data) {
  return request({
    url: '/sc/company',
    method: 'put',
    data: data
  })
}

// 删除售电公司聚合商信息
export function delCompany(id) {
  return request({
    url: '/sc/company/' + id,
    method: 'delete'
  })
}
