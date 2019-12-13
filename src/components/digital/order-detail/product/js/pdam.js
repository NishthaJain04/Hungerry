import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailPdam',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
