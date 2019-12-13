import CircularProgress from '@/components/web/CircularProgress'
import PaymentPage from '@/components/PaymentPage'
import {getMemberID} from '@/utils/helpers'
import { mapGetters } from 'vuex'

export default {
    name: 'RetailThankyouPage',
    data() {
        return {
            isCircularProgressVisible: true,
            isPaymentPageVisible: false,
            orderDetails: {},
            paymentStatus: ''
        }
    },
  components: {
    CircularProgress,
    PaymentPage
  },
  computed: {
    ...mapGetters('homepageStore', ['getWalletRequest'])
  },
  created() {
      this.getOrderByOrderId();
  },
  methods: {
    getOrderByOrderId() {
        this.$store.dispatch('retailCheckoutStore/GET_ORDER_BY_ORDERID', {
          success: this.getOrderByOrderIdSuccess,
          params: {
            orderId: this.$route.params.orderId
          }
        });
      },
    getOrderByOrderIdSuccess(res) {
        if (res) {
            if (res.paymentStatus !== 'APPROVED' && res.paymentStatus !== 'DECLINED') {
            setTimeout(this.getOrderByOrderId, 2000);
            } else {
            this.isCircularProgressVisible = false;
            this.isPaymentPageVisible = true;
            this.paymentStatus = 'SUCCESS';
            this.orderDetails = res;
            this.getMemberWalletBalance()
            }
        }
    },
    getMemberWalletBalance() {
        this.$store.dispatch('homepageStore/GET_WALLET_REQUEST', {
            pathVariables: {
            memberId: getMemberID()
            }
        });
    }
  }
};
