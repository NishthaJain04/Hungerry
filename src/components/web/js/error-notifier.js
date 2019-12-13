export default {
  name: 'ErrorNotifier',
  props: {
    isErrorPopupVisible: {
      required: false
    },
    errorMessage: {
      required: false
    }
  },
  data() {
    return {
      errorsToShow: [],
      showErrorMessage: false
    };
  },
  beforeDestroy() {
    this.showErrorMessage = false;
    this.errorsToShow = [];
  },
  watch: {
    isErrorPopupVisible: function(newValue) {
      console.log('watch: isErrorPopupVisible', newValue);
      this.showErrorMessage = !!newValue;
    },
    errorMessage: function (newValue, oldValue) {
      console.log('errorMessage', newValue, oldValue);
      this.errorsToShow = [];
      if(newValue.errorList) {
        this.errorsToShow = Object.entries(newValue.errorList);
      }
    }
  },
  methods: {
    handleModalClose() {
      console.log('******:', 'handleModalClose');
      this.showErrorMessage = false;
      this.$store.dispatch('REMOVE_ERROR_POPUP');
    }
  }
};
