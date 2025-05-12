import request from '@/utils/request'

// 查询采集点列表
export function listCp(query) {
  return request({
    url: '/sc/cp/list',
    method: 'get',
    params: query
  })
}

// 查询采集点详细
export function getCp(cjCpNo) {
  return request({
    url: '/sc/cp/' + cjCpNo,
    method: 'get'
  })
}

// 新增采集点
export function addCp(data) {
  return request({
    url: '/sc/cp',
    method: 'post',
    data: data
  })
}

// 修改采集点
export function updateCp(data) {
  return request({
    url: '/sc/cp',
    method: 'put',
    data: data
  })
}

// 删除采集点
export function delCp(cjCpNo) {
  return request({
    url: '/sc/cp/' + cjCpNo,
    method: 'delete'
  })
}
