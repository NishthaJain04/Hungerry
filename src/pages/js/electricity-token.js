import DigitalHeader from '@/components/DigitalProductHeader'
import CustomerNumberModal from '@/components/web/CustomerNumberModal'
import PlnPrepaid from '@/components/electricity-token/PlnPrepaid'
import PlnPostpaid from '@/components/electricity-token/PlnPostpaid'

export default {
  data() {
    return {
      number: ''
    };
  },
  components: {
    DigitalHeader,
    CustomerNumberModal,
    PlnPrepaid,
    PlnPostpaid
  }
};
