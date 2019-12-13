import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('homepageStore', ['getConfigs'])
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  }
}
