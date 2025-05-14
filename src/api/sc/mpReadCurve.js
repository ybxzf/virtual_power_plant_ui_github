import request from '@/utils/request'

// 查询测量点总电能示值数据列表
export function listMpReadCurve(query) {
  return request({
    url: '/sc/mpReadCurve/list',
    method: 'get',
    params: query
  })
}

// 查询测量点总电能示值数据详细
export function getMpReadCurve(id) {
  return request({
    url: '/sc/mpReadCurve/' + id,
    method: 'get'
  })
}

// 新增测量点总电能示值数据
export function addMpReadCurve(data) {
  return request({
    url: '/sc/mpReadCurve',
    method: 'post',
    data: data
  })
}

// 修改测量点总电能示值数据
export function updateMpReadCurve(data) {
  return request({
    url: '/sc/mpReadCurve',
    method: 'put',
    data: data
  })
}

// 删除测量点总电能示值数据
export function delMpReadCurve(id) {
  return request({
    url: '/sc/mpReadCurve/' + id,
    method: 'delete'
  })
}
