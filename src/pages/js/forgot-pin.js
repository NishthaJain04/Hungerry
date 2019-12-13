import OverlayPopup from '@/components/web/OverlayPopup'
import Transition from '@/components/web/Transition'
import Alert from '@/components/web/Alert'
import Overlay from '@/components/web/Overlay'
import PinModal from '@/components/PinModal'
import OtpModal from '@/components/OtpModal'
import {getI18nText, getMemberID} from '@/utils/helpers';

export default {
  name: 'ForgotPin',
  data() {
    return {
      isKtpOverlayOpen: true,
      ktpNumber: '',
      isOtpCorrect: true,
      resendVisible: false,
      countDownVisible: false,
      resendSuccessVisible: false,
      isOtpOverlayOpen: false,
      changePinEnable: false,
      confirmPinEnable: false,
      secondTimer: 0,
      minuteTimer: null,
      minuteTimerString: '',
      secondTimerString: '',
      interval: null,
      firstPinValue: '',
      confirmPinValue: '',
      registeredNumber: getMemberID(),
      isPinChangeSuccess: false,
      visibleModal: !1,
      customControls: [
        {
          label: getI18nText('Back', 'Kembali'),
          handler: this.ktpBackHandler
        },
        {
          label: getI18nText('Try Again', 'Coba lagi'),
          handler: this.ktpCancelHandler
        }
      ],
      isError: false,
      disableInput: false
    };
  },
  components: {
    OverlayPopup,
    Transition,
    PinModal,
    OtpModal,
    Alert,
    Overlay
  },
  watch: {
    isOtpOverlayOpen: function(newVal) {
      if (!newVal) {
        this.isOtpCorrect = true;
      }
    }
  },
  methods: {
    ktpCancelHandler() {
      this.visibleModal = false;
      this.ktpNumber = '';
    },
    ktpBackHandler() {
      this.visibleModal = false;
      this.isKtpOverlayOpen = false;
      this.$router.go(-1);
    },
    toggleKtpOverlayPopup() {
      this.isKtpOverlayOpen = !this.isKtpOverlayOpen;
      this.$router.go(-1);
    },
    verifyKtpSuccess(res) {
      if (res.isValid) {
        this.changePinEnable = true;
        this.isKtpOverlayOpen = false;
      } else {
        this.visibleModal = true;
      }
      this.ktpNumber = '';
    },
    checkForCorrectKtp() {
      this.$store.dispatch('profileStore/VERIFY_KTP', {
        pathVariables: {
          memberId: getMemberID()
        },
        payload: {
          ktpNumber: this.ktpNumber
        },
        success: this.verifyKtpSuccess
      });
    },
    exitPinModal() {
      this.changePinEnable = false;
      this.isKtpOverlayOpen = true;
    },
    handlePinEnter(pinValue) {
      this.firstPinValue = pinValue;
      setTimeout(() => {
        this.changePinEnable = false;
      }, 3000);
      this.confirmPinEnable = true;
    },
    handleConfirmPinEnter(confirmPinValue) {
      this.confirmPinValue = confirmPinValue;
      if (this.confirmPinValue === this.firstPinValue) {
        this.isError = false;
        this.isOtpOverlayOpen = true;
        this.disableInput = true;
        this.updatePin();
      } else {
        this.isError = true;
        setTimeout(() => {
          this.confirmPinEnable = false;
          this.changePinEnable = true;
        }, 3000);
      }
    },
    updatePinSuccess(res) {
      if(res.status === 'OK') {
      this.generateOtp();
      }
    },
    updatePin() {
      this.$store.dispatch('profileStore/UPDATE_PIN', {
        pathVariables: {
          memberId: getMemberID()
        },
        payload: {
          pin: this.firstPinValue
        },
        success: this.updatePinSuccess
      });
    },
    timerFunction() {
      this.secondTimer -= 1;
      if (this.secondTimer === -1) {
        this.secondTimer = 59;
        this.minuteTimer -= 1;
      }
      if( this.secondTimer < 10) {
        this.secondTimerString = '0' + this.secondTimer.toString()
      } else {
        this.secondTimerString = this.secondTimer.toString()
      }
      if( this.minuteTimer < 10) {
        this.minuteTimerString = '0' + this.minuteTimer.toString()
      } else {
        this.minuteTimerString = this.minuteTimer.toString()
      }
    if (this.secondTimer === 0 && this.minuteTimer === 0) {
      this.countDownVisible = false
      this.resendVisible = true
      clearInterval(this.interval);
    }
  },
    generateOtp() {
      this.$store.dispatch('profileStore/GENERATE_OTP', {
        pathVariables: {
          memberId: getMemberID()
        },
        success: this.generateOtpSuccess,
        fail: this.generateOtpFail
      });
    },
    generateOtpFail(error) {
      if (error) {
        this.disableInput = false;
      }
    },
    generateOtpSuccess(res) {
      this.disableInput = false;
      if (res && !this.resendVisible) {
        this.countDownVisible = true
        this.minuteTimer = res.codeExpiryTime / 60;
          if( this.minuteTimer < 10) {
            this.minuteTimerString = '0' + this.minuteTimer.toString()
          } else {
            this.minuteTimerString = this.minuteTimer.toString()
          }
          if( this.secondTimer < 10) {
            this.secondTimerString = '0' + this.secondTimer.toString()
          } else {
            this.secondTimerString = this.secondTimer.toString()
          }
          clearInterval(this.interval);
          this.interval = setInterval(() => this.timerFunction(), 1000);
      } else {
        this.resendVisible = false;
        this.isOtpCorrect = true;
        this.resendSuccessVisible = true;
      }
    },
    exitConfirmPinModal() {
      this.confirmPinEnable = false;
      this.isKtpOverlayOpen = true;
    },
    verifyOtpSuccess(res) {
      if (res.verified) {
        this.isOtpOverlayOpen = false;
        this.confirmPinEnable = false;
        this.isPinChangeSuccess = true;
        this.isOtpCorrect = true;
      } else {
        this.isOtpCorrect = false;
        this.countDownVisible = false;
        this.resendVisible = false;
        this.resendSuccessVisible = false;
      }
    },
    verifyOtpFail(errors) {
      if(errors) {
        if (errors.errorMessage === 'TOKEN_INVALID') {
          this.isOtpCorrect = false
          }
        this.resendVisible = false
        if(this.minuteTimer && this.secondTimer) {
          this.countDownVisible = true
        } else {
          this.resendVisible = true
        }
        this.resendSuccessVisible = false
        if(errors.errorMessage === 'USER_VERIFY_LIMIT_EXCEED') {
          this.$store.dispatch('SET_ERROR_POPUP', {
            isErrorPopupVisible: true,
            errorList: { Sorry: [getI18nText('Your verification has reached the limit. Please, try again later', 'Batas verifikasi sudah mencapai limit. Silakan coba beberapa saat lagi')] }
          }, {root: true});
          this.$router.go(-1);
        }
      }
    },
    verifyOtpAndSetPin(otpValue) {
      this.isOtpCorrect = true;
      this.resendVisible = false;
      this.$store.dispatch('profileStore/VERIFY_OTP', {
        success: this.verifyOtpSuccess,
        pathVariables: {
          memberId: getMemberID()
        },
        payload: {
          verificationCode: otpValue
        },
        fail: this.verifyOtpFail
      });
    },
    handleAlertClose() {
      this.isPinChangeSuccess = false;
      this.$router.go(-1);
    }
  }
};
