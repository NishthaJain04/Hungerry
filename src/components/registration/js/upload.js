import ImageUpload from '@/components/web/ImageUpload'
import { mapGetters } from 'vuex'
import {getMemberID} from '@/utils/helpers'
import {isNumber} from '@/utils/validation'

export default {
  name: 'Upload',
  components: {
    ImageUpload
  },
  data() {
    return {
      isContinueDisable: true,
      ktpNumber: '',
      profileImage: '',
      ktpImage: '',
      loadingImage: false,
      loadingProfileImage: false,
    };
  },
  props: {
    onContinueClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('profileStore', ['getMembersData'])
  },
  watch: {
    getMembersData: function (newValue) {
      console.log('[getMembersData] upload', newValue);
      if(newValue && newValue.memberDetails && newValue.memberDetails.applicationId) {
        this.ktpNumber = newValue.memberDetails.ktpNumber || '';
        if(newValue.memberDetails.ktpImage) {
          this.triggerDownloadKTP(newValue.memberDetails, 'ktp');
        }
        if(newValue.memberDetails.profileImage) {
          this.triggerDownloadKTP(newValue.memberDetails, 'profile');
        }
      }
    }
  },
  methods: {
    handleContinue() {
      console.log('CONTINUE BUTTON CLICK');
      this.gotToStep2();
    },
    handleImageUpload(img, type) {
      console.log('UPLOAD ME...', img, type);
      if(type === 'ktp'){
        this.loadingImage = true;
      }
      if(type === 'profile') {
        this.loadingProfileImage = true;
      }
      this.uploadMemberKTP_Profile(img, type);
    },
    uploadMemberKTP_Profile(file, imageType){
      const vm = this;
      let formData = new FormData();
      formData.append('file', file);

      this.$store.dispatch('profileStore/UPLOAD_KTP_PROFILE', {
        pathVariables: { memberId: getMemberID() },
        payload: formData,
        params: {type: imageType},
        success: function (res) {
          vm.ktpProfileUploadSuccess(res, file, imageType)
        },
        fail: this.handleUploadFail
      });
    },
    ktpProfileUploadSuccess(resp, file, imageType) {
      console.log('[ktpProfileUploadSuccess]', resp, Object.keys(resp).length, typeof(resp), imageType);
      if(imageType === 'ktp') {
        this.handleOCR(resp, file, imageType)
      }
      if(typeof(resp) === 'object' && Object.keys(resp).length === 0 && imageType === 'profile') {
        this.loadingProfileImage = false;
        this.profileImage = file.name;
      }
      this.validate()
    },
    triggerDownloadKTP(memberDetails, type) {
      if(type === 'ktp'){
        this.loadingImage = true;
      }
      if(type === 'profile') {
        this.loadingProfileImage = true;
      }
      const vm = this;
      this.$store.dispatch('profileStore/DOWNLOAD_KTP', {
        pathVariables: { memberId: getMemberID() },
        params: {applicationId: memberDetails.applicationId, type: type},
        success: function (resp) {
          vm.ktpProfileDownloadSuccess(resp, type)
        }
      });
    },
    ktpProfileDownloadSuccess(resp, type){
      console.log('ktpProfileDownloadSuccess');
      if(type === 'ktp'){
        this.loadingImage = false;
        this.ktpImage = resp;
      }
      if(type === 'profile') {
        this.loadingProfileImage = false;
        this.profileImage = resp;
      }
      this.validate();
    },
    handleKtpChange(value) {
      if(value.length === 0 || isNumber(value)) {
        this.ktpNumber = value;
      } else {
        this.$refs.ktpField.model = this.ktpNumber;
      }
      this.validate();
    },
    validate() {
      this.isContinueDisable = !(
        this.ktpNumber.length === 16 &&
        this.ktpImage.length &&
        this.profileImage.length
      );
    },
    fileUploadSuccess(res) {
      console.log('[upload response]', res);
      this.ktpNumber = res.ktpNumber;
      this.gotToStep2();
    },
    clearSelectedImage(img, type) {
      console.log('CLEAR:', img, type);
      if (type === 'ktp') {
        this.ktpNumber = '';
        this.ktpImage = '';
      }
      if (type === 'profile') {
        this.profileImage = '';
      }
      this.validate();
    },
    gotToStep2() {
      let userDetail = {
        registrationStep: 'image_details',
        ktpNumber: this.ktpNumber || 'ktpNumber',
      };
      this.$store.dispatch('profileStore/SAVE_MEMBER_DETAIL', {
        payload: userDetail,
        success: this.detailSaved,
        pathVariables: { memberId: getMemberID() }
      });
    },
    detailSaved(res) {
      console.log('[detailSaved]', res);
      this.onContinueClick();
    },
    handleOCR(resp, file, imageType) {
      console.log('[handleOCR]');

      if(typeof(resp) === 'object' && Object.keys(resp).length === 0 && imageType === 'ktp') {
        console.log('No OCR data found...', resp);
        this.loadingImage = false;
        this.ktpImage = file.name;
        this.validate();
        return false;
      }

      console.log('Yeaah..! OCR data found...', resp);
      let ocrObj = {};
      if(resp.NIK) {
        Object.assign(ocrObj, {ktpNumber: resp.NIK})
      }
      if(resp.firstName) {
        Object.assign(ocrObj, {firstName: resp.firstName});
      }
      if(resp.lastName) {
        Object.assign(ocrObj, {lastName: resp.lastName});
      }
      if(resp.placeOfBirth) {
        Object.assign(ocrObj, {placeOfBirth: resp.placeOfBirth});
      }
      if(resp.dateOfBirth) {
        Object.assign(ocrObj, {dateOfBirth: resp.dateOfBirth});
      }
      if(resp.gender) {
        const genderText = resp.gender.toLowerCase();
        console.log('GENDER_TEXT:', genderText, genderText.includes('laki'));
        const GENDER = genderText.includes('laki') ? 'male' : 'female';
        Object.assign(ocrObj, {gender: GENDER});
      }
      console.log('OCR OBJECT:', ocrObj);

      this.$store.commit('profileStore/setOcrDetails', ocrObj);
      if(ocrObj.ktpNumber) {
        this.loadingImage = false;
        this.ktpImage = file.name;
        this.ktpNumber = ocrObj.ktpNumber;
        this.validate()
      } else {
        this.loadingImage = false;
        this.ktpImage = file.name;
        this.ktpNumber = '';
        this.validate();
      }
    },
    onImageCompression(id) {
      if(id === 'ktp'){
        this.loadingImage = true;
      }
      if(id === 'profile') {
        this.loadingProfileImage = true;
      }
    },
    handleUploadFail(resp) {
      this.loadingImage = false;
      this.loadingProfileImage = false;
      this.$store.dispatch('SET_ERROR_POPUP', {
        isErrorPopupVisible: true,
        errorList: resp.data.errors
      }, {root: true});
    }
  }
};
