import OverlayPopup from '@/components/web/OverlayPopup'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderDetailVisible: false
    };
  },
  components: {
    OverlayPopup
  },
  computed: {
    ...mapGetters('digitalOrder', ['order']),
    paymentCode() {
      return this.order.paymentCode
    }
  },
  methods: {
    showPaymentInstruction() {
      this.orderDetailVisible = true;
    },
    closePaymentInstruction() {
      this.orderDetailVisible = false;
    }
  }
};
