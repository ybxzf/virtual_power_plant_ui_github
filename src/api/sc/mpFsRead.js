import request from '@/utils/request'

// 查询测量点分时电量示度数据列表
export function listMpFsRead(query) {
  return request({
    url: '/sc/mpFsRead/list',
    method: 'get',
    params: query
  })
}

// 查询测量点分时电量示度数据详细
export function getMpFsRead(id) {
  return request({
    url: '/sc/mpFsRead/' + id,
    method: 'get'
  })
}

// 新增测量点分时电量示度数据
export function addMpFsRead(data) {
  return request({
    url: '/sc/mpFsRead',
    method: 'post',
    data: data
  })
}

// 修改测量点分时电量示度数据
export function updateMpFsRead(data) {
  return request({
    url: '/sc/mpFsRead',
    method: 'put',
    data: data
  })
}

// 删除测量点分时电量示度数据
export function delMpFsRead(id) {
  return request({
    url: '/sc/mpFsRead/' + id,
    method: 'delete'
  })
}
