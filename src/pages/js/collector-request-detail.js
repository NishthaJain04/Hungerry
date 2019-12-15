
// import {mapGetters} from 'vuex';
import ProductList from '@/components/web/ProductList'
import pulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import gameIcon from '@/assets/icons/icon-game_voucher.svg';
import dataIcon from '@/assets/icons/icon-phone-data.svg';
import pdamIcon from '@/assets/icons/icon-water-bill.svg';
import profileImage from '@/assets/icons/icon-face.svg'

export default {
  data() {
    return {
      modalVisible: false,
      order: {
        orderId: 120197363,
        requestDetails: {}
      },
      getRequestDetails: [
        {
          name: 'Requested food for  - ' + '3' + 'persons',
          phoneNumber: 'quantity  - ' + '5Kgs',
          imageUrl: profileImage
        }
      ],
      images: [pulsaIcon, gameIcon, dataIcon, pdamIcon]
    };
  },
  components: {
    ProductList
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
    // this.$store.dispatch('digitalOrder/GET_ORDER_DETAIL', {
    //   payload: {
    //     orderId: this.$route.params.orderId,
    //     withPaymentInstruction: false
    //   }
    // });
  },
  methods: {
    sendReceiptClick() {
      this.modalVisible = true;
    },
    toggleOverlayPopup() {
      this.modalVisible = !this.modalVisible;
    }
  }
};
