

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
    }
  }
};
