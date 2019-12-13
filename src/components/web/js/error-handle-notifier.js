export default {
    name: 'ErrorHandleNotifier',
    props: {
      isErrorHandleVisible: {
        required: false
      },
      errorHandleMessage: {
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
      isErrorHandleVisible: function(newValue) {
        console.log('watch: isErrorPopupVisible', newValue);
        this.showErrorMessage = !!newValue;
      },
      errorHandleMessage: function (newValue, oldValue) {
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
        this.$store.dispatch('REMOVE_ERROR_HANDLE_POPUP');
      }
    }
  };
  