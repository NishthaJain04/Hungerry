import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getBanksList(callback, fail) {
    apiCall.makeGetRequest(apiUrls.api.getBankList, callback, fail);
  },
  addMyBankAccount(callback, fail, pathVariables, payload, params) {
    apiCall.makePutRequest(
      apiUrls.api.getAddBankAccount(pathVariables.memberId),
      callback,
      fail,
      payload,
      params
    );
  },
  cashoutMoney(callback, fail, pathVariables, payload, params) {
    apiCall.makePostRequest(
      apiUrls.api.getCashoutApi(pathVariables.memberId),
      callback,
      fail,
      payload,
      params
    );
  },
  showTransactions(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getTransactionHistory(pathVariables.memberId),
      callback,
      fail,
      params
    );
  },
  getMemberBanksList(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getMemberBankList(pathVariables.memberId),
      callback,
      fail,
      params
    );
  },
  deleteAccountOfMember(callback, fail, pathVariables, params) {
    apiCall.makeDeleteRequest(
      apiUrls.api.getDeleteUpdateMemberBankAccount(
        pathVariables.memberId,
        pathVariables.bankAccountId
      ),
      callback,
      fail,
      params
    );
  },
  editBankAccount(callback, fail, pathVariables, params) {
    apiCall.makePutRequest(
        apiUrls.api.getDeleteUpdateMemberBankAccount(
            pathVariables.memberId,
            pathVariables.bankAccountId
        ),
        callback,
        fail,
        params
    );
  }
};
