import {mapGetters} from 'vuex'

export default {
  props: {
    bankCode: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('blipay', ['vaInstruction']),
    bank () {
      if (this.vaInstruction) {
        return this.vaInstruction.banks.find(bank => bank.code === this.bankCode)
      }
      return null
    }
  },
  methods: {
    selectPaymentMethod(method) {
      this.$emit('selectPaymentMethod', method)
    }
  }
}
