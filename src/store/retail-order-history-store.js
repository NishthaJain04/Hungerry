import retailOrderHistoryApi from '@/api/retailOrderHistoryApis';
import errorHandler from '../api/apiUtils/errorHandler';

export default {
  state: {
    isFetchingRetailOrderHistory: false,
    retailPaging: null,
    retailOrders: [],
    retailOrderDetail: {},
    shippingStatus: [],
    isFetchingShipping: false
  },
  mutations: {
    setOrderHistory(state, response) {
      state.retailOrders = response;
    },
    setIsFetchingRetailOrderHistory(state, isFetching) {
      state.isFetchingRetailOrderHistory = isFetching;
    },
    setRetailPaging(state, paging) {
      state.retailPaging = paging
    },
    setRetailOrderDetail(state, retailOrderDetail) {
      state.retailOrderDetail = retailOrderDetail
    },
    setShippingStatus(state, shippingStatus) {
      state.shippingStatus = shippingStatus
    },
    setIsFetchingShipping(state, isFetching) {
      state.isFetchingShipping = isFetching;
    }
  },
  getters: {
    getOrderHistory(state) {
      return state.retailOrders;
    },
    isFetchingRetailOrderHistory(state) {
      return state.isFetchingRetailOrderHistory;
    },
    retailPaging(state) {
      return state.retailPaging;
    },
    getRetailOrderDetail(state) {
      return state.retailOrderDetail;
    },
    getShippingStatus(state) {
      return state.shippingStatus;
    },
    isFetchingShipping(state) {
      return state.isFetchingShipping;
    },
  },
  actions: {
    RESET_ORDERS({ commit }) {
      commit('setOrderHistory', [])
    },
    GET_ORDER_HISTORY({ commit, dispatch, state }, { payload, params, success, isNewPage } = {}) {
      commit('setIsFetchingRetailOrderHistory', true);
        retailOrderHistoryApi.getOrderHistory(
        response => {
          commit('setIsFetchingRetailOrderHistory', false);
          if (response.data.code === 200) {
            if (
              response.data.errors === null ||
              response.data.errors === undefined
            ) {
              if (isNewPage) {
                commit('setOrderHistory', response.data.data.orders);
              } else {
                commit('setOrderHistory', [...state.retailOrders, ...response.data.data.orders ]);
              }
              commit('setRetailPaging', response.data.paging)
              success && success(response.data.data);
            } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.errors
          }, {root: true});
          }
        } else {
          dispatch('SET_ERROR_HANDLE_POPUP', {
            isErrorHandleVisible: true,
            errorList: response.data.errors
        }, {root: true});
        }
        },
        error => {
          commit('setIsFetchingRetailOrderHistory', false);
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
     },
    TRACK_ORDER_ITEM({ commit, dispatch }, { pathVariables } = {}) {
        commit('setIsFetchingShipping', true)
        retailOrderHistoryApi.trackOrderItem(
        response => {
          commit('setIsFetchingShipping', false);
          if (response.data.code === 200) {
            if (
              response.data.errors === null ||
              response.data.errors === undefined
            ) {
              commit('setShippingStatus', response.data.data.generalManifestResponses[0]);
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingShipping', false);
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables
      );
    },
    GET_RETAIL_ORDER_DETAIL({ commit, dispatch }, { pathVariables } = {}) {
      commit('setRetailOrderDetail', {})
      commit('setIsFetchingRetailOrderHistory', true);
      retailOrderHistoryApi.getOrderDetail(
      response => {
        commit('setIsFetchingRetailOrderHistory', false);
        if (response.data.code === 200) {
          if (
            response.data.errors === null ||
            response.data.errors === undefined
          ) {
            commit('setRetailOrderDetail', response.data.data.orderHistory);
          } else {
            commit('setRetailOrderDetail', {});
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.errors
            }, {root: true});
          }
        } else {
          commit('setRetailOrderDetail', {});
          dispatch('SET_ERROR_HANDLE_POPUP', {
            isErrorHandleVisible: true,
            errorList: response.data.errors
          }, {root: true});
        }
      },
      error => {
        commit('setRetailOrderDetail', {});
        commit('setIsFetchingRetailOrderHistory', false);
        errorHandler.handleErrors(dispatch, error);
      },
      pathVariables
    );
    }
  },
  namespaced: true
};
