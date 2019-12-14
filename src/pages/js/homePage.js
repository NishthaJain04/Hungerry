import ImageSlider from '@/components/web/ImageSlider';
import pulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import gameIcon from '@/assets/icons/icon-game_voucher.svg';
import dataIcon from '@/assets/icons/icon-phone-data.svg';
import pdamIcon from '@/assets/icons/icon-water-bill.svg';

export default {
    name: 'HomePage',
    data() {
      return {
        bannersToShow: [{image: pulsaIcon}, {image: gameIcon}, {image: dataIcon}, {image: pdamIcon}]
      };
    },
    created() {
    },
    components: {
      ImageSlider,
    },
    methods: {
    }  
  };
  