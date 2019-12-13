import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
import OverlayPopup from '@/components/web/OverlayPopup'
import Transition from '@/components/web/Transition'
import {getI18nText} from '@/utils/helpers';

export default {
  name: 'OnboardingScreen',
  props: {
    onSkipClick: {
      type: Function,
      default: () => {}
    },
    showOnboardingScreen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination,
    OverlayPopup,
    Transition
  },
  data() {
    return {
      isHelpVisible: false,
      sliderData: [
        {
          heading: getI18nText("Let's increase business income", 'Ayo tingkatkan pendapatan usaha!'),
          text: getI18nText('Prove the easy selling credit, electricity tokens, data packages and merchandise others at the best prices.',
              'Buktikan mudahnya berjualan pulsa,\n' +
              'token listrik, paket data dan barang dagangan\n' +
              'lainnya dengan harga terbaik.')
        }
      ]
    };
  },
  methods: {
    handleMySlideClick(event) {
      console.log('Click Event', event.target);
    },
    skipOnboarding() {
      console.log('SKIP');
      this.onSkipClick();
    },
    showNextScreen() {
      console.log('show next screen');
      this.$refs.hooper.slideNext();
    },
    watchCurrentSlide(slide) {
      console.log('currentSlide:', slide);
      // if (slide.currentSlide === slide.slideFrom) {
      //   this.onSkipClick();
      // }
    },
    toggleHelpVisible() {
      this.isHelpVisible = !this.isHelpVisible;
    }
  }
};
