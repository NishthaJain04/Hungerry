import { mapGetters } from 'vuex'

export default {
  name: 'DigitalOrderDetailPackageData',
  computed: {
    ...mapGetters('digitalOrder', ['order'])
  }
};
