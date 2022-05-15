
import request from "@/utils/request";

const BASE_API = '/UserInfo'
export function userTurnToUserInfo(data = {}) {
  return request({
    url: `${BASE_API}/TurnToUserInfo`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
export function getTurnCommodityToUser(data = {}) {
  return request({
    url: `/TurnCommodity/TurnCommodityToUser`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
export function getMyTurnCommodityLog(params={}) {
  return request({
    url: `/TurnCommodity/GetMyTurnCommodityLog`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}