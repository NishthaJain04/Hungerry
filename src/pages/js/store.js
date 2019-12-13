import OverlayPopup from '@/components/web/OverlayPopup'
import Transition from '@/components/web/Transition'
import ImageSlider from '@/components/web/ImageSlider'
import PopupMessage from '@/components/web/PopupMessage'
import { mapGetters } from 'vuex'
import {getMemberID} from '@/utils/helpers';
import WalletTopupModal from '@/components/WalletTopupModal'
import lang from '@/utils/language';

export default {
  name: 'Store',
  data() {
    return {
      isRejectionOverlayVisible: false,
      reasons: ['No reason specified'],
      showDataIncompleteMsg: false,
      showRejectedTicker: false,
      showUnderReviewTicker: false,
      showIncompleteDataPopup: false,
      isUnderVerificationVisible: false,
      isOutsideZoneModalVisible: false,
      isNoAccessModalVisible: false,
      isTopupModalVisible: false,
      isComingSoonRetailVisible: false,
      count: 0,
      startMillis: 0,
      isUserSuspendedPopupVisible: false,
      isRetailOutsideZoneModalVisible: false,
      userLang: lang.getUserLanguage()
    };
  },
  components: {
    OverlayPopup,
    Transition,
    ImageSlider,
    PopupMessage,
    WalletTopupModal
  },
  mounted() {
    this.$store.dispatch('GET_MITRA_SESSION', { success: this.sessionFetched});
    this.$store.dispatch('homepageStore/GET_BANNERS_AND_SERVICES');
  },
  computed: {
    ...mapGetters(['getUserLoginStatus']),
    ...mapGetters('profileStore', ['getMembersData']),
    ...mapGetters('homepageStore', ['getBanners', 'getProducts', 'getConfigs', 'getWalletRequest']),
    listOfProducts: function() {
      let rawData = this.getProducts[0] ? this.getProducts[0]['parameters'] : [];
      const configData = (this.getConfigs && this.getConfigs.productConfig) ? this.getConfigs.productConfig.PRODUCTS_REL_STATUS : [];
      rawData.forEach(el => {
        configData.forEach(element=>{
          if(el.title === element.productKey) {
            el.position = element.position;
          }
        });
      });
      return rawData.sort(function (a, b) {
        return parseInt(a.position)- parseInt(b.position)
      });
    },
    isMemberIdSuspended: function () {
      return this.getWalletRequest && this.getWalletRequest.suspended === true;
    }
  },
  watch: {
    getMembersData: function (newValue) {
      if(newValue && newValue.rejectionReason && newValue.rejectionReason.length) {
        this.reasons = newValue.rejectionReason;
      }
    },
    getUserLoginStatus: function (newValue, oldvalue) {
      console.log('[getUserLoginStatus]', newValue, oldvalue);
    }
  },
  methods: {
    goToLoginPage() {
      console.log('[redirect to login page]');
      this.$store.dispatch('GO_TO_LOGIN_PAGE', this.getConfigs);
    },
    toggleRejectionOverlay() {
      this.isRejectionOverlayVisible = !this.isRejectionOverlayVisible;
    },
    showRejectionOverlay() {
      this.isRejectionOverlayVisible = true;
    },
    fetchedMemberSuccess(data) {
      console.log('fetchedMemberSuccess:', data.memberDetails);
      if(data.memberDetails && data.memberDetails.verificationStatus === 'REJECTED') {
        this.showRejectedTicker = true
      }
      if(data.memberDetails && data.memberDetails.verificationStatus === 'NEEDS_APPROVAL') {
        this.showUnderReviewTicker = true
      }
      if(data.registrationStatus === 'IN_PROGRESS') {
        this.showDataIncompleteMsg = true
      }
      if(data.memberDetails && (data.memberDetails.verificationStatus === 'APPROVED' || data.memberDetails.verificationStatus === 'OUTSIDE_ZONE')){
        this.$store.dispatch('homepageStore/GET_WALLET_REQUEST', {
          pathVariables: {
            memberId: getMemberID()
          }
        });
      }
    },
    navigateToProduct(product) {
      console.log('[navigateToProduct] [isLoggedIn]', product, this.getUserLoginStatus);
      const memberData = this.getMembersData;
      const walletRequest = this.getWalletRequest;
      const serviceAccess = this.getMembersData.services || [];

      if(this.getUserLoginStatus) {

        if(memberData.registrationStatus === 'REGISTERED'
            && (memberData.memberDetails.verificationStatus === 'APPROVED' || memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE')
            && walletRequest && walletRequest.pinRegistered === false) {
          this.$router.push('/setting-pin');
          return false
        }

        if(this.isProductInBetaState(product) && !this.checkForBetaUser()) {
          this.handleComingSoonClick();
          return false;
        }

        if(product.title === 'GROCER' && memberData.registrationStatus === 'IN_PROGRESS') {
          this.isNoAccessModalVisible = true;
          return false;
        }

        if(product.title === 'GROCER' && memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE') {
          this.isRetailOutsideZoneModalVisible = true;
          return false
        } else if(product.title === 'GROCER' && memberData.registrationStatus === 'REGISTERED' && memberData.memberDetails.verificationStatus === 'NEEDS_APPROVAL') {
          this.isNoAccessModalVisible = true;
          return false
        } else if(product.title === 'GROCER' && serviceAccess.includes('replenishment_products')){
          this.$router.push(product.url)
        }

        if(serviceAccess.includes('digital_products')) {
            this.$router.push(product.url)
        } else {
          this.isNoAccessModalVisible = true
        }

      } else {
        this.goToLoginPage();
      }
    },
    handleIncompleteDataPopup() {
      console.log('handleIncompleteDataPopup');
      this.$router.push('/registration')
    },
    handleTickerClick(ticker_type) {
      console.log('handleTickerClick', ticker_type);
      if(ticker_type === 'data_incomplete') {
        this.togglePopup();
      }
    },
    togglePopup() {
      console.log('togglePopup');
      this.showIncompleteDataPopup = !this.showIncompleteDataPopup
    },
    checkWalletAccess(routePath, isTopup) {
      console.log('[checkWalletAccess]', this.getWalletRequest, this.getMembersData)
      const memberData = this.getMembersData;
      const walletRequest = this.getWalletRequest;
      if(memberData.registrationStatus === 'IN_PROGRESS') {
        this.togglePopup();
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && memberData.memberDetails.verificationStatus === 'NEEDS_APPROVAL'){
        this.handleUnderVerificationClick()
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && (memberData.memberDetails.verificationStatus === 'APPROVED' || memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE')
          && walletRequest && walletRequest.pinRegistered === false){
        this.$router.push('/setting-pin')
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && memberData.memberDetails.verificationStatus === 'APPROVED'
          && walletRequest && walletRequest.pinRegistered === true){
        if (isTopup) {
          this.isTopupModalVisible = true
        } else {
          this.$router.push(routePath)
        }
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE'
          && walletRequest && walletRequest.pinRegistered === true){
        if (isTopup) {
          this.isTopupModalVisible = true
        } else {
          this.$router.push(routePath)
        }
      }
      if(memberData.registrationStatus === 'REGISTERED'
          && memberData.memberDetails.verificationStatus === 'REJECTED'){
        this.toggleRejectionOverlay();
      }
    },
    handleUnderVerificationClick () {
      this.isUnderVerificationVisible = !this.isUnderVerificationVisible;
    },
    tapHandler(event) {
      console.log('tapHandler[timeStamp]:', event.timeStamp);
      const time = new Date().getTime();
      //if it is the first time, or if it has been more than 3 seconds since the first tap we reset everything
      if (this.startMillis === 0 || (time-this.startMillis > 3000) ) {
        this.startMillis = time;
        this.count = 1;
      } else {
        //time-startMillis < 3000
        //it is not the first, and it has been less than 3 seconds since the first
        this.count++;
      }
      if (this.count===7) {
        //do whatever you need
        window.open('mitra://mitra.blibli.com/deeplink/env-change')
      }
      return false;
    },
    toggleSuspendDetailPopup () {
      this.isUserSuspendedPopupVisible = !this.isUserSuspendedPopupVisible;
    },
    sessionFetched() {
      console.log('sessionFetched', getMemberID());
      this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
        pathVariables: {
          memberId: getMemberID()
        },
        success: this.fetchedMemberSuccess
      });
    },
    handleComingSoonClick () {
      this.isComingSoonRetailVisible = !this.isComingSoonRetailVisible;
    },
    shouldComingSoonAppear(product) {
      let isVisible = false;
      if(this.getUserLoginStatus) {
        const availableProducts = (this.getConfigs && this.getConfigs.productConfig) ? this.getConfigs.productConfig.PRODUCTS_REL_STATUS : [];
        availableProducts.forEach(el=>{
          if(el.release === 'BETA' && el.productKey === product.title && !this.checkForBetaUser()) {
            isVisible = true
          }
        });
      } else {
        isVisible = this.isProductInBetaState(product);
      }
      return isVisible
    },
    checkForBetaUser() {
      const currentUser = getMemberID();
      const betaUsers = this.getConfigs.productConfig.BETA_MITRA_IDS;
      return betaUsers.includes(currentUser);
    },
    isProductInBetaState(product) {
      let isInBeta = false;
      const availableProducts = this.getConfigs.productConfig.PRODUCTS_REL_STATUS;
      availableProducts.forEach(el=>{
        if(el.release === 'BETA' && el.productKey === product.title) {
          isInBeta = true;
        }
      });
      return isInBeta;
    }
  }
};
