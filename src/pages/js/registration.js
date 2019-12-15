
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
        }
    };
  },
  created() {
  },
  components: {
  },
  methods: {
    confirmation () {
        if (this.form.password === this.form.confirmPassword) {
          this.$router.push('/homePage')
        } else {
          console.log('errorMsg')
        }
    }
  }  
};
