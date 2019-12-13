import ThankyouPagePending from '@/components/digital/thank-you/ThankyouPagePending'
import ThankyouPageConfirm from '@/components/digital/thank-you/ThankyouPageConfirm'
import PaymentInstruction from '@/components/digital/thank-you/PaymentInstruction'
import { mapGetters } from 'vuex'

export default {
  components: {
    ThankyouPagePending,
    ThankyouPageConfirm,
    PaymentInstruction
  },
  computed: {
    ...mapGetters('digitalOrder', ['order']),
    isPaymentValidation() {
      return this.$route.query.isPaymentValidation;
    }
  },
  created() {
    this.$store.dispatch('digitalOrder/RESET_ORDER')
    this.pollOrderStatus()
  },
  methods: {
    pollOrderStatus() {
      if (this.$route.params.orderId) {
        this.$store.dispatch('digitalOrder/GET_ORDER_DETAIL', {
          payload: {
            orderId: this.$route.params.orderId,
            withPaymentInstruction: true
          },
          success: this.checkOrder,
          failed: this.getOrderFailed
        });
      }
    },
    checkOrder(order) {
      if (order.status !== 'APPROVED' && order.status !== 'DECLINED') {
        setTimeout(this.pollOrderStatus, 2000);
      }
    },
    getOrderFailed() {
      setTimeout(this.pollOrderStatus, 2000);
    }
  }
};
