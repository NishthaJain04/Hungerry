import DigitalHeader from '@/components/DigitalProductHeader'
import DropDown from '@/components/web/DropDown'
import DigitalCart from '@/components/DigitalCartSummary'
import CustomerNumberModal from '@/components/web/CustomerNumberModal'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      operator: {
        text: '',
        value: ''
      },
      selectedSku: null
    };
  },
  created() {
    this.$store.dispatch('gameVoucher/GET_OPERATORS');
    this.$store.dispatch('digitalCart/RESET_CART');
    this.$store.dispatch('gameVoucher/RESET_PRODUCT')
  },
  components: {
    DigitalHeader,
    DropDown,
    DigitalCart,
    CustomerNumberModal
  },
  computed: {
    ...mapGetters('digitalCart', ['contactNumber', 'cart']),
    ...mapGetters('gameVoucher', ['operators', 'products']),
    paymentRequest () {
      return {
        productType: 'GAME_VOUCHER',
        extendedData: {},
        operatorName: this.operator.value,
        contactNumber: this.contactNumber,
        sku: this.selectedSku
      };
    }
  },
  methods: {
    onChooseOperator(selectedOperator) {
      const payload = {
        operatorName: selectedOperator.value
      };
      this.$store.dispatch('gameVoucher/GET_PRODUCTS', { payload });
    },
    onSelectNominal(sku) {
      this.selectedSku = sku
      const payload = {
        sku,
        productType: 'GAME_VOUCHER',
        operatorName: this.operator.value
      };
      this.$store.dispatch('digitalCart/ADD_CART', { payload });
    }
  }
};
