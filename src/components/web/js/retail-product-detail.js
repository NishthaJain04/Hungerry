import Stepper from '@/components/web/Stepper'
import OverlayPopup from '@/components/web/OverlayPopup'
import ShippingTracker from '@/components/web/ShippingTracker'
import { mapGetters } from 'vuex'
import iconPlaceholder from '@/assets/icons/icon-placeholder.jpg'
import Loader from '@/components/web/Loader'
export default {
  name: 'RetailProductDetail',
  data() {
    return {
        isOrderTrackingVisible: false,
        selectedOrderStatus: ''
    };
  },
  props: {
    orderItem: {
      type: Object,
      required: true
    }
  },
components: {
    Stepper,
    OverlayPopup,
    ShippingTracker,
    Loader
},
computed: {
...mapGetters('retailOrderHistory', ['getShippingStatus', 'isFetchingRetailOrderHistory', 'isFetchingShipping']),
  getShippingStatusList() {
  return this.getShippingStatus.manifestList ? true : false;
  }
},
created() {
  this.selectedOrderStatus = this.$route.query.orderStatus
},
methods: {
    goBack() {
        this.$router.go(-1);
    },
    goToOrderTracking() {
        const orderId = this.$route.params.orderId
        this.$store.dispatch('retailOrderHistory/TRACK_ORDER_ITEM', {
          pathVariables: {
            orderId: orderId,
            orderItemId: this.orderItem.orderItemId
          }
        })
        this.isOrderTrackingVisible = true
    },
    toggleOrderTracking() {
        this.isOrderTrackingVisible = !this.isOrderTrackingVisible
    },
    imageLoadError(event) {
      event.target.src = iconPlaceholder
    }
}
};
