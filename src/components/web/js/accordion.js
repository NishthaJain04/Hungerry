export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: ''
    },
    accordionData: {
      type: [String, Array],
      default: function() {
        return [
          {
            label: '',
            value: ''
          },
          {
            label: '',
            value: ''
          }
        ];
      }
    }
  },
  data() {
    return {
      listOpen: false,
      listOptions: this.options
    };
  },
  methods: {
    toggleList() {
      this.listOpen = !this.listOpen;
    },
    hideDropdown() {
      this.listOpen = false;
    }
  }
};
