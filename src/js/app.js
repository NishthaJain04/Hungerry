// import { mapGetters } from 'vuex';
import CollectorCreateRequest from '@/pages/CollectorCreateRequest';
import NavigationTab from '@/components/web/NavigationTab';
import HomePage from '@/pages/HomePage'
import RegistrationPage from  '@/pages/RegistrationPage'
import DonarCreateRequest from '@/pages/DonarCreateRequest'
// import OnboardingScreen from '@/components/OnBoardingScreen';
// import Alert from '@/components/web/Alert';
import CollectorMatchPage from '@/pages/CollectorMatchPage';
import Alert from '@/components/web/Alert';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';
// import digitalConfigNames from '@/constant/digital-config-name'
// import {getMemberID, getOnboardingStatus, setOnboardingStatus } from '@/utils/helpers';
// import Offline from '@/pages/Offline'
// import ErrorHandleNotifier from '@/components/web/ErrorHandleNotifier';
export default {
  name: 'App',
  components: {
      Alert,
      NavigationTab,
      SignUp,
      CollectorMatchPage,
      CollectorCreateRequest,
      Profile
  }
};
