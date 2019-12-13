import {mapGetters} from 'vuex'

export default {
  created() {
    this.$store.dispatch('blipay/GET_VA_LIST')
  },
  computed: {
    ...mapGetters('blipay', ['vaInstruction'])
  },
  methods: {
    selectBank(bankCode) {
      this.$emit('selectBank', bankCode)
    }
  }
}
