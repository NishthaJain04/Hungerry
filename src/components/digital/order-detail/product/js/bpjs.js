import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailBpjs',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
