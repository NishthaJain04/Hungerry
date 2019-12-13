import Transition from '@/components/web/Transition'
import LocationMap from '@/components/LocationMap'
import DropDown from '@/components/web/DropDown'
import ImageUpload from '@/components/web/ImageUpload'
import OverlayPopup from '@/components/web/OverlayPopup'
import { mapGetters } from 'vuex';
import {getMemberID, getI18nText} from '@/utils/helpers'
import lang from '@/utils/language';

export default {
  name: 'Address',
  props: {},
  components: {
    Transition,
    LocationMap,
    DropDown,
    ImageUpload,
    OverlayPopup
  },
  data() {
    return {
      showGoogleMaps: false,
      currentPosition: { lat: -6.2087634, lng: 106.84559899999999 },
      address: '',
      addressNotes: '',
      completeAddress: {},
      isContinueDisable: false,
      isMemberOfDjarum: 'no',
      partnershipNumber: '',
      zipCode: '',
      listData: [],
      memberDetail: {
        isOwnStore: 'no',
        storeImage: ''
      },
      storeValue: {
        name: '',
        value: ''
      },
      acceptedTnCMitra: true,
      loadingStoreImage: false,
      showWhatsAppPermissionModal: false,
      storeImageUploaded: false,
      storeImageUrl: '',
      showWhatsAppPopup: false,
      customControls: [{
        label: getI18nText('No', 'Tidak'),
        handler: ()=> this.handleModalPopup('no')
      }, {
        label: getI18nText('Yes', 'Ya'),
        handler: ()=> this.handleModalPopup('yes')
      }],
      enableWhatsApp: false,
      language: lang.getUserLanguage(),
      showTncModal: false,
      isDjarumNumberValid: '',
      place_id: '',
      city: '',
      district: '',
      subDistrict: '',
      province: ''
    };
  },
  created() {
    this.$store.dispatch('profileStore/GET_STORE_TYPE', { success: this.fetchedStoreType });
    this.$store.dispatch('profileStore/GET_MEMBER_IN_PROGRESS', {
      pathVariables: { memberId: getMemberID() },
      success: this.fetchedMemberInProgress
    });
  },
  computed: {
    staticMapImageUrl: function() {
      const keyEnv = {
        dev: process.env.VUE_APP_MITRA_GOOGLE_MAPS_API_KEY,
        prod: window.VUE_APP_MITRA_GOOGLE_MAPS_API_KEY
      };
      //for local development change value to keyEnv.dev and restart dev server
      const apiKEY = keyEnv.prod;
      const lat = this.currentPosition.lat;
      const lng = this.currentPosition.lng;
      return `https://maps.googleapis.com/maps/api/staticmap?center=${
        lat
      },${
        lng
      }&zoom=13&size=400x400&markers=color:blue%7Clabel:%7C${
        lat
      },${
        lng
      }&key=${apiKEY}`;
    },
    ...mapGetters('profileStore', ['getMembersData']),
    ...mapGetters('homepageStore', ['getRegistrationTerms', 'getConfigs'])
  },
  methods: {
    toggleMapsVisibility() {
      this.showGoogleMaps = !this.showGoogleMaps;
    },
    handlePlaceChange(newPosition) {
      this.currentPosition = this.convertPosition(newPosition)
    },
    saveAddress(address, position, completeAddress, zipCode, place_id) {
      this.showGoogleMaps = !this.showGoogleMaps;
      this.address = address;
      this.completeAddress = completeAddress;
      this.addressNotes = address;
      this.zipCode = zipCode;
      this.place_id = place_id;
      Object.assign(this.currentPosition, this.convertPosition(position));
      this.checkValidation();
    },
    submitAddressDetails() {
      const storeDetail = {
        registrationStep: 'store_details',
        storeDetails: {
          isDjarumPartner: this.memberDetail.isOwnStore === 'yes' ? this.isMemberOfDjarum === 'yes': false,
          isOwnStore: this.memberDetail.isOwnStore === 'yes',
          partnerNumber: this.memberDetail.isOwnStore === 'yes' ? this.partnershipNumber.trim() : '',
          storeTypeId: this.memberDetail.isOwnStore === 'yes' ? this.storeValue.value: ''
        },
        addressDetails: {
          addressLine: this.memberDetail.isOwnStore === 'yes' ? this.address: '',
          addressNote: this.memberDetail.isOwnStore === 'yes' ? this.addressNotes: '',
          latitude: this.memberDetail.isOwnStore === 'yes' ? this.currentPosition.lat: '',
          longitude: this.memberDetail.isOwnStore === 'yes' ? this.currentPosition.lng: '',
          zipCode: this.memberDetail.isOwnStore === 'yes' ? this.zipCode: '',
          placeId: this.memberDetail.isOwnStore === 'yes' ? this.place_id: '',
          city: this.memberDetail.isOwnStore === 'yes' ? this.completeAddress.city: '',
          district: this.memberDetail.isOwnStore === 'yes' ? this.completeAddress.district: '',
          subDistrict: this.memberDetail.isOwnStore === 'yes' ? this.completeAddress.subDistrict: '',
          province: this.memberDetail.isOwnStore === 'yes' ? this.completeAddress.province: '',
          country: this.memberDetail.isOwnStore === 'yes' ? this.completeAddress.country: '',
        }
      };
      console.log('[submitAddressDetails]', storeDetail);

      this.$store.dispatch('profileStore/SAVE_MEMBER_DETAIL', {
        payload: storeDetail,
        success: this.detailSaved,
        pathVariables: { memberId: getMemberID() }
      });
    },
    clearLocationSelection() {
      console.log('[clearLocationSelection]');
      this.address = '';
      this.addressNotes = '';
      this.zipCode = '';
      this.completeAddress = {};
      this.place_id = '';
      this.checkValidation();
    },
    detailSaved(res) {
      console.log('[address detailSaved]', res);
      this.$store.dispatch('profileStore/SUBSCRIBE_WHATSAPP', {
        payload: { whatsAppEnabled: this.enableWhatsApp },
        pathVariables: { memberId: getMemberID() },
        success: this.detailSavedAndSubscribeWhatsAppSuccess
      });
    },
    detailSavedAndSubscribeWhatsAppSuccess(res) {
      console.log('****[success]:', res);
      this.$router.push('/home');
    },
    isOwnShop(e) {
      Object.assign(this.memberDetail, { isOwnStore: e.target.value });
      this.checkValidation();
    },
    fetchedStoreType(stores) {
      console.log('STORE TYPES:', stores);
      this.listData = stores.map(el => {
        return { name: el.type, value: el.id };
      });
    },
    menuItemSelected(keyName, data) {
      console.log('KEY NAME', keyName);
      console.log('DATA', data);
      this.storeValue.value = data.value;
      this.storeValue.name = data.name;
      this.checkValidation();
    },
    handleImageUpload(img, type) {
      console.log('UPLOAD ME...', img, type, this.getMembersData);
      this.loadingStoreImage = true;
      if (type === 'store') {
        const vm = this;
        const parameters = {
          type: type,
          applicationId: this.getMembersData ? this.getMembersData.memberDetails.applicationId : '',
          mode: 'upload'
        };
        this.$store.dispatch('profileStore/GET_SIGNED_URL', {
          pathVariables: { memberId: getMemberID() },
          params: parameters,
          success: function (res) {
            vm.getSignedUrlSuccess(res, img)
          }
        });
      }
    },
    getSignedUrlSuccess(resp, fileObject){
      console.log('getSignedUrlSuccess', resp, fileObject);
      this.uploadToCloud(resp, fileObject)
    },
    uploadToCloud(data, file) {
      const signedUrl = data.url;
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrl, true);
      xhr.onload = () => {
        const status = xhr.status;
        if (status === 200) {
          console.log('File is uploaded');
          this.storeImageUploaded = true;
          this.loadingStoreImage = false;
          this.downloadStoreImage();
          this.checkValidation();
        } else {
          console.log('Something went wrong!');
          this.storeImageUploaded = false;
          this.loadingStoreImage = false;
          this.checkValidation();
        }
      };

      xhr.onerror = () => {
        console.log('Something went wrong');
      };
      xhr.setRequestHeader('Content-Type', 'image/jpg');
      xhr.send(file);
    },
    checkValidation() {
      console.log('[checking form validation]...');
      let isDjarumFieldValid = false;
      this.isDjarumNumberValid = true;
      if (this.memberDetail.isOwnStore === 'no') {
        this.isContinueDisable = !this.acceptedTnCMitra;
        isDjarumFieldValid = true;
        return false;
      } else {
        if(this.isMemberOfDjarum === 'yes') {
          console.log('I am a member of DRP...');
          if(this.partnershipNumber.length > 0) {
            const PATTERN = /^[A-Za-z0-9]+$/;
            isDjarumFieldValid = this.partnershipNumber.length <= 20 && PATTERN.test(this.partnershipNumber);
            this.partnershipNumber = this.partnershipNumber.toUpperCase();
            console.log('partnershipNumber', this.partnershipNumber);
            if(!isDjarumFieldValid) {
              this.isDjarumNumberValid = false
            }
          } else {
            this.isDjarumNumberValid = true;
            isDjarumFieldValid = false
          }
        } else {
          console.log('I am not member of DRP...');
          isDjarumFieldValid = true;
          this.isDjarumNumberValid = true;
          this.partnershipNumber = ''
        }
      }

      console.log('...checking overall validity');
      this.isContinueDisable = !(
          this.storeValue.name &&
          this.storeValue.value &&
          this.address &&
          this.addressNotes &&
          this.currentPosition.lat &&
          this.currentPosition.lng &&
          this.zipCode &&
          isDjarumFieldValid &&
          this.acceptedTnCMitra &&
          this.storeImageUploaded
      );
    },
    clearStoreImage(img, type) {
      console.log('[clearStoreImage]:', img, type);
      if (type === 'store') {
        this.storeImageUploaded = false;
        this.storeImageUrl = '';
        this.checkValidation()
      }
    },
    checkBoxChange(value) {
      this.acceptedTnCMitra = value;
      this.checkValidation();
    },
    fetchedMemberInProgress(member) {
      console.log('fetchedMemberInProgress', member)
    },
    askWhatsAppPermission() {
      this.showWhatsAppPopup = true;
    },
    handleModalPopup(operationType) {
      console.log('handleModalPopup[operationType]',operationType);
      this.enableWhatsApp = operationType === 'yes';
      setTimeout(()=>{
        this.showWhatsAppPopup = false;
      }, 500);
      this.submitAddressDetails()
    },
    downloadStoreImage() {
      const parameters = {
        type: 'store',
        applicationId: this.getMembersData ? this.getMembersData.memberDetails.applicationId : '',
        mode: 'download'
      };
      this.$store.dispatch('profileStore/GET_SIGNED_URL', {
        pathVariables: { memberId: getMemberID() },
        params: parameters,
        success: this.storeImageDownloaded
      });
    },
    storeImageDownloaded (res) {
      console.log('storeImageDownloaded', res);
      this.storeImageUrl = res.url;
      this.loadingStoreImage = false;
    },
    toggleTncModal() {
      this.showTncModal = !this.showTncModal;
    },
    convertPosition(position) {
      return {
        lat: typeof position.lat === 'number' ? position.lat : position.lat(),
        lng: typeof position.lng === 'number' ? position.lng : position.lng()
      }
    },
    onImageCompression(id) {
      if(id === 'store'){
        this.loadingStoreImage = true;
      }
    },
    retryCloudImageDownload(){
      console.log('retrying cloud image download...');
      this.loadingStoreImage = true;
      this.downloadStoreImage();
    }
  }
};

