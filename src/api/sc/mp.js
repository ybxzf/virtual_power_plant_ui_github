import request from '@/utils/request'

// 查询测量点列表
export function listMp(query) {
  return request({
    url: '/sc/mp/list',
    method: 'get',
    params: query
  })
}

// 查询测量点详细
export function getMp(cjMpId) {
  return request({
    url: '/sc/mp/' + cjMpId,
    method: 'get'
  })
}

// 新增测量点
export function addMp(data) {
  return request({
    url: '/sc/mp',
    method: 'post',
    data: data
  })
}

// 修改测量点
export function updateMp(data) {
  return request({
    url: '/sc/mp',
    method: 'put',
    data: data
  })
}

// 删除测量点
export function delMp(cjMpId) {
  return request({
    url: '/sc/mp/' + cjMpId,
    method: 'delete'
  })
}
