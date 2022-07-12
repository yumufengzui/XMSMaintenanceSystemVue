import request from '@/utils/http'
const baseParams={
  loc:"zh_CN",
  ver:"1.0.0",
  method:"xmsopen.test.xoplistidcode",
  session:"session key",
  sign:"your real sign",
  appkey:"your real appkey",
  hotelid:"G000001",
  ts:'1638773374234',
}
const baseURL='http://rap2api.taobao.org/app/mock/300857/POST/'

export function getDocList (params){
  return request({
    method: 'post',
    url: baseURL+'/getDocList',
    data:{
      ...baseParams,
      params
    }
  })
}
//新建
export function addDoc (params){
  return request({
    method: 'post',
    url: baseURL+'/addDoc',
    data:{
      ...baseParams,
      params
    }
  })
}
//修改
export function editDoc (params){
  return request({
    method: 'post',
    url: baseURL+'/editDoc',
    data:{
      ...baseParams,
      params
    }
  })
}

//删除
export function delDoc (params){
  return request({
    method: 'post',
    url: baseURL+'/delDoc',
    data:{
      ...baseParams,
      params
    }
  })
}

//获取发布列表
export function getReleaseList (params){
  return request({
    method: 'post',
    url: baseURL+'/getReleaseList',
    data:{
      ...baseParams,
      params
    }
  })
}

//发布
export function releaseDoc (params){
  return request({
    method: 'post',
    url: baseURL+'/releaseDoc',
    data:{
      ...baseParams,
      params
    }
  })
}

//日志
export function recordDoc (params){
  return request({
    method: 'post',
    url: baseURL+'/recordDoc',
    data:{
      ...baseParams,
      params
    }
  })
}

//已发布列表
export function getReleasedList (params){
  return request({
    method: 'post',
    url: baseURL+'/releasedList',
    data:{
      ...baseParams,
      params
    }
  })
}

//修改已发布列表
export function editReleasedList (params){
  return request({
    method: 'post',
    url: baseURL+'/editReleasedList',
    data:{
      ...baseParams,
      params
    }
  })
}

//获取已发布酒店
export function getReleasedHotel (params){
  return request({
    method: 'post',
    url: baseURL+'/getReleasedHotel',
    data:{
      ...baseParams,
      params
    }
  })
}