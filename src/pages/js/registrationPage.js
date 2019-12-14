
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
        }
    };
  },
  created() {
  },
  components: {
  },
  methods: {
    confirmation () {
        console.log(this.form)
    }
  }  
};
