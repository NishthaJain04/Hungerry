
import Transition from '@/components/web/Transition'
import LocationMap from '@/components/LocationMap'
export default {
  name: 'RegistrationPage',
  data() {
    return {
        form: {
            organisationName: '',
            emailId: '',
            registrationId: '',
            mobileNumber: '',
            alternativeNumber: '',
            password: '',
            confirmPassword: '',
            address: ''
        },
        address: '',
        showGoogleMaps: false,
        currentPosition: { lat: 12.9716, lng: 77.5946 },
    };
  },
  created() {
  },
  components: {
    Transition,
    LocationMap
  },
  methods: {
    confirmation () {
        console.log(this.form)
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
    },
  }  
};
