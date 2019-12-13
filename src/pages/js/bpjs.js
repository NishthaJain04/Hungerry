import DigitalHeader from '@/components/DigitalProductHeader'
import CustomerNumberModal from '@/components/web/CustomerNumberModal'
import CartSummary from '@/components/DigitalCartSummary'
import { getMonthDescription } from '@/utils/calendar'
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import {isNumber} from '@/utils/validation'

export default {
  data() {
    return {
      periods: this.generatePeriods(),
      selectedPeriod: null,
      bpjsNumber: ''
    };
  },
  components: {
    DigitalHeader,
    CustomerNumberModal,
    CartSummary
  },
  created () {
    this.$store.dispatch('digitalCart/RESET_CART')
    this.$store.dispatch('digitalCart/RESET_CART_ERROR')
  },
  computed: {
    ...mapGetters('digitalCart', ['cart', 'inquiryDetail', 'contactNumber', 'addCartErrors']),
    ...mapGetters('digitalConfig', ['config']),
    canInputNumber () {
      return this.selectedPeriod !== null
    },
    paymentRequest () {
      return {
        customerNumber: this.bpjsNumber,
        productType: 'BPJS',
        extendedData: {},
        contactNumber: this.contactNumber,
        paymentPeriod: this.selectedPeriod
      };
    },
    validToPay() {
      return this.cart !== null
    },
    isAddCartError() {
      return this.addCartErrors !== null
    },
    fieldStyle() {
      return this.isAddCartError ? 'danger' : ''
    },
    minNumber() {
      return parseInt(this.config.minimum_number_length_bpjs)
    },
    maxNumber() {
      return parseInt(this.config.maximum_number_length_bpjs)
    }
  },
  methods: {
    generatePeriods() {
      let periods = [];
      let date = new Date();
      for (let i = 0; i < 12; i++) {
        if (i > 0) {
          date.setMonth(date.getMonth() + 1);
        }
        const period = i + 1;
        periods.push({
          period: period < 10 ? `0${period}` : `${period}`,
          description: `${getMonthDescription(
            date.getMonth() + 1 
          )} ${date.getFullYear()}`
        });
      }
      return periods;
    },
    onSelectPeriod(period) {
      this.selectedPeriod = period;
      if (this.bpjsNumber.length >= this.minNumber) {
        this.addCart()
      }
    },
    onInputBpjsNumber(data) {
      if (this.isValidInput(data)) {
        this.bpjsNumber = data;
      } else if(data === this.bpjsNumber) {
        return
      } else {
        this.$refs.number.model = this.bpjsNumber
        return
      }
      this.onInputBpjsNumberDebounce(data)
    },
    onInputBpjsNumberDebounce: debounce(function () {
      if (this.bpjsNumber.length >= this.minNumber) {
        this.addCart()
      } else {
        this.$store.dispatch('digitalCart/RESET_INQUIRY');
        this.$store.dispatch('digitalCart/RESET_CART');
      }
    }, 1000),
    isValidInput(data) {
      return data.length <= this.maxNumber
        && data !== this.bpjsNumber
        && (isNumber(data) || data.length === 0)
    },
    addCart() {
      const payload = {
        customerNumber: this.bpjsNumber,
        productType: 'BPJS',
        paymentPeriod: this.selectedPeriod,
        operatorName: 'BPJS'
      };
      this.$store.dispatch('digitalCart/ADD_CART', { payload });
    }
  }
};
