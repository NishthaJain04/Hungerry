import api from '../api/profileApis';
import errorHandler from '../api/apiUtils/errorHandler';

export default {
  state: {
    membersData: {},
    userPin: '',
    ocrDetails: {},
    isMemberFetched: false
  },
  getters: {
    getMembersData(state) {
      return state.membersData;
    },
    getUserPin(state) {
      return state.userPin;
    },
    getOcrDetails(state) {
      return state.ocrDetails;
    },
    isMemberFetched(state) {
      return state.isMemberFetched;
    }
  },
  mutations: {
    setMembersData(state, value) {
      state.membersData = value;
    },
    setUserPin(state, value) {
      state.userPin = value;
    },
    setOcrDetails(state, value) {
      state.ocrDetails = value;
    },
    clearOcrDetails(state, value) {
      state.ocrDetails = value || {};
    },
    setIsMemberFetched(state, fetched) {
      state.isMemberFetched = fetched
    }
  },
  actions: {
    GET_MEMBER_DETAILS(
      { commit, dispatch },
      { params, success } = {}
    ) {
      api.getMemberDetails(
        response => {
          if (response.data) {
            commit('setMembersData', response.data.data);
            success(response.data);
          }
        },
        error => {
          commit('setIsMemberFetched', true);
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    GENERATE_OTP({ dispatch }, { success, params, payload, fail } = {}) {
      api.generateOtp(
        response => {
          if (response.data.data.code === 200) {
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
            fail(response.data.data.errors);
          }
        },
        error => {
          fail(error);
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
    },
    UPDATE_PIN({ dispatch }, { success, params, payload} = {}) {
      api.updatePin(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.error === null ||
              response.data.data.error === undefined
            ) {
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_POPUP', {
                isErrorPopupVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        params,
        payload
      );
    },
    VERIFY_OTP({ dispatch }, { success, params, payload, fail } = {}) {
      api.verifyOtp(
        response => {
          if (response.status === 200) {
            success(response.data);
          } else {
            fail(response.data);
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
    },
    VERIFY_KTP({ dispatch }, { success, params, payload, pathVariables } = {}) {
      api.verifyKtp(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.error === null ||
              response.data.data.error === undefined
            ) {
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_POPUP', {
                isErrorPopupVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        params,
        payload
      );
    },
    GET_STORE_TYPE({ dispatch }, { params, payload, success } = {}) {
      api.getStoreTypeList(
        response => {
          if (response.data.data.code === 200) {
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        params,
        payload
      );
    },
    GET_MEMBER_IN_PROGRESS(
      { commit, dispatch },
      { success, params, pathVariables } = {}
    ) {
      api.getMemberInProgress(
        response => {
          if (response.data.data.code === 200) {
            commit('setMembersData', response.data.data);
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        params
      );
    },
    SAVE_MEMBER_DETAIL(
      { dispatch },
      { success, params, payload, pathVariables } = {}
    ) {
      api.saveMemberDetails(
        response => {
          if (response.data.data.code === 200) {
            console.log('SAVE_MEMBER_DETAIL', response);
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        payload,
        params
      );
    },
    VERIFY_USER_PIN(
      { dispatch },
      { success, payload, fail } = {}
    ) {
      api.verifyUserPin(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              success(response.data.data);
            }
          } else {
              fail(response.data.data)
                dispatch('SET_ERROR_POPUP', {
                  isErrorPopupVisible: true,
                  errorList: response.data.data.errors
                }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        payload
      );
    },
    UPLOAD_KTP_PROFILE(
        { dispatch },
        { success, params, payload, pathVariables, fail } = {}
    ) {
      api.uploadKTP(
          response => {
            if (response.data.data.code === 200) {
              success(response.data.data);
            } else {
             fail(response)
            }
          },
          error => {
            errorHandler.handleErrors(dispatch, error);
          },
          pathVariables,
          params,
          payload
      );
    },
    DOWNLOAD_KTP(
        { dispatch },
        { success, params, payload, pathVariables } = {}
    ) {
      api.downloadKTP(
          response => {
            console.log('[DOWNLOAD_KTP RESPONSE]', response);
            //btoa for converting byte stream to string
            var base64 = btoa(new Uint8Array(new Uint8Array(response.data.data)).reduce(
                function (data, byte) {
                  return data + String.fromCharCode(byte);
                },
                ''
            ));
            const base64encoded = `data:${response.headers['content-type']};base64,${base64}`;
            success(base64encoded);
          },
          error => {
            errorHandler.handleErrors(dispatch, error);
          },
          pathVariables,
          params,
          payload
      );
    },
    GET_SIGNED_URL(
        { dispatch },
        { success, params, payload, pathVariables, fail } = {}
    ) {
      api.getSignedUrlForImageUpload(
          response => {
            console.log('[GET_SIGNED_URL RESPONSE]', response);
            if (response.data.data.code === 200) {
              success(response.data.data)
            } else {
              dispatch('SET_ERROR_POPUP', {
                isErrorPopupVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          },
          error => {
            if(fail) {
              fail(error.response)
            }
            errorHandler.handleErrors(dispatch, error);
          },
          pathVariables,
          params,
          payload
      );
    },
    SUBSCRIBE_WHATSAPP({dispatch}, {success, payload, pathVariables, fail}){
      api.optWhatsApp(response=> {
        if(response.data.data.code === 200) {
          success(response.data.data)
        } else {
          dispatch('SET_ERROR_POPUP', {
            isErrorPopupVisible: true,
            errorList: response.data.data.errors
          }, {root: true});
        }
      },error => {
        if(fail) {
          fail(error.response)
        }
        errorHandler.handleErrors(dispatch, error);
      }, pathVariables, payload)
    },
    GET_ADDRESS_DETAILS({dispatch}, {params, success, fail}){
      api.getAddressDetails(response=> {
        if(response.data.data.code === 200) {
          success(response.data.data)
        } else {
          dispatch('SET_ERROR_POPUP', {
            isErrorPopupVisible: true,
            errorList: response.data.data.message
          }, {root: true});
        }
      }, error => {
          fail(error)
          errorHandler.handleErrors(dispatch, error);
      }, params)
    }
  },
  namespaced: true
};
