import digitalApis from '@/api/digitalApis';
import cmsApi from '@/api/cms-api';

export default {
  state: {
    products: [],
    vaInstruction: null
  },
  mutations: {
    setProduct(state, products) {
      state.products = products;
    },
    setVaInstruction(state, vaInstruction) {
      state.vaInstruction = vaInstruction
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    vaInstruction(state) {
      return state.vaInstruction
    }
  },
  actions: {
    GET_PRODUCT({ commit }) {
      digitalApis.getProducts(
        response => commit('setProduct', response.data.data.products),
        error => console.log(error),
        'WALLET_BALANCE'
      );
    },
    ADD_CART(store, { payload, success }) {
      digitalApis.addCart(
        response => success(response),
        error => console.log(error),
        payload
      );
    },
    GET_VA_LIST({commit}) {
      cmsApi.getConfig(
        (response) => {
          try {
            commit('setVaInstruction', JSON.parse(response.data.data))
          } catch(e) {
            console.log(e)
          }
        },
        error => console.log(error),
        'mitraVaInstruction'
      )
    }
  },
  namespaced: true
};
