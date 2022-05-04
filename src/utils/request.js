import axios from "axios";
import { isEmpty } from "lodash";
import tip from "@/utils/tip";
import { getAuthorization } from "@/utils/cookies";
import router from "@/router";

const request = axios.create({
  baseURL:  process.env.NODE_ENV === 'development' ? '/api' : 'http://api.csscmeta.com/api'
})

function useAuthorization(config) {
  if (!config.headers) {
    config.headers = {}
  }
  Object.assign(config.headers, {
    Authorization: getAuthorization()
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

request.interceptors.response.use(
  function (response) {
    const { data } = response

    if (!data || isEmpty(data)) {
      return Promise.reject(new Error(response.toString()))
    }

    const { ReturnCode, ReturnMessage } = data

    if (ReturnCode !== '200') {
      tip.error(ReturnMessage)

      if (ReturnCode === '401') {
        router.replace({ path: '/city-meta/verification-code-login' })
      }

      return Promise.reject(new Error(response.toString()))
    }

    return Promise.resolve(data)
  },
  function (error) {
    tip.error('服务器异常')
    return Promise.reject(error)
  }
)

export default request
