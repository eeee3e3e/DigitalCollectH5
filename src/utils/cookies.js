import Cookies from 'js-cookie'

const AuthorizationKey = 'Authorization'
const UserIdKey = 'META_USER_ID'

export function getAuthorization() {
  return Cookies.get(AuthorizationKey)
}

export function setAuthorization(value) {
  Cookies.set(AuthorizationKey, `authorization ${value}`,{ expires: 7 })
}

export function clearAuthorization(value) {
  Cookies.set(AuthorizationKey, `authorization ${value}`)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(value) {
  if (!value) return
  Cookies.set(UserIdKey, value,{ expires: 7 })
}

export function clearUserId() {
  Cookies.remove(UserIdKey)
}


export default Cookies
