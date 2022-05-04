import request from "@/utils/request";

const BASE_API = '/Dictionary'

// 根据类别获取banner
export function getBannerListByCategory(params = {}) {
  return request({
    url: `${BASE_API}/GetBannerListByCategory`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

