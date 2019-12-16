
// import {mapGetters} from 'vuex';
import pulsaIcon from '@/assets/icons/icon-food.svg';
import gameIcon from '@/assets/icons/icon-game_voucher.svg';
import dataIcon from '@/assets/icons/icon-phone-data.svg';
import pdamIcon from '@/assets/icons/icon-water-bill.svg';
import { getMemberID } from '../../utils/helpers';

export default {
  data() {
    return {
      modalVisible: false,
      order: {

      },
      images: [pulsaIcon, pulsaIcon, pulsaIcon, pulsaIcon]
    };
  },
  components: {
    
  },
  computed: {
    // ...mapGetters('digitalOrder', ['order']),
    // orderHistoryPath() {
    //   return {
    //     path: '/order',
    //     query: this.$route.query
    //   }
    // }
  },
  created() {
    // this.$store.dispatch('digitalOrder/RESET_ORDER')
    this.$store.dispatch('donorStore/GET_DONOR_REQUEST_DETAIL', {
      params: {
        memberId: getMemberID()
      },
      success: this.getDetailSuccess
    });
  },
  methods: {
    sendReceiptClick() {
      this.modalVisible = true;
    },
    toggleOverlayPopup() {
      this.modalVisible = !this.modalVisible;
    },
    getDetailSuccess(res) {
      this.order = res
    }
  }
};
