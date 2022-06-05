
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
export function GetImageCodeUrl(data = {}) {
  // console.log(data)
  return request({
    // url: `/UserInfo/GetImageCodeUrl?userId=c60fd831-5117-4462-8be5-2409cd9786dd`,
    url: `/UserInfo/GetImageCodeUrl?userId=${data}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // data
  })
}

export function getMyRecmmendRecordList(params={}) {
  return request({
    url: `/UsersRecmmendation/GetMyRecmmendRecordList`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}