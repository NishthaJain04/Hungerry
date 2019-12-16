import HelpAction from '@/components/HelpAction'

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
    this.$store.dispatch('profileStore/REQUEST_ACTIVE', {
      params: { memberId: '57'},
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
