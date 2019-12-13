export default {
  name: 'Chips',
  props: {
    chipData: {
      type: Array,
      required: false,
      default: null
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    onSelect: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    selectItem(e) {
      console.log(e.target.value);
      this.onSelect(e.target.value);
    }
  }
};
