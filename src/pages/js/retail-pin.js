import PinModal from '@/components/PinModal'
import Transition from '@/components/web/Transition'

export default {
  data() {
    return {
      userPin: null,
      isGoBackOrRefresh: false,
      customControlsGoBack: [{
        label: this.i18n('CANCEL_PAYMENT'),
        handler: this.closeRefreshModal
      }, {
        label: this.i18n('PAY_IT'),
        handler: this.handleRefreshModalOk
      }],
      isError: false,
      disableInput: false
    };
  },
  components: {
    PinModal,
    Transition
  },
  methods: {
    handlePinEnter(pinValue) {
        this.userPin = pinValue;
        this.isError = false;
        this.disableInput = true;
        this.$store.dispatch('profileStore/VERIFY_USER_PIN', {
          payload: {
            cartType: 'mitra-retail',
            orderId: this.$route.params.orderId,
            pin: pinValue
          },
          success: this.verifyPinSuccess,
          fail: this.verifyPinFail
        });
    },
    verifyPinSuccess(res) {
        if (res.valid) {
          const orderId = this.$route.params.orderId;
          this.$router.push({ path: `/retail/order/thank-you/${orderId}`});
          this.disableInput = false;
        } else {
          this.isError = true;
        }
      },
      verifyPinFail(error) {
        if (error) {
          this.disableInput = false;
          if(error.valid === false) {
            this.isError = true;
          }
        }
      },
      closeRefreshModal() {
        this.$router.go(-2);
      },
      handleRefreshModalOk () {
        this.isGoBackOrRefresh = false;
      },
      handleClosePin() {
        this.isGoBackOrRefresh = true;
      },
  }
};
