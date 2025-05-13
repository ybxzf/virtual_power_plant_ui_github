import request from '@/utils/request'

// 查询瞬时量数据列表
export function listMpYcRead(query) {
  return request({
    url: '/sc/mpYcRead/list',
    method: 'get',
    params: query
  })
}

// 查询瞬时量数据详细
export function getMpYcRead(id) {
  return request({
    url: '/sc/mpYcRead/' + id,
    method: 'get'
  })
}

// 新增瞬时量数据
export function addMpYcRead(data) {
  return request({
    url: '/sc/mpYcRead',
    method: 'post',
    data: data
  })
}

// 修改瞬时量数据
export function updateMpYcRead(data) {
  return request({
    url: '/sc/mpYcRead',
    method: 'put',
    data: data
  })
}

// 删除瞬时量数据
export function delMpYcRead(id) {
  return request({
    url: '/sc/mpYcRead/' + id,
    method: 'delete'
  })
}
