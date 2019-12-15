import Alert from '@/components/web/Alert';
import DropDown from '@/components/web/DropDown'

export default {
    name: 'DonarCreateRequest',
    data() {
      return {
        donatingItems: [{
            categories: '',
            Quantity: ''
        }],
        listData: ['Rice', 'Bread', 'Curry', 'Others'],
        switchedCustom: true,
        additionalInfo: '',
        selectTime: '',
        isDonarRequest: false
      };
    },
    created() {
    },
    components: {
        Alert,
        DropDown
    },
    methods: {
        displayProduct() {
            const product = {
                categories: '',
                Quantity: ''
            }
            this.donatingItems.push(product)
            console.log(this.donatingItems)
        },
        deleteProduct (index) {
            console.log(index)
            if (this.donatingItems.length > 1) {
             this.donatingItems.splice(index, 1);
            }
        },
        request () {
            // this.$store.dispatch('donar/create-request', {
            //     payload: this.donatingItems,
            //     switchedCustom: this.switchedCustom,
            //     additionalInfo: this.additionalInfo,
            //     selectTime: this.selectTime,
            //     success: this.successFunction,
            //     failure: this.failureFuction
            // })
            this.successFunction()
        },
        successFunction () {
            // this.$store.commit('registerdetails', result.data)
            this.isDonarRequest = true
          },
          handleAlertClose() {
            this.$router.push('/donator/request-details');
          },
    }  
  };
  