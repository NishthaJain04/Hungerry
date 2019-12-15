import { clickOutside } from '@/utils/clickOutside'
import Transition from '@/components/web/Transition'

export default {
  name: 'Dropdown',
  props: {
    listData: {
      type: Array,
      required: false,
      default: null
    },
    keyName: {
      type: String,
      required: false,
      default: ''
    },
    defaultLabel: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      required: false,
      default: ''
    },
    onItemClick: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      listOpen: false,
      label: ''
    };
  },
  watch: {
    listOpen: function (newValue) {
      if(newValue) {
         setTimeout(()=>{
           const element = this.$el.querySelector('.item.selected');
           if(!element) return false;
           element.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
         }, 200)
      }
    }
  },
  components: {
    Transition
  },
  directives: {
    clickOutside
  },
  methods: {
    toggleList() {
      this.listOpen = !this.listOpen;
    },
    selectThisItem(item, index) {
      this.onItemClick(this.keyName, item, index);
      this.label = item.name;
      this.hideDropdown();
    },
    hideDropdown() {
      this.listOpen = false;
    }
  }
};
