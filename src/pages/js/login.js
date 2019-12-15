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
            // console.log(this.emailId, '', this.password)
            // this.$store.dispatch('loginStore/GET_LOGIN_DETAILS', {
            //     params: {
            //       emailId: this.emailId,
            //       password: this.password
            //     },
            //     success: this.successFunction,
            //     fail: this.failureFunction
            //   })
            this.successFunction()
        },
        successFunction () {
          // this.$store.commit('logindetails', result.data)
          this.isLogin = true
        },
        handleAlertClose() {
          this.$router.push('/Home');
        }
    }  
  };
  