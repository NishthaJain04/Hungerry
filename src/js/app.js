// import { mapGetters } from 'vuex';
import NavigationTab from '@/components/web/NavigationTab';

// import digitalConfigNames from '@/constant/digital-config-name'
// import {getMemberID, getOnboardingStatus, setOnboardingStatus } from '@/utils/helpers';
// import Offline from '@/pages/Offline'
// import ErrorHandleNotifier from '@/components/web/ErrorHandleNotifier';
export default {
  name: 'App',
  components: {
      NavigationTab
  },
  data() {
    return {
      navTabVisible: false
    }
  },
  watch: {
    $route(to) {
      this.handleNavigationTabVisibility(to.path);
    }
  },
  created () {
    this.$store.dispatch('authStore/GET_MITRA_SESSION', { success: this.sessionFetched});
  },
  methods: {
    handleNavigationTabVisibility(path) {
      if (
        path.includes('home') ||
        path === '/order' ||
        path.includes('help') ||
        path.includes('account')
      ) {
        this.navTabVisible = true
      } else {
        this.navTabVisible = false
      }
    },
    sessionFetched () {
      this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
        pathVariables: {memberId: '27y7'}
      });
    }
  }
};
