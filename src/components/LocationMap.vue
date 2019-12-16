<template>
  <div class="map-container">
    <Loader v-if="mapsLoading || isFetchingAddress" :isFullScreen="true"></Loader>

    <div :id="this.id" :style="{ width: 'inherit', height: 'inherit' }"></div>

    <div class="map-container__go-back">
      <img class="icon-svg" src="~assets/icons/icon-left.svg" alt="Go Back" @click="goBackFromMap"/>
    </div>
    <div class="address-container">
      <span class="address-container__top-bar"></span>
      <div class="address-container__heading">
        Enter your location
      </div>
      <span class="icon-container">
        <div class="search-icon">
          <img class="icon-svg" src="~assets/icons/icon-search-1.svg" />
        </div>
        <input
          class="myInput"
          type="text"
          readonly
          @input="getAutoCompelete"
          placeholder="Choose Address"
          @click="toggleSearch"
        />
      </span>
      <div class="address-container__address-text mt-2">
        {{ address }}
      </div>
      <div class="address-container__action-button">
        <BliButton
          block
          color="secondary"
          @click="submitCurrentDetails"
          :disabled="zipCode.length === 0 || isFetching"
        >
          Select Address
        </BliButton>
      </div>
    </div>
    <Transition>
      <OverlayPopup
        :isOpen="isSearchVisible"
        :closePopup="toggleSearch"
        title="Your Location"
        closeVisible
      >
        <div>
          <span class="icon-container mt-2">
            <div class="search-icon">
              <img class="icon-svg" src="~assets/icons/icon-search-1.svg" />
            </div>
            <input
              autocomplete="off"
              ref="inputSearch"
              class="myInput"
              id="mapsearch"
              type="text"
              @input="getAutoCompelete"
              @blur="removeFocus"
              placeholder="Choose Address"
            />
          </span>
          <div class="mt-3 use-current-position" @click="getCurrentLocationGPS">
            <img
              src="~assets/icons/icon-my-location.svg"
              alt="My Location" />
            <span>Use Current Location</span>
          </div>
          <div class="mt-2 prediction-list" v-if="!noResultFound && isInput">
            <div
              class="prediction-list__item"
              v-for="item in currentPredictions"
              :key="item.id"
              @click="selectThisAddress(item)"
            >
              <span class="item-head">
                {{ item.structured_formatting.main_text }}
              </span>
              <span class="item-text">
                {{ item.structured_formatting.secondary_text }}
              </span>
            </div>
          </div>
          <div class="mt-2 not-found-result" v-if="noResultFound && isInput">
            <img src="~assets/icons/404.svg" alt="Not Found" />
            <div class="not-found-result__wording">
              <span class="main-text">Location Not Found</span>
            </div>
          </div>
        </div>
      </OverlayPopup>
    </Transition>
    <BliModal
        type="warning"
        :bli-active.sync="isGeoLocationWarningVisible"
        @maskClick="isGeoLocationWarningVisible = false"
        @close="isGeoLocationWarningVisible = false">
      <BliModalBody>{{geoLocationErrorMessage}}</BliModalBody>
    </BliModal>
  </div>
</template>
<script src="./js/location-map.js"></script>
<style lang="scss">
@import "~assets/scss/colors";

.map-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  z-index: 2;

  &__go-back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    img{
      width: 28px;
      height: 28px;
    }
  }

  .address-container{
    width: 100%;
    height: 250px;
    background-color: $color-white;
    position: absolute;
    bottom: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;

    &__top-bar {
      height: 6px;
      display: inline-block;
      background-color: $color-grey-mitra;
      width: 50px;
      border-radius: 5px;
    }

    &__heading {
      font-family: EffraMedium, sans-serif;
      padding: 10px 10px;
      text-align: left;
    }

    &__address-text{
      padding: 0 10px;
      font-size: 14px;
      overflow-y: scroll;
      height: 70px;
      color: $color-grey-dark;
      text-align: left;
    }

    &__action-button{
      padding: 10px 10px;
      border-top: 1px solid $color-grey;
    }
  }

  .locate-me {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    box-shadow: 2px 4px 8px -4px #888888;
    transition: bottom .3s ease;

    button {
      border: none;
      background-color: transparent;
      outline: none;
    }
  }
}


#myMap {
  .gm-style{
    .gmnoprint{
      display: none;
    }
    .gm-control-active {
      display: none !important;
    }
    .gm-fullscreen-control {
      display: none !important;
    }
  }
}


.map-search {
  position: absolute;
  top: 15px;
  width: 100%;
  height: auto;
  background: none;
  border-radius: 5px;
  text-align: center;
}

.myInput {
  font-size: 16px;
  resize: none;
  width: 100%;
  border: none !important;
  height: auto;
  border-radius: 5px;
  color: dimgray;
  text-overflow: ellipsis;
  padding: 0 8px;
  background-color: transparent !important;
  font-family: EffraRegular, serif;
}

.icon-container {
  background-color: $color-grey-light;
  height: 38px;
  display: inline-flex;
  border-radius: 25px;
  width: calc(100% - 32px);
  padding: 0 10px;
}

.prediction-list{
  max-height: 300px;
  overflow-y: scroll;
  text-align: left;
  padding-left: 16px;
  color: $color-blue-3;
  &__item {
    word-break: break-word;
    padding: 16px 16px 16px 0;

    .item-head{
      display: block;
      font-size: 16px;
      line-height: 21px;
    }
    .item-text {
      font-size: 14px;
      color: $color-grey-darkest;
    }
  }
}

.use-current-position {
  text-align: left;
  padding: 0 16px;
  user-select: none;
  color: $color-blue-5;
  img {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 6px;
  }
}

.use-these-locations{
  padding: 0 16px;
  text-align: left;
  font-family: EffraMedium, sans-serif;
}

.not-found-result {
  margin: 0 auto;

  img {
    display: inline-block;
    margin: 3vh 0;
  }

  &__wording{
    padding-bottom: 60px;
    max-width: 95vw;
    margin: 0 auto;

    .main-text {
      font-size: 20px;
      display: block;
      font-family: EffraMedium, 'sans-sarif', serif;
    }
    .secondary-text {
      color: $color-grey-shade-1;
    }
  }
}
.b-secondary{
    font-family: EffraMedium, sans-serif;
    background-color: $color-blue-3 !important;
    border-color: $color-blue-3 !important;
    }
.search-icon {
  line-height: 38px;
}

</style>
