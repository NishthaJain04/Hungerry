const API_BASE_PATH = '/api/';
const CMS_API_PATH = '/backend/content/';
const services = '/backend/content/pages/mitra/sections?display=normal';

export default {
  api: {
    toLogin: `${API_BASE_PATH}hungerry/verifyLogIn`,
    toRegister: `${API_BASE_PATH}hungerry/addMember`,
    generateOtp: `${API_BASE_PATH}hungerry/generateOtp`,
    verifyOtp: `${API_BASE_PATH}hungerry/verifyOtp`,
    getDigitalProducts(productType) {
      return `${API_BASE_PATH}digital/products/${productType}`;
    },
    createCollectorRequest: `${API_BASE_PATH}hungerry/addCollectorRequest`,
    getMatchingDonors: `${API_BASE_PATH}hungerry/getDonators`,
    donarRequestCheck: `${API_BASE_PATH}order/donarRequestCheck`,
    collectorRequestCheck: `${API_BASE_PATH}/order/collectorRequestCheck`,
    getHomeDetails: `${API_BASE_PATH}hungerry/homeDetails`,
    createDonorRequest: `${API_BASE_PATH}hungerry/createDonorRequest`,
    sendCollectRequest: `${API_BASE_PATH}hungerry/acceptDonatorRequest`,
    getActiveRequest: `${API_BASE_PATH}hungerry/activeRequestCheck`,
    getConfirmMsg: `${API_BASE_PATH}order/deliveryCheck`,
    getMitraSessionInfo: API_BASE_PATH + 'hungerry/session',
    logoutUrl: API_BASE_PATH + 'authentication/destroy',
    getDonorRequestDetail: API_BASE_PATH + 'hungerry/getDonatorRequestDetails',
    getOrderHistory: API_BASE_PATH + 'hungerry/getHistory',
    // getMemberDetails(memberId) {
    //   return `${API_BASE_PATH}mitra/members/${memberId}`;
    // },
    getGenerateOtp(memberId) {
      return `${API_BASE_PATH}mitra/wallet/blipaypin/${memberId}`;
    },
    getVerifyOtpApi(memberId) {
      return `${API_BASE_PATH}mitra/wallet/blipaypin/${memberId}/_confirm`;
    },
    getVerifyKtpApi(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/verify-ktp`;
    },
    updateAddress: API_BASE_PATH + 'mitra/members/081234567890',
    getSignedUrlToUpload(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/image`;
    },
    getProfileKtpUploadApi(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/upload/image`;
    },
    getDownloadKTP_API(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/download/image`;
    },
    getStoreTypeList: API_BASE_PATH + 'mitra/store/types',
    getMemberInProgressApi(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/inprogress`;
    },
    getSaveMemberDetailApi(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}`;
    },
    getBlipayProducts: API_BASE_PATH + 'v1/mitra/wallet/products',
    digitalOperator(productType) {
      return `${API_BASE_PATH}digital/products/${productType}/operator`;
    },
    payOrderWithWallet: '/api/mitra/wallet/purchase/_verify',
    getDigitalOrderDetail(orderId) {
      return `/api/digital/orders/${orderId}`;
    },
    addBankAccount: API_BASE_PATH + 'bank-accounts',
    cashout: API_BASE_PATH + 'wallet/cashouts/081234567890',
    showTransactionHistory:
      API_BASE_PATH +
      'wallet/transactions/081234567890/_get-by-transaction-type',
    getBankList: API_BASE_PATH + 'mitra/wallet/banks',
    getAddBankAccount(memberId) {
      return `${API_BASE_PATH}hungerry/getMemberDetails`;
    },
    getMemberDetails: `${API_BASE_PATH}hungerry/getMemberDetails`,
    getTransactionHistory(memberId) {
      return `${API_BASE_PATH}mitra/wallet/transactions/${memberId}`;
    },
    getMemberBankList(memberId) {
      return `${API_BASE_PATH}mitra/wallet/member-bank-accounts/${memberId}`;
    },
    getDeleteUpdateMemberBankAccount(memberId, bankAccountId) {
      return `${API_BASE_PATH}mitra/wallet/member-bank-accounts/${memberId}/bank-accounts/${bankAccountId}`;
    },
    setDigitalPayment: `${API_BASE_PATH}digital/carts/_payment`,
    digitalOrders: `${API_BASE_PATH}digital/orders/_histories`,
    getCartItems: API_BASE_PATH + 'retail/carts',
    checkoutCart: `${API_BASE_PATH}retail/carts/_checkout`,
    getServiceAndPromotion: services,
    deleteCartItem: API_BASE_PATH + 'retail/carts/item/_delete',
    updateItemQuantity: API_BASE_PATH + 'retail/carts/item',
    addItemToCart: API_BASE_PATH + 'retail/carts/item',
    getProductsList(memberId){
      return `${API_BASE_PATH}retail/search/${memberId}`
    },
    verifyUserPin(memberId) {
      return `${API_BASE_PATH}mitra/blipaypin/${memberId}/_verify`;
    },
    createOrder: API_BASE_PATH + 'retail/orders',
    getOrderByOrderId: `${API_BASE_PATH}retail/orders`,
    getWalletRequests(memberId) {
      return `${API_BASE_PATH}mitra/wallet/members/${memberId}`;
    },
    getCategories: `${API_BASE_PATH}retail/search/categories`,
    getLastOrder: `${API_BASE_PATH}retail/orders/last-paid`,
    getConfig(configName) {
      return `${CMS_API_PATH}configs/${configName}`
    },
    digitalConfig: `${API_BASE_PATH}digital/config`,
    getWhatsAppOptApi(memberId) {
      return `${API_BASE_PATH}mitra/members/${memberId}/opt-whatsapp`;
    },
    // getOrderHistory: `${API_BASE_PATH}retail/orders/history`,
    trackOrderItem(orderId, orderItemId) {
      return `${API_BASE_PATH}retail/orders/${orderId}/item/${orderItemId}/logistics-info`;
    },
    getAddressDetailsApi: API_BASE_PATH + 'mitra/region/subdistricts',
    retailCheckout: API_BASE_PATH + 'retail/checkout/carts',
    updateQuantityAtCheckout: API_BASE_PATH + 'retail/checkout/carts/item',
    deleteItemAtCheckout: API_BASE_PATH + 'retail/checkout/carts/item/_delete',
    getOrderDetail(orderId) {
      return `${API_BASE_PATH}retail/orders/history/${orderId}`
    }
  }
};
