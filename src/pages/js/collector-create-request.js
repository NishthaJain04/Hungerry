

export default {
  name: 'CollectorCreateRequest',
  data() {
    return {
      quantity: null
    }
  },
  components: {
    
  },
  watch: {
    
  },
  methods: {
    createCollectorRequest() {
      console.log(this.quantity)
      this.$store.dispatch('collectorStore/CREATE_REQUEST', {
        payload:  { countNeeded: this.quantity },
        success: this.createCollectorRequestSuccess
    });
    this.$router.push('/collector/CollectorMatchPage');
    },
    createCollectorRequestSuccess(res) {
      if (res) {
        this.$router.push('/collector/CollectorMatchPage');
      }
    }
  }
};
