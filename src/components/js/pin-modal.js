export default {
  name: 'PinModal',
  props: {
    message: {
      type: String,
      default: ''
    },
    pinHeader: {
      type: String,
      default: ''
    },
    handlePinClose: {
      type: Function
    },
    settingPin: {
      type: Boolean,
      default: false
    },
    pinDescriptionHeader: {
      type: String,
      default: ''
    },
    handlePinEnter: {
      type: Function
    },
    handleIncorrectPinEnter: {
      type: Function
    },
    forgotPinVisible: {
      type: Boolean,
      default: true
    },
    isError: {
      type: Boolean,
      required: false,
      default: false
    },
    disableInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      color: true,
      handleForgotPinVisible: this.forgotPinVisible,
      pinLength: 6,
      pinValue: '',
      pinValues: [
        { pinValue: null },
        { pinValue: null },
        { pinValue: null },
        { pinValue: null },
        { pinValue: null },
        { pinValue: null }
      ],
      isErrorState: false,
      disablePinInput: false
    };
  },
  watch: {
    forgotPinVisible(newValue) {
      this.handleForgotPinVisible = newValue;
    },
    isError: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.showError(this.pinValue);
        }
      }
    },
    disableInput(newVal) {
      this.disablePinInput = newVal;
    }
  },
  mounted() {
    this.$refs.pinInput && this.$refs.pinInput[0].focus();
  },
  methods: {
    checkValue(event, index) {
        const val = event.target.value;
        if (val.length > 1 || val < 0) {
          event.target.value = val % 10;
        }
        this.pinValues[index].pinValue = event.target.value;
        this.pinValue = this.pinValues.map(val => {
          return val['pinValue'];
        });
        this.pinValue = this.pinValue.join('');
        if (this.pinValue.length === this.pinLength) {
          this.handlePinEnter(this.pinValue);
          setTimeout(() => {
            if (this.isError) {
              this.showError(this.pinValue);
            }
          });
        }
    },
    checkKey(event, index) {
      if (event.keyCode === 8 ||  event.keyCode === 46 ) {
        if (event.target.parentNode.previousElementSibling) {
          event.target.parentNode.previousElementSibling.children[0].focus();
          if (this.pinValues[index].pinValue === null) {
            this.pinValues[index-1].pinValue = null
          } else {
            this.pinValues[index].pinValue = null
          }
        } else {
          this.pinValues[index].pinValue = null
        }
      }
      if (event.keyCode === 32) {
        event.target.value = event.target.value.slice(0, 0);
      }
      if (event.target.value && event.target.parentNode.nextElementSibling) {
        event.target.parentNode.nextElementSibling.children[0].focus();
      }
    },
    showError(pinValue) {
      if (pinValue) {
        this.isErrorState = true;
        setTimeout(() => {
          this.pinValues.forEach(val => {
            val.pinValue = '';
          });
          this.pinValue = ''
          this.isErrorState = false;
          if (this.$refs.pinInput) {
            this.$refs.pinInput[0].focus();
          }
          if (this.handleIncorrectPinEnter) {
            this.handleIncorrectPinEnter();
          }
        }, 3000);
        window.navigator.vibrate([200]);
      }
    },
    getClass(index) {
      if (this.pinValues[index].pinValue && !this.isErrorState) {
        return 'pin-enter';
      }
      if (this.isErrorState) {
        return 'error';
      }
    },
    closePinModal() {
      this.handlePinClose();
    },
    goToForgotPin() {
      this.$router.push('/forgot-pin');
    }
  }
};
