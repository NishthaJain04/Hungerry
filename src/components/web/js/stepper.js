import { getI18nText } from '@/utils/helpers';
export default {
  name: 'Stepper',
  props: {
    orderStatus: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      itemOrderStatus: [
      { label: getI18nText('Order Placed', 'Dipesan'), status: '', key: 'FP' },
      { label: getI18nText('Processing', 'Diproses'), status: '', key: 'PU' },
      { label: getI18nText('Shipped', 'Dikirim'), status: '', key: 'CX' },
      { label: getI18nText('Delivered', 'Sampai'), status: '', key: 'D' }]
    }
  }
};
