import { mapGetters } from 'vuex'
import CartSummary from '@/components/DigitalCartSummary'
import OverlayPopup from '@/components/web/OverlayPopup'
import DigitalHeader from '@/components/DigitalProductHeader'
import {isNumber} from '@/utils/validation'

export default {
  data() {
    return {
      phoneNumber: '',
      selectedProductDetail: null,
      productDetailVisible: false,
      selectedSku: null
    };
  },
  components: {
    CartSummary,
    OverlayPopup,
    DigitalHeader
  },
  created() {
    this.$store.dispatch('packageData/RESET_PRODUCT');
    this.$store.dispatch('digitalCart/RESET_CART');
    this.$store.dispatch('packageData/RESET_PRODUCT_ERROR')
  },
  computed: {
    ...mapGetters('packageData', ['productData', 'productErrors']),
    ...mapGetters('digitalCart', ['cart']),
    ...mapGetters('digitalConfig', ['config']),
    products() {
      return this.productData
        ? this.productData.products.filter(product => !product.outOfStock)
        : [];
    },
    validToPay() {
      return (
        this.phoneNumber.length >= this.phoneNumberMinLength &&
        this.phoneNumber.length <= this.phoneNumberMaxLength &&
        (this.cart && !this.cart.walletPaymentMethod.disabled)
      );
    },
    phoneNumberMinLength() {
      return parseInt(this.config.minimum_number_length_phone_credit)
    },
    phoneNumberMaxLength() {
      return parseInt(this.config.maximum_number_length_phone_credit)
    },
    paymentRequest () {
      return {
        customerNumber: this.phoneNumber,
        productType: 'DATA_PACKAGE',
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
    onInputPhoneNumber(data) {
      if (data.length <= this.phoneNumberMaxLength && (isNumber(data) || data.length === 0)) {
        this.phoneNumber = data;
      } else {
        this.$refs.number.model = this.phoneNumber
      }
      if (this.phoneNumber.length >= 4 && this.products.length === 0) {
        this.$store.dispatch('packageData/GET_PRODUCTS', {
          payload: {
            customerNumber: this.phoneNumber
          }
        });
      } else if (this.phoneNumber.length <= 3) {
        this.$store.dispatch('packageData/RESET_PRODUCT');
        this.$store.dispatch('digitalCart/RESET_CART');
      }
    },
    onSelectNominal(sku) {
      this.selectedSku = sku
      const payload = {
        sku,
        productType: 'DATA_PACKAGE',
        operatorName: this.productData.provider,
        customerNumber: this.phoneNumber
      };
      this.$store.dispatch('digitalCart/ADD_CART', { payload });
    },
    showDetail(sku) {
      this.selectedProductDetail = this.products.find(
        product => product.sku === sku
      );
      this.productDetailVisible = true;
    },
    closeDetail() {
      this.productDetailVisible = false;
    }
  }
};
