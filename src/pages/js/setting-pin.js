import PinModal from '@/components/PinModal';
import Alert from '@/components/web/Alert';
import Transition from '@/components/web/Transition';
import OverlayPopup from '@/components/web/OverlayPopup';
import OtpModal from '@/components/OtpModal';
import { getMemberID, getI18nText} from '@/utils/helpers';

export default {
  name: 'SettingPin',
  data() {
    return {
      isPinModalVisible: true,
      isConfirmPinModalVisible: false,
      isError: false,
      isPinChangeSuccess: false,
      isOtpModalVisible: false,
      isOtpCorrect: true,
      registeredNumber: getMemberID(),
      resendVisible: false,
      countDownVisible: false,
      resendSuccessVisible: false,
      secondTimer: 0,
      minuteTimer: null,
      minuteTimerString: '',
      secondTimerString: '',
      interval: null,
      disableInput: false
    };
  },
  components: {
    PinModal,
    Alert,
    Transition,
    OverlayPopup,
    OtpModal
  },
  methods: {
    handlePinEnter(pinValue) {
      this.firstPinValue = pinValue;
      setTimeout(() => {
        this.isPinModalVisible = false;
      }, 1500);
      this.isConfirmPinModalVisible = true;
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
    generateOtpFail(error) {
      if (error) {
        this.disableInput = false;
      }
    },
    generateOtpSuccess(res) {
      if (!res.errors) {
        this.disableInput = false;
        this.countDownVisible = true;
        this.minuteTimer = res.codeExpiryTime / 60;
          if (this.minuteTimer < 10) {
            this.minuteTimerString = '0' + this.minuteTimer.toString()
          } else {
            this.minuteTimerString = this.minuteTimer.toString()
          }
          if (this.secondTimer < 10) {
            this.secondTimerString = '0' + this.secondTimer.toString()
          } else {
            this.secondTimerString = this.secondTimer.toString()
          }
          clearInterval(this.interval);
          this.interval = setInterval(() => this.timerFunction(), 1000);
        if (res && !this.resendVisible) {
          this.isOtpModalVisible = true;
        } else {
          this.resendVisible = false;
          this.isOtpCorrect = true;
          this.resendSuccessVisible = true;
        }
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
    verifyOtpFail(error) {
      if(error) {
        if (error.errorMessage === 'TOKEN_INVALID') {
        this.isOtpCorrect = false
        }
        this.resendVisible = false
        if(this.minuteTimer && this.secondTimer) {
          this.countDownVisible = true
        } else {
          this.resendVisible = true
        }
        if(error.errorMessage === 'USER_VERIFY_LIMIT_EXCEED') {
          this.$store.dispatch('SET_ERROR_POPUP', {
            isErrorPopupVisible: true,
            errorList: { Sorry: [getI18nText('Your verification has reached the limit. Please, try again later.', 'Batas verifikasi sudah mencapai limit. Silakan coba beberapa saat lagi')] }
          }, {root: true});
          this.$router.go(-1);
        }
        this.resendSuccessVisible = false
      }
    },
    verifyOtpAndSetPin(otpValue) {
      this.isOtpCorrect = true;
      this.resendVisible = false;
      this.$store.dispatch('profileStore/VERIFY_OTP', {
        pathVariables: {
          memberId: getMemberID()
        },
        payload: {
          verificationCode: otpValue
        },
        success: this.settingPinSuccess,
        fail: this.verifyOtpFail
      });
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
    handleConfirmPinEnter(pinValue) {
      if (pinValue === this.firstPinValue) {
        this.isError = false;
        this.disableInput = true
        this.updatePin();
      } else {
        this.isError = true;
      }
    },
    settingPinSuccess(res) {
      if (res.verified) {
        this.isOtpOverlayOpen = false;
        this.isOtpCorrect = true;
        this.isPinChangeSuccess = true;
        this.resendVisible = false;
        this.resendSuccessVisible = false;
      } else {
        this.isOtpCorrect = false;
        this.resendVisible = false;
        this.resendSuccessVisible = false;
        this.countDownVisible = true;
      }
    },
    handleIncorrectPinEnter() {
      this.isPinModalVisible = true;
      this.isConfirmPinModalVisible = false;
      this.isError = false;
    },
    handleAlertClose() {
      this.isPinChangeSuccess = false;
      this.$router.push('/');
    },
    handlePinClose() {
      this.$router.push('/')
    }
  }
};
