
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
            console.log(this.donatingItems)
        },
        deleteProduct (index) {
            console.log(index)
            if (this.donatingItems.length > 1) {
             this.donatingItems.splice(index, 1);
            }
        }
    }  
  };
  