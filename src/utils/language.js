export default {
  getUserLanguage() {
    if(!window.localStorage.getItem('userlang')) {
      window.localStorage.setItem('userlang', 'id');
    }
    if (window) {
      return window.localStorage.getItem('userlang') || 'id'; //default should be id
    }
  },
  setUserLanguage(lang) {
    if (window) {
      window.localStorage.setItem('userlang', lang);
    }
  }
};
