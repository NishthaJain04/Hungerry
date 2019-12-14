import Transition from '@/components/web/Transition';
import Overlay from '@/components/web/Overlay';
// import startOfYear from 'date-fns/startOfYear';
// import getYear from 'date-fns/getYear';
// import addMonths from 'date-fns/addMonths';
// import format from 'date-fns/format';
// import { clickOutside } from '@/utils/clickOutside';
// // import getDaysInMonth from 'date-fns/getDaysInMonth';
// import { id, enUS } from 'date-fns/locale';
// import lang from '@/utils/language';

export default {
    name: 'DatePicker',
    // props: {
    //     handleCloseRequest: {
    //         type: Function,
    //         default: () => {}
    //     },
    //     isOpen: {
    //         type: Boolean,
    //         default: false
    //     },
    //     minYear: {
    //         type: Number,
    //         default: 17
    //     },
    //     maxYear: {
    //         type: Number,
    //         default: 70
    //     },
    //     onDateSelected: {
    //         type: Function,
    //         default: () => {}
    //     },
    //     scrollToValue: {
    //         type: String,
    //         default: '00:00:00'
    //     },
    //     currentValue: {
    //         type: String,
    //         default: ''
    //     }
    // },
    data() {
        return {
            // showCalendarWrapper: false,
            // calendarData: [
            //     {name: 'day', data: this.getDays()},
            //     {name: 'month', data: this.getMonths()},
            //     {name: 'year', data: this.getYears()}
            // ]
        };
    },
    components: {
        Transition,
        Overlay
    },
    directives: {
        // clickOutside
    },
    watch: {
        // isOpen: function (newValue, oldValue) {
        //     console.log('[isOpen][newValue]', newValue);
        //     console.log('[isOpen][oldValue]', oldValue);
        //     if(newValue) {
        //         setTimeout(()=> {
        //             this.showCalendarWrapper = true;
        //         }, 100);
        //         setTimeout(()=>{
        //             this.handleIncomingValue(this.currentValue);
        //         }, 300)
        //     } else {
        //         setTimeout(()=> {
        //             this.showCalendarWrapper = false
        //         }, 100)
        //     }
        // }
    },
}
