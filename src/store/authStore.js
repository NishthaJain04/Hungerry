// import router from '@/router';
import api from '@/api/authApis.js';

export default {
  state: {
    userDetails: {},
    isUserLoggedIn: false
  },
  getters: {
    getUserLoginStatus(state) {
      return state.isUserLoggedIn;
    },
    getUserLoginDetails(state) {
      return state.userDetails;
    }
  },
  mutations: {
    setUserLoginStatus(state, value) {
      Object.assign(state, {isUserLoggedIn: value});
    },
    setUserLoginDetails(state, value) {
      Object.assign(state, {userDetails: value});
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    GO_TO_LOGIN_PAGE({}, payload) {
      console.log('GO_TO_LOGIN_PAGE PAYLOAD', payload);
      const loginUrl = payload.loginUrl;
      const callbackUrl = payload.callbackUrl;
      window.location.href = `${loginUrl}?callback=${callbackUrl}`;
    },
    SET_LOGIN_STATUS({commit}, payload) {
      commit('setUserLoginStatus', payload);
    },
    SET_LOGIN_DETAILS({commit}, { payload, success, params} ={}) {
      commit('setUserLoginDetails', payload);
      api.toRegister(response => {
        success(response.data.data)
      }, {}, payload, params)
    },
    // eslint-disable-next-line no-empty-pattern
    GO_TO_HOME_PAGE({},{ payload, success, params } = {}) {
      console.log('qwdef', payload)
      payload = Object.assign(payload, this.getUserLoginDetails)
      api.toLogin(response=> {
        success(response)
      }, {}, payload, params)
    },
    // eslint-disable-next-line no-empty-pattern
    GO_TO_HOME_PAGE_REG({},{ payload, success, params } = {}) {
      console.log('qwdef', payload)
      api.toRegister(response=> {
        success(response)
      }, {}, payload, params)
    },
    // eslint-disable-next-line no-empty-pattern
    GET_MITRA_SESSION({}, {success}) {
      api.getMitraSession(response=>{
        if(response.data.data.code === 200) {
          const member = response.data.data || '';
          window.sessionStorage.setItem('memberId', member.memberId);
          success();
        } else {
          window.sessionStorage.setItem('memberId', '')
        }
      }, fail => {
        console.log('error', fail)
      })
    },
    // eslint-disable-next-line no-empty-pattern
    LOG_OUT_FROM_APP({}, {appHomeUrl}) {
      console.log('appHomeUrl', appHomeUrl);
      api.logoutApp(response=>{
        console.log('response:', response);
        if(response.data.data.code === 200) {
          window.location.href = appHomeUrl;
        }
      }, fail=>{
        console.log('error', fail)
      })
    }
  },
  namespaced: true
};
