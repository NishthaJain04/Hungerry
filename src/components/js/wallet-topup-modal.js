import OverlayPopup from '@/components/web/OverlayPopup'
import PaymentMethod from '@/components/wallet-topup/PaymentMethod'
import BankList from '@/components/wallet-topup/BankList'
import VaPayments from '@/components/wallet-topup/VaPayments'
import VaInstruction from '@/components/wallet-topup/VaInstruction'

export default {
  data () {
    return {
      screenState: 'PAYMENT_METHOD',
      bankCode: null,
      paymentMethod: null
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    OverlayPopup,
    PaymentMethod,
    BankList,
    VaPayments,
    VaInstruction
  },
  methods: {
    changeScreenState (state) {
      this.screenState =  state
    },
    selectBank (bankCode) {
      this.bankCode = bankCode  
      this.changeScreenState('VA_PAYMENT')
    },
    selectPaymentMethod (method) {
      this.paymentMethod = method
      this.changeScreenState('VA_INSTRUCTION')
    },
    closeModal() {
      this.changeScreenState('PAYMENT_METHOD')
      this.$emit('onCloseModal')
    }
  }
}