import PinModal from '@/components/PinModal'

export default {
  data() {
    return {
      visibleModal: false,
      modalControls: [
        { label: 'Tidak' },
        { label: 'Ya', handler: this.backToPrevPage }
      ],
      pinError: false,
      pinErrorMessage: '',
      disableInput: false
    };
  },
  components: {
    PinModal
  },
  methods: {
    backToPrevPage() {
      this.$router.push(this.$route.query.prev || '/');
    },
    submitPin(pin) {
      this.pinError = false
      this.pinErrorMessage = ''
      this.disableInput = true
      const payload = {
        pin,
        orderId: this.$route.params.orderId,
        cartType: 'mitra-digital'
      };
      this.$store.dispatch('digitalOrder/PAY_ORDER', {
        payload,
        success: this.toThankyouPage,
        failed: this.notifyError
      });
    },
    toThankyouPage() {
      this.disableInput = false
      this.$router.push({
        path: `/digital/order/thank-you/${this.$route.params.orderId}`,
        query: {
          isPaymentValidation: true
        }
      }
      );
    },
    notifyError(errorResponse) {
      this.pinError = true
      this.disableInput = false
      const errorKey = Object.keys(errorResponse.data.errors)[0]
      this.pinErrorMessage = this.i18n(`DIGITAL.ERROR.PIN.${errorResponse.data.errors[errorKey][0]}`)
    }
  }
};
