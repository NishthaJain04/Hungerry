import {mapGetters} from 'vuex'

export default {
  props: {
    paymentMethod: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('profileStore', ['getMembersData']),
    vaNumber() {
      if (this.getMembersData) {
        return `${this.paymentMethod.merchantCode}${this.getMembersData.memberDetails.memberId}`
      }
      return null
    }
  }
}