import request from '@/utils/request'

// 查询终端日在线情况列表
export function listCpOnlineStat(query) {
  return request({
    url: '/sc/cpOnlineStat/list',
    method: 'get',
    params: query
  })
}

// 查询终端日在线情况详细
export function getCpOnlineStat(id) {
  return request({
    url: '/sc/cpOnlineStat/' + id,
    method: 'get'
  })
}

// 新增终端日在线情况
export function addCpOnlineStat(data) {
  return request({
    url: '/sc/cpOnlineStat',
    method: 'post',
    data: data
  })
}

// 修改终端日在线情况
export function updateCpOnlineStat(data) {
  return request({
    url: '/sc/cpOnlineStat',
    method: 'put',
    data: data
  })
}

// 删除终端日在线情况
export function delCpOnlineStat(id) {
  return request({
    url: '/sc/cpOnlineStat/' + id,
    method: 'delete'
  })
}
