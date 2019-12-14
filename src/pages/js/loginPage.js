export default {
    name: 'HomePage',
    data() {
      return {
        emailId:'',
        password: ''
      };
    },
    created() {
    },
    components: {
    },
    methods: {
        loginDetails() {
            console.log(this.emailId, '', this.password)
        }
    }  
  };
  