import ImageSlider from '@/components/web/ImageSlider';
import pulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import gameIcon from '@/assets/icons/icon-game_voucher.svg';
import dataIcon from '@/assets/icons/icon-phone-data.svg';
import pdamIcon from '@/assets/icons/icon-water-bill.svg';
import { getMemberID } from '@/utils/helpers';
export default {
    name: 'HomePage',
    data() {
      return {
        bannersToShow: [{image: pulsaIcon}, {image: gameIcon}, {image: dataIcon}, {image: pdamIcon}],
        isrequestActive: false,
        memberType: ''
      };
    },
    created() {
      // this.$store.dispatch('GET_ACTIVE', { success: this.getActiveSuccess});
      // this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      //   pathVariables: {memberId: getMemberID()},
      //   success: this.getMemberSuccess
      // });
    },
    components: {
      ImageSlider,
    },
    methods: {
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
  