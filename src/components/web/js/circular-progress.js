export default {
  name: 'CircularProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    onTimeUp: {
      type: Function,
      default: () => {}
    },
    sqSize: {
      type: Number,
      default: 140
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    handleProgressClose: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearAllTimer();
  },
  data() {
    return {
      timerValue: this.percentage,
      timer: null,
      isTimeUp: false
    };
  },
  computed: {
    radius: function() {
      return (this.sqSize - this.strokeWidth) / 2;
    },
    dashArray: function() {
      return this.radius * Math.PI * 2;
    },
    dashOffset: function() {
      return (
        this.dashArray - this.dashArray * (this.timerValue / this.percentage)
      );
    }
  },
  methods: {
    getTimeString() {
      if (this.timerValue === 0) {
        return '00 : 00';
      }
      if (this.timerValue < 60) {
        return `00 : ${
          this.timerValue >= 10 ? this.timerValue : `0${this.timerValue}`
        }`;
      }
      return `0${Math.floor(this.timerValue / 60)} : ${
        this.timerValue % 60 >= 10
          ? this.timerValue % 60
          : `0${this.timerValue % 60}`
      }`;
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timerValue = this.timerValue - 1;
        if (this.timerValue === 0) {
          this.showTimeUp() 
          clearInterval(this.timer);
        }
      }, 1000);
    },
    showTimeUp() {
      this.isTimeUp = true
      this.onTimeUp();
    },
    clearAllTimer() {
      clearInterval(this.timer);
    }
  }
};
