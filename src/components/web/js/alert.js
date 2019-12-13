import Overlay from '@/components/web/Overlay';
import Transition from '@/components/web/Transition';

export default {
  name: 'Alert',
  props: {
    showAlert: {
      type: Boolean,
      default: false
    },
    alertMessage: {
      type: String,
      default: ''
    },
    hideAlert: {
      type: Function
    }
  },
  components: {
    Overlay,
    Transition
  },
  watch: {
    showAlert: function(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.hideAlert();
        }, 1500);
      }
    }
  }
};
