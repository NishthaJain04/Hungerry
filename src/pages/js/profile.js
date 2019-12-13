import OverlayPopup from '@/components/web/OverlayPopup'
import Overlay from '@/components/web/Overlay'
import PopupMessage from '@/components/web/PopupMessage'
import { mapGetters } from 'vuex'
import {getMemberID, getI18nText, clearSessionStorage} from '@/utils/helpers';
import lang from '@/utils/language';

export default {
  name: 'Profile',
  data() {
    return {
      isOverlayOpen: false,
      phoneNumber: getMemberID(),
      profile: {
        memberDetails: {
          firstName: '',
          lastName: '',
          isOwnStore: true,
          verificationStatus: '',
          profileImage: '',
          gender: ''
        },
        addressDetails: {}
      },
      reasons: ['No reason specified'],
      verificationStatus: 'processing',
      isRejectionOverlayVisible: false,
      isCompleteRegistrationVisible: false,
      language: lang.getUserLanguage(),
      userImageUrl: '',
      showWhatsAppPopup: false,
      customControls: [{
        label: getI18nText('No', 'Tidak'),
        handler: ()=> this.handleModalPopup('no')
      }, {
        label: getI18nText('Yes', 'Ya'),
        handler: ()=> this.handleModalPopup('yes')
      }],
      isWhatsappEnabled: 'no',
      showIncompleteDataPopup: false,
      operationType: ''
    };
  },
  components: {
    OverlayPopup,
    Overlay,
    PopupMessage
  },
  created() {
    this.$store.dispatch('homepageStore/GET_APP_COFIGURATION', 'mitraAppConfiguration');
    this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      pathVariables: {
        memberId: getMemberID(),
      }
    });
  },
  computed: {
    ...mapGetters('profileStore', ['getMembersData']),
    ...mapGetters('homepageStore', ['getConfigs', 'getWalletRequest'])
  },
  watch: {
    getMembersData: function (newValue) {
      console.log('newValue:', newValue);
      if(newValue && newValue.registrationStatus === 'NOT_REGISTERED') {
        this.$router.push('/registration');
      }
      if(newValue && newValue.rejectionReason && newValue.rejectionReason.length) {
        this.reasons = newValue.rejectionReason;
      }
      if(newValue.registrationStatus === 'IN_PROGRESS') {
        this.isCompleteRegistrationVisible = true;
      }
      if(newValue.registrationStatus === 'REGISTERED'){
        Object.assign(this.profile.memberDetails, {...newValue.memberDetails});
        Object.assign(this.profile.addressDetails, {...newValue.addressDetails});
        this.isWhatsappEnabled = newValue.memberDetails.whatsAppEnabled ? 'yes' : 'no';
        this.getMemberDetailsSuccess(newValue)
      }
    },
    language: function (newValue) {
      lang.setUserLanguage(newValue);
      window.location.reload()
    }
  },

  methods: {
    handleStatusClick() {
      if(this.getMembersData.registrationStatus === 'IN_PROGRESS') {
        this.$router.push('/registration');
      } else {
        if (this.verificationStatus === 'processing') {
          this.isOverlayOpen = true;
        }
        if (this.verificationStatus === 'rejected') {
          this.isRejectionOverlayVisible = true;
        }
      }
    },
    toggleOverlayPopup() {
      this.isOverlayOpen = !this.isOverlayOpen;
    },
    handleBrowse() {
      console.log('HANDLE BROWSE');
      this.isOverlayOpen = false;
    },
    getMemberDetailsSuccess(res) {
      if(res.registrationStatus === 'IN_PROGRESS') {
        this.isCompleteRegistrationVisible = true;
      }
      if (res.registrationStatus === 'REGISTERED') {
        if (res.memberDetails.verificationStatus === 'APPROVED') {
          this.verificationStatus = 'verified';
        } else if (
          res.memberDetails.verificationStatus === 'NEEDS_APPROVAL'
        ) {
          this.verificationStatus = 'processing';
        } else if (
          res.memberDetails.verificationStatus === 'REJECTED'
        ) {
          this.verificationStatus = 'rejected';
        } else {
          this.verificationStatus = 'incomplete';
        }
      }
    },
    handleChangePIN() {
      const memberData = this.getMembersData;
      const walletRequest = this.getWalletRequest;
      if(memberData.registrationStatus === 'IN_PROGRESS') {
        this.togglePopup();
        return false;
      }
      if(memberData.registrationStatus === 'REGISTERED' && memberData.memberDetails.verificationStatus === 'NEEDS_APPROVAL') {
        this.toggleOverlayPopup();
        return false;
      }
      if(memberData.registrationStatus === 'REGISTERED' && (memberData.memberDetails.verificationStatus === 'REJECTED')) {
        this.toggleRejectionOverlay();
        return false;
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && (memberData.memberDetails.verificationStatus === 'APPROVED' || memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE')
          && walletRequest && walletRequest.pinRegistered === false){
        this.$router.push('/setting-pin')
      } else {
        this.$router.push('/forgot-pin');
      }
    },
    toggleRejectionOverlay() {
      this.isRejectionOverlayVisible = !this.isRejectionOverlayVisible;
    },
    showRejectionOverlay() {
      this.isRejectionOverlayVisible = true;
    },
    logOutFromApp() {
      console.log('LOGOUT:', this.getConfigs);
      // Remove all saved data from sessionStorage
      clearSessionStorage();
      this.$store.dispatch('LOG_OUT_FROM_APP', {
        appHomeUrl: this.getConfigs.appHome
      });
    },
    handleModalPopup(operationType) {
      this.showWhatsAppPopup = false;
      console.log('handleModalPopup[operationType]', operationType);
      this.operationType = operationType
      this.isWhatsappEnabled = operationType === 'yes';
        setTimeout(()=>{
            this.showWhatsAppPopup = false;
        }, 500);
        this.$store.dispatch('profileStore/SUBSCRIBE_WHATSAPP', {
            payload: {
                whatsAppEnabled: this.isWhatsappEnabled
            },
            pathVariables: {
                memberId: getMemberID()
            },
            success: this.subscribeWhatsAppSuccess
        });
    },
    subscribeWhatsAppSuccess(res) {
      console.log('****[success]:', res);
      this.isWhatsappEnabled = this.operationType === 'yes' ? 'yes' : 'no'
      this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
        pathVariables: {
          memberId: getMemberID()
         }
      });
    },
    togglePopup() {
      console.log('togglePopup');
      this.showIncompleteDataPopup = !this.showIncompleteDataPopup;
      this.isWhatsappEnabled = 'no';
    },
    handleIncompleteDataPopup() {
      console.log('handleIncompleteDataPopup');
      this.$router.push('/registration')
    },
    onSwitchClick(data) {
      console.log('DATA: SWITCH:', data, this.isWhatsappEnabled);
      if(this.getMembersData.registrationStatus === 'IN_PROGRESS') {
        this.showIncompleteDataPopup = true;
        return false;
      }
      if(this.getMembersData.memberDetails && this.getMembersData.memberDetails.verificationStatus === 'REJECTED') {
        this.toggleRejectionOverlay();
        return false;
      } else {
        this.showWhatsAppPopup = true;
        return false;
      }
    },
    correntSwitchStatus() {
      if(this.getMembersData.memberDetails && this.getMembersData.memberDetails.whatsAppEnabled === true ) {
        this.isWhatsappEnabled = 'yes'
      }else {
        this.isWhatsappEnabled = 'no'
      }
    },
    disableSwitch() {
      return this.getMembersData.memberDetails && this.getMembersData.memberDetails.verificationStatus === 'REJECTED'
    },
    closeModalPopup () {
      this.correntSwitchStatus();
      console.log('closeModalPopup');
      this.showWhatsAppPopup = false;
    }
  }
};
