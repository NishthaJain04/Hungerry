import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getProducts(callback, fail, productType, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getDigitalProducts(productType),
      callback,
      fail,
      params
    );
  },
  setCustomerNumber(callback, fail, request) {
    apiCall.makePostRequest(
      apiUrls.api.setNumberDigital,
      callback,
      fail,
      request
    );
  },
  addCart(callback, fail, request) {
    apiCall.makePostRequest(
      apiUrls.api.addCartDigital,
      callback,
      fail,
      request
    );
  },
  pay(callback, fail, payload) {
    apiCall.makePostRequest(apiUrls.api.payDigital, callback, fail, payload);
  },
  inquiry(callback, fail, payload) {
    apiCall.makePostRequest(
      apiUrls.api.digitalInquiry,
      callback,
      fail,
      payload
    );
  },
  getOperator(callback, fail, payload) {
    apiCall.makeGetRequest(
      apiUrls.api.digitalOperator(payload),
      callback,
      fail
    );
  },
  getCart(callback, fail) {
    apiCall.makeGetRequest(apiUrls.api.getCartDigital, callback, fail);
  },
  getOrders(callback, fail, payload, query) {
    apiCall.makeGetRequest(apiUrls.api.digitalOrders, callback, fail, payload, query);
  },
  changePayment(callback, fail, payload) {
    apiCall.makePutRequest(apiUrls.api.setDigitalPayment, callback, fail, payload)
  },
  getConfig(callback, fail, configNames) {
    apiCall.makeGetRequest(apiUrls.api.digitalConfig, callback, fail, {configs: configNames})
  }
};
