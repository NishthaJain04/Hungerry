import Overlay from '@/components/web/Overlay'
import Transition from '@/components/web/Transition'

export default {
  name: 'OverlayPopup',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    closePopup: {
      type: Function,
      default: () => {}
    },
    closeVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Overlay,
    Transition
  },
  methods: {
    overlayClicked(e) {
      if (this.$refs.modal) {
        if (this.$refs.modal.contains(e.target)) {
          return false;
        } else {
          this.closePopup();
        }
      } else {
        return false;
      }
    }
  }
};
