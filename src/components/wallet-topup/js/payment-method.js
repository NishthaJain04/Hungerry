export default {
  methods: {
    changeState() {
      this.$emit('changeState', 'BANK_LIST')
    },
    toTopupScreen() {
      this.$router.push('/digital/blipay')
    }
  }
}