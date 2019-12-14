import ProductList from '@/components/web/ProductList'
import OverlayPopup from '@/components/web/OverlayPopup'
import InfiniteLoading from 'vue-infinite-loading';
// import {getMemberID} from '@/utils/helpers'
// import { mapGetters } from 'vuex'
import Loader from '@/components/web/Loader'
import debounce from 'lodash.debounce'
import Transition from '@/components/web/Transition'
import profileImage from '@/assets/icons/icon-face.svg'

export default {
  name: 'CollectorMatchPage',
  data() {
    return {
      visibleModal: false,
      itemQuantity: null,
      searchValue: '',
      selectedCategoryIndex: 0,
      lastOrderPopupVisible: false,
      noSearchResult: false,
      page: 0,
      selectedSubCat: null,
      subCategories: [],
      category: '',
      getDonors: [
        {
          name: 'nishtha',
          phoneNumber: '9835112837',
          email: 'jain04nishtha@gmail.com',
          imageUrl: profileImage,
          distance: '1.2km',
          quantity: '1.5kg'
        },
        {
          name: 'purvakshi',
          phoneNumber: '9835112837',
          email: 'jain04nishtha@gmail.com',
          imageUrl: profileImage,
          distance: '1.2km',
          quantity: '1.5kg'
        },
        {
          name: 'vyshnavi',
          phoneNumber: '9835112837',
          email: 'jain04nishtha@gmail.com',
          imageUrl: profileImage,
          distance: '1.2km',
          quantity: '1.5kg'
        },
        {
          name: 'sowmiya',
          phoneNumber: '9835112837',
          email: 'jain04nishtha@gmail.com',
          imageUrl: profileImage,
          distance: '1.2km',
          quantity: '1.5kg'
        }
      ]
    };
  },
  components: {
    ProductList,
    OverlayPopup,
    InfiniteLoading,
    Loader,
    Transition
  },
  computed: {
    // ...mapGetters('retailCheckoutStore',
    //  [
    //    'getCartDetails',
    //    'paging',
    //    'getCategories',
    //    'getProductsList',
    //    'getSubCategoryList',
    //    'getIsFetchingList',
    //    'getLastOrder',
    //    'isAddingItemToCart'
    // ]
    // ),
    // totalCartItemCount () {
    //   let item = 0;
    //   let cart = this.getCartDetails.items;
    //   cart.forEach(el=>{
    //     item = item + el.quantity
    //   });
    //   return item;
    // },
    mainContainerObject() {
      if(this.getCartDetails && this.getCartDetails.items && this.getCartDetails.items.length) {
        return {height: 'calc(100vh - 128px)'}
      }
    }
  },
  created() {
    // this.$store.dispatch('retailCheckoutStore/GET_CART_ITEMS');
    // this.$store.dispatch('retailCheckoutStore/GET_LAST_ORDER');
    // this.$store.dispatch('retailCheckoutStore/RESET_PRODUCT_LIST');
    // this.$store.dispatch('retailCheckoutStore/SET_FETCHING', true);
    // this.$store.dispatch('retailCheckoutStore/GET_CATEGORIES', {
    //   params: {
    //     cartId: getMemberID()
    //   },
    //   success: this.getProductList
    // });
  },
  methods: {
    getProductList(success) {
      // this.$store.dispatch('retailCheckoutStore/GET_PRODUCTS_LIST', {
      //   pathVariables: { memberId: getMemberID() },
      //   payload: {
      //     categoryCode: [ this.getCategories[this.selectedCategoryIndex].code ]
      //   },
      //   params: { page: this.page, limit: 10 },
      //   success
      // });
      // this.getSubCategoriesList(this.getCategories[this.selectedCategoryIndex].code)
    },
    getSubCategoriesList(parentCategoryCode) {
      // this.subCategories = [];
      // if (this.getSubCategoryList) {
      //   this.getSubCategoryList.forEach( subCategory => {
      //     if(subCategory.parentCode === parentCategoryCode) {
      //       this.subCategories.push(subCategory)
      //     }
      //   })
      // }
    },
    goToLastOrder () {
      this.lastOrderPopupVisible = true
    },
    toggleLastOrderPopupVisible () {
      this.lastOrderPopupVisible = !this.lastOrderPopupVisible
    },
    getSearchProductList(event) {
      // this.searchValue = event.target.value;
      // if (this.searchValue.length === 0) {
      //   this.selectedCategoryIndex = 0;
      //   this.page = 0;
      //   this.$store.dispatch('retailCheckoutStore/RESET_PRODUCT_LIST');
      //   this.getProductList()
      // } else {
      //   this.selectedCategoryIndex = null;
      //   this.subCategories = [];
      //   this.$store.dispatch('retailCheckoutStore/SET_FETCHING', true)
      // }
      // if (this.searchValue.length >= 3) {
      //   this.page = 0;
      //   this.$store.dispatch('retailCheckoutStore/RESET_PRODUCT_LIST');
      //   this.getProductsListDebounce()
      // } else if (this.searchValue.length > 0 && this.searchValue.length < 3 ) {
      //   this.selectedCategoryIndex = null;
      //   this.$store.dispatch('retailCheckoutStore/SET_FETCHING', false);
      //   this.subCategories = []
      // }
    },
    getProductsListDebounce: debounce(function() {
      this.getSearchProductsList()
    }, 500),
    getSearchProductsList(success) {
      // this.$store.dispatch('retailCheckoutStore/GET_PRODUCTS_LIST', {
      //   pathVariables: { memberId: getMemberID() },
      //   payload: {
      //     searchTerm: this.searchValue
      //   },
      //   params: { page: this.page, limit: 10 },
      //   success
      // });
    },
    getSelectedCategory(index, category) {
      // this.selectedCategoryIndex = index;
      // this.selectedSubCat = ''
      // this.searchValue = ''
      // this.page = 0
      // this.category = category
      // this.$store.dispatch('retailCheckoutStore/RESET_PRODUCT_LIST')
      // this.getSelectedCategoryProducts()
      // this.getSubCategoriesList(category.code)
    },
    getSelectedCategoryProducts(success) {
    // this.$store.dispatch('retailCheckoutStore/GET_PRODUCTS_LIST', {
    //   pathVariables: { memberId: getMemberID() },
    //   payload: {
    //     categoryCode: [ this.category.code ]
    //   },
    //   params: { page: this.page, limit: 10 },
    //   success
    // });
    },
    getNextPage($state) {
    //   this.page = this.page + 1;
    //   if (this.paging && this.page < this.paging.total_page) {
    //     if(this.selectedCategoryIndex !== null && !this.selectedSubCat) {
    //        this.getProductList(
    //       () => $state.loaded()
    //     )
    //   } else if (this.searchValue && this.searchValue.length >= 3) {
    //        this.getSearchProductsList(
    //       () => $state.loaded()
    //     )
    //   } else if (this.selectedSubCat) {
    //     this.getProductListOnSubCatSelect(
    //    () => $state.loaded()
    //  )
    //   }
    // } else {
    //   $state.loaded()
    //   $state.complete()
    // }
    },
    onSubCategorySelect(code) {
      // this.selectedSubCat = code
      // this.page = 0
      // this.$store.dispatch('retailCheckoutStore/RESET_PRODUCT_LIST')
      // this.getProductListOnSubCatSelect()
    },
    getProductListOnSubCatSelect(success) {
    //   this.$store.dispatch('retailCheckoutStore/GET_PRODUCTS_LIST', {
    //     pathVariables: { memberId: getMemberID() },
    //     payload: {
    //       categoryCode: [ this.selectedSubCat ]
    //     },
    //     params: { page: this.page, limit: 10 },
    //     success
    //   });
    }
  }
};
