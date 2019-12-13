import Stepper from '@/components/web/Stepper'
import OverlayPopup from '@/components/web/OverlayPopup'
export default {
  name: 'RetailProductDetail',
  data() {
    return {
    }
  },
  props: {
    shipping: {
      type: Array,
      required: true
    }
  },
components: {
    Stepper,
    OverlayPopup
}
};
