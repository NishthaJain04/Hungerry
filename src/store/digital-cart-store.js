import digitalApi from '@/api/digitalApis';

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
    ADD_CART({ commit }, { payload, success = () => {} }) {
      commit('setCart', null);
      commit('setIsAddingToCart', true)
      commit('setPayErrors', null)
      digitalApi.setCustomerNumber(
        response => {
          commit('setIsAddingToCart', false)
          if (response.data.errors) {
            commit('setAddCartErrors', response.data.errors)
          } else {
            commit('setCart', response.data.data);
            commit('setAddCartErrors', null)
            success && success(response);
          }
        },
        error => console.log(error),
        payload
      );
    },
    ADD_CART_NO_NUMBER({ commit }, {payload, success}){
      commit('setCart', null);
      digitalApi.addCart(
        response => {
          commit('setCart', response.data.data);
          success && success(response.data.data);
        },
        error => console.log(error),
        payload
      );
    },
    PAY({commit}, { success, payload }) {
      digitalApi.pay(
        response => {
          if (response.data.errors) {
            commit('setPayErrors', response.data.errors)
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
          if (response.data.errors) {
            commit('setInquiryErrors', response.data.errors)
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
