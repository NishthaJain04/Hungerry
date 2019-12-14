import Loader from '@/components/web/Loader'
// import imageCompression from 'browser-image-compression';
// import {getI18nText} from '@/utils/helpers'
// import i18n from '@/i18n/lang'

export default {
  name: 'ImageUpload',
  props: {
    imagePath: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'picture'
    },
    uploadThisItem: {
      type: Function
    },
    clearSelectedImage: {
      type: Function,
      default: () => {}
    },
    loadingImage: {
      type: Boolean,
      default: false
    },
    onImageCompression: {
      type: Function,
      default: () => {}
    },
    placeholder: {
      type: String,
      required: false,
      default: i18n('ADD_PHOTO')
    },
    onImageLoadFailed: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      capturedImage: this.imagePath || '',
      fallbackImage: '',
      errorMessages: {
        invalidType: 'Invalid image format',
        sizeLimit: 'The image size must be less than 8 MB'
      },
      isImageErrorVisible: false,
      imageErrorMessage: 'Invalid image format',
      fileValue: null
    };
  },
  components: {
    Loader
  },
  watch: {
    imagePath: function (newValue) {
      this.capturedImage = newValue
    }
  },
  methods: {
    onFileChanged(event) {
      if (event.target.files && event.target.files[0]) {
        const imageFile = event.target.files[0];
        if(this.validateImage(imageFile)) {
          console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
          this.onImageCompression(this.id);
          this.compressImage(imageFile)
        }
      }
    },
    cancelImage() {
      this.capturedImage = '';
      this.clearSelectedImage({}, this.id);
    },
    handleImageLoadErr() {
      console.log('-----handleImageLoadErr');
      this.capturedImage = this.fallbackImage;
      if(this.onImageLoadFailed) {
        this.onImageLoadFailed()
      }
    },
    async compressImage (imageFile) {
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: undefined,
        useWebWorker: false,
        maxIteration: 15
      };

      const T1 = performance.now();
      console.log('T1:', T1);

      const compressedFile = await imageCompression(imageFile, options);
      const file = new File([compressedFile], imageFile.name, {type: imageFile.type, lastModified: Date.now()});

      const T2 = performance.now();
      console.log('T2:', T2);

      console.log(`compressedFile size ${file.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      console.log('Time to Compress Image ' + (T2 - T1)/1000 + ' seconds.');

      let self = this;
      this.blobToDataURL(compressedFile, function(dataurl){
        self.fallbackImage = dataurl;
        self.capturedImage = dataurl
      });
      this.uploadThisItem(file, this.id);
    },
    handleClickOnChangePic() {
      this.fileValue = null;
      const element = document.getElementById(`${this.id}`);
      if(element) {
        element.click();
      }
    },
    blobToDataURL(blob, callback) {
      let a = new FileReader();
      a.onload = function(e) {callback(e.target.result);};
      a.readAsDataURL(blob);
    },
    validateImage(file) {
      let isValidImage = true;
      let imageSize = file.size / 1024 / 1024;
      let extension = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length);
      console.log('[validateImage]', 'size:'+imageSize+' MB,', 'extension:'+extension);

      if(this.isFileExtensionValid(file.name)) {
        isValidImage = imageSize <= 8;
        if(!isValidImage) {
          this.isImageErrorVisible = true;
          this.imageErrorMessage = this.errorMessages.sizeLimit;
        } else {
          this.isImageErrorVisible = false;
          this.imageErrorMessage = '';
        }
      } else {
        isValidImage = false;
        this.isImageErrorVisible = true;
        this.imageErrorMessage = this.errorMessages.invalidType;
      }
      return isValidImage;
    },
    isFileExtensionValid (fileName) {
      const EXTENSION = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
      return ['jpeg', 'jpg', 'png'].includes(EXTENSION.toLowerCase())
    },
    clearInputFakeValue () {
      console.log('fileVALUE:', this.fileValue);
      this.fileValue = null;
    }
  }
};
