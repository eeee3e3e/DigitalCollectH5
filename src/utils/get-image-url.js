const isDev = process.env.NODE_ENV === 'development'

export default function getImageUrl(path = '') {
  if (!path) return path
  const pre = isDev ? '/static-proxy' : 'https://api.csscmeta.com:8443'
  return `${pre}${path}`
}
