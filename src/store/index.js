import Vue from 'vue';
import Vuex from 'vuex';
import profileStore from './profileStore';
import homepageStore from './homepage-store';
import authStore from './authStore';
// import notificationStore from './notificationStore';
// import pulsaStore from './pulsa-store';
// import packageData from './package-data-store';
// import pln from './pln-store';
// import digitalCart from './digital-cart-store';
// import blipay from './blipay-store';
// import pdam from './pdam-store';
// import gameVoucher from './game-voucher';
import donorStore from './donor-store';
// import cashoutStore from './blipay-cashout-store';
// import orderHistory from './order-history';
import collectorStore from './collector-store';
// import retailOrderHistory from './retail-order-history-store';
// import digitalConfig from './digital-config'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    collectorStore,
    // notificationStore: notificationStore,
    profileStore: profileStore,
    homepageStore,
    donorStore
    // pulsa: pulsaStore,
    // digitalCart,
    // packageData,
    // pln,
    // blipay,
    // pdam,
    // gameVoucher,
    // digitalOrder,
    // cashoutStore,
    // orderHistory,
    // retailCheckoutStore,
    // retailOrderHistory,
    // digitalConfig
  }
});
