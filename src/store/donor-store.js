import digitalApi from '@/api/donorApis';

export default {
  state: {
    cart: null,
    contactNumber: null,
    inquiryDetail: null,
    inquiryErrors: null,
    addCartErrors: null,
    payErrors: null,
    isAddingToCart: false
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart;
    },
    setContactNumber(state, number) {
      state.contactNumber = number;
    },
    setInquiryDetail(state, inquiryDetail) {
      state.inquiryDetail = inquiryDetail;
    },
    setInquiryErrors (state, inquiryErrors) {
      state.inquiryErrors = inquiryErrors
    },
    setAddCartErrors (state, addCartErrors) {
      state.addCartErrors = addCartErrors
    },
    setPayErrors (state, payErrors) {
      state.payErrors = payErrors
    },
    setIsAddingToCart(state, addingToCart) {
      state.isAddingToCart = addingToCart
    }
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    inquiryDetail(state) {
      return state.inquiryDetail;
    },
    contactNumber(state) {
      return state.contactNumber
    },
    inquiryErrors(state) {
      return state.inquiryErrors
    },
    addCartErrors(state) {
      return state.addCartErrors
    },
    isAddingToCart(state) {
      return state.isAddingToCart
    },
    payErrors(state) {
      return state.payErrors
    }
  },
  actions: {
    CREATE_DONOR_REQUEST({ commit }, { success, params, payload } = {}) {
      digitalApi.createDonorRequest(
        response => {
          if (response.data.data.errors) {
            commit('setAddCartErrors', response.data.data.errors)
          } else {
            success && success(response.data.data);
          }
        },
        error => console.log(error),
        payload,
        params
      );
    },
    GET_DONOR_REQUEST_DETAIL({ commit }, { params, success}){
      commit('setCart', null);
      digitalApi.getDonorRequestDetail(
        response => {
          commit('setCart', response.data.data);
          success && success(response.data.data);
        },
        error => console.log(error),
        params
      );
    },
    PAY({commit}, { success, payload }) {
      digitalApi.pay(
        response => {
          if (response.data.data.errors) {
            commit('setPayErrors', response.data.data.errors)
          } else  {
            success && success(response.data.data)
          }
        },
        error => console.log(error),
        payload
      );
    },
    RESET_CART({ commit }) {
      commit('setCart', null);
    },
    SET_CONTACT_NUMBER({ commit }, { payload }) {
      commit('setContactNumber', payload);
    },
    INQUIRY({ commit }, { payload }) {
      digitalApi.inquiry(
        response => {
          if (response.data.data.errors) {
            commit('setInquiryErrors', response.data.data.errors)
          } else {
            commit('setInquiryDetail', response.data.data)
            commit('setInquiryErrors', null)
          }
        },
        error => console.log(error),
        payload
      );
    },
    RESET_INQUIRY({ commit }) {
      commit('setInquiryDetail', null);
    },
    GET_CART({ commit }) {
      digitalApi.getCart(response => commit('setCart', response.data.data));
    },
    CHANGE_PAYMENT({commit}, {payload}) {
      digitalApi.changePayment(
        (response) => commit('setCart', response.data.data),
        (e) => console.error(e),
        payload
      )
    },
    RESET_INQUIRY_ERROR({commit}) {
      commit('setInquiryErrors', null)
    },
    RESET_CART_ERROR({commit}) {
      commit('setAddCartErrors', null)
    }
  },
  namespaced: true
};
