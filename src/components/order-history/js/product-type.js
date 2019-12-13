import DataIcon from '@/assets/icons/icon-phone-data.svg';
import WaterBillIcon from '@/assets/icons/icon-water-bill.svg';
import PlnIcon from '@/assets/icons/icon-electricity.svg';
import PulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import GameIcon from '@/assets/icons/icon-game_voucher.svg';
import BpjsIcon from '@/assets/icons/icon-bpjs.svg';
import WalletIcon from '@/assets/icons/mitrapay.svg';
import RetailIcon from '@/assets/icons/icon-retail.svg';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      tabs: [
        {
          icon: RetailIcon,
          productType: 'GROCERIES'
        },
        {
          icon: PulsaIcon,
          productType: 'PHONE_CREDIT'
        },
        {
          icon: DataIcon,
          productType: 'DATA_PACKAGE'
        },
        {
          icon: PlnIcon,
          productType: 'ELECTRICITY_CREDIT'
        },
        {
          icon: WaterBillIcon,
          productType: 'WATER_BILL'
        },
        {
          icon: PlnIcon,
          productType: 'ELECTRICITY_POSTPAID'
        },
        {
          icon: GameIcon,
          productType: 'GAME_VOUCHER'
        },
        {
          icon: BpjsIcon,
          productType: 'BPJS'
        },
        {
          icon: WalletIcon,
          productType: 'WALLET_BALANCE'
        }
      ],
      backUpData: []
    };
  },
  computed: {
    ...mapGetters('profileStore', ['getMembersData']),
    activeProductType() {
      return this.$route.query.productType;
    }
  },
  created(){
    this.backUpData = this.tabs;
  },
  mounted() {
    // this.$refs.tabs.scrollLeft = this.activeTabIndex * 96;
    this.checkForRetailAccess(this.getMembersData)
  },
  watch: {
    getMembersData: function (newValue) {
      console.log('[getMembersData watch]', newValue);
      this.checkForRetailAccess(newValue)
    }
  },
  methods: {
    switchTab(tab) {
      const query = {
        ...this.$route.query,
        productType: tab.productType
      };
      this.$router.push({ query });
      this.$store.dispatch('orderHistory/RESET_ORDERS');
      this.$store.dispatch('retailOrderHistory/RESET_ORDERS');
        if (query.productType === 'GROCERIES') {
          this.$store.dispatch('retailOrderHistory/GET_ORDER_HISTORY', {
          params: {
            page: 0,
            pageSize: 10,
            orderStatus: query.orderStatus
          },
          isNewPage: true
        })
      } else {
        const payload = {
          status: query.orderStatus,
          productType: query.productType,
          page: 0,
          size: 10
        };
        this.$store.dispatch('orderHistory/GET_ORDERS', { payload })
      }
    },
    checkForRetailAccess(memberData) {
      if(!memberData.services) return false;
      const hasAccessOfService = memberData.services.includes('replenishment_products');
      const zoneId = memberData.zoneId;
      let arr = this.backUpData;
      if(memberData && (!hasAccessOfService || zoneId == null)) {
        console.log('FILTERED_PRODUCTS:', arr.filter(el => el.productType !== 'GROCERIES'));
        this.tabs = arr.filter(el => el.productType !== 'GROCERIES');
        this.$refs.tabs.scrollLeft = 0;
      }
    }
  }
};
