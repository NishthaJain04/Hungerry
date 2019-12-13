import OverlayPopup from '@/components/web/OverlayPopup'
import {isNumber} from '@/utils/validation'

export default {
  data() {
    return {
      phoneNumber: '',
      modalVisible: true
    };
  },
  components: {
    OverlayPopup
  },
  created() {
    this.$store.dispatch('digitalCart/SET_CONTACT_NUMBER', { payload: null });
  },
  computed: {
    validToSubmit() {
      return this.phoneNumber.length >= 10;
    }
  },
  methods: {
    onInputNumber(data) {
      if (data.length <= 13 && (isNumber(data) || data.length === 0)) {
        this.phoneNumber = data;
      } else {
        this.$refs.number.model = this.phoneNumber;
      }
    },
    submitNumber() {
      this.$store.dispatch('digitalCart/SET_CONTACT_NUMBER', {
        payload: this.phoneNumber
      });
      this.closeModal();
    },
    closeModal() {
      this.modalVisible = false;
    }
  }
};
