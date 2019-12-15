import apiUrls from './apiUrls';
import apiCall from './apiUtils/makeApiCall.js';

export default {
  getConfig(callback, fail, configName) {
    const url = apiUrls.api.getConfig(configName)
    apiCall.makeGetRequest(
      url,
      callback,
      fail
    )
  }
}