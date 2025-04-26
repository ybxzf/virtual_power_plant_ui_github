import request from '@/utils/request'

// 查询回路负荷配置列表
export function listCircuitLoadConfig(query) {
  return request({
    url: '/sc/circuitLoadConfig/list',
    method: 'get',
    params: query
  })
}

// 查询回路负荷配置详细
export function getCircuitLoadConfig(id) {
  return request({
    url: '/sc/circuitLoadConfig/' + id,
    method: 'get'
  })
}

// 新增回路负荷配置
export function addCircuitLoadConfig(data) {
  return request({
    url: '/sc/circuitLoadConfig',
    method: 'post',
    data: data
  })
}

// 修改回路负荷配置
export function updateCircuitLoadConfig(data) {
  return request({
    url: '/sc/circuitLoadConfig',
    method: 'put',
    data: data
  })
}

// 删除回路负荷配置
export function delCircuitLoadConfig(id) {
  return request({
    url: '/sc/circuitLoadConfig/' + id,
    method: 'delete'
  })
}

// 获取所属设备信息
export function getCircuitOption(id) {
  return request({
    url: '/sc/circuitInfo/getCircuitOption',
    method: 'get',
    params:{
      userId: id,
    }
  })
}
