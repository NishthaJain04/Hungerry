import OverlayPopup from '@/components/web/OverlayPopup'
import OtpModal from '@/components/OtpModal'
import CartSummary from '@/components/DigitalCartSummary'
import DigitalHeader from '@/components/DigitalProductHeader'
import { mapGetters } from 'vuex'
import {isNumber} from '@/utils/validation'

export default {
  data() {
    return {
      selectedSku: '',
      phoneNumber: ''
    };
  },
  created() {
    this.$store.dispatch('pulsa/RESET_PRODUCT');
    this.$store.dispatch('digitalCart/RESET_CART');
  },
  components: {
    OverlayPopup,
    OtpModal,
    CartSummary,
    DigitalHeader
  },
  computed: {
    ...mapGetters('pulsa', ['productData', 'productErrors']),
    ...mapGetters('digitalCart', ['cart']),
    ...mapGetters('digitalConfig', ['config']),
    products() {
      return this.productData
      ? this.productData.products.filter(product => !product.outOfStock)
      : [];
    },
    phoneNumberMinLength() {
      return parseInt(this.config.minimum_number_length_phone_credit)
    },
    phoneNumberMaxLength() {
      return parseInt(this.config.maximum_number_length_phone_credit)
    },
    validToPay() {
      return (
        this.phoneNumber.length >= this.phoneNumberMinLength &&
        this.phoneNumber.length <= this.phoneNumberMaxLength &&
        !!(this.cart && !this.cart.walletPaymentMethod.disabled)
      );
    },
    paymentRequest () {
      return {
        customerNumber: this.phoneNumber,
        productType: 'PHONE_CREDIT',
        extendedData: {},
        sku: this.selectedSku,
        operatorName: this.productData ? this.productData.provider : ''
      };
    },
    isProductError() {
      return this.productErrors !== null
    },
    fieldStyle() {
      return this.isProductError ? 'danger' : ''
    }
  },
  methods: {
    onSelectNominal(sku) {
      this.selectedSku = sku;
      const payload = {
        sku,
        productType: 'PHONE_CREDIT',
        operatorName: this.productData.provider,
        customerNumber: this.phoneNumber
      };
      this.$store.dispatch('digitalCart/ADD_CART', { payload });
    },
    onInputPhoneNumber(data) {
      if (data.length <= this.phoneNumberMaxLength && (isNumber(data) || data.length === 0)) {
        this.phoneNumber = data;
      } else {
        this.$refs.number.model = this.phoneNumber
      }
      if (this.phoneNumber.length >= 4 && this.products.length === 0) {
        this.$store.dispatch('pulsa/GET_PRODUCTS', {
          payload: {
            customerNumber: this.phoneNumber
          }
        });
      } else if (this.phoneNumber.length <= 3) {
        this.$store.dispatch('pulsa/RESET_PRODUCT');
        this.$store.dispatch('digitalCart/RESET_CART');
      }
    }
  }
};
