import { mapGetters } from 'vuex'
import CartSummary from '@/components/DigitalCartSummary'
import {isNumber} from '@/utils/validation'
import {getFirstError} from '@/utils/error-decoder'

export default {
  data() {
    return {
      plnNumber: '',
      selectedSku: null
    };
  },
  computed: {
    ...mapGetters('pln', ['productData']),
    ...mapGetters('digitalCart', ['cart', 'inquiryDetail', 'inquiryErrors', 'contactNumber']),
    ...mapGetters('digitalConfig', ['config']),
    products() {
      return this.productData
        ? this.productData.products.filter(product => !product.outOfStock)
        : [];
    },
    validToPay() {
      return !!this.cart && !this.cart.walletPaymentMethod.disabled
    },
    paymentRequest() {
      return {
        customerNumber: this.plnNumber,
        productType: 'ELECTRICITY_CREDIT',
        extendedData: {},
        sku: this.selectedSku,
        operatorName: this.productData ? this.productData.provider : '',
        contactNumber: this.contactNumber
      };
    },
    ableToSelectProduct() {
      return !!this.inquiryDetail;
    },
    isInquiryError() {
      return this.inquiryErrors !== null
    },
    fieldStyle() {
      return this.inquiryErrors ? 'danger' : ''
    },
    minNumber() {
      return parseInt(this.config.minimum_number_length_electricity_credit)
    },
    maxNumber() {
      return parseInt(this.config.maximum_number_length_electricity_credit)
    },
    errorValue() {
      return getFirstError(this.inquiryErrors)
    }
  },
  created() {
    this.$store.dispatch('pln/GET_PRODUCTS', { payload: 'ELECTRICITY_CREDIT' });
    this.$store.dispatch('digitalCart/RESET_CART');
    this.$store.dispatch('digitalCart/RESET_INQUIRY');
    this.$store.dispatch('digitalCart/RESET_INQUIRY_ERROR')
    this.$store.dispatch('digitalCart/RESET_CART_ERROR')
  },
  components: {
    CartSummary
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
          productType: 'PLN_PREPAID'
        };
        this.$store.dispatch('digitalCart/INQUIRY', { payload });
      } else {
        this.$store.dispatch('digitalCart/RESET_INQUIRY');
        this.$store.dispatch('digitalCart/RESET_CART');
      }
    },
    onSelectNominal(sku) {
      this.selectedSku = sku
      const payload = {
        sku,
        productType: 'ELECTRICITY_CREDIT',
        operatorName: this.productData.provider,
        customerNumber: this.plnNumber
      };
      this.$store.dispatch('digitalCart/ADD_CART', { payload });
    },
    isValidInput(data) {
      return data.length <= this.maxNumber
        && data !== this.plnNumber
        && (isNumber(data) || data.length === 0)
    }
  }
};
