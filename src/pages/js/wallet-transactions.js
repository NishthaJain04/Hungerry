import DigitalHeader from '@/components/DigitalProductHeader'
import CommonLoader from '@/components/web/CommonLoader'
import {getMemberID} from '@/utils/helpers';
import {mapGetters} from 'vuex';
// const actionTypes = ['TOPUP', 'REFUND', 'PURCHASE', 'CASHOUT', 'CASHBACK', 'ROLLBACK', 'TRANSFER', 'TRANSFER_IN','TRANSFER_OUT'];
const creditTypes = ['TOPUP', 'REFUND', 'CASHBACK', 'TRANSFER_IN', 'ROLLBACK'];
const debitTypes = ['CASHOUT', 'TRANSFER_OUT', 'PURCHASE', 'TRANSFER'];
const successTypes = ['CONFIRM', 'DONE'];
// const failedTypes = ['NEW', 'EXPIRED', 'PENDING', 'REJECTED'];

export default {
    name: 'WalletTransactions',
    data() {
       return {
           isLoadingTransactions: false
       }
    },
    components: {
        DigitalHeader,
        CommonLoader
    },
    created() {
        this.$store.dispatch('homepageStore/GET_WALLET_TRANSACTIONS', {
            pathVariables: {memberId: getMemberID()},
            params: {
                startDate: this.getStartDate(),
                endDate: new Date().getTime(),
                transactionType: 'ALL'
            },
            success: this.handleSuccess,
            fail: this.handleFail
        });
    },
    mounted() {
        this.isLoadingTransactions = true
    },
    computed: {
        ...mapGetters('homepageStore', ['getWalletTransactions']),
        getSortedTransactions: function () {
          return this.getWalletTransactions.sort(function (a, b) {
                return parseInt(b.date)- parseInt(a.date)
            })
        }
    },
    methods: {
        getStartDate() {
            let date = new Date();
            return date.setDate(date.getDate()-59)
        },
        handleSuccess() {
            this.isLoadingTransactions = false
        },
        handleFail() {
            this.isLoadingTransactions = false
        },
        getTransactionClass(item) {
            let type = '';
            if(creditTypes.includes(item.type) && successTypes.includes(item.status)) {
                type = 'credit'
            }
            if(debitTypes.includes(item.type) && successTypes.includes(item.status)) {
                type = 'debit'
            }
            return type;
        },
    }
}
