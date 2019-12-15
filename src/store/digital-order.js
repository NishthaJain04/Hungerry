import blipayApis from '@/api/blipayApis';

export default {
  state: {
    order: null
  },
  mutations: {
    setOrder(state, order) {
      state.order = order;
    }
  },
  getters: {
    order(state) {
      return state.order;
    }
  },
  actions: {
    PAY_ORDER(store, { payload, success, failed }) {
      blipayApis.pay((response) => {
        if (response.data.data.errors) {
          failed(response)
        } else {
          success(response)
        }
      }, failed, payload);
    },
    GET_ORDER_DETAIL({ commit }, { payload, success, failed }) {
      blipayApis.getOrderDetail(
        response => {
          if (!response.data.data.errors) {
            commit('setOrder', response.data.data);
            success && success(response.data.data);
          } else {
            failed && failed(response)
          }
        },
        error => {
          console.log(error)
          failed && failed(error)
        },
        payload.orderId,
        payload
      );
    },
    RESET_ORDER({commit}) {
      commit('setOrder', null)
    }
  },
  namespaced: true
};
