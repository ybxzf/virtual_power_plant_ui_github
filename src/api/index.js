import request from '@/utils/request'

//获取统计信息
export function getStatisticsData() {
  return request({
    url: '/sc/homePage/getTop1',
    method: 'get',
    timeout: 20000
  })
}
//获取实时负荷信息
export function getLoadMonitorData() {
  return request({
    url: '/sc/homePage/getLoadMonitor',
    method: 'get',
    timeout: 20000
  })
}
//获取历史负荷信息
export function getHistoryMonitorData() {
  return request({
    url: '/sc/homePage/getLoadMonitor',
    method: 'get',
    timeout: 20000
  })
}
//获取历史负荷信息
export function getTop3Data() {
  return request({
    url: '/sc/homePage/getTop3',
    method: 'get',
    timeout: 20000
  })
}