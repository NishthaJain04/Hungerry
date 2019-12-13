export default {
  data() {
    return {
      currentStatus: ''
    };
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  created() {
   this.updateOrders(this.order)
  },
  watch: {
    order: function (newValue) {
      console.log('new value:', newValue)
      this.updateOrders(newValue)
    }
  },
  methods: {
    updateOrders(orders) {
      if(orders.orderItems && orders.orderItems.length) {
        if (this.$route.query.orderStatus === 'PENDING_ORDER') {
          const shippingArray = [];
          orders.orderItems.forEach( orderItem => {
            shippingArray.push(orderItem.shippingStatuses[orderItem.shippingStatuses.length - 1])
          });
          if (shippingArray.length) {
            shippingArray.forEach( shipping => {
              if(shipping === 'FP') {
                this.currentStatus = 'FP'
              }
              if(shipping === 'PU') {
                this.currentStatus = 'PU'
              }
              if(shipping === 'CX') {
                this.currentStatus = 'CX'
              }
              if(shipping === 'D') {
                const status = shippingArray.every( value => value === 'D')
                if (status) {
                  this.currentStatus = 'D'
                } else {
                  this.currentStatus = 'CX'
                }
              }
            })
          }
        }
      }
    }
  }
};
