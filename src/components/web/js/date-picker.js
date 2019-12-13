import Transition from '@/components/web/Transition';
import Overlay from '@/components/web/Overlay';
import startOfYear from 'date-fns/startOfYear';
import getYear from 'date-fns/getYear';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { clickOutside } from '@/utils/clickOutside';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { id, enUS } from 'date-fns/locale';
import lang from '@/utils/language';

export default {
    name: 'DatePicker',
    props: {
        handleCloseRequest: {
            type: Function,
            default: () => {}
        },
        isOpen: {
            type: Boolean,
            default: false
        },
        minYear: {
            type: Number,
            default: 17
        },
        maxYear: {
            type: Number,
            default: 70
        },
        onDateSelected: {
            type: Function,
            default: () => {}
        },
        scrollToValue: {
            type: String,
            default: '00:00:00'
        },
        currentValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showCalendarWrapper: false,
            calendarData: [
                {name: 'day', data: this.getDays()},
                {name: 'month', data: this.getMonths()},
                {name: 'year', data: this.getYears()}
            ]
        };
    },
    components: {
        Transition,
        Overlay
    },
    directives: {
        clickOutside
    },
    watch: {
        isOpen: function (newValue, oldValue) {
            console.log('[isOpen][newValue]', newValue);
            console.log('[isOpen][oldValue]', oldValue);
            if(newValue) {
                setTimeout(()=> {
                    this.showCalendarWrapper = true;
                }, 100);
                setTimeout(()=>{
                    this.handleIncomingValue(this.currentValue);
                }, 300)
            } else {
                setTimeout(()=> {
                    this.showCalendarWrapper = false
                }, 100)
            }
        }
    },
    methods: {
        getYears() {
            const years = Array.from(Array(this.maxYear)).map((n, i) => (getYear(new Date())-this.minYear) - i);
            console.log('[years]', years);
            return years;
        },
        getMonths() {
            const options = {locale: lang.getUserLanguage() === 'en' ? enUS : id};
            const months = Array.from(Array(12)).map((n, i) => format(addMonths(startOfYear(new Date()), i), 'MMMM', options));
            // const months = Array.from(Array(12)).map((n, i) => i + 1);
            console.log('[months]', months);
            return months;
        },
        getDays(){
            const days = Array.from(Array(31)).map((n, i) => i + 1);
            console.log('[days]', days);
            return days;
        },
        onScroll(evt) {
            const scrollPos = evt.target.parentElement.scrollTop;
            let newScrollPos = scrollPos;
            const rem = scrollPos % 30;

            if (rem <= 15) {newScrollPos = scrollPos - rem;}
            else if (rem > 15) {newScrollPos = scrollPos + (30 - rem);}
            evt.target.parentElement.scrollTop = newScrollPos;
            this.updateDaysInCalendar();

            //HIGHLIGHT SELECTION ROW CONTENT
            const selectionBox = this.$el.querySelector('.container__selection');
            // Iterate over all LI elements.
            const selectionBoxBoundary = selectionBox.getClientRects()[0];
            [].forEach.call(this.$el.querySelectorAll('li'), function(li) {
                const liBoundary = li.getClientRects()[0];
                if(liBoundary.bottom <= selectionBoxBoundary.top || liBoundary.top >= selectionBoxBoundary.bottom) {
                    li.classList.remove('active-item');
                } else {
                    li.classList.add('active-item');
                }
            });
        },
        hideCalendarWrapper() {
            console.log('[hideCalendarWrapper]');
            this.showCalendarWrapper = false;
            setTimeout(()=>{
                this.handleCloseRequest();
            }, 100);
        },
        submitMe() {
            console.log('[submitMe]');
            const payload = {};
            this.calendarData.forEach((el, index)=>{
                payload[el.name] = Math.round(this.$refs[`ref${index}`][0]['scrollTop']/30);
            });
            console.log('PAYLOAD:', payload);
            const infoDay = `${payload.day < 10 ? `0${payload.day}` : `${payload.day}`}`;
            const infoMonth = `${payload.month < 10 ? `0${payload.month}` : `${payload.month}`}`;
            const infoYear = `${payload.year < 10 ? `0${payload.year}` : `${payload.year}`}`;
            const selectionValue = `${infoDay}:${infoMonth}:${infoYear}`;
            const year = getYear(new Date()) - this.minYear - payload.year;
            const month = payload.month + 1;
            const day = payload.day + 1;
            const formattedYear = year;
            const formattedMonth = `${month < 10 ? `0${month}` : `${month}`}`;
            const formattedDay = `${day < 10 ? `0${day}` : `${day}`}`;
            const dobValue = `${formattedYear}-${formattedMonth}-${formattedDay}`;
            this.showCalendarWrapper = false;
            const options = {locale: lang.getUserLanguage() === 'en' ? enUS : id};
            const dobDisplayText = format(new Date(formattedYear,payload.month,formattedDay), 'dd MMMM yyyy', options);
            console.log('DOB_DISPLAY_TEXT:', dobDisplayText);
            setTimeout(()=>{
                this.onDateSelected({selectionValue, dobValue, dobDisplayText})
            }, 100);
        },
        updateDaysInCalendar() {
            if(!this.$refs) {
                console.log('no ref');
                return false;
            }
            const payload = {};
            this.calendarData.forEach((el, index)=>{
                payload[el.name] = Math.round(this.$refs[`ref${index}`][0]['scrollTop']/30);
            });
            const year = getYear(new Date()) - this.minYear - payload.year;
            const month = payload.month;
            const newDays = getDaysInMonth(new Date(year, month));
            this.calendarData[0].data = Array.from(Array(newDays)).map((n, i) => i + 1);
        },
        checkDataToScroll(scrollToValue = '00:00:00') {
            const scrollEach = scrollToValue.split(':').map(el => parseInt(el, 10));
            this.calendarData.forEach((el, index) => {
                this.$refs[`ref${index}`][0]['scrollTop'] = scrollEach[index] * 30;
            });
        },
        handleIncomingValue(dobValue) {
            console.log('[incomingDobValue]:', dobValue.split('-'), dobValue.length);
            if(!dobValue.length) {
                return false;
            }
            const year = parseInt(dobValue.split('-')[0], 10);
            const month = parseInt(dobValue.split('-')[1], 10)-1;
            const day = parseInt(dobValue.split('-')[2], 10)-1;
            const formattedYear = this.getYears().indexOf(year);
            const formattedMonth = `${month < 10 ? `0${month}` : `${month}`}`;
            const formattedDay = `${day < 10 ? `0${day}` : `${day}`}`;
            const scrollData = `${formattedDay}:${formattedMonth}:${formattedYear}`;
            console.log('[scrollData]', scrollData);
            this.checkDataToScroll(scrollData)
        }
    }
}
