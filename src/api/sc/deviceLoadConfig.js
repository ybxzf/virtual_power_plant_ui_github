import request from '@/utils/request'

// 查询设备负荷配置列表
export function listDeviceLoadConfig(query) {
  return request({
    url: '/sc/deviceLoadConfig/list',
    method: 'get',
    params: query
  })
}

// 查询设备负荷配置详细
export function getDeviceLoadConfig(id) {
  return request({
    url: '/sc/deviceLoadConfig/' + id,
    method: 'get'
  })
}

// 新增设备负荷配置
export function addDeviceLoadConfig(data) {
  return request({
    url: '/sc/deviceLoadConfig',
    method: 'post',
    data: data
  })
}

// 修改设备负荷配置
export function updateDeviceLoadConfig(data) {
  return request({
    url: '/sc/deviceLoadConfig',
    method: 'put',
    data: data
  })
}

// 删除设备负荷配置
export function delDeviceLoadConfig(id) {
  return request({
    url: '/sc/deviceLoadConfig/' + id,
    method: 'delete'
  })
}
