import request from '@/utils/request'

// 查询自备电厂列表
export function listSelfPlant(query) {
  return request({
    url: '/sc/selfPlant/list',
    method: 'get',
    params: query
  })
}

// 查询自备电厂详细
export function getSelfPlant(id) {
  return request({
    url: '/sc/selfPlant/' + id,
    method: 'get'
  })
}

// 新增自备电厂
export function addSelfPlant(data) {
  return request({
    url: '/sc/selfPlant',
    method: 'post',
    data: data
  })
}

// 修改自备电厂
export function updateSelfPlant(data) {
  return request({
    url: '/sc/selfPlant',
    method: 'put',
    data: data
  })
}

// 删除自备电厂
export function delSelfPlant(id) {
  return request({
    url: '/sc/selfPlant/' + id,
    method: 'delete'
  })
}
