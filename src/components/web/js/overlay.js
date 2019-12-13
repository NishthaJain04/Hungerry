import { overFlowBody } from '@/utils/helpers'

export default {
  name: 'overlay-component',
  props: {
    closeOverlay: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    this.handleBodyOverflow(true);
  },
  beforeDestroy() {
    this.handleBodyOverflow(false);
  },
  methods: {
    requestClose(e) {
      this.closeOverlay(e);
    },
    handleBodyOverflow(type) {
      overFlowBody(type);
    }
  }
};
