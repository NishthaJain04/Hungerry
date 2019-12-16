import { getMemberID } from '@/utils/helpers';


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
        params: { memberId: getMemberID()},
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
