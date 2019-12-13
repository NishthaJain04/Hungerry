export default {
  state: {
    isErrorPopupVisible: false,
    errorMessage: {},
    isErrorHandleVisible: false,
    errorHandleMessage: {},
    showNavigationTab: true
  },
  getters: {
    getErrorState(state) {
      return {
        isErrorPopupVisible: state.isErrorPopupVisible,
        errorMessage: state.errorMessage
      };
    },
    getNavigationTabStatus(state) {
      return {
        isNavigationTabVisible: state.showNavigationTab
      };
    },
    getErrorHandleState(state) {
      return {
        isErrorHandleVisible: state.isErrorHandleVisible,
        errorHandleMessage: state.errorHandleMessage
      };
    },
  },
  mutations: {
    setErrorState(state, value) {
      Object.assign(state, {
        isErrorPopupVisible: value.isErrorPopupVisible,
        errorMessage: value
      });
    },
    setErrorHandleState(state, value) {
      Object.assign(state, {
        isErrorHandleVisible: value.isErrorHandleVisible,
        errorHandleMessage: value
      });
    },
    removeErrorState(state) {
      state.isErrorPopupVisible = false;
      state.errorMessage = {};
    },
    removeErrorHandleState(state) {
      state.isErrorHandleVisible = false;
      state.errorHandleMessage = {};
    },
    showNavigationTab(state) {
      state.showNavigationTab = true;
    },
    hideNavigationTab(state) {
      state.showNavigationTab = false;
    }
  },
  actions: {
    SET_ERROR_POPUP({ commit }, payload) {
      commit('setErrorState', payload);
    },
    REMOVE_ERROR_POPUP({ commit }) {
      commit('removeErrorState');
    },
    HIDE_NAVIGATION_TAB({ commit }) {
      commit('hideNavigationTab');
    },
    SHOW_NAVIGATION_TAB({ commit }) {
      commit('showNavigationTab');
    },
    SET_ERROR_HANDLE_POPUP({ commit }, payload) {
      commit('setErrorHandleState', payload);
    },
    REMOVE_ERROR_HANDLE_POPUP({ commit }) {
      commit('removeErrorHandleState');
    },
  },
  namespaced: false
};
