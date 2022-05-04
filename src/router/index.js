import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import setDocumentTitle from "@/utils/set-document-title";

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


router.beforeEach(function (to, from, next) {
  setDocumentTitle(to)
  next()
})


export default router
