import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
    getOrderHistory(callback, fail, params, payload) {
    apiCall.makeGetRequest(
      apiUrls.api.getOrderHistory, callback, fail, payload, params);
    },
    trackOrderItem(callback, fail, pathVariables, params) {
        apiCall.makeGetRequest(
          apiUrls.api.trackOrderItem(pathVariables.orderId, pathVariables.orderItemId),
          callback,
          fail,
          params
        );
    },
    getOrderDetail(callback, fail, pathVariables) {
      apiCall.makeGetRequest(
        apiUrls.api.getOrderDetail(pathVariables.orderId),
        callback,
        fail
      );
    }
};
