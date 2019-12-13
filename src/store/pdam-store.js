import digitalApi from '@/api/digitalApis';

export default {
  state: {
    operators: []
  },
  mutations: {
    setOperator(state, operators) {
      state.operators = operators;
    }
  },
  getters: {
    operators(state) {
      return state.operators;
    }
  },
  actions: {
    GET_PRODUCTS({ commit }) {
      digitalApi.getOperator(
        response => {
          commit('setOperator', response.data.data);
        },
        error => console.log(error),
        'WATER_BILL'
      );
    }
  },
  namespaced: true
};
