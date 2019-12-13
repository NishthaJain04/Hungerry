import digitalApi from '@/api/digitalApis';

export default {
  state: {
    productData: null
  },
  mutations: {
    setProduct(state, productResponse) {
      state.productData = productResponse;
    }
  },
  getters: {
    productData(state) {
      return state.productData;
    }
  },
  actions: {
    GET_PRODUCTS({ commit }, { payload }) {
      digitalApi.getProducts(
        response => {
          commit('setProduct', response.data.data);
        },
        error => console.log(error),
        payload,
        {
          operatorName: 'PLN'
        }
      );
    },
    RESET_PRODUCT({ commit }) {
      commit('setProduct', null);
    }
  },
  namespaced: true
};
