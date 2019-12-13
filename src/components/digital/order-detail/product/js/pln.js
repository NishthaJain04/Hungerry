import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailPln',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
