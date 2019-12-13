import getUserLanguage from './language';

export const getI18nText = (en, id) => {
  return getUserLanguage.getUserLanguage() === 'en' ? en : id;
};

export function overFlowBody(overflow) {
  if (overflow) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}

export function getLoginStatus() {
  return JSON.parse(window.localStorage.getItem('isLoggedIn'));
}

export function setLoginStatus(status) {
   window.localStorage.setItem('isLoggedIn', status);
}

export function getMemberID() {
  console.log('Helper[MemberId]', window.sessionStorage.getItem('memberId'))
  return window.sessionStorage.getItem('memberId');
}

export function clearSessionStorage() {
  window.sessionStorage.clear();
}

export function setOnboardingStatus(value) {
  window.localStorage.setItem('onboarding', value);
}

export function getOnboardingStatus() {
  return window.localStorage.getItem('onboarding');
}

export function getHelpPageUrl(){
  return 'https://www.blibli.com/faq/mitra-blibli/syarat-dan-ketentuan-mitra-blibli/'
}
