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
    // this.$store.dispatch('homepageStore/GET_APP_COFIGURATION', 'mitraAppConfiguration');
    // this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
    //   pathVariables: {
    //     memberId: '80123445665',
    //   }
    // });
  },
  computed: {
    // ...mapGetters('profileStore', ['getMembersData']),
    // ...mapGetters('homepageStore', ['getConfigs', 'getWalletRequest'])
  },
  watch: {
  },

  methods: {
    toggleOverlayPopup() {
      // this.isOverlayOpen = !this.isOverlayOpen;
    },
    handleBrowse() {
      // this.isOverlayOpen = false;
    },
    getMemberDetailsSuccess(res) {
      // 
    },
    handleChangePIN() {
      // const memberData = this.getMembersData;
      // const walletRequest = this.getWalletRequest;
      // if(memberData.registrationStatus === 'IN_PROGRESS') {
      //   this.togglePopup();
      //   return false;
      // }
      // if(memberData.registrationStatus === 'REGISTERED' && memberData.memberDetails.verificationStatus === 'NEEDS_APPROVAL') {
      //   this.toggleOverlayPopup();
      //   return false;
      // }
      // if(memberData.registrationStatus === 'REGISTERED' && (memberData.memberDetails.verificationStatus === 'REJECTED')) {
      //   this.toggleRejectionOverlay();
      //   return false;
      // }
      // if(memberData.registrationStatus === 'REGISTERED'
      //     && (memberData.memberDetails.verificationStatus === 'APPROVED' || memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE')
      //     && walletRequest && walletRequest.pinRegistered === false){
      //   this.$router.push('/setting-pin')
      // } else {
      //   this.$router.push('/forgot-pin');
      // }
    },
    toggleRejectionOverlay() {
      // this.isRejectionOverlayVisible = !this.isRejectionOverlayVisible;
    },
    showRejectionOverlay() {
      // this.isRejectionOverlayVisible = true;
    },
    logOutFromApp() {
      // console.log('LOGOUT:', this.getConfigs);
      // // Remove all saved data from sessionStorage
      // clearSessionStorage();
      // this.$store.dispatch('LOG_OUT_FROM_APP', {
      //   appHomeUrl: this.getConfigs.appHome
      // });
    },
    togglePopup() {
      console.log('togglePopup');
      this.showIncompleteDataPopup = !this.showIncompleteDataPopup;
      this.isWhatsappEnabled = 'no';
    }
  }
};
