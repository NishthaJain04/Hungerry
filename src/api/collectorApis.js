import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getMatchingDonors(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getMatchingDonors, callback, fail, params);
  },
  createCollectorRequest(callback, fail, payload, params) {
    apiCall.makePostRequest(
      apiUrls.api.createCollectorRequest,
      callback,
      fail,
      payload,
      params
    );
  },
  sendCollectRequest(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.sendCollectRequest,
      callback,
      fail,
      params
    );
  },
  createOrder(callback, fail, payload) {
    apiCall.makePostRequest(
      apiUrls.api.createOrder,
      callback,
      fail,
      payload
    );
  },
  getOrderByOrderId(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getOrderByOrderId,
      callback,
      fail,
      params
    );
  },
  getCategories(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getCategories,
      callback,
      fail,
      params
    );
  },
  getProductsList(callback, fail, pathVariables, params, payload) {
    apiCall.makePostRequest(
      apiUrls.api.getProductsList(pathVariables.memberId),
      callback,
      fail,
      payload,
      params
    );
  },
  addItemToCart(callback, fail, params) {
    apiCall.makePostRequest(
      apiUrls.api.addItemToCart,
      callback,
      fail,
      params
    );
  },
  checkoutCart(callback, fail, params) {
    apiCall.makePutRequest(
      apiUrls.api.checkoutCart,
      callback,
      fail,
      params
    );
  },
  getLastOrder(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getLastOrder,
      callback,
      fail,
      params
    );
  },
  retailCheckout(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.retailCheckout,
      callback,
      fail,
      params
    );
  },
  updateQuantityAtCheckout(callback, fail, payload, params) {
    apiCall.makePutRequest(
      apiUrls.api.updateQuantityAtCheckout,
      callback,
      fail,
      payload,
      params
    );
  },
  deleteItemAtCheckout(callback, fail, payload, params) {
    apiCall.makePostRequest(
      apiUrls.api.deleteItemAtCheckout,
      callback,
      fail,
      payload,
      params
    );
  },
};
