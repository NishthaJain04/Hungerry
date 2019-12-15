import Alert from '@/components/web/Alert';

export default {
    name: 'HomePage',
    data() {
      return {
        emailId:'',
        password: '',
        isLogin: false
      };
    },
    created() {
    },
    components: {
      Alert
    },
    methods: {
        loginDetails() {
            console.log(this.emailId, '', this.password)
            this.$store.dispatch('authStore/GO_TO_HOME_PAGE', {
              payload: {
                  emailId: this.emailId,
                  password: this.password
                },
                success: this.successFunction
              })
        },
        successFunction (result) {
          this.$store.commit('logindetails', result.data)
          this.isLogin = true
        },
        handleAlertClose() {
          this.$router.push('/Home');
        }
    }  
  };
  