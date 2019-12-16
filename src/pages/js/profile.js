import clearSessionStorage from '@/utils/helpers';
import {getMemberID} from '@/utils/helpers';
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
        memberId: getMemberID()
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
    getMemberIdSuccess(data) {
        if (data) {
          this.profile = data.data;
        }
      },
    handleChangePIN() {
    },
    logOutFromApp() {
      // Remove all saved data from sessionStorage
      // clearSessionStorage();
      this.$router.push('/login');
    }
  }
};
