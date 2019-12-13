import ItemCount from '@/components/ItemCount'
import {getMemberID} from '@/utils/helpers'
import { mapGetters } from 'vuex'
import iconPlaceholder from '@/assets/icons/icon-placeholder.jpg'
import Loader from '@/components/web/Loader'

export default {
  name: 'ConfirmOrder',
  data() {
    return {
      visibleModal: false,
      isPinVisible: false,
      isCircularProgressVisible: false,
      isPaymentPageVisible: false,
      orderId: '',
      orderDetails: {},
      paymentStatus: '',
      isError: false,
      shippingAddress: '',
      modalVisible: false,
      walletBalanceExceed: false,
      maxLimitReached: false,
      customControls: [{
        label: this.i18n('DIGITAL.CART.REJECT'),
        handler: this.closeModal
      }, {
        label: this.i18n('DIGITAL.CART.TOPUP'),
        handler: this.redirectToTopup
      }],
      disablePayNow: false,
      maxValReached: false
    };
  },
  components: {
    ItemCount,
    Loader
  },
  computed: {
    ...mapGetters('retailCheckoutStore', ['getCheckoutCart', 'getShippingAddress', 'getIsFetchingList']),
    ...mapGetters('homepageStore', ['getWalletRequest']),
    disablePay() {
      return this.getIsFetchingList || this.walletBalanceExceed || this.maxLimitReached || this.disablePayNow
    },
  },
  watch: {
    getCheckoutCart: function(newVal) {
      if(newVal && this.getWalletRequest.withdrawableBalance < newVal.totalOrder) {
        this.walletBalanceExceed = true;
        this.modalVisible = true;
        return false;
      } else {
        this.modalVisible = false;
        this.walletBalanceExceed = false
      }
    }
  },
  created() {
    this.shippingAddress = this.getShippingAddress;
    this.$store.dispatch('retailCheckoutStore/GET_CHECKOUT_CART', {
      success: this.updateQuantitySuccess
    });
    this.getMemberWalletBalance();
  },
  methods: {
    saveShippingAddress () {
      this.$store.dispatch('retailCheckoutStore/getShippingAddress', this.shippingAddress);
    },
    checkOutCartSuccess(res) {
      if (res) {
        this.$store.dispatch('retailCheckoutStore/CREATE_ORDER', {
          success: this.createOrderSuccess,
          payload: {
            shippingNote: this.shippingAddress
          }
        });
      }
    },
    checkOutandEnterPin() {
      this.$store.dispatch('retailCheckoutStore/CHECKOUT_CART', {
        success: this.checkOutCartSuccess
      });
    },
    updateQuantityFail(error) {
      if (error) {
        this.disablePayNow = true
      }
    },
    updateQuantitySuccess(data) {
      data.items.forEach( (item, index) => {
        if (Object.keys(item.errorInfo).length !== 0) {
          this.disablePayNow = false;
          if (Object.values(item.errorInfo.values)[0][0] === 'OOS') {
            this.quantity = data.items[index].quantity;
            // this.maxValReached = true;
            this.maxLimitReached = true;
            this.showToast();
            
          } else {
             this.$store.dispatch('SET_ERROR_HANDLE_POPUP', {
              isErrorHandleVisible: true,
              errorList: item.errorInfo.values
          }, {root: true});
          }
        } else {
          // this.maxValReached = false;
          this.maxLimitReached = false;
        }
      })
    },
    deleteItemAtCheckout(item) {
      this.$store.dispatch('retailCheckoutStore/DEL_ITEM_AT_CHECKOUT', {
        payload: {
          itemSku: item.itemSku
        }
      })
    },
    getItemQuantity(item, quantity) {
      if ( quantity === 0 || quantity === '' || quantity === '0') {
        this.deleteItemAtCheckout(item);
      }
        // to cover watch in item-count
        this.getCheckoutCart.items.forEach( cartItem => {
          if (cartItem.itemSku === item.itemSku) {
            cartItem.quantity = quantity
            return false
          }
        })
      if (quantity != 0 && quantity !== '') {
        // this.maxValReached = false;
        this.$store.dispatch('retailCheckoutStore/UPDATE_QUANTITY_AT_CHECKOUT', {
          payload: {
            quantity: quantity,
            itemSku: item.itemSku
          },
          success: this.updateQuantitySuccess,
          fail: this.updateQuantityFail
        });
      }
    },
    getMemberWalletBalance() {
      this.$store.dispatch('homepageStore/GET_WALLET_REQUEST', {
        pathVariables: {
          memberId: getMemberID()
        }
      });
    },
    createOrderSuccess(res) {
      this.$store.dispatch('retailCheckoutStore/getShippingAddress', '')
      this.orderId = res.orderId;
      this.$router.push({ path: `retail/order/payment/${this.orderId}`})
    },
    goBack() {
      this.$router.go(-1);
    },
    showToast() {
      if (this.$refs.limitToast && this.$refs.limitToast.length) {
          this.$refs.limitToast[0].classList.add('show');
          setTimeout(() => {
            this.$refs.limitToast[0].classList.remove('show');
          }, 3000);
          return true;
      }
    },
    imageLoadError(event) {
      event.target.src = iconPlaceholder
    },
    closeModal() {
      this.modalVisible = false
    },
    redirectToTopup() {
      this.$router.push('/digital/blipay')
    },
    checkIfUnbuyableOrOOS(item) {
      let className = '';
      if(item.errorInfo && item.errorInfo.values && Object.values(item.errorInfo.values)[0][0] === 'OOS') {
        className = 'disable-item'
      } else {
        className = ''
      }
      return className;
    },
    handleModalClose() {
      this.visibleModal = false
    }
  },
  beforeDestroy () {
    this.isPinVisible = false;
  }
};
