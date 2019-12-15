import ImageSlider from '@/components/web/ImageSlider';
import pulsaIcon from '@/assets/icons/icon-npo.jpg';
import gameIcon from '@/assets/icons/icon-ngo.jpg';
import dataIcon from '@/assets/icons/icon-people.jpg';
import pdamIcon from '@/assets/icons/icon-npo-text.jpg';
import { getMemberID } from '@/utils/helpers';
export default {
    name: 'HomePage',
    data() {
      return {
        bannersToShow: [{image: pdamIcon}, {image: gameIcon}, {image: dataIcon}, {image: pulsaIcon}],
        isrequestActive: false,
        memberType: '',
        analysis: {
          pickUp: 986,
          peopleFed: 525,
          numberOfOrgs: 30,
          foodSaved: 2000
        }
      };
    },
    created() {
      // this.$store.dispatch('GET_ACTIVE', { success: this.getActiveSuccess});
      this.$store.dispatch('homepageStore/GET_ANALYTICS', {
        params: { memberId: '61'},
        success: this.getAnalyticsDataSuccess
      });
      // this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      //   pathVariables: {memberId: getMemberID()},
      //   success: this.getMemberSuccess
      // });
    },
    components: {
      ImageSlider,
    },
    methods: {
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
  