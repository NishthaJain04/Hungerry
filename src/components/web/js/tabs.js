export default {
  name: 'Tabs',
  props: ['tabStatus', 'onTabClick'],
  methods: {
    getColSpan() {
      return 12 / this.tabStatus.length;
    },
    selectThis(tab) {
      this.onTabClick(tab);
    }
  }
};
