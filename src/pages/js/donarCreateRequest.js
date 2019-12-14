
export default {
    name: 'DonarCreateRequest',
    data() {
      return {
        donatingItems: [{
            categories: '',
            Quantity: ''
        }],
        switchedCustom: true,
        additionalInfo: '',
        selectTime: ''
      };
    },
    created() {
    },
    components: {
    },
    methods: {
        displayProduct() {
            const product = {
                categories: '',
                Quantity: ''
            }
            this.donatingItems.push(product)
        },
        deleteProduct (index) {
            this.donatingItems.splice(index, 1);
            this.donatingItems.join()
            console.log(index)
        }
    }  
  };
  