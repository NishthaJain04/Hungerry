import { mapGetters } from 'vuex'
import iconPlaceholder from '@/assets/icons/icon-placeholder.jpg'

export default {
    name: 'ProductList',
    props: {
      productList: {
        type: Array,
      },
      item: {
          type: Object
      },
      index: {
          default: 0
      },
      colSpan1: {
          default: 3
      },
      colSpan2: {
          default: 9
      }
    },
    data() {
      return {
        count: 0,
        itemAdded: false,
        maxQuantity: null,
        quantity: null,
        maxValReached: false,
        hasAccepted: false
      };
    },
    computed: {
      // ...mapGetters('retailCheckoutStore',
      // ['getCartDetails']
      // )
    },
    watch: {
      // getCartDetails(newValue) {
      //   if (newValue) {
      //     if (this.getCartDetails.items.length) {
      //     this.checkItemInCart()
      //   }
      // }
      // }
    },
    created () {
    if (this.getCartDetails && this.getCartDetails.items && this.getCartDetails.items.length) {
      // this.checkItemInCart()
    }
   },
    methods: {
      matchDonor(event, item) {
        console.log(item);
        this.hasAccepted = true
      }
    //   checkItemInCart() {
    //   this.getCartDetails.items.forEach( currentItem => {
    //     if(this.item.itemSku === currentItem.itemSku) {
    //       this.itemAdded = true
    //       this.maxQuantity = this.item.outOfStock ?  currentItem.allocatedQuantity : currentItem.maximumQuantity
    //       this.quantity = currentItem.quantity
    //     }
    //   })
    // },
    // addItemToCart(event, item) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.count = 1
    //   this.quantity = 1
    //   this.$store.dispatch('retailCheckoutStore/ADD_TO_CART', {
    //     payload: {
    //       quantity: 1,
    //       itemSku: item.itemSku
    //     },
    //     fail: this.addItemFail
    //   });
    // },
    // addItemFail(error) {
    //   if(error) {
    //     this.count = 0
    //   }
    // },
    // updateItemQuantitySuccess(data, currentItem) {
    //   data.items.forEach( (item, index) => {
    //     if (currentItem.itemSku === item.itemSku) {
    //       if (Object.keys(item.errorInfo).length !== 0) {
    //         if (Object.values(item.errorInfo.values)[0][0] === 'OOS') {
    //         this.quantity = data.items[index].quantity;
    //         // this.maxValReached = true;
    //         this.showToast();
    //         return false;
    //       } else {
    //         this.$store.dispatch('SET_ERROR_HANDLE_POPUP', {
    //         isErrorHandleVisible: true,
    //         errorList: item.errorInfo.values
    //       }, {root: true});
    //       }
    //     } else {
    //       // this.maxValReached = false;
    //     }
    //   }
    //   })
    // },
    // updateItemQuantityFail(error) {
    //   if (error) {
    //     this.checkItemInCart();
    //   }
    // },
    // getItemQuantity(item, value) {
    //   this.quantity = value;
    //   if (value != 0 && value !== '') {
    //   this.$store.dispatch('retailCheckoutStore/UPDATE_ITEM_QUANTITY', {
    //       payload: {
    //       quantity: this.quantity,
    //       itemSku: item.itemSku
    //       },
    //       success: (response) => {
    //         this.updateItemQuantitySuccess(response, item)
    //       },
    //       fail: this.updateItemQuantityFail
    //     });
    //    }
    //   if (value == 0 || value === '') {
    //       this.itemAdded = false
    //       this.count = 0
    //       this.$store.dispatch('retailCheckoutStore/DEL_CART_ITEM', {
    //         payload: {
    //           itemSku: item.itemSku
    //         }
    //       })
    //   }
    // },
    // showToast() {
    //     if (this.$refs.limitToast) {
    //     this.$refs.limitToast.classList.add('show');
    //     setTimeout(() => {
    //       this.$refs.limitToast.classList.remove('show');
    //     }, 3000);
    //     return true;
    //   }
    // },
    // imageLoadError(event) {
    //   event.target.src = iconPlaceholder
    // }
  }
};
