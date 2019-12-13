
import RetailProductDetail from '@/components/web/RetailProductDetail'
import HelpAction from '@/components/HelpAction'
import Loader from '@/components/web/Loader'
import { mapGetters } from 'vuex';
export default {
  name: 'RetailOrderDetail',
    components: {
        RetailProductDetail,
        HelpAction,
        Loader
    },
    computed: {
        ...mapGetters('retailOrderHistory', ['getRetailOrderDetail', 'isFetchingRetailOrderHistory'])
    },
    created() {
        this.$store.dispatch('retailOrderHistory/GET_RETAIL_ORDER_DETAIL', {
            pathVariables:  { orderId: this.$route.params.orderId }
        });
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
