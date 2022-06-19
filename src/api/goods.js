import request from '@/utils/request'

const BASE_API = '/Commodity'

// 商品 报名参与发售抽签
export function postSignUp(data = {}) {
  return request({
    url: `${BASE_API}/SignUp`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

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
export function getGoodsDetailById(params = {}) {
  return request({
    url: `${BASE_API}/GetCommodity`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
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
// 调整后的藏品列表
export function GetMyDrawerCommodityDetailsList(params) {
  return request({
    url: `/CommodityDetails/GetMyDrawerCommodityDetailsList`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: params
  })
}
// 获取抽屉藏品列表
export function GetMyDrawerCommodityDetailsListByCommodityId(params) {
  return request({
    url: `/CommodityDetails/GetMyDrawerCommodityDetailsListByCommodityId`,
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
