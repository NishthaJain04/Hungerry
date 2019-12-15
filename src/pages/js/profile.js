import clearSessionStorage from '@/utils/helpers';
export default {
  name: 'Profile',
  data() {
    return {
      isOverlayOpen: false,
      phoneNumber: '80123445665',
      profile: {
          name: 'Nishtha Jain',
          phoneNumber: '90172635323',
          memberType: 'Donor',
          emailId: 'nishtha.jain@coviam.com',
          addressLine: 'adderess 123456789'
      }
    };
  },
  components: {
  },
  created() {
    this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      params: {
        memberId: '48'
      },
      success: this.getMemberIdSuccess
    });
  },
  computed: {
    // ...mapGetters('profileStore', ['getMembersData']),
  },
  watch: {
  },

  methods: {
    getMemberSuccess(data) {
        if (data) {
          this.profile = data;
        }
      },
    handleChangePIN() {
    },
    logOutFromApp() {
      // console.log('LOGOUT:', this.getConfigs);
      // // Remove all saved data from sessionStorage
      // clearSessionStorage();
      // this.$store.dispatch('LOG_OUT_FROM_APP', {
      //   appHomeUrl: this.getConfigs.appHome
      // });
    }
  }
};
