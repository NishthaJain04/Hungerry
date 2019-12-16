import api from '@/api/homepageApis';
import errorHandler from '../api/apiUtils/errorHandler';
import cmsApi from '@/api/cms-api';

export default {
  state: {
    banners: [],
    products: [],
    walletRequest: {},
    configs: {},
    walletTransactions: [],
    registrationTermsAndConditions: ''
  },
  mutations: {
    setProducts(state, product) {
      state.products = product;
    },
    setBanners(state, banners) {
      state.banners = banners;
    },
    setWalletRequest(state, walletRequest) {
      state.walletRequest = walletRequest;
    },
    setConfigs(state, configs) {
      Object.assign(state.configs, {...configs})
    },
    setWalletTransactions(state, transactions) {
      state.walletTransactions = transactions;
    },
    setRegistrationTerms(state, terms) {
      state.registrationTermsAndConditions = terms;
    }
  },
  getters: {
    getBanners(state) {
      return state.banners;
    },
    getProducts(state) {
      return state.products;
    },
    getWalletRequest(state) {
      return state.walletRequest;
    },
    getConfigs(state) {
      return state.configs;
    },
    getWalletTransactions(state) {
      return state.walletTransactions;
    },
    getRegistrationTerms(state) {
      return state.registrationTermsAndConditions;
    }
  },
  actions: {
    GET_BANNERS_AND_SERVICES({ commit, dispatch }) {
      api.getServicesPromotion(
        response => {
          if (response.data.data.code === 200) {
            const mainResponse = response.data.data[0];
            commit('setBanners', mainResponse.blocks[0]['components']);
            commit('setProducts', mainResponse.blocks[1]['components']);
            const term = mainResponse.blocks[2]['components'][0]['parameters'][0]['content'] || '';
            commit('setRegistrationTerms', term);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        }
      );
    },
    GET_WALLET_REQUEST({ commit, dispatch }, { pathVariables }) {
      api.getWalletRequestData(
        response => {
          if (response.data.data.code === 200) {
            commit('setWalletRequest', response.data.data);
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
        pathVariables
      );
    },
    GET_ANALYTICS({commit, dispatch}, {params, success, fail}) {
      api.getHomeDetails(response=>{
        if (response.status === 200) {
          commit('setWalletTransactions', response.data.data);
          success(response.data.data)
        } else {
          if(fail) {
            fail()
          }
          dispatch('SET_ERROR_POPUP', {
            isErrorPopupVisible: true,
            errorList: response.data.data.errors
          }, {root: true});
        }
      }, error => {
          fail();
          errorHandler.handleErrors(dispatch, error);
      }, params)
    },
    GET_DELIVERY_CHECK({dispatch, commit}, {params, success}) {
      api.getConfirmMsg(response => {
          if (response.data) {
            success(response.data.data);
          }
        },
          error => {
            errorHandler.handleErrors(dispatch, error);
          },
          params
      )
    }
  },
  namespaced: true
};
