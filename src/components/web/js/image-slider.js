import { Hooper, Slide } from 'hooper'

export default {
  name: 'ImageSlider',
  props: ['dataToShow'],
  components: { Hooper, Slide },
  watch: {
    dataToShow: function(newValue) {
      this.updateSliderData(newValue);
    }
  },
  created() {
    this.updateSliderData(this.dataToShow);
  },
  data() {
    return {
      promotionList: []
    };
  },
  methods: {
    handleSlideClick(event) {
      console.log('Click Event', event.target);
    },
    updateSliderData(newData) {
      this.promotionList = [];
      newData.forEach(el => {
        this.promotionList.push(el.parameters[0]);
      });
    }
  }
};
