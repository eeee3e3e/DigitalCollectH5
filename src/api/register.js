
import request from "@/utils/request";

const BASE_API = '/UserInfo'

export function VerifyVerificationCodeByRecommend(params={}) {
  return request({
    url: `/UserInfo/VerifyVerificationCodeByRecommend`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}