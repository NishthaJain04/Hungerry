import retailCheckoutApi from '@/api/collectorApis';
import errorHandler from '../api/apiUtils/errorHandler';

export default {
  state: {
    requestDetails: {},
    productList: [],
    categories: [],
    shippingAddress: '',
    paging: null,
    isFetchingList: true,
    subCategories: [],
    lastOrderItems: [],
    subCategoryList: [],
    checkoutCart: {},
    isAddingItemToCart: false
  },
  mutations: {
    setProductsList(state, productListResponse) {
      state.productList = productListResponse;
    },
    setRequestDetails(state, cartResponse) {
      state.requestDetails = cartResponse;
    },
    setCategories(state, categories) {
      state.categories = categories
      if (categories) {
      state.subCategoryList = []
      categories.forEach( category => {
        if (category.subCategoryInfoResponseList && category.subCategoryInfoResponseList.length) {
          category.subCategoryInfoResponseList.forEach( subCat => {
            state.subCategoryList.push(subCat)
          })
        }
      })
    }
    },
    setShippingAddress( state, value) {
      state.shippingAddress = value;
    },
    setPaging(state, paging) {
      state.paging = paging
    },
    setIsFetchingList(state, isFetchingList) {
      state.isFetchingList = isFetchingList
    },
    setSubCategories(state, subCategories) {
      state.subCategories = subCategories
    },
    setLastOrder(state, lastOrderItems) {
      state.lastOrderItems = lastOrderItems
    },
    setSubCategoryList(state, value) {
      state.subCategoryList = value;
    },
    setCheckoutCart(state, value) {
      state.checkoutCart = value;
    },
    setIsAddingItemToCart(state, value) {
      state.isAddingItemToCart = value
    }
  },
  getters: {
    getProductsList(state) {
      return state.productList;
    },
    getRequestDetails(state) {
      return state.requestDetails;
    },
    getCategories(state) {
      return state.categories;
    },
    getShippingAddress(state) {
      return state.shippingAddress
    },
    paging(state) {
      return state.paging;
    },
    getIsFetchingList(state) {
      return state.isFetchingList;
    },
    getSubCategories(state) {
      return state.subCategories;
    },
    getLastOrder(state) {
      return state.lastOrderItems;
    },
    getSubCategoryList(state) {
      return state.subCategoryList;
    },
    getCheckoutCart(state) {
      return state.checkoutCart;
    },
    isAddingItemToCart(state) {
      return state.isAddingItemToCart;
    }
  },
  actions: {
    GET_MATCHING_DONORS({ commit, dispatch }, { params, success } = {}) {
      retailCheckoutApi.getMatchingDonors(
        response => {
          if (response.data) {
              commit('setCartDetails', response.data.data);
              success(response.data.data)
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    RESET_SUB_CATEGORIES({ commit }) {
      commit('setSubCategoryList', null);
    },
    SEND_COLLECT_REQUEST({ commit, dispatch }, { params, success } = {}) {
      commit('setIsAddingItemToCart', true)
      retailCheckoutApi.sendCollectRequest(
        response => {
          if (response.data) {
            success(response.data.data)
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
            commit('setIsAddingItemToCart', false)
          }
        },
        error => {
          commit('setIsAddingItemToCart', false)
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    CREATE_REQUEST(
      { commit, dispatch },
      { payload, params, success, fail } = {}
    ) {
      retailCheckoutApi.createCollectorRequest(
        response => {
          if (response.data) {
              commit('setRequestDetails', response.data.data);
              success(response.data.data);
          } else {
            fail(response.data.data.errors);
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsAddingItemToCart', false);
          fail(error);
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
    },
    ADD_TO_CART({ commit, dispatch }, { payload, params, fail } = {}) {
      commit('setIsAddingItemToCart', true)
      retailCheckoutApi.addItemToCart(
        response => {
          commit('setIsAddingItemToCart', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setCartDetails', response.data.data);
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
              fail(response.data.data.errors)
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
            fail(response.data.data.errors)
          }
        },
        error => {
          commit('setIsAddingItemToCart', false)
          errorHandler.handleErrors(dispatch, error);
          fail(error)
        },
        payload,
        params
      );
    },
    CHECKOUT_CART({ commit, dispatch }, { success } = {}) {
      commit('setIsFetchingList', true)
      retailCheckoutApi.checkoutCart(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              success(response.data.data);
            } else {
                dispatch('SET_ERROR_HANDLE_POPUP', {
                  isErrorHandleVisible: true,
                  errorList: response.data.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        }
      );
    },
    CREATE_ORDER({ commit, dispatch }, { success, payload, params } = {}) {
      commit('setIsFetchingList', true)
      retailCheckoutApi.createOrder(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
    },
    GET_ORDER_BY_ORDERID(
      { dispatch },
      { success, params } = {}
    ) {
      retailCheckoutApi.getOrderByOrderId(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              });
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            });
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    GET_CATEGORIES(
      { commit, dispatch },
      { success, params } = {}
    ) {
      commit('setCategories', null)
      retailCheckoutApi.getCategories(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setCategories', response.data.data)
              success(response.data.data)
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              });
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            });
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    GET_PRODUCTS_LIST(
      { commit, dispatch, state },
      { success, params, payload, pathVariables } = {}
    ) {
      commit('setIsFetchingList', true)
      retailCheckoutApi.getProductsList(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setProductsList', [...state.productList, ...response.data.data])
              commit('setPaging', response.data.data.paging)
              if(success) {
                success(response.data.data);
              } else {
                dispatch('SET_ERROR_HANDLE_POPUP', {
                  isErrorHandleVisible: true,
                  errorList: response.data.data.errors
                });
              }
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            });
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        params,
        payload
      );
    },
    GET_LAST_ORDER(
      { commit, dispatch },
      { params } = {}
    ) {
      commit('setLastOrder', null)
      retailCheckoutApi.getLastOrder(
        response => {
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setLastOrder', response.data.data)
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              });
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            });
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    getShippingAddress ({ commit }, value) {
      commit('setShippingAddress', value)
    },
    RESET_PRODUCT_LIST({ commit }) {
      commit('setProductsList', [])
      commit('setPaging', 0)
    },
    SET_FETCHING({ commit }, value) {
      commit('setIsFetchingList', value)
    },
    GET_CHECKOUT_CART(
      { commit, dispatch },
      { params, success } = {}
    ) {
      commit('setCheckoutCart', null)
      commit('setIsFetchingList', true)
      retailCheckoutApi.retailCheckout(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setCheckoutCart', response.data.data)
              success(response.data.data)
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        },
        params
      );
    },
    UPDATE_QUANTITY_AT_CHECKOUT(
      { commit, dispatch },
      { payload, params, success, fail } = {}
    ) {
      commit('setIsFetchingList', true)
      retailCheckoutApi.updateQuantityAtCheckout(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setCheckoutCart', response.data.data);
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
          fail(error);
        },
        payload,
        params
      );
    },
    DEL_ITEM_AT_CHECKOUT({ commit, dispatch }, { payload, params, success } = {}) {
      commit('setIsFetchingList', true)
      retailCheckoutApi.deleteItemAtCheckout(
        response => {
          commit('setIsFetchingList', false)
          if (response.data.data.code === 200) {
            if (
              response.data.data.errors === null ||
              response.data.data.errors === undefined
            ) {
              commit('setCheckoutCart', response.data.data);
              success(response.data.data)
            } else {
              dispatch('SET_ERROR_HANDLE_POPUP', {
                isErrorHandleVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          } else {
            dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          commit('setIsFetchingList', false)
          errorHandler.handleErrors(dispatch, error);
        },
        payload,
        params
      );
    }
  },
  namespaced: true
};
