export default {
  // eslint-disable-next-line no-empty-pattern
  handleErrors(dispatch, err) {
    const errObject = err.response ? err.response.data : {};
    console.log('...err:', err);
    console.log('...ERR:', err.response);
    if (
      err.response.status === 401 ||
      err.response.status === '401' ||
      errObject.status === 401 ||
      errObject.code === '401' ||
      errObject.code === 401
    ) {
      dispatch('SET_LOGIN_STATUS', false, {root: true});
      dispatch('GO_TO_HOME_PAGE', {path: '/home'}, {root: true});
    }
  }
};
