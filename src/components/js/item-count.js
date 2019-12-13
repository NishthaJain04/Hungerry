import debounce from 'lodash.debounce'
import { isNumber } from '@/utils/validation';
import { mapGetters } from 'vuex'
export default {
  name: 'ItemCount',
  props: {
    // maxValReached: {
    //   type: Boolean
    // },
    minVal: {
      type: Number
    },
    inputValue: {
      type: [Number, String]
    },
    currentItem: {
      type: Object
    },
    getQuantity: {
      type: Function
    }
  },
  data() {
    return {
      quantity: this.inputValue,
      minusDisabled: false,
      plusDisabled: false
    };
  },
  computed: {
    ...mapGetters('retailCheckoutStore',['getIsFetchingList'])
  },
  watch: {
    inputValue: function(newVal) {
      this.quantity = newVal;
    },
    // maxValReached: function(newVal) {
    //   if (newVal) {
    //     this.plusDisabled = true;
    //   } else {
    //     this.plusDisabled = false;
    //   }
    // }
  },
  methods: {
    incrementQuantity() {
      // if (!this.maxValReached) {
        this.quantity = this.quantity + 1;
        this.plusDisabled = false;
        if (this.quantity > this.minVal) {
          this.minusDisabled = false;
        }
      // } else {
      //   this.plusDisabled = false;
      // }
      this.getQuantityDebounce(this.currentItem, this.quantity)
    },
    getQuantityDebounce: debounce(function() {
      this.getQuantity(this.currentItem, this.quantity);
      if (this.quantity === 0) {
        this.minusDisabled = false
      }
    }, 500),
    decrementQuantity() {
      if (this.quantity > this.minVal) {
        this.quantity = this.quantity - 1;
        this.minusDisabled = false;
        if (this.quantity === this.minVal) {
          this.minusDisabled = true;
        }
      } else if (this.quantity === this.minVal) {
        this.minusDisabled = true;
      } else {
        this.minusDisabled = true;
      }
      this.getQuantityDebounce(this.currentItem, this.quantity)
    },
    changeQuantityDebounce: debounce(function() {
      this.getQuantity(this.currentItem, this.quantity);
      if (this.quantity === 0) {
        this.minusDisabled = false
      }
    }, 500),
    sendQuantity(event) {
      if (this.isValidInput(event.target.value)) {
      //   if (this.maxValReached) {
      //     this.plusDisabled = true;
      //   } else {
      //     this.plusDisabled = false;
      //   }
        this.quantity = event.target.value;
        this.changeQuantityDebounce(this.currentItem, this.quantity);
      } else if (event.target.value === this.quantity) {
          this.$refs.countnumber.value = this.quantity;
        return
      } else {
        this.$refs.countnumber.value = this.quantity;
        return
      }
    },
    isValidInput(data) {
      return parseInt(data) !== this.quantity
        && (isNumber(data) || data.length === 0)
    }
  }
};
