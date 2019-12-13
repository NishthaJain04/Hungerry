export default {
  name: 'OtpModal',
  props: {
    isOtpCorrect: {
      type: Boolean,
      default: false
    },
    resendVisible: {
      type: Boolean,
      default: false
    },
    countDownVisible: {
      type: Boolean,
      default: false
    },
    resendSuccessVisible: {
      type: Boolean,
      default: false
    },
    secondTimer: {
      type: String,
      default: '0'
    },
    minuteTimer: {
      type: String,
      default: '05'
    },
    message: {
      type: String,
      default: ''
    },
    registeredNumber: {
      type: String
    },
    handleOtpEnter: {
      type: Function
    },
    handleOtpResend: {
      type: Function
    }
  },
  data() {
    return {
      color: true,
      errorVal: false,
      otpValues: [
        { otpValue: null },
        { otpValue: null },
        { otpValue: null },
        { otpValue: null }
      ],
      otpLength: 4,
      otpValue: ''
    };
  },
  methods: {
    checkValue(event, index) {
      let val = event.target.value;
      if (val.length > 1 || val < 0) {
        event.target.value = val % 10;
      }
      this.otpValues[index].otpValue = event.target.value;
      this.otpValue = this.otpValues.map(val => {
        return val['otpValue'];
      });
      this.otpValue = this.otpValue.join('');
      if (this.otpValue.length === this.otpLength) {
        this.handleOtpEnter(this.otpValue);
        setTimeout(() => {
          if (!this.isOtpCorrect) {
            this.showInvalidOTP(this.otpValue);
          }
        });
      }
    },
    checkKey(event, index) {
      if (event.keyCode === 8 ||  event.keyCode === 46 ) {
        if (event.target.parentNode.previousElementSibling) {
          event.target.parentNode.previousElementSibling.children[0].focus();
            this.otpValues[index].otpValue = null
        } else {
          this.otpValues[index - 1].otpValue = null
        }
      }
      if (event.keyCode === 32) {
        event.target.value = event.target.value.slice(0, 0);
      }
      if (event.target.value && event.target.parentNode.nextElementSibling) {
        event.target.parentNode.nextElementSibling.children[0].focus();
      }
    },
    resendOtp() {
      this.handleOtpResend();
    },
    showInvalidOTP() {
      if (this.otpValue) {
        this.errorVal = true;
        setTimeout(() => {
          this.otpValues.forEach(val => {
            val.otpValue = '';
          });
          this.errorVal = false;
          this.$refs.otpInput[0].focus();
          this.$refs.otpInput[3].blur();
        }, 3000);
        window.navigator.vibrate([1000]);
     }
    },
    getClass(index) {
      if (this.otpValues[index].otpValue && !this.errorVal) {
        return 'otp-enter';
      }
      if (this.errorVal) {
        return 'error';
      }
    }
  },
  watch: {
    isOtpCorrect: {
      immediate: true,
      handler(newValue) {
        this.isOtpCorrect = newValue;
        if (!newValue) {
          this.showInvalidOTP();
        }
      }
    }
  },
  mounted() {
    this.$refs.otpInput && this.$refs.otpInput[0].focus();
  }
};
