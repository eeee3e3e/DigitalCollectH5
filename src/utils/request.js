import axios from "axios";
import { isEmpty } from "lodash";
import tip from "@/utils/tip";
import { getAuthorization } from "@/utils/cookies";
import router from "@/router";

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://api.csscmeta.com:8443/api'
})

function useAuthorization(config) {
  if (!config.headers) {
    config.headers = {}
  }
  const token = getAuthorization()
  if (!token) return
  Object.assign(config.headers, {
    Authorization: token
  })
}

request.interceptors.request.use(
  function (config) {
    useAuthorization(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function showErrorMessage() {
  const token = getAuthorization()
  if (!token) throw new Error('没有授权的接口 不需要提示信息')
  tip.error(...arguments)
}

request.interceptors.response.use(
  function (response) {
    const { data } = response

    if (!data || isEmpty(data)) {
      return Promise.reject(new Error(response.toString()))
    }

    const { ReturnCode, ReturnMessage } = data

    if (ReturnCode !== '200') {
      showErrorMessage(ReturnMessage)

      if (ReturnCode === '401') {
        router.replace({ path: '/city-meta/verification-code-login' })
      }

      return Promise.reject(new Error(response.toString()))
    }

    return Promise.resolve(data)
  },
  function (error) {
    showErrorMessage('服务器异常')
    return Promise.reject(error)
  }
)

export default request
