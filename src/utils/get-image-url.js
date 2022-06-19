const isDev = process.env.NODE_ENV === 'development'

export default function getImageUrl(path = '') {
  if (!path) return path
  // const pre = isDev ? '/static-proxy' : 'http://resource.csscmeta.com'
  // const pre = isDev ? '/static-proxy' : 'https://api.csscmeta.com:8443'
  // const pre = isDev ? '/static-proxy' : 'https://apitest.csscmeta.com'
  // const pre = isDev ? '/static-proxy' : 'http://121.196.44.29:8001'
  // const pre = isDev ? '/static-proxy' : 'http://121.196.44.29:8002'
  const pre = isDev ? '/static-proxy' : 'https://citydemo.oss-cn-shenzhen.aliyuncs.com/'
  // http://resource.csscmeta.com
  return `${pre}${path}`
}
