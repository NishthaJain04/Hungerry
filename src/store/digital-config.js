
import digitalApi from '@/api/digitalApis'

export default {
  state: {
    config: {
      mitrapay_max_topup_amount: 10000000,
      mitrapay_min_topup_amount: 10000,
      minimum_number_length_phone_credit: 10,
      maximum_number_length_phone_credit: 15,
      minimum_number_length_water_bill: 4,
      maximum_number_length_water_bill: 20,
      minimum_number_length_bpjs: 4,
      maximum_number_length_bpjs: 16,
      minimum_number_length_electricity_credit: 10,
      maximum_number_length_electricity_credit: 12,
      minimum_number_length_electricity_postpaid: 10,
      maximum_number_length_electricity_postpaid: 12
    }
  },
  getters: {
    config (state) {
      return state.config
    }
  },
  mutations: {
    setConfig(state, config) {
      state.config = {
        ...state.config,
        ...config
      }
    }
  },
  actions: {
    getConfig({commit}, configNames) {
      digitalApi.getConfig(
        response => commit('setConfig', response.data.data.configData),
        error => console.log(error),
        configNames
      )
    }
  },
  namespaced: true
}