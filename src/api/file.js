import request from "@/utils/request";

const BASE_API = '/UploadFile'

// 上传附件
export function uploadFile(data = {}, params = {}) {
  return request({
    url: `${BASE_API}/UploadFileBack`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
    params
  })
}
