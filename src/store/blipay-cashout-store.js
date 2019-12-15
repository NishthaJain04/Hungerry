import api from '@/api/blipayCashoutApis';
import errorHandler from '../api/apiUtils/errorHandler';

export default {
  state: {
    bankList: [],
    transactions: [],
    memberBankList: []
  },
  mutations: {
    setBankList(state, banks) {
      state.bankList = banks;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setMemberBankList(state, banks) {
      state.memberBankList = banks;
    }
  },
  getters: {
    getBankList(state) {
      return state.bankList;
    },
    getTransactions(state) {
      return state.transactions;
    },
    getMemberBankList(state) {
      return state.memberBankList;
    }
  },
  actions: {
    GET_BANK_LIST({ commit, dispatch }) {
      api.getBanksList(
        response => {
          if (response.data.data.code === 200) {
            commit('setBankList', response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        }
      );
    },
    ADD_BANK_ACCOUNT(
      { dispatch },
      { payload, params, success, pathVariables }
    ) {
      api.addMyBankAccount(
        response => {
          if (response.data.data.code === 200) {
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        payload,
        params
      );
    },
    CASH_OUT({ dispatch }, { payload, params, success, pathVariables, fail }) {
      api.cashoutMoney(
        response => {
          console.log('#####:',response);
          if (response.data.data.code === 200 && response.data.data) {
            success(response.data.data);
          } else {
            if(fail) {
              fail(response.data.data)
            }
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        payload,
        params
      );
    },
    SHOW_TRANSACTION_HISTORY({ dispatch, commit }, { pathVariables, params }) {
      api.showTransactions(
        response => {
          if (response.data.data.code === 200) {
            commit('setTransactions', response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        params
      );
    },
    GET_MEMBER_BANK_LIST({ commit, dispatch }, { pathVariables, fail }) {
      api.getMemberBanksList(
        response => {
          if (response.data.data.code === 200) {
            commit('setMemberBankList', response.data.data);
          } else {
            if(fail) {
              fail(response.data.data)
            } else {
              dispatch('SET_ERROR_POPUP', {
                isErrorPopupVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables
      );
    },
    DELETE_MEMBER_BANK_ACCOUNT(
      { dispatch },
      { params, success, pathVariables }
    ) {
      api.deleteAccountOfMember(
        response => {
          if (response.data.data.code === 200) {
            success(response.data.data);
          } else {
            dispatch('SET_ERROR_POPUP', {
              isErrorPopupVisible: true,
              errorList: response.data.data.errors
            }, {root: true});
          }
        },
        error => {
          errorHandler.handleErrors(dispatch, error);
        },
        pathVariables,
        params
      );
    },
    EDIT_BANK_ACCOUNT({ dispatch }, { payload, params, success, pathVariables }) {
      api.editBankAccount(
          response => {
            if (response.data.data.code === 200) {
              success(response.data.data);
            } else {
              dispatch('SET_ERROR_POPUP', {
                isErrorPopupVisible: true,
                errorList: response.data.data.errors
              }, {root: true});
            }
          },
          error => {
            errorHandler.handleErrors(dispatch, error);
          },
          pathVariables,
          payload,
          params
      );
    },
  },
  namespaced: true
};
