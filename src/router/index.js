import Vue from 'vue';
import Router from 'vue-router';

const Account = () => import(/* webpackChunkName: 'p-profile' */ '@/pages/Profile');
const Home = () => import(/* webpackChunkName: 'p-store' */ '@/pages/Store');
const OrderHistory = () => import(/* webpackChunkName: 'p-order-history' */ '@/pages/OrderHistory');
const Registration = () => import(/* webpackChunkName: 'p-registration' */ '@/pages/Registration');
const HomePage = () => import(/* webpackChunkName: 'p-registration' */ '@/pages/HomePage');
const DonarCreateRequest = () => import(/* webpackChunkName: 'p-registration' */ '@/pages/DonarCreateRequest');
const RegistrationPage = () => import(/* webpackChunkName: 'p-registration' */ '@/pages/RegistrationPage');
const DonatorRequestDetail = () => import(/* webpackChunkName: 'p-digital-order-detail' */ '@/pages/DonatorRequestDetail');
const LoginPage = () => import(/* webpackChunkName: 'p-pulsa' */ '@/pages/LoginPage');
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
const CollectorMatchPage = () => import(/* webpackChunkName: 'p-retail-checkout' */ '@/pages/CollectorMatchPage');
const ConfirmOrder = () => import(/* webpackChunkName: 'p-confirm-order' */ '@/pages/ConfirmOrder');
const RetailOrderDetail = () => import(/* webpackChunkName: 'p-confirm-order' */ '@/pages/RetailOrderDetail');
const SignUp = () => import(/* webpackChunkName: 'p-login' */ '@/pages/SignUp');
const CollectorCreateRequest = () => import(/* webpackChunkName: 'p-forgot-pin' */ '@/pages/CollectorCreateRequest');
const WalletTransactions = () => import(/* webpackChunkName: 'p-forgot-pin' */ '@/pages/WalletTransactions');
const RetailThankyouPage = () => import(/* webpackChunkName: 'p-thankyou-page' */ '@/pages/RetailThankyouPage');
const RetailPin = () => import(/* webpackChunkName: 'p-retail-pin' */ '@/pages/RetailPin');
const Help = () => import(/* webpackChunkName: 'p-help' */ '@/pages/Help');
const NotFound = () => import(/* webpackChunkName: 'p-not-found' */ '@/pages/NotFound');


Vue.use(Router);
// import store from '@/store

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
    path: '/homePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/donarCreateRequest',
    name: 'DonarCreateRequest',
    component: DonarCreateRequest
  },
  {
    path: '/registrationPage',
    name: 'RegistrationPage',
    component: RegistrationPage
  },
  {
    path: '/collector/CollectorMatchPage',
    name: 'CollectorMatchPage',
    component: CollectorMatchPage
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
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/collector/createRequest',
    name: 'CollectorCreateRequest',
    component: CollectorCreateRequest
  },
  {
    path: '/order/retail/:orderId',
    name: 'RetailOrderDetail',
    component: RetailOrderDetail
  },
  {
    path: '/donator/donator-request-details',
    name: 'DonatorRequestDetail',
    component: DonatorRequestDetail
  },
  {
    path: '/digital/pulsa',
    name: 'Pulsa',
    component: Pulsa
  },
  {
    path: '/digital/token-listrik',
    name: 'ElectricityToken',
    component: ElectricityToken
  },
  {
    path: '/digital/paket-data',
    name: 'PackageData',
    component: PackageData
  },
  {
    path: '/digital/pdam',
    name: 'Pdam',
    component: Pdam
  },
  {
    path: '/digital/bpjs',
    name: 'Bpjs',
    component: Bpjs
  },
  {
    path: '/digital/game-voucher',
    name: 'GameVoucher',
    component: GameVoucher
  },
  {
    path: '/digital/blipay',
    name: 'BlipayTopup',
    component: BlipayTopup
  },
  {
    path: '/order/payment/:orderId',
    name: 'BlipayPin',
    component: BlipayPin
  },
  {
    path: '/digital/order/thank-you/:orderId',
    name: 'digitalThankyou',
    component: DigitalThankyouPage
  },
  {
    path: '/blipay/cashout',
    name: 'BlipayCashout',
    component: BlipayCashout
  },
  {
    path: '/digital/blipay/cart',
    name: 'BlipayCart',
    component: BlipayCart
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