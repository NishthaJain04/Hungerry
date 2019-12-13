import DigitalHeader from '@/components/DigitalProductHeader';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedPaymentMethod: null
    };
  },
  computed: {
    ...mapGetters('digitalCart', ['cart']),
    validToPay() {
      return this.selectedPaymentMethod !== null;
    }
  },
  created() {
    this.$store.dispatch('digitalCart/GET_CART');
  },
  components: {
    DigitalHeader
  },
  methods: {
    changePayment(paymentMethod) {
      const payload = {
        paymentMethod
      };
      this.$store.dispatch('digitalCart/CHANGE_PAYMENT', {payload});
    },
    payOrder() {
      const payload = {
        'paymentMethod': this.selectedPaymentMethod,
        'productType': 'WALLET_BALANCE',
        'extendedData': {}
      }
      this.$store.dispatch('digitalCart/PAY', {
        success: this.toThankyouPage,
        payload
      });
    },
    toThankyouPage(response) {
      const orderId = response.id;
      this.$router.push(`/digital/order/thank-you/${orderId}`);
    },
    getPaymentIcon(paymentMethod) {
      try {
        return require(`@/assets/payments/${paymentMethod}.jpg`);
      } catch (e) {
        console.error(e);
        return '';
      }
    }
  }
};
