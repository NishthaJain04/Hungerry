import HelpAction from '@/components/HelpAction'
import { getMemberID, getMemberType } from '../../utils/helpers';

export default {
  data() {
    return {
      showNoti: false
    }
  },
  components: {
    HelpAction
  },
  created() {
    this.$store.dispatch('homepageStore/GET_DELIVERY_CHECK', {
      params: { memberId: getMemberID(), memberType: getMemberType() },
      success: this.requestActiveSuccess
    });
  },
  methods: {
    requestActiveSuccess(res) {
    if(res) {
      this.showNoti = true;
    }
  }
  }
}
