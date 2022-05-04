import Cookies from 'js-cookie'

const AuthorizationKey = 'Authorization'

export function getAuthorization() {
  return Cookies.get(AuthorizationKey)
}

export function setAuthorization(value) {
  return Cookies.set(AuthorizationKey, `authorization ${value}`)
}

export default Cookies
