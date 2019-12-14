// import { mapGetters } from 'vuex';
// import ErrorNotifier from '@/components/web/ErrorNotifier';
import NavigationTab from '@/components/web/NavigationTab';
import HomePage from '@/pages/HomePage'
import RegistrationPage from  '@/pages/RegistrationPage'
import DonarCreateRequest from '@/pages/DonarCreateRequest'
// import OnboardingScreen from '@/components/OnBoardingScreen';
// import Alert from '@/components/web/Alert';
// import digitalConfigNames from '@/constant/digital-config-name'
// import {getMemberID, getOnboardingStatus, setOnboardingStatus } from '@/utils/helpers';
// import Offline from '@/pages/Offline'
// import ErrorHandleNotifier from '@/components/web/ErrorHandleNotifier';
export default {
  name: 'App',
  components: {
      // Alert,
      NavigationTab,
      RegistrationPage,
      HomePage,
      DonarCreateRequest
  },
};
