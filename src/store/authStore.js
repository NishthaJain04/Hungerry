import router from '@/router';
import api from '@/api/authApis.js';

export default {
  state: {
    isUserLoggedIn: false
  },
  getters: {
    getUserLoginStatus(state) {
      return state.isUserLoggedIn;
    }
  },
  mutations: {
    setUserLoginStatus(state, value) {
      Object.assign(state, {isUserLoggedIn: value});
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
    // eslint-disable-next-line no-empty-pattern
    GO_TO_HOME_PAGE({}, payload) {
      console.log('auth_stroe payload', payload);
      console.log('window.location', window.location.pathname);
      if(window.location.pathname !== payload.path) {
        router.push(payload.path);
      }
    },
    // eslint-disable-next-line no-empty-pattern
    GET_MITRA_SESSION({}, {success}) {
      api.getMitraSession(response=>{
        if(response.data.code === 200) {
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
        if(response.data.code === 200) {
          window.location.href = appHomeUrl;
        }
      }, fail=>{
        console.log('error', fail)
      })
    }
  },
  namespaced: false
};
