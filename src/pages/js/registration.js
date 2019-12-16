
import Transition from '@/components/web/Transition'
import LocationMap from '@/components/LocationMap'
import Alert from '@/components/web/Alert';
import { getMemberID } from '../../utils/helpers';

export default {
  name: 'RegistrationPage',
  data() {
    return {
        form: {
            registrationId: '',
            mobileNumber: '',
            alternativeNumber: '',
            password: '',
            confirmPassword: '',
            address: ''
        },
        showGoogleMaps: false,
        isRegistration: false,
        isCheckPassword: false,
        currentPosition: { lat: 12.9716, lng: 77.5946 },
    };
  },
  created() {
  },
  components: {
    Transition,
    LocationMap,
    Alert
  },
  methods: {
    checkPassword() {
      if (this.form.password !== this.form.confirmPassword) {
        this.isCheckPassword = true
      }
    },
    confirmation () {
        this.form.address = this.address;
        this.form.lat = this.currentPosition.lat;
        this.form.lng = this.currentPosition.lng;
        this.form.memberId = getMemberID()
        this.$store.dispatch('authStore/GO_TO_HOME_PAGE_REG', {
          payload: this.form,
          success: this.successFunction
        })
    },
    successFunction (result) {
      this.$store.commit('registerdetails', result.data)
      this.isRegistration = true
    },
    handleAlertClose() {
      this.$router.push('/login');
    },
     toggleMapsVisibility() {
      this.showGoogleMaps = !this.showGoogleMaps;
    },
    handlePlaceChange(newPosition) {
      this.currentPosition = this.convertPosition(newPosition)
    },
    saveAddress(address, position, completeAddress, zipCode, place_id) {
      this.showGoogleMaps = !this.showGoogleMaps;
      this.address = address;
      this.completeAddress = completeAddress;
      this.addressNotes = address;
      this.zipCode = zipCode;
      this.place_id = place_id;
      console.log(address, position, completeAddress, zipCode, place_id)
      Object.assign(this.currentPosition, this.convertPosition(position));
    },
    convertPosition(position) {
      return {
        lat: typeof position.lat === 'number' ? position.lat : position.lat(),
        lng: typeof position.lng === 'number' ? position.lng : position.lng()
      }
    }
  }  
};
