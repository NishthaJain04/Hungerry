import ImageSlider from '@/components/web/ImageSlider';
import pulsaIcon from '@/assets/icons/icon-npo.jpg';
import gameIcon from '@/assets/icons/icon-ngo.jpg';
import dataIcon from '@/assets/icons/icon-people.jpg';
import pdamIcon from '@/assets/icons/icon-npo-text.jpg';
import { getMemberID } from '@/utils/helpers';
import { getMemberType } from '../../utils/helpers';
export default {
    name: 'HomePage',
    data() {
      return {
        bannersToShow: [{image: pdamIcon}, {image: gameIcon}, {image: dataIcon}, {image: pulsaIcon}],
        isrequestActive: false,
        memberType: '',
        memberId: '',
        analysis: {
          pickUp: 986,
          peopleFed: 525,
          numberOfOrgs: 30,
          foodSaved: 2000
        }
      };
    },
    mounted() {
      // this.$store.dispatch('authStore/GET_MITRA_SESSION', { success: this.sessionFetched});
    },
    created() {
      // this.$store.dispatch('GET_ACTIVE', { success: this.getActiveSuccess});
      this.memberType = getMemberType()
      this.memberId = getMemberID()
      this.$store.dispatch('homepageStore/GET_ANALYTICS', {
        params: { memberId: getMemberID()},
        success: this.getAnalyticsDataSuccess
      });

      this.$store.dispatch('profileStore/REQUEST_ACTIVE', {
        params: {memberId: this.memberId, memberType: this.memberType},
        success: this.getRequestSuccess
      });
    },
    components: {
      ImageSlider,
    },
    methods: {
      getRequestSuccess(res) {
        if (res) {
          this.isrequestActive = true
        } else {
          this.isrequestActive = false
        }
      },
      getAnalyticsDataSuccess(res) {
        if (res) {
          this.analysis = res;
        }
      },
      // getActiveSuccess(res) {
      //   if (res) {
      //     this.isrequestActive = res.active
      //   }
      // },
      // getMemberSuccess(res) {
      //   if (res) {
      //     this.memberType = res.memberDetails.memberType;
      //   }
      // },
      // sessionFetched() {
      //   console.log('sessionFetched', getMemberID());
      //   this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      //     pathVariables: {
      //       memberId: 'getMemberID()'
      //     },
      //     success: this.fetchedMemberSuccess
      //   });
      // },
      startDonating () {
        this.$router.push('/donarCreateRequest')
      },
      startCollecting () {
        this.$router.push('/collector/createRequest')
      },
      getRequestPath() {
        if (this.memberType === 'donator') {
          return {
            path: '/donator/request-details',
          }
        } else {
          if (this.isrequestActive) {
          return {
            path: '/collector/CollectorMatchPage'
          }
         } else {
            return {
              path: '/collector/request-details',
            }
          }
        }
      }
    }  
  };
  