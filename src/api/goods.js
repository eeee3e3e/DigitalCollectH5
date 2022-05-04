import request from "@/utils/request";

const BASE_API = '/Commodity'

// 获取商品列表前台
export function getGoodsListByPage(params = {}) {
  return request({
    url: `${BASE_API}/GetCommodityListFront`,
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data' },
    params
  })
}

// 获取商品详情
export function getGoodsDetailById(id) {
  return request({
    url: `${BASE_API}/GetCommodity`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: {
      id: id
    }
  })
}

// 获取商品详情
export function getMyCommodityDetails(params) {
  return request({
    url: `/CommodityDetails/GetMyCommodityDetails`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: {
      userId: params.userId,
      commodityDetailsID: params.commodityDetailsID
    }
  })
}

// 我的藏品列表
export function getMyGoodsDetailsList(params) {
  return request({
    url: `/CommodityDetails/GetMyCommodityDetailsList`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: params
  })
}

// 获取我的兑换列表
export function getMyExchangesRecordList(params) {
  return request({
    url: `/UserCommodityExchanges/GetMyExchangesRecordList`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: params
  })
}

// 兑换商品
export function postUserExchanges(data) {
  return request({
    url: `/UserCommodityExchanges/UserExchanges`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}
