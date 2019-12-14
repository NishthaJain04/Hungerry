import Vue from 'vue';
import Router from 'vue-router';

const Account = () => import(/* webpackChunkName: 'p-profile' */ '@/pages/Profile');
const Home = () => import(/* webpackChunkName: 'p-store' */ '@/pages/Store');
const OrderHistory = () => import(/* webpackChunkName: 'p-order-history' */ '@/pages/OrderHistory');
const Registration = () => import(/* webpackChunkName: 'p-registration' */ '@/pages/Registration');
const DigitalOrderDetail = () => import(/* webpackChunkName: 'p-digital-order-detail' */ '@/pages/DigitalOrderDetail');
const Pulsa = () => import(/* webpackChunkName: 'p-pulsa' */ '@/pages/Pulsa');
const BlipayPin = () => import(/* webpackChunkName: 'p-blipay-pin' */ '@/pages/BlipayPin');
const ElectricityToken = () => import(/* webpackChunkName: 'p-electricity-token' */ '@/pages/ElectricityToken');
const PackageData = () => import(/* webpackChunkName: 'p-package-data' */ '@/pages/PackageData');
const Pdam = () => import(/* webpackChunkName: 'p-pdam' */ '@/pages/Pdam');
const Bpjs = () => import(/* webpackChunkName: 'p-bpjs' */ '@/pages/Bpjs');
const BlipayTopup = () => import(/* webpackChunkName: 'p-blipay-topup' */ '@/pages/BlipayTopup');
const BlipayCashout = () => import(/* webpackChunkName: 'p-blipay-withdraw' */ '@/pages/BlipayWithdraw');
const GameVoucher = () => import(/* webpackChunkName: 'p-game-voucher' */ '@/pages/GameVoucher');
const DigitalThankyouPage = () => import(/* webpackChunkName: 'p-thankyou-page' */ '@/pages/DigitalThankyouPage');
const BlipayCart = () => import(/* webpackChunkName: 'p-blipay-cart' */ '@/pages/BlipayCart');
const RetailCheckout = () => import(/* webpackChunkName: 'p-retail-checkout' */ '@/pages/RetailCheckout');
const ConfirmOrder = () => import(/* webpackChunkName: 'p-confirm-order' */ '@/pages/ConfirmOrder');
const RetailOrderDetail = () => import(/* webpackChunkName: 'p-confirm-order' */ '@/pages/RetailOrderDetail');
const SettingPin = () => import(/* webpackChunkName: 'p-setting-pin' */ '@/pages/SettingPin');
const ForgotPin = () => import(/* webpackChunkName: 'p-forgot-pin' */ '@/pages/ForgotPin');
const WalletTransactions = () => import(/* webpackChunkName: 'p-forgot-pin' */ '@/pages/WalletTransactions');
const RetailThankyouPage = () => import(/* webpackChunkName: 'p-thankyou-page' */ '@/pages/RetailThankyouPage');
const RetailPin = () => import(/* webpackChunkName: 'p-retail-pin' */ '@/pages/RetailPin');
const Help = () => import(/* webpackChunkName: 'p-help' */ '@/pages/Help');
const NotFound = () => import(/* webpackChunkName: 'p-not-found' */ '@/pages/NotFound');


Vue.use(Router);
import store from '@/store'

export default new Router({
  mode: 'history',
  routes: [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/retail-checkout',
    name: 'RetailCheckout',
    component: RetailCheckout
  },
  {
    path: '/order',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/confirm-order',
    name: 'ConfirmOrder',
    component: ConfirmOrder
  },
  {
    path: '/setting-pin',
    name: 'SettingPin',
    component: SettingPin
  },
  {
    path: '/forgot-pin',
    name: 'ForgotPin',
    component: ForgotPin
  },
  {
    path: '/order/retail/:orderId',
    name: 'RetailOrderDetail',
    component: RetailOrderDetail
  },
  {
    path: '/order/digital/:orderId',
    name: 'DigitalOrderDetail',
    component: DigitalOrderDetail
  },
  {
    path: '/digital/pulsa',
    name: 'Pulsa',
    component: Pulsa,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/token-listrik',
    name: 'ElectricityToken',
    component: ElectricityToken,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/paket-data',
    name: 'PackageData',
    component: PackageData,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/pdam',
    name: 'Pdam',
    component: Pdam,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/bpjs',
    name: 'Bpjs',
    component: Bpjs,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/game-voucher',
    name: 'GameVoucher',
    component: GameVoucher,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/blipay',
    name: 'BlipayTopup',
    component: BlipayTopup,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/order/payment/:orderId',
    name: 'BlipayPin',
    component: BlipayPin,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/digital/order/thank-you/:orderId',
    name: 'digitalThankyou',
    component: DigitalThankyouPage,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/blipay/cashout',
    name: 'BlipayCashout',
    component: BlipayCashout
  },
  {
    path: '/digital/blipay/cart',
    name: 'BlipayCart',
    component: BlipayCart,
    beforeEnter: (to, from, next) => {
      checkAccessOfUser(to, from, next)
    }
  },
  {
    path: '/wallet-transactions',
    name: 'WalletTransactions',
    component: WalletTransactions
  },
  {
    path: '/retail/order/payment/:orderId',
    name: 'RetailPin',
    component: RetailPin
  },
  {
    path: '/retail/order/thank-you/:orderId',
    name: 'RetailThankyouPage',
    component: RetailThankyouPage
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/mitra-pwa',
    redirect: '/home'
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/not-found'
  }
]
});

function checkAccessOfUser(to, from, next) {
  // const isMemberFetched = store._vm['profileStore/isMemberFetched'];
  // if (isMemberFetched) {
  //   const member = store._vm['profileStore/getMembersData'];
  //   console.log('Member Detail:',member);
  //   const serviceAccess = member.services || [];
  //   if(serviceAccess.includes('digital_products')) {
  //     next()
  //   } else {
  //     next({path: '/home'});
  //   }
  // } else {
  //   setTimeout(() => checkAccessOfUser(to, from, next), 400)
  // }
}