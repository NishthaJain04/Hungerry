import DataIcon from '@/assets/icons/icon-phone-data.svg';
import WaterBillIcon from '@/assets/icons/icon-water-bill.svg';
import PlnIcon from '@/assets/icons/icon-electricity.svg';
import PulsaIcon from '@/assets/icons/icon-phone-prepaid.svg';
import GameIcon from '@/assets/icons/icon-game_voucher.svg';
import BpjsIcon from '@/assets/icons/icon-bpjs.svg';
import WalletIcon from '@/assets/icons/mitrapay.svg';
import RetailIcon from '@/assets/icons/icon-retail.svg';
import { mapGetters } from 'vuex';
import { getMemberID, getMemberType } from '../../../utils/helpers';

export default {
  data() {
    return {
      tabs: [
        {
          icon: RetailIcon,
          orderStatus: 'Upcoming'
        },
        {
          icon: PulsaIcon,
          orderStatus: 'Completed'
        }
      ],
      backUpData: []
    };
  },
  computed: {
    // ...mapGetters('profileStore', ['getMembersData']),
    activeProductType() {
      return this.$route.query.orderStatus;
    }
  },
  created(){
    this.backUpData = this.tabs;
  },
  mounted() {
    // this.$refs.tabs.scrollLeft = this.activeTabIndex * 96;
    // this.checkForRetailAccess(this.getMembersData)
  },
  watch: {
    // getMembersData: function (newValue) {
    //   console.log('[getMembersData watch]', newValue);
    //   this.checkForRetailAccess(newValue)
    // }
  },
  methods: {
    switchTab(tab) {
      const query = {
        ...this.$route.query,
        orderStatus: tab.orderStatus
      };
      this.$router.push({ query });
      // this.$store.dispatch('orderHistory/RESET_ORDERS');
      // this.$store.dispatch('retailOrderHistory/RESET_ORDERS');
      //   if (query.productType === 'GROCERIES') {
          this.$store.dispatch('profileStore/GET_ORDER_HISTORY', {
            params: {
            status: query.orderStatus.toUpperCase(),
            memberId: getMemberID(),
            memberType: getMemberType()
          }
        })
      // } else {
                    // const payload = {
                    //   status: query.orderStatus,
                    //   productType: query.productType,
                    //   page: 0,
                    //   size: 10
                    // };
                    // this.$store.dispatch('orderHistory/GET_ORDERS', { payload })
      }
    }
};
