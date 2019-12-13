import { mapGetters } from 'vuex'
import Loader from '@/components/web/Loader'

export default {
  data () {
    return {
      modalVisible: false,
      customControls: [{
        label: this.i18n('DIGITAL.CART.REJECT'),
        handler: this.closeModal
      }, {
        label: this.i18n('DIGITAL.CART.TOPUP'),
        handler: this.redirectToTopup
      }]
    }
  },
  props: {
    validToPay: {
      type: Boolean,
      required: true
    },
    showSummary: {
      type: Boolean,
      default: true
    },
    paymentRequest: {
      type: Object,
      required: true
    },
    showError: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
    Loader
  },
  computed: {
    ...mapGetters('digitalCart', ['cart', 'isAddingToCart', 'addCartErrors', 'payErrors'])
  },
  watch: {
    cart(newCart) {
      if(newCart) {
        this.modalVisible = newCart.walletPaymentMethod.balance < newCart.payment.amount
        return
      }
      this.modalVisible = false
    }
  },
  methods: {
    pay() {
      this.$store.dispatch('digitalCart/PAY', {
        payload: this.paymentRequest,
        success: response => {
          this.$router.push({
            path: `/order/payment/${response.id}`,
            query: {
              prev: this.$route.path
            }
          })
        }
      });
    },
    closeModal() {
      this.modalVisible = false
    },
    redirectToTopup() {
      this.$router.push('/digital/blipay')
    }
  },
  beforeDestroy() {
    console.log('clearing cart error...');
    this.$store.commit('digitalCart/setAddCartErrors', null);
  }
};
