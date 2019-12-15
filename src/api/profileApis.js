import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getMemberDetails(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getMemberDetails(pathVariables.memberId),
      callback,
      fail,
      params
    );
  },
  generateOtp(callback, fail, payload, params) {
    console.log('profile', payload)
    apiCall.makePostRequest(
      apiUrls.api.generateOtp,
      callback,
      fail,
      payload,
      params
    );
  },
  verifyOtp(callback, fail, payload, params) {
    apiCall.makePostRequest(
      apiUrls.api.verifyOtp,
      callback,
      fail,
      payload,
      params
    );
  },
  verifyKtp(callback, fail, pathVariables, params, payload) {
    apiCall.makePostRequest(
      apiUrls.api.getVerifyKtpApi(pathVariables.memberId),
      callback,
      fail,
      payload,
      params
    );
  },
  getStoreTypeList(callback, fail, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getStoreTypeList,
      callback,
      fail,
      params
    );
  },
  getMemberInProgress(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
      apiUrls.api.getMemberInProgressApi(pathVariables.memberId),
      callback,
      fail,
      params
    );
  },
  saveMemberDetails(callback, fail, pathVariables, params, payload) {
    apiCall.makePostRequest(
      apiUrls.api.getSaveMemberDetailApi(pathVariables.memberId),
      callback,
      fail,
      params,
      payload
    );
  },
  verifyUserPin(callback, fail, payload) {
    apiCall.makePostRequest(
      apiUrls.api.payOrderWithWallet,
      callback,
      fail,
      payload
    );
  },
  updatePin(callback, fail, pathVariables, params, payload) {
    apiCall.makePostRequest(
      apiUrls.api.getGenerateOtp(pathVariables.memberId),
      callback,
      fail,
      payload,
      params
    );
  },
  uploadKTP(callback, fail, pathVariables, params, payload) {
    apiCall.uploadFile(
        apiUrls.api.getProfileKtpUploadApi(pathVariables.memberId),
        callback,
        fail,
        payload,
        params
    );
  },
  downloadKTP(callback, fail, pathVariables, params) {
    apiCall.getImageFromBlob(
        apiUrls.api.getDownloadKTP_API(pathVariables.memberId),
        callback,
        fail,
        params
    );
  },
  getSignedUrlForImageUpload(callback, fail, pathVariables, params) {
    apiCall.makeGetRequest(
        apiUrls.api.getSignedUrlToUpload(pathVariables.memberId),
        callback,
        fail,
        params
    );
  },
  optWhatsApp(callback, fail, pathVariables, payload) {
    apiCall.makePutRequest(
        apiUrls.api.getWhatsAppOptApi(pathVariables.memberId),
        callback,
        fail,
        payload
    );
  },
  getAddressDetails(callback, fail, params) {
    apiCall.makeGetRequest(
        apiUrls.api.getAddressDetailsApi,
        callback,
        fail,
        params
    );
  }
};
