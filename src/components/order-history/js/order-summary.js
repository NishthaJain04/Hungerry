import pulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import gameIcon from '@/assets/icons/icon-game_voucher.svg';
import dataIcon from '@/assets/icons/icon-phone-data.svg';
import pdamIcon from '@/assets/icons/icon-water-bill.svg';
import plnIcon from '@/assets/icons/icon-electricity.svg';
import retailIcon from '@/assets/icons/icon-retail.svg';
import bpjsIcon from '@/assets/icons/icon-bpjs.svg';
import mitrapayIcon from '@/assets/icons/mitrapay.svg';

export default {
  data() {
    return {
      icon: {
        retailIcon,
        pulsaIcon,
        gameIcon,
        dataIcon,
        pdamIcon,
        plnIcon,
        bpjsIcon,
        mitrapayIcon
      }
    };
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    productName() {
      return this.order.customerId;
    },
    productDescription() {
      return this.order.item.name;
    }
  }
};
