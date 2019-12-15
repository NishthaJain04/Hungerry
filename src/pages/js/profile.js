import clearSessionStorage from '@/utils/helpers';
export default {
  name: 'Profile',
  data() {
    return {
      isOverlayOpen: false,
      phoneNumber: '80123445665',
      profile: {
        memberDetails: {
          name: 'Nishtha Jain',
          phoneNumber: '90172635323',
          memberType: 'Donor',
          emailId: 'nishtha.jain@coviam.com'
        },
        addressDetails: {
          addressLine: 'adderess 123456789'
        }
      }
    };
  },
  components: {
  },
  created() {
    // this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
    //   pathVariables: {
    //     memberId: '80123445665',
    //   }
    // });
  },
  computed: {
    // ...mapGetters('profileStore', ['getMembersData']),
  },
  watch: {
  },

  methods: {
    // getMemberSuccess(res) {
      //   if (res) {
      //     this.memberType = res.memberDetails.memberType;
      //   }
      // },
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
