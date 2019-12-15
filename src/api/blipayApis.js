import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getProducts(callback, fail) {
    apiCall.makeGetRequest(apiUrls.api.getBlipayProducts, callback, fail);
  },
  pay(callback, fail, payload) {
    apiCall.makePostRequest(
      apiUrls.api.payOrderWithWallet,
      callback,
      fail,
      payload
    );
  },
  getOrderDetail(callback, fail, orderId, payload) {
    apiCall.makeGetRequest(
      apiUrls.api.getDigitalOrderDetail(orderId),
      callback,
      fail,
      payload
    );
  }
};
