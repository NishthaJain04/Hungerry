import DatePicker from '@/components/web/DatePicker'
import { mapGetters } from 'vuex'
import {getMemberID} from '@/utils/helpers'
// import {enUS, id} from 'date-fns/locale';
import format from 'date-fns/format';
import lang from '@/utils/language';

export default {
  name: 'Personal',
  props: {
    onContinueClick: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    DatePicker
  },
  computed: {
    ...mapGetters('profileStore', ['getMembersData', 'getOcrDetails'])
  },
  data() {
    return {
      TYPE: 'text',
      isContinueDisable: true,
      memberDetail: {
        firstName: '',
        lastName: '',
        placeOfBirth: '',
        dateOfBirth: '',
        gender: 'male'
      },
      openCalendar: false,
      datePickerScrollTo: '',
      dobDisplayText: ''
    };
  },
  watch: {
    getMembersData: function (newValue) {
      if(newValue && newValue.memberDetails && newValue.memberDetails.applicationId) {
        this.renderMemberData(newValue.memberDetails)
      }
    }
  },
  mounted(){
    this.handleIncomingData();
  },
  methods: {
    handleIncomingData() {
      if(Object.keys(this.getOcrDetails).length > 0) {
        this.renderMemberData(this.getOcrDetails);
        return false;
      }
      if(!this.getMembersData || !this.getMembersData.memberDetails) {
        return false
      }
      const memberObject = this.getMembersData.memberDetails;
      this.renderMemberData(memberObject)
    },
    renderMemberData(memberObject){
      if(memberObject.firstName) {
        Object.assign(this.memberDetail, {firstName: memberObject.firstName})
      }
      if(memberObject.lastName) {
        Object.assign(this.memberDetail, {lastName: memberObject.lastName})
      }
      if(memberObject.placeOfBirth) {
        Object.assign(this.memberDetail, {placeOfBirth: memberObject.placeOfBirth})
      }
      if(memberObject.dateOfBirth) {
        const dob = memberObject.dateOfBirth.split('T')[0];
        Object.assign(this.memberDetail, {dateOfBirth: dob});
        // const options = {locale: lang.getUserLanguage() === 'en' ? enUS : id};
        const year = parseInt(dob.split('-')[0]);
        const month = parseInt(dob.split('-')[1])-1;
        const date = parseInt(dob.split('-')[2]);
        this.dobDisplayText = format(new Date(year, month, date), 'dd MMMM yyyy', options);
      }
      if(memberObject.gender) {
        Object.assign(this.memberDetail, {gender: memberObject.gender.toLowerCase()})
      }
    },
    handleInput(keyName, data) {
      Object.assign(this.memberDetail, { [keyName]: data });
      this.validateFields();
    },
    gotToStep3() {
      let userDetail = {
        registrationStep: 'member_details',
        memberDetails: {
          firstName: this.memberDetail.firstName.trim(),
          lastName: this.memberDetail.lastName.trim(),
          placeOfBirth: this.memberDetail.placeOfBirth.trim(),
          dateOfBirth: this.memberDetail.dateOfBirth,
          gender: this.memberDetail.gender
        }
      };

      this.$store.dispatch('profileStore/SAVE_MEMBER_DETAIL', {
        payload: userDetail,
        success: this.detailSaved,
        pathVariables: { memberId: getMemberID() }
      });
    },
    detailSaved(res) {
      console.log('[detailSaved]', res);
      if(res === null) {
        this.onContinueClick();
      }
    },
    getDob() {
      return null;
    },
    selectGender(e) {
      console.log('******:', e.target.value);
      Object.assign(this.memberDetail, { gender: e.target.value });
      this.validateFields();
    },
    validateFields() {
      this.isContinueDisable = !(
        this.memberDetail.gender &&
        this.memberDetail.dateOfBirth &&
        this.memberDetail.placeOfBirth.length <=20 && this.memberDetail.placeOfBirth.length > 0 &&
        this.memberDetail.lastName.length <= 20 && this.memberDetail.lastName.length > 0 &&
        this.memberDetail.firstName.length <= 20 && this.memberDetail.firstName.length > 0
      );
    },
    getMaxDate(limit = 17) {
      let date = new Date();
      date.setFullYear(date.getFullYear()-limit);
      let y = date.getFullYear();
      let m = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
      let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      return `${y}-${m}-${d}`
    },
    getMinDate(limit = 80) {
      let date = new Date();
      date.setFullYear(date.getFullYear()-limit);
      let y = date.getFullYear();
      let m = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
      let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      return `${y}-${m}-${d}`
    },
    handleClose(){
      this.openCalendar = false
    },
    toggleDatePicker() {
      console.log('toggleDatePicker');
      this.openCalendar = !this.openCalendar;
    },
    handleDateSelection(data) {
      console.log('[handleDateSelection_data]', data);
      this.datePickerScrollTo = data.selectionValue;
      this.dobDisplayText = data.dobDisplayText;
      Object.assign(this.memberDetail, { dateOfBirth: data.dobValue });
      this.openCalendar = false;
      this.validateFields();
    }
  }
};
