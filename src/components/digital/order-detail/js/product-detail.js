import OverlayPopup from '@/components/web/OverlayPopup'
import { mapGetters } from 'vuex'

const BpjsDetail =
  () => import(/* webpackChunkName: 'c-digital-order-bpjs' */ '@/components/digital/order-detail/product/Bpjs')
const GameVoucherDetail =
  () => import(/* webpackChunkName: 'c-digital-order-game-voucher' */ '@/components/digital/order-detail/product/GameVoucher')
const PackageDataDetail =
  () => import(/* webpackChunkName: 'c-digital-order-package-data' */ '@/components/digital/order-detail/product/PackageData')
const PdamDetail =
  () => import(/* webpackChunkName: 'c-digital-order-pdam' */ '@/components/digital/order-detail/product/Pdam')
const PlnDetail =
  () => import(/* webpackChunkName: 'c-digital-order-pln' */ '@/components/digital/order-detail/product/Pln')
const PulsaDetail =
  () => import(/* webpackChunkName: 'c-digital-order-pulsa' */ '@/components/digital/order-detail/product/Pulsa')
const BalanceDetail =
  () => import(/* webpackChunkName: 'c-digital-order-balance' */ '@/components/digital/order-detail/product/Balance')

export default {
  data() {
    return {
      productDetailVisible: false
    }
  },
  components: {
    OverlayPopup,
    BpjsDetail,
    GameVoucherDetail,
    PackageDataDetail,
    PdamDetail,
    PlnDetail,
    PulsaDetail,
    BalanceDetail
  },
  computed: {
    ...mapGetters('digitalOrder', ['order']),
    productIcon () {
      try {
        return require(`@/assets/operators/${this.order.networkOperator}`)
      } catch (e) {
        return ''
      }
    }
  }
}
