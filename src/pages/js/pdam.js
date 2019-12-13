import DigitalHeader from '@/components/DigitalProductHeader'
import DigitalCart from '@/components/DigitalCartSummary'
import CustomerNumberModal from '@/components/web/CustomerNumberModal'
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import {isNumber} from '@/utils/validation'

export default {
  data() {
    return {
      number: '',
      operatorQuery: '',
      operator: {
        text: '',
        value: ''
      }
    };
  },
  created() {
    this.$store.dispatch('digitalCart/RESET_CART');
    this.$store.dispatch('pdam/GET_PRODUCTS');
    this.$store.dispatch('digitalCart/RESET_CART_ERROR');
  },
  components: {
    DigitalCart,
    DigitalHeader,
    CustomerNumberModal
  },
  computed: {
    ...mapGetters('pdam', ['operators']),
    ...mapGetters('digitalCart', ['cart', 'contactNumber', 'addCartErrors']),
    ...mapGetters('digitalConfig', ['config']),
    childOperators() {
      return this.operators
        .map(operator => operator.childOperators)
        .reduce((agg, operator) => [...agg, ...operator], []);
    },
    childOperatorsFiltered() {
      return this.childOperators.filter(childOperator =>
        childOperator.description
          .toLowerCase()
          .includes(this.operatorQuery.toLowerCase())
      );
    },
    canInputNumber() {
      return this.operator !== null;
    },
    validToPay() {
      return this.cart !== null
    },
    paymentRequest() {
      return {
        customerNumber: this.number,
        productType: 'WATER_BILL',
        extendedData: {},
        operatorName: this.operator.value,
        contactNumber: this.contactNumber
      };
    },
    isAddCartError() {
      return this.addCartErrors !== null
    },
    fieldStyle() {
      return this.isAddCartError ? 'danger' : ''
    },
    minNumber() {
      return parseInt(this.config.minimum_number_length_water_bill)
    },
    maxNumber() {
      return parseInt(this.config.maximum_number_length_water_bill)
    }
  },
  methods: {
    onInputNumber(data) {
      if (this.isValidInput(data)) {
        this.number = data;
      } else if(data === this.number) {
        return
      } else {
        this.$refs.number.model = this.number
        return
      }
      this.onInputNumberDebounce(data)
    },
    onInputNumberDebounce: debounce(function() {
      if (this.number.length >= this.minNumber) {
        const payload = {
          customerNumber: this.number,
          productType: 'WATER_BILL',
          operatorName: this.operator.value
        };
        this.$store.dispatch('digitalCart/ADD_CART', { payload });
      }
    }, 1000),
    isValidInput(data) {
      return data.length <= this.maxNumber
        && data !== this.bpjsNumber
        && (isNumber(data) || data.length === 0)
    },
    onInputQuery(e) {
      this.operatorQuery = e.target.value;
    },
    onChooseOperator(operatorCode) {
      const operator = this.childOperators.find(
        opt => opt.name === operatorCode
      );
      this.operator = {
        text: operator ? operator.description : '',
        value: operator ? operator.name : ''
      };
    }
  }
};
