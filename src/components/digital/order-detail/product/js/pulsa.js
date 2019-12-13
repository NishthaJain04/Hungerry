import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailPulsa',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
