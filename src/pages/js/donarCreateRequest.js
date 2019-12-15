import Alert from '@/components/web/Alert';
import DropDown from '@/components/web/DropDown'

export default {
    name: 'DonarCreateRequest',
    data() {
      return {
        donatingItems: [{
            categories: '',
            quantity: ''
        }],
        listData: [
          {name: 'Rice', value: 1},
         {name: 'Bread', value: 2},
         {name: 'Curry', value: 3},
         {name: 'Others', value: 4}
        ],
        switchedCustom: true,
        additionalInfo: '',
        selectTime: '',
        isDonarRequest: false,
        minutesList: [
          {name: '0', value: 0},
          {name: '15', value: 15},
        {name: '30', value: 30},
        {name: '45', value: 45},
        {name: '60', value: 60}
      ]
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
                quantity: ''
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
        getquantity(event, index) {
          this.donatingItems[index].quantity = event.target.value * 1000;
        },
        getSelectedItem(name, item, index) {
          console.log(name, item, index)
          this.donatingItems[index].categories = item.name.toUpperCase()
        },
        getSelectedTime(name, item) {
          this.selectTime = item.value;
          const time = new Date();
          time.setMinutes(time.getMinutes() + item.value);
          this.selectTime = time;
        },
        request () {
            this.$store.dispatch('donorStore/CREATE_DONOR_REQUEST', {
                payload: {
                  foodRequestList: this.donatingItems,
                  vegetarian: this.switchedCustom,
                  additionalInfo: this.additionalInfo,
                  pickUpTime: this.selectTime
                },
                params: {
                  memberId: '61'
                },
                success: this.successFunction,
                failure: this.failureFuction
            })
            this.successFunction()
        },
        successFunction () {
            this.isDonarRequest = true
          },
          handleAlertClose() {
            this.$router.push('/donator/request-details');
          },
    }  
  };
  