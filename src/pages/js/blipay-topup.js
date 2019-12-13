import DigitalHeader from '@/components/DigitalProductHeader';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedSku: '',
      nominal: ''
    };
  },
  components: {
    DigitalHeader
  },
  created() {
    this.$store.dispatch('blipay/GET_PRODUCT');
  },
  computed: {
    ...mapGetters('blipay', ['products']),
    ...mapGetters('digitalConfig', ['config']),
    validToPay() {
      return this.selectedSku !== '' || this.isValidNominal
    },
    maxTopupAmount() {
      return parseInt(this.config.mitrapay_max_topup_amount)
    },
    minTopupAmount() {
      return parseInt(this.config.mitrapay_min_topup_amount)
    },
    isValidNominal() {
      return this.nominalNumber >= this.minTopupAmount && this.nominalNumber <= this.maxTopupAmount
    },
    nominalNumber() {
      if (this.nominal) {
        return parseInt(this.sanitizeNominal(this.nominal))
      }
      return 0
    }
  },
  methods: {
    onSelectNominal(sku) {
      this.nominal = '';
      if(sku) {
        console.log('value found:', sku);
        this.selectedSku = sku;
      } else {
        console.log('value not found:', sku);
        this.selectedSku = '';
      }
    },
    addCart() {
      const payload = {
        productType: 'WALLET_BALANCE',
        sku: this.selectedSku ? this.selectedSku : null,
        walletAmount: this.nominalNumber
      };

      this.$store.dispatch('digitalCart/ADD_CART_NO_NUMBER', {
        payload,
        success: this.redirectToCart
      });
    },
    redirectToCart() {
      this.$router.push('/digital/blipay/cart');
    },
    onInputNominal(nominal) {
      if (nominal && parseInt(this.sanitizeNominal(nominal)) <= this.maxTopupAmount) {
        this.selectedSku = '';
        this.nominal = this.$options.filters.currency(
          this.sanitizeNominal(nominal),
          {
            currencySymbol: ''
          }
        );
        this.$refs.nominal.model = this.nominal;
      } else if(!nominal) {
        this.$refs.nominal.model = '';
        this.nominal = '';
      } else {
        this.$refs.nominal.model = this.nominal;
      }
    },
    sanitizeNominal(nominal) {
      const separatorRemovedNominal = nominal.replace(/\./g, '');
      const originalNominal = this.nominal.replace(/\./g, '');
      const numberRegex = /^\d+$/;
      return numberRegex.test(separatorRemovedNominal)
        ? separatorRemovedNominal
        : originalNominal;
    }
  }
};
