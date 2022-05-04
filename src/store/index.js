import Vue from 'vue'
import Vuex from 'vuex'
import { isEmpty } from 'lodash'

Vue.use(Vuex)

function getUserInfoStateDefault() {
  const _userInfo = localStorage.getItem('userInfo')
  if (_userInfo) return JSON.parse(_userInfo)
  return {}
}

const store = new Vuex.Store({
  state: {
    userInfo: getUserInfoStateDefault(),
    loginPhone: undefined
  },
  getters: {
    userInfo: state => state.userInfo,
    hasUserInfo: state => state.userInfo && !isEmpty(state.userInfo) && state.userInfo.ID,
    loginPhone: state => state.loginPhone
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    DEL_USER_INFO(state) {
      state.userInfo = {}
    },
    SET_LOGIN_PHONE(state, phone) {
      state.loginPhone = phone
    },
    DEL_LOGIN_PHONE(state) {
      state.loginPhone = undefined
    }
  },
  actions: {}
})

export default store
