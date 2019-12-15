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
  getHomeDetails(callback, fail, params) {
    apiCall.makeGetRequest(
        apiUrls.api.getHomeDetails,
        callback,
        fail,
        params
    );
  }
};
