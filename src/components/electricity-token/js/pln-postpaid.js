import { mapGetters } from 'vuex'
import CartSummary from '@/components/DigitalCartSummary'
import {isNumber} from '@/utils/validation'
import {getFirstError} from '@/utils/error-decoder'

export default {
  data() {
    return {
      plnNumber: ''
    };
  },
  components: {
    CartSummary
  },
  created() {
    this.$store.dispatch('digitalCart/RESET_CART');
    this.$store.dispatch('digitalCart/RESET_CART_ERROR')
  },
  computed: {
    ...mapGetters('digitalCart', ['cart', 'addCartErrors', 'contactNumber']),
    ...mapGetters('digitalConfig', ['config']),
    paymentRequest () {
      return {
        customerNumber: this.plnNumber,
        productType: 'ELECTRICITY_POSTPAID',
        extendedData: {},
        operatorName: 'PLN',
        contactNumber: this.contactNumber
      };
    },
    validToPay() {
      return !!this.cart && !this.cart.walletPaymentMethod.disabled
    },
    isAddCartError() {
      return this.addCartErrors !== null
    },
    fieldStyle() {
      return this.isAddCartError ? 'danger' : ''
    },
    minNumber() {
      return parseInt(this.config.minimum_number_length_electricity_postpaid)
    },
    maxNumber() {
      return parseInt(this.config.maximum_number_length_electricity_postpaid)
    },
    errorValue() {
      return getFirstError(this.addCartErrors)
    }
  },
  methods: {
    onInputNumber(data) {
      if (this.isValidInput(data)) {
        this.plnNumber = data;
      } else if(data === this.plnNumber) {
        return
      } else {
        this.$refs.number.model = this.plnNumber
        return
      }
      if (this.plnNumber.length >= this.minNumber) {
        const payload = {
          customerNumber: this.plnNumber,
          productType: 'ELECTRICITY_POSTPAID'
        };
        this.$store.dispatch('digitalCart/ADD_CART', { payload });
      }
    },
    isValidInput(data) {
      return data.length <= this.maxNumber
        && data !== this.plnNumber
        && (isNumber(data) || data.length === 0)
    }
  }
};
