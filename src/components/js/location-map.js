import Loader from '@/components/web/Loader';
import Transition from '@/components/web/Transition';
import OverlayPopup from '@/components/web/OverlayPopup';
import { getI18nText } from '@/utils/helpers';
export default {
  name: 'LocationMap',
  props: {
    onCloseRequest: {
      type: Function,
      default: () => {}
    },
    onPlaceChanged: {
      type: Function,
      default: () => {}
    },
    currentPosition: {
      type: Object,
      default: { lat: 23, lng: 78 }
    },
    id: {
      type: String,
      default: ''
    },
    onContinueClick: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Transition,
    Loader,
    OverlayPopup
  },
  data() {
    return {
      marker: null,
      mapsLoading: true,
      isInput: false,
      showConfirmationBox: false,
      address: '',
      geoCoder: null,
      mapBox: null,
      latLng: null,
      completeAddress: {},
      isSearchVisible: false,
      currentPredictions: [],
      noResultFound: false,
      zipCode: '',
      place_id: '',
      postalCode: '',
      search: '',
      isFetchingAddress: false,
      isFetching: false,
      isGeoLocationWarningVisible: false,
      geoLocationErrorMessage: ''
    };
  },
  created() {
    this.onScriptLoad = this.onScriptLoad.bind(this);
  },
  destroy() {
    this.geoCoder = null;
    this.marker = null;
  },
  mounted() {
    const keyEnv = {
      dev: process.env.VUE_APP_MITRA_GOOGLE_MAPS_API_KEY,
      prod: window.VUE_APP_MITRA_GOOGLE_MAPS_API_KEY
    };
    //for local development change value to keyEnv.dev and restart dev server
    const apiKey = keyEnv.prod;
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${apiKey}&libraries=places`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', () => {
        this.onScriptLoad();
      });
      s.addEventListener('error', () => {
        console.log('loading failed...');
      });
    } else {
      this.onScriptLoad();
    }
  },
  watch: {
    currentPosition: function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.marker.setPosition(newValue);
        this.reverseGeoCode(newValue);
        this.latLng = newValue;
      }
    }
  },
  methods: {
    onScriptLoad() {
      setTimeout(() => {
        const mapOptions = {
          center: this.currentPosition,
          zoom: 10
        };
        // eslint-disable-next-line no-undef
        const map = new google.maps.Map(
          document.getElementById(this.id),
          mapOptions
        );
        window.google.maps.event.addListener(map, 'click', (event) => {
          this.reverseGeoCode(event.latLng);
          this.placeMarker(event.latLng, map)
        });
        this.mapBox = map;
        this.placeMarker(this.currentPosition, map);
      }, 300);
      this.mapsLoading = false;
    },
    placeMarker(location, map) {
      if (this.marker) {
        //if marker already was created change positon
        this.marker.setPosition(location);
      } else {
        //create a marker
        // eslint-disable-next-line no-undef
        this.marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true
        });
        this.addDragMarkerListener(this.marker)
      }
    },
    addDragMarkerListener(marker){
      window.google.maps.event.addListener(marker, 'dragend', (event) => {
        this.reverseGeoCode(event.latLng);
        this.placeMarker(event.latLng, marker)
      });
    },
    goBackFromMap() {
      this.onCloseRequest();
    },
    handlePermission() {
      const vm = this;
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000
      };
      navigator.geolocation.getCurrentPosition(
          position => {
            const coords = position.coords;
            const pos = { lat: coords.latitude, lng: coords.longitude };
            vm.onPlaceChanged(pos);
          },
          (err) => {
            console.log('err in fetching location:', err);
            vm.isGeoLocationWarningVisible = true;
            vm.geoLocationErrorMessage = err.message;
          },
          geoOptions
      );
    },
    getCurrentLocationGPS() {
      console.log('[getting current location....]');
      this.handlePermission();
    },
    reverseGeoCode(location, address, placeId) {
      this.zipCode = '';
      this.geoCoder = new window.google.maps.Geocoder();
      this.geoCoder.geocode(
        { location: location },
        (results, status) => {
          if (status === 'OK') {
            const result = results[0];
            console.log('[REVERSE GEO CODE:]', result);
            this.address = address ? address : result.formatted_address;
            this.place_id = placeId;
            if (result.geometry) {
              this.mapBox.setZoom(12);
              this.mapBox.setCenter(location);
              this.showConfirmationBox = true;
              this.isInput = true;
              this.isSearchVisible = false;
              this.placeMarker(location, this.mapBox);
              this.latLng = location;
              this.currentPosition
            }
            if (result.address_components) {
              this.setZipCodeFromComponents(result.address_components);
              this.isFetchingAddress = true
              this.isFetching = true
              this.$store.dispatch('profileStore/GET_ADDRESS_DETAILS', {
                params: {
                  postalCode: this.postalCode,
                  search: this.search
                },
                success: this.getAddressDetailsSuccess,
                fail: this.getAddressDetailsFail
              })
            }
          } else {
            console.log('[Reverse Geocode Error]', status);
          }
        }
      );
    },
    getAddressDetailsFail(error) {
      this.isFetchingAddress = false;
      this.isFetching = false;
      if(error.response.data.message === 'Read timed out') {
      this.$store.dispatch('SET_ERROR_POPUP', {
        isErrorPopupVisible: true,
        errorList: { Sorry: [getI18nText('Read timed out. Please, try again.', 'Waktu habis dibaca. Silakan coba kembali esok hari')]}
      }, {root: true});
    }
    },
    getAddressDetailsSuccess(res) {
      if(res.sources && res.sources.length) {
        this.isFetchingAddress = false
        this.isFetching = false
        // take first result if only one result
        if (res.sources.length === 1) {
          const address_details = res.sources[0]
          this.saveAddressDetails(address_details)
        } else {
          // take the result with postalCode match
          res.sources.forEach( addressField => {
          if(addressField.postalCode === this.postalCode) {
            this.saveAddressDetails(addressField)
            return false;
          }
        })
      }
      }else {
        this.completeAddress = {};
        this.isFetchingAddress = false;
        this.isFetching = false;
      }
    },
    saveAddressDetails(addressField) {
      for(var addressItem in addressField) {
        if(addressItem !== 'postalCode') {
          var item = addressField[addressItem]
          for (var address in item) {
            if (address == 'name') {
            this.completeAddress[addressItem] = item[address]
          }
        }
      }
    }
    },
    submitCurrentDetails() {
      this.onContinueClick(
        this.address,
        this.latLng,
        this.completeAddress,
        this.zipCode,
        this.place_id
      );
    },
    getAutoCompelete(e) {
      this.isInput = !!e.target.value;
      if (!e.target.value) {
        this.currentPredictions = [];
        return false;
      }
      const service = new window.google.maps.places.AutocompleteService();
      service.getPredictions(
        { input: e.target.value, componentRestrictions: { country: ['id'] } },
        (result, status) => {
          this.displaySuggestions(result, status);
        }
      );
    },
    displaySuggestions(result, status) {
      if (status === 'ZERO_RESULTS') {
        console.log('SHOW 404');
        this.noResultFound = true;
      } else {
        this.currentPredictions = result;
        this.noResultFound = false;
      }
    },
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
      this.currentPredictions = [];
      this.isInput = false;
      if (this.isSearchVisible) {
        setTimeout(() => {
          let element = this.$refs.inputSearch;
          console.log('element:', element);
          element.focus();
        }, 200);
      }
    },
    selectThisAddress(item) {
      const self = this;
      console.log('CLICKED THIS ITEM:', item);
      this.geoCoder = new window.google.maps.Geocoder();
      this.geoCoder.geocode({ placeId: item.place_id }, function(
        results,
        status
      ) {
        if (status !== 'OK') {
          console.log('Geocoder failed due to: ' + status);
          return;
        }
        console.log('GEO CODER RESULT:', results);
        self.getZipCodeFromGeoCodeResults(results);
        const place = results[0];
        this.address = place.formatted_address;
        if (place.geometry) {
          const newPosition = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          self.reverseGeoCode(newPosition, this.address, place.place_id);
          setTimeout(() => {
            self.isSearchVisible = false;
          }, 0);
        } else {
          console.log('[Map] Location Could not be retreived!');
        }
      });
    },
    removeFocus() {
      let element = this.$refs.inputSearch;
      console.log('element:', element);
      element.blur();
    },
    setZipCodeFromComponents(components) {
      var related_item = undefined;
      for (var item of components) {
        for (var _type of item.types) {
          if (_type === 'administrative_area_level_4') {
            this.search = item.long_name.split(' ').join('').toLowerCase()
          }
          if (_type === 'postal_code') {
            related_item = item;
            this.postalCode = item.long_name
            break;
          }
          if (_type === 'country') {
            this.completeAddress[_type] = item.long_name
          }
        }
        if (related_item) break;
      }
      if (related_item) {
        // some times related_item is undeinfned.
        console.log('related_item:', related_item);
        this.zipCode = related_item.long_name;
      } else {
        this.zipCode = this.postalCode;
      }
      console.log('[ZIP CODE]', this.zipCode);
    },
    getZipCodeFromGeoCodeResults(result) {
      const addressComponents = result[0]['address_components'];
      for (var item of addressComponents) {
        if(item.types.includes('postal_code')) {
          console.log('item_with_postal_code', item);
          this.zipCode = item.long_name;
          this.postalCode = item.long_name
        }
      }
    }
  }
};
