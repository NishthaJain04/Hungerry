import axios from 'axios';
import { serializeQueryParams } from './apiUtils';
import customHeader from './params';
let headers = {};
Object.assign(headers, customHeader.headerParameters);
import store from '@/store';

const excludeUrls = ['/backend/content/pages/mitra/sections?display=normal', '/backend/content/configs/mitraAppConfiguration']

function handleCallback(response, callback) {
  console.log('handleCallback:', response.data.data.code, response.config.url);
  if(!excludeUrls.includes(response.config.url) && response.data.data.code === 200){
    store.dispatch('SET_LOGIN_STATUS', true, {root: true});
  }
  callback(response);
}

export default {
  makeGetRequest(path, callback, fail, params) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    path += serializeQueryParams(params);
    axios
      .get(path, { withCredentials: true, headers })
      .then((response) => {handleCallback(response, callback)})
      .catch(fail);
  },
  makePostRequest(path, callback, fail, payload, params) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    path += serializeQueryParams(params);
    axios
      .post(path, payload, { withCredentials: true, headers })
      .then(callback)
      .catch(fail);
  },
  makeDeleteRequest(path, callback, fail, params) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    path += serializeQueryParams(params);
    axios
      .delete(path, { withCredentials: true, headers })
      .then(callback)
      .catch(fail);
  },
  makePutRequest(path, callback, fail, payload, params) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    path += serializeQueryParams(params);
    axios
      .put(path, payload, { withCredentials: true, headers })
      .then(callback)
      .catch(fail);
  },
  uploadFile(path, callback, fail, payload, params) {
    headers.Accept = 'application/json;charset=UTF-8';
    headers['Content-Type'] = 'multipart/form-data';
    path += serializeQueryParams(params);
    axios
      .post(path, payload, { withCredentials: true, headers })
      .then(callback)
      .catch(fail);
  },
  getImageFromBlob(path, callback, fail, params){
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    path += serializeQueryParams(params);
    axios.get(path, { responseType: 'arraybuffer', withCredentials: true, headers }).then(callback).catch(fail)
  }
};
