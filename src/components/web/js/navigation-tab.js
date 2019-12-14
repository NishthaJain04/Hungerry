import Transition from '@/components/web/Transition'
import PopupMessage from '@/components/web/PopupMessage'
import OverlayPopup from '@/components/web/OverlayPopup'
// import { mapGetters } from 'vuex'
import {getHelpPageUrl} from '@/utils/helpers'

export default {
  name: 'NavigationTab',
  data() {
    return {
      activeTabName: 'Home',
      items: [
        {
          name: 'Home',
          idx: 0,
          url: '/home',
          label: 'HOME',
          alt: 'Store Active',
          icons: [
            require('assets/icons/icon-home.svg'),
            require('assets/icons/icon-home-active.svg')
          ]
        },
        {
          name: 'OrderHistory',
          idx: 1,
          url: '/order',
          label: 'ORDER',
          alt: 'Order',
          icons: [
            require('assets/icons/icon-trending.svg'),
            require('assets/icons/icon-trending-active.svg')
          ]
        },
        {
          name: 'Help',
          idx: 2,
          url: '/help',
          label: 'HELP',
          alt: 'Help',
          icons: [
            require('assets/icons/icon-call.svg'),
            require('assets/icons/icon-call-active.svg')
          ]
        },
        {
          name: 'Account',
          idx: 3,
          url: '/account',
          label: 'ACCOUNT',
          alt: 'Profile',
          icons: [
            require('assets/icons/icon-user.svg'),
            require('assets/icons/icon-user-active.svg')
          ]
        }
      ],
      isCompletePopupVisible: false,
      isUnderVerificationVisible: false,
      isRejectionOverlayVisible: false,
      reasons: ['No reason specified'],
      isOutsideZoneModalVisible: false
    }
  },
  components: {
    Transition,
    PopupMessage,
    OverlayPopup
  },
  computed: {
    // ...mapGetters(['getUserLoginStatus']),
    // ...mapGetters('profileStore', ['getMembersData']),
    // ...mapGetters('homepageStore', ['getConfigs']),
    // ...mapGetters({
    //   navTabs: 'getNavigationTabStatus',
    // }),
    path () {
      return this.$route.path
    },
    activeTab () {
      return this.items.find(i => this.path.indexOf(i.url) === 0) || {}
    },
    sliderStyle () {
      return {
        left: `${this.activeTab.idx * 25}%`
      }
    }
  },
  watch: {
    // getMembersData: function (newValue) {
    //   if(newValue && newValue.rejectionReason && newValue.rejectionReason.length) {
    //     this.reasons = newValue.rejectionReason;
    //   }
    // }
  },
  methods: {
    selectThisTab(route) {
      // if (this.path === route) return;
      // if (!this.getUserLoginStatus && (route !== '/home')) {
      //   this.$store.dispatch('GO_TO_LOGIN_PAGE', this.getConfigs);
      //   return false;
      // }
      // this.handleUserAccessLevel(route);
    },
    isActive (v) {
      // return this.path.indexOf(v.url) === 0
    },
    handleUserAccessLevel (route) {
    //   const memberData = this.getMembersData;
    //   console.log('memberData', memberData, route);
    //   let showIncompleteData = false;
    //   let showUnderVerificationData = false;
    //   if(route === '/order') {
    //     if(memberData.registrationStatus === 'IN_PROGRESS') {
    //       showIncompleteData = true;
    //       showUnderVerificationData = false
    //     }
    //     if(memberData.registrationStatus === 'REGISTERED'
    //         && memberData.memberDetails.verificationStatus === 'NEEDS_APPROVAL'){
    //       showIncompleteData = false;
    //       showUnderVerificationData = true
    //     }
    //     if(memberData.registrationStatus === 'REGISTERED'
    //         && memberData.memberDetails.verificationStatus === 'REJECTED'){
    //       this.toggleRejectionOverlay();
    //     }
    //     if(memberData.registrationStatus === 'REGISTERED'
    //         && (memberData.memberDetails.verificationStatus === 'APPROVED' || memberData.memberDetails.verificationStatus === 'OUTSIDE_ZONE')){
    //       this.$router.push(route)
    //     }
    //   } else if(route === '/account') {
    //     if(memberData.registrationStatus === 'IN_PROGRESS') {
    //       this.$router.push(route)
    //     }
    //     if(memberData.registrationStatus === 'REGISTERED') {
    //       this.$router.push(route)
    //     }
    //   } else {
    //     this.$router.push(route)
    //   }
    //   if(showIncompleteData) {
    //     this.togglePopup()
    //   }
    //   if(showUnderVerificationData) {
    //     this.handleUnderVerificationClick()
    //   }
    },
    handleIncompleteDataClick() {
    //   console.log('handleIncompleteDataClick');
    //   this.togglePopup();
    //   setTimeout(()=>{
    //     this.$router.push('/registration');
    //   }, 500)
    // },
    // togglePopup () {
    //  this.isCompletePopupVisible = !this.isCompletePopupVisible;
    },
    handleUnderVerificationClick () {
    //   this.isUnderVerificationVisible = !this.isUnderVerificationVisible;
    },
    toggleRejectionOverlay() {
    //   this.isRejectionOverlayVisible = !this.isRejectionOverlayVisible;
    },
    openHelpPage() {
    //   const url = getHelpPageUrl();
    //   window.open(url, '_blank');
    }
  }
}
