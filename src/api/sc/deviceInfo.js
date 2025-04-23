import request from '@/utils/request'

// 查询设备信息列表
export function listDeviceInfo(query) {
  return request({
    url: '/sc/deviceInfo/list',
    method: 'get',
    params: query
  })
}

// 查询设备信息详细
export function getDeviceInfo(id) {
  return request({
    url: '/sc/deviceInfo/' + id,
    method: 'get'
  })
}

// 新增设备信息
export function addDeviceInfo(data) {
  return request({
    url: '/sc/deviceInfo',
    method: 'post',
    data: data
  })
}

// 修改设备信息
export function updateDeviceInfo(data) {
  return request({
    url: '/sc/deviceInfo',
    method: 'put',
    data: data
  })
}

// 删除设备信息
export function delDeviceInfo(id) {
  return request({
    url: '/sc/deviceInfo/' + id,
    method: 'delete'
  })
}
