import request from '@/utils/request'

// 查询测量点列表
export function listMp(query) {
  return request({
    url: '/sc/mp/list',
    method: 'get',
    params: query
  })
}

export function getResoucesByUserAndType(query) {
  return request({
    url: '/sc/mp/getResoucesByUserAndType',
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

// 下发命令
export function sendCommand(cjMpId) {
  return request({
    url: '/sc/mp/sendCommand',
    method: 'post',
    data: { cjMpId }
  })
}

// 获取网关配置
export function getConfig(cjMpId) {
  return request({
    url: '/sc/mp/getConfig',
    method: 'post',
    data: { cjMpId }
  })
}

// 召测数据
export function callData(cjMpId) {
  return request({
    url: '/sc/mp/callData',
    method: 'post',
    data: { cjMpId }
  })
}

// 补抄数据
export function supplementData(cjMpId) {
  return request({
    url: '/sc/mp/supplementData',
    method: 'post',
    data: { cjMpId }
  })
}

// 获取网关状态
export function getGatewayState(cjMpId) {
  return request({
    url: '/sc/mp/getGatewayState',
    method: 'post',
    data: { cjMpId }
  })
}

// 获取系统运行状态
export function sysRunState(cjMpId) {
  return request({
    url: '/sc/mp/sysRunState',
    method: 'post',
    data: { cjMpId }
  })
}
