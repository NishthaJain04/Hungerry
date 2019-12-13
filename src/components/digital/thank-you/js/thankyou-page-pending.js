import CircularProgress from '@/components/web/CircularProgress'

export default {
  data() {
    return {
      isTimeup: false
    }
  },
  components: {
    CircularProgress
  },
  methods: {
    backToHomepage() {
      this.$router.push('/');
    },
    handleTimeup() {
      this.isTimeup = true
    }
  }
};
