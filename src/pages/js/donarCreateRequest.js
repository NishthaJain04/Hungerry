
export default {
    name: 'DonarCreateRequest',
    data() {
      return {
        donatingItems: [{
            categories: '',
            Quantity: ''
        }]
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
            console.log(index)
        }
    }  
  };
  