const isDev = process.env.NODE_ENV === 'development'

export default function getImageUrl(path = '') {
  if (!path) return path
  const pre = isDev ? '/static-proxy' : 'http://api.csscmeta.com'
  return `${pre}${path}`
}
