import digitalApi from '@/api/digitalApis';

export default {
  state: {
    operators: [],
    products: []
  },
  mutations: {
    setOperators(state, operators) {
      state.operators = operators;
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  getters: {
    operators(state) {
      return state.operators;
    },
    products(state) {
      return state.products.filter(product => !product.outOfStock);
    }
  },
  actions: {
    GET_OPERATORS({ commit }) {
      digitalApi.getOperator(
        response => commit('setOperators', response.data.data),
        error => console.log(error),
        'GAME_VOUCHER'
      );
    },
    GET_PRODUCTS({ commit }, { payload }) {
      digitalApi.getProducts(
        response => commit('setProducts', response.data.data.products),
        error => console.log(error),
        'GAME_VOUCHER',
        payload
      );
    },
    RESET_PRODUCT({commit}) {
      commit('setProducts', [])
    }
  },
  namespaced: true
};
