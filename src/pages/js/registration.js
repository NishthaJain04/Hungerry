import Tabs from '@/components/web/Tabs'
import Transition from '@/components/web/Transition'
import Upload from '@/components/registration/Upload'
import Personal from '@/components/registration/Personal'
import Address from '@/components/registration/Address'
import { getI18nText, getMemberID} from '@/utils/helpers'

export default {
  name: 'Registration',
  data() {
    return {
      activeTab: 'step1',
      tabStatus: [
        {
          step: 'step1',
          status: 'active',
          name: getI18nText('Upload Photo', 'Upload')
        },
        {
          step: 'step2',
          status: 'inactive',
          name: getI18nText('Personal Data', 'Data Diri')
        },
        {
          step: 'step3',
          status: 'inactive',
          name: getI18nText('Address', 'Alamat')
        }
      ],
      isBackButtonEnabled: true
    };
  },
  created() {
    this.$store.dispatch('homepageStore/GET_BANNERS_AND_SERVICES');
    if(this.$route.query.edit_mode){
      this.$router.replace({ query: {} });
    }
    this.fetchLatestUser();
  },
  components: {
    Tabs,
    Upload,
    Personal,
    Address,
    Transition
  },
  methods: {
    fetchLatestUser(){
      this.$store.dispatch('profileStore/GET_MEMBER_IN_PROGRESS', {
        pathVariables: { memberId: getMemberID() },
        success: this.fetchedMember
      });
    },
    closeLoginScreen() {
      console.log('CLOSE LOGIN');
      this.$router.push('/');
    },
    continueStep1() {
      if(this.$route.query.edit_mode){
        this.$router.replace({ query: {} });
      }
      console.log('CONTINUE STEP');
      this.activeTab = 'step2';
      this.tabStatus.forEach(el => {
        if (el.step === 'step1') {
          el.status = 'complete';
        }
        if (el.step === 'step2') {
          el.status = 'active';
        }
      });
    },
    continueStep2() {
      if(this.$route.query.edit_mode){
        this.$router.replace({ query: {} });
      }
      this.activeTab = 'step3';
      this.tabStatus.forEach(el => {
        if (el.step === 'step1') {
          el.status = 'complete';
        }
        if (el.step === 'step2') {
          el.status = 'complete';
        }
        if (el.step === 'step3') {
          el.status = 'active';
        }
      });
    },
    fetchedMember(member) {
      console.log('fetchedMember[registration]:', member, this.$route.query);
      const query = this.$route.query;
      if(query.edit_mode === 'step2' || query.edit_mode === 'step1'){
        return false
      }
      if(!member || !member.memberDetails) {
        this.isBackButtonEnabled = false;
        return false
      }
      // if(member === null) {
      //   this.$router.push('/');
      //   return false;
      // }
      const memberDetails = member.memberDetails;
      if(memberDetails.ktpNumber && !memberDetails.firstName) {
        this.continueStep1();
        return false;
      }
      if(memberDetails.firstName
          && memberDetails.lastName
          && memberDetails.placeOfBirth
          && memberDetails.dateOfBirth
          && memberDetails.gender
      ) {
        this.continueStep2();
        return false;
      }
    },
    handleTabClick(tab) {
      console.log('[handleTabClick]');
      console.log('TAB:', tab);
      if(tab.step === 'step3' && tab.status === 'active') {
        return false
      }
      if(tab.step === 'step2' && tab.status === 'complete') {
        this.$router.replace({ query: {edit_mode: tab.step} });
        this.activeTab = tab.step;
          this.tabStatus.forEach(el => {
            if (el.step === tab.step) {
              console.log('TAB STEP 2 ACTIVE:', tab);
              el.status = 'active';
            }
            if(el.step === 'step3') {
              el.status = 'inactive';
            }
          });
      }
      if(tab.step === 'step1' && tab.status === 'complete') {
        this.$router.replace({ query: {edit_mode: tab.step} });
        this.activeTab = tab.step;
        this.tabStatus.forEach(el => {
          if (el.step === tab.step) {
            console.log('TAB STEP 1 ACTIVE:', tab);
            el.status = 'active';
          }
          if(el.step === 'step2' || el.step === 'step3') {
            el.status = 'inactive';
          }
        });
      }
      if(tab.step === 'step1' && this.$route.query.edit_mode === 'step1') {
        this.fetchLatestUser();
      }
      if(tab.step === 'step2' && this.$route.query.edit_mode === 'step2') {
        this.fetchLatestUser();
      }
    }
  }
};
