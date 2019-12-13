import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailGameVoucher',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
