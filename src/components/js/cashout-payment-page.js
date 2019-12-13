import OverlayPopup from '@/components/web/OverlayPopup'
import iconSuccess from '@/assets/transaction-success.svg'
import iconFail from '@/assets/icons/icon-transaction-failed.svg'
import iconCorrect from '@/assets/icons/icon-correct.svg'
import iconCross from '@/assets/icons/icon-error-red.svg'

export default {
    props: {
        orderDetails: {
            type: Object,
            default: {
                transactionDateTime: new Date().getTime()
            }
        },
        paymentStatus: {
            type: String
        }
    },
    data() {
        return {
            orderDetailVisible: false,
        };
    },
    components: {
        OverlayPopup
    },
    computed: {
        isSuccess () {
            return this.paymentStatus === 'SUCCESS'
        },
        backgrounColorClass () {
            return this.isSuccess ? 'background-blue-5' : 'background-red'
        },
        labelBackgrounColorClass () {
            return this.isSuccess ? 'background-green' : 'background-red-3'
        },
        headerIcon () {
            return this.isSuccess ? iconSuccess : iconFail
        },
        statusIcon () {
            return this.isSuccess ? iconCorrect : iconCross
        }
    },
    methods: {
        showOrderDetail() {
            this.orderDetailVisible = true;
        },
        closeOrderDetail() {
            this.orderDetailVisible = false;
        }
    }
};
