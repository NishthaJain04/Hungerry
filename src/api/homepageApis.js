import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getServicesPromotion(callback, fail) {
    apiCall.makeGetRequest(apiUrls.api.getServiceAndPromotion, callback, fail);
  },
  getWalletRequestData(callback, fail, pathVariables) {
    apiCall.makeGetRequest(
      apiUrls.api.getWalletRequests(pathVariables.memberId),
      callback,
      fail
    );
  },
  getWalletTransaction(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
        apiUrls.api.getTransactionHistory(pathVariables.memberId),
        callback,
        fail,
        params
    );
  }
};
