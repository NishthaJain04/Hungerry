import digitalApis from '@/api/digitalApis';

export default {
  state: {
    orders: [],
    isFetchingOrderHistory: false,
    paging: null
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    setIsFetchingOrderHistory(state, isFetching) {
      state.isFetchingOrderHistory = isFetching;
    },
    setPaging(state, paging) {
      state.paging = paging
    }
  },
  getters: {
    orders(state) {
      return state.orders;
    },
    isFetchingOrderHistory(state) {
      return state.isFetchingOrderHistory;
    },
    paging(state) {
      return state.paging;
    }
  },
  actions: {
    GET_ORDERS({ commit, state }, { payload , success}) {
      commit('setIsFetchingOrderHistory', true);
      digitalApis.getOrders(
        response => {
          commit('setIsFetchingOrderHistory', false);
          commit('setOrders', [...state.orders, ...response.data.data]);
          commit('setPaging', response.data.data.paging)
          success && success(response.data.data);
        },
        error => {
          commit('setIsFetchingOrderHistory', false);
          console.log(error);
        },
        payload
      );
    },
    RESET_ORDERS({commit}) {
      commit('setOrders', [])
    }
  },
  namespaced: true
};
