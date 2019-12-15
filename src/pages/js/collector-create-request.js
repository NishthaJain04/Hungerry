

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
        params: { memberId: '57'},
        success: this.createCollectorRequestSuccess
    });
    },
    createCollectorRequestSuccess(res) {
      if (res) {
        this.$router.push('/collector/CollectorMatchPage');
      }
    }
  }
};
