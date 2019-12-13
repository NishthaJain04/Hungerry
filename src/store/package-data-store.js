import digitalApi from '@/api/digitalApis';

export default {
  state: {
    productData: null,
    productErrors: null
  },
  mutations: {
    setProduct(state, productResponse) {
      state.productData = productResponse;
    },
    setProductErrors(state, productErrors) {
      state.productErrors = productErrors
    }
  },
  getters: {
    productData(state) {
      return state.productData;
    },
    productErrors(state) {
      return state.productErrors;
    }
  },
  actions: {
    GET_PRODUCTS({ commit }, { payload }) {
      digitalApi.getProducts(
        response => {
          if (response.data.errors) {
            commit('setProductErrors', response.data.errors);
          } else {
            commit('setProduct', response.data.data);
            commit('setProductErrors', null);
          }
        },
        error => console.log(error),
        'DATA_PACKAGE',
        payload
      );
    },
    RESET_PRODUCT({ commit }) {
      commit('setProduct', null);
    },
    RESET_PRODUCT_ERROR({commit}) {
      commit('setProductErrors', null)
    }
  },
  namespaced: true
};
