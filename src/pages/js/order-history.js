import OrderSummary from '@/components/order-history/OrderSummary'
import ProductType from '@/components/order-history/ProductType'
import Loader from '@/components/web/Loader'
import InfiniteLoading from 'vue-infinite-loading';
import RetailOrderSummary from '@/components/order-history/RetailOrderSummary'
import { mapGetters } from 'vuex'
import { getI18nText } from '@/utils/helpers'
export default {
  name: 'OrderHistory',
  data() {
    return {
      page: 0,
      selectedOrderStatus: null,
      memberType: '',
      getOrderHistory: [
        {
          orderId: '12232123',
          receiverName: 'ngo.org',
          date: '23-19-2018',
          quantity: 3
        },
        {
          orderId: '12232123',
          receiverName: 'ngo.org',
          date: '23-19-2018',
          quantity: 3
        },
        {
          orderId: '12232123',
          receiverName: 'ngo.org',
          date: '23-19-2018',
          quantity: 3
        }
      ]
      }
  },
  created() {
    this.getAllOrders();
    // const self = this;
    // window.onpopstate = function() {
    //   self.getAllOrders();
    // };
    // this.$store.dispatch('profileStore/GET_MEMBER_DETAILS', {
      //   pathVariables: {memberId: getMemberID()},
      //   success: this.getMemberSuccess
      // });
      // getMemberSuccess(res) {
      //   if (res) {
      //     this.memberType = res.memberDetails.memberType;
      //   }
      // },
  },
  components: {
    OrderSummary,
    ProductType,
    InfiniteLoading,
    Loader,
    RetailOrderSummary
  },
  computed: {
    selectedOrderStatusFilter: {
      get() {
        return this.$route.query.orderStatus
      },
      set(value) {
        this.$route.query.orderStatus = value
      }
    },
    // ...mapGetters('orderHistory', ['orders', 'isFetchingOrderHistory', 'paging']),
    // ...mapGetters('retailOrderHistory', ['getOrderHistory', 'retailPaging', 'isFetchingRetailOrderHistory']),
    // ...mapGetters('profileStore', ['getMembersData']),
    showEmptyMessage() {
      // if (this.$route.query.productType === 'GROCERIES') {
      //   return !this.isFetchingRetailOrderHistory && this.getOrderHistory.length === 0
      // } else {
      //   return !this.isFetchingOrderHistory && this.orders.length === 0
      // }
    }
  },
  methods: {
    getAllOrders() {
      const query = {};
      this.page = 0;
      Object.assign(query, {
          orderStatus: this.$route.query.orderStatus || 'Upcoming'
        })
      this.$router.push({ query });
      // this.$store.dispatch('orderHistory/RESET_ORDERS');
      // this.$store.dispatch('retailOrderHistory/RESET_ORDERS');
      this.getOrders()
    },
    changeOrderStatusFilter(filter) {
      const query = {
        ...this.$route.query,
        orderStatus: filter.code
      };
      this.$router.push({ query })
      this.$store.dispatch('orderHistory/RESET_ORDERS')
      this.$store.dispatch('retailOrderHistory/RESET_ORDERS')
      this.page = 0
      this.getOrders()
    },
    getOrders(success) {
      const query = this.$route.query
    //   if (query.orderStatus === 'GROCERIES') {
    //     this.$store.dispatch('retailOrderHistory/GET_ORDER_HISTORY', {
    //     params: {
    //       page: this.page,
    //       pageSize: 10,
    //       orderStatus: query.orderStatus,
    //     },
    //     success,
    //     isNewPage: this.page === 0 ? true : false
    //   })
    // } else {
      const payload = {
        status: query.orderStatus,
        orderStatus: query.orderStatus,
        page: this.page,
        size: 10
      }
      // this.$store.dispatch('orderHistory/GET_ORDERS', { payload, success })
    // }
    },
    getNextPage($state) {
      this.page = this.page + 1;
      const query = this.$route.query
        if (query.orderStatus === 'GROCERIES' && this.retailPaging && this.page < this.retailPaging.total_page) {
          this.getOrders(
            () => $state.loaded()
          )
        } else if (this.paging && this.page < this.paging.total_page) {
            this.getOrders(
              () => $state.loaded()
            )
        } else {
            $state.loaded()
            $state.complete()
        }
    },
    getRetailOrderDetailPath(order) {
      return {
        path: '/donator/request-details',
        query: this.$route.query
      }
    },
    getOrderDetailPath(order) {
      return {
        path: `/order/digital/${order.orderId}`,
        query: this.$route.query
      }
    }
  }
}
