import Vue from 'vue'
import Vuex from 'vuex'
import { isEmpty } from 'lodash'
import { userApi } from "@/api";
import { clearUserId, setUserId } from "@/utils/cookies";
import axios from "axios";
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    loginPhone: undefined,
    auth: {}
  },
  getters: {
    userInfo: state => state.userInfo,
    auth: state => state.auth,
    hasUserInfo: state => state.userInfo && !isEmpty(state.userInfo) && state.userInfo.ID,
    loginPhone: state => state.loginPhone,
    userId: state => state.userInfo.ID
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      setUserId(userInfo.ID)
      state.userInfo = userInfo
    },
    DEL_USER_INFO(state) {
      clearUserId()
      state.userInfo = {}
    },
    SET_LOGIN_PHONE(state, phone) {
      state.loginPhone = phone
    },
    DEL_LOGIN_PHONE(state) {
      state.loginPhone = undefined
    },
    SET_AUTH(state, auth) {
      state.auth = auth
    },
    DEL_AUTH(state) {
      state.auth = {}
    }
  },
  actions: {
    REFRESH_USER_INFO({ dispatch, getters }) {
      return dispatch('INIT_USER_INFO', getters.userId)
    },
    INIT_USER_INFO({ commit, getters }, userId) {
      return new Promise((resolve, reject) => {
        userApi
          .getUserInfoById(userId)
          .then(result => {
            commit('SET_USER_INFO', result.Data)
            resolve()
          })
          .catch(reject)
      })
      /*axios({ 
        method: 'get',
        url: 'http://121.196.44.29:8999/api/UserInfo/GetUser?&userId=690461d5-746a-4136-a9fc-99d8fecd037d',
        // data: params
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.info(error);
      });*/
    },
  }
})

export default store
