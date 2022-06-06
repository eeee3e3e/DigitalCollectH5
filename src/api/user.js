import request from "@/utils/request";

const BASE_API = '/UserInfo'
// 登陆验证码验证（手机端登陆）
export function verifyVerificationCode(data = {}) {
  return request({
    url: `${BASE_API}/VerifyVerificationCode`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 登陆验证码获取
export function getVerificationCode(params = {}) {
  return request({
    url: `${BASE_API}/GetVerificationCode`,
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data' },
    params
  })
}

// 身份验证
export function userVerifyIDCard(data = {}) {
  return request({
    url: `${BASE_API}/VerifyIDCard`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 修改个人信息
export function editUserInfo(data = {}) {
  return request({
    url: `${BASE_API}/AddUser`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 获取用户
export function getUserInfoById(userId = undefined) {
  return request({
    url: `${BASE_API}/GetUser`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params: {
      userId
    }
  })
}

// 用户是否已经注册
export function IsRegByMobileNo(params = {}) {
  return request({
    url: `${BASE_API}/IsRegByMobileNo`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// 未读消息,我的消息
export function getUnreadMessages(params = {}) {
  return request({
    url: `/StationMessage/GetUnReadStationMessageByUserId`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}
// 清空消息
export function getReadStationMessageById(params = {}) {
  return request({
    url: `/StationMessage/ReadStationMessageByUserId`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}