import OverlayPopup from '@/components/web/OverlayPopup'
import TransactionDetail from '@/components/digital/order-detail/TransactionDetail'
import ProductDetail from '@/components/digital/order-detail/ProductDetail'
import HelpAction from '@/components/HelpAction'
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      modalVisible: false
    };
  },
  components: {
    OverlayPopup,
    TransactionDetail,
    ProductDetail,
    HelpAction
  },
  computed: {
    ...mapGetters('digitalOrder', ['order']),
    orderHistoryPath() {
      return {
        path: '/order',
        query: this.$route.query
      }
    }
  },
  created() {
    this.$store.dispatch('digitalOrder/RESET_ORDER')
    this.$store.dispatch('digitalOrder/GET_ORDER_DETAIL', {
      payload: {
        orderId: this.$route.params.orderId,
        withPaymentInstruction: false
      }
    });
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
