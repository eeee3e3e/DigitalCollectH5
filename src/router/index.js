import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import setDocumentTitle from "@/utils/set-document-title";
import { getAuthorization, getUserId } from "@/utils/cookies";
import tip from "@/utils/tip";
import store from "@/store";

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

const whiteList = [
  '/city-meta/verification-code-login',
  '/city-meta/verification-code-input'
]

router.beforeEach(async function (to, from, next) {
  const originNext = function (options) {
    options ? next(options) : next()
    setDocumentTitle(to)
    window.screenTop = 0
  }

  if (whiteList.includes(to.path)) {
    originNext()
    return
  }

  const userToken = getAuthorization()

  if (!userToken) {
    originNext({ replace: '/city-meta/verification-code-login' })
    // tip('用户登录信息失效')
    return
  }

  const userId = getUserId()

  if (!store.getters.hasUserInfo && userId) {
    await store.dispatch('INIT_USER_INFO', userId)
  }

  originNext()
})


export default router
