
import request from "@/utils/request";

const BASE_API = '/UserInfo'

export function getRegister(params={}) {
  return request({
    url: `/UserInfo/VerifyVerificationCodeByRecommend`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}