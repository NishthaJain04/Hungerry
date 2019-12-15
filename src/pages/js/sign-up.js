
import Alert from '@/components/web/Alert';
import Transition from '@/components/web/Transition';
import OverlayPopup from '@/components/web/OverlayPopup';
import OtpModal from '@/components/OtpModal';

export default {
  name: 'SignUp',
  data() {
    return {
      isOtpModalVisible: false,
      isOtpCorrect: false,
      registeredNumber: '828262528922',
      resendVisible: false,
      countDownVisible: false,
      resendSuccessVisible: false,
      secondTimer: 0,
      minuteTimer: null,
      minuteTimerString: '',
      secondTimerString: '',
      interval: null,
      disableInput: false,
      value: 'DONOR',
      name: '',
      email: '',
      items: [
        {
          value: 'DONOR',
          label: 'Donor'
        }, {
          value: 'COLLECTOR',
          label: 'Collector'
        }
      ]
    };
  },
  components: {
    Alert,
    Transition,
    OverlayPopup,
    OtpModal
  },
  methods: {
    registerMember() {
      console.log(this.name, ' ', this.email, ' ', this.value)
      this.$store.dispatch('authStore/SET_LOGIN_DETAILS', {
        organisationName: this.name,
        email: this.email,
        memberType:this.value
      })
      this.isOtpModalVisible = true;
      this.generateOtp();
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
        payload: {
          nameOfOrganisaton: this.name,
          emailId: this.email,
          memberType: this.value
        },
        success: this.generateOtpSuccess,
        fail: this.generateOtpFail
      });
    },
    verifyOtpAndSetPin(otpValue) {
      this.resendVisible = false;
      console.log('VerifyOtp', otpValue)
      this.$store.dispatch('profileStore/VERIFY_OTP', {
        payload: {
          emailId: this.email,
          otpNumber: otpValue
        },
        success: this.verifyOtpSuccess
      });
    },
    verifyOtpSuccess(res) {
      if (res) {
        this.isOtpOverlayOpen = false;
        this.isOtpCorrect = true;
        this.resendVisible = false;
        this.resendSuccessVisible = false;
        this.$router.push('/Registration');
      } else {
        this.isOtpCorrect = false;
        this.resendVisible = false;
        this.resendSuccessVisible = false;
        this.countDownVisible = true;
      }
    },
    handleAlertClose() {
      this.$router.push('/');
    }
  }
};
