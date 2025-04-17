import request from '@/utils/request'

// 查询行政区域列表
export function listArea(query) {
  return request({
    url: '/sc/area/list',
    method: 'get',
    params: query
  })
}

// 查询行政区域详细
export function getArea(id) {
  return request({
    url: '/sc/area/' + id,
    method: 'get'
  })
}

