<template>
  <div>
    <div class="address">
      <div class="address__section-head">
        {{ i18n("REGISTRATION.DO_YOU_OWN_STORE") }}
      </div>
      <div class="blu-columns b-mobile">
        <div class="blu-column b-6">
          <BliButton
            value="yes"
            block
            color="secondary"
            :outline="memberDetail.isOwnStore === 'no'"
            @click="isOwnShop"
          >
            {{ i18n("REGISTRATION.YES") }}
          </BliButton>
        </div>
        <div class="blu-column b-6">
          <BliButton
            value="no"
            block
            color="secondary"
            :outline="memberDetail.isOwnStore === 'yes'"
            @click="isOwnShop"
          >
            {{ i18n("REGISTRATION.NO") }}
          </BliButton>
        </div>
      </div>
      <div v-if="memberDetail.isOwnStore === 'no'">
        <div class="address__no-store-image">
          <img src="~assets/icons/icon-own-store.svg" alt="No Store" />
          <div class="address__no-store-image__text">{{i18n('REGISTRATION.CAN_SELL_DIGITAL')}}</div>
        </div>
      </div>
      <div
        v-if="memberDetail.isOwnStore === 'yes'"
        class="perosnal__store-type mt-3"
      >
        <DropDown
          keyName="storeType"
          :value="storeValue.value"
          :label="storeValue.name"
          :defaultLabel="i18n('REGISTRATION.CHOOSE_YOUR_STORE_TYPE')"
          :onItemClick="menuItemSelected"
          :listData="listData"
        ></DropDown>
      </div>

      <div
        v-if="memberDetail.isOwnStore === 'yes'"
        class="personal__store-pic mt-3"
      >
        <ImageUpload
          :id="'store'"
          :imagePath="storeImageUrl"
          :uploadThisItem="handleImageUpload"
          :clearSelectedImage="clearStoreImage"
          :loadingImage="loadingStoreImage"
          :onImageCompression="onImageCompression"
          :onImageLoadFailed="retryCloudImageDownload"
        ></ImageUpload>
      </div>

      <div
        class="address__djarum-member"
        v-if="memberDetail.isOwnStore === 'yes'"
      >
        <BliSwitch
          true-value="yes"
          false-value="no"
          v-model="isMemberOfDjarum"
          @input="checkValidation"
        >
          {{ i18n("REGISTRATION.I_AM_MEMBER_DJRM") }}
        </BliSwitch>
      </div>
      <div
        class="mt-2"
        v-if="memberDetail.isOwnStore === 'yes' && isMemberOfDjarum === 'yes'"
      >
        <BliField :type="isDjarumNumberValid === true ? 'dark' : 'danger'">
          <BliInput v-model="partnershipNumber" @input="checkValidation" />
          <label>{{ i18n("REGISTRATION.DJRM_MEMBERSHIP_NO") }}</label>
          <span v-if="isDjarumNumberValid === false && partnershipNumber.length > 20" class="blu-field__msg" >{{ i18n("BLI_PAY_CASHOUT.MAXIMUM_ALLOWED_CHARS", 20) }}</span>
          <span v-if="isDjarumNumberValid === false && partnershipNumber.length <= 20" class="blu-field__msg">{{i18n('BLI_PAY_CASHOUT.ONLY_ALPHABETS_NUMBERS')}}</span>
        </BliField>
      </div>

      <div
        class="address__section-head"
        v-if="memberDetail.isOwnStore === 'yes'"
      >
        {{ i18n("REGISTRATION.YOUR_BUSINESS_ADDRESS") }}
      </div>

      <div v-if="memberDetail.isOwnStore === 'yes'">
        <div
          v-if="!address"
          class="address__map-tigger mt-1"
          @click="toggleMapsVisibility"
        >
          <div class="address__map-tigger__text">
            <span class="address__map-tigger__text__blue">
              {{ i18n("REGISTRATION.SELECT_LOCATION_POINT") }}
            </span>
            <br />
            <span class="address__map-tigger__text__grey">
              {{ i18n("REGISTRATION.GIVE_YOUR_LOCATION_PERMISSION") }}
            </span>
            <img
              src="~assets/icons/icon-place.svg"
              alt="Locate Me"
              class="address__map-tigger__text__icon"
            />
          </div>
        </div>
        <div v-if="address" class="address__maps-iframe">
          <img
            :src="staticMapImageUrl"
            width="100%"
            height="100%" />
          <div class="address__maps-iframe__clear-area">
            <div class="address__maps-iframe__clear-text">
              <span @click="toggleMapsVisibility">
                {{ i18n("REGISTRATION.CLICK_HERE_TO_CHANGE_LOCATION") }}
              </span>
              <img
                src="~assets/icons/icon-cancel.svg"
                alt="Clear"
                @click="clearLocationSelection"
              />
            </div>
          </div>
        </div>
        <div class="address__location-choosen" v-if="address">
          <br />
          <span class="address__location-choosen__text">{{ address }}</span>
        </div>
        <div class="mt-4 address__text-container">
          <BliField type="dark">
            <BliTextarea v-model="addressNotes" @input="checkValidation"/>
            <label>{{ i18n("REGISTRATION.FILL_YOU_ADDRESS") }}</label>
          </BliField>
        </div>
      </div>

      <Transition effect-name="slide-left">
        <LocationMap
          v-if="showGoogleMaps"
          id="myMap"
          :onCloseRequest="toggleMapsVisibility"
          :currentPosition="currentPosition"
          :onPlaceChanged="handlePlaceChange"
          :onContinueClick="saveAddress"
        >
        </LocationMap>
      </Transition>
      <div class="mt-3 mb-5 check-me">
        <BliCheckbox :value="acceptedTnCMitra" @input="checkBoxChange"></BliCheckbox>
        <span v-if="language === 'en'" class="check-me__tnc-text">{{ i18n("REGISTRATION.TERMS_START") }} <a :href="getConfigs.registrationTncUrl" target="_blank">{{i18n("REGISTRATION.TNC_MIDDLE")}}</a> </span>
        <span v-if="language === 'id'" class="check-me__tnc-text">{{ i18n("REGISTRATION.TERMS_START") }} <a :href="getConfigs.registrationTncUrl" target="_blank">{{i18n("REGISTRATION.TNC_MIDDLE")}} {{i18n("REGISTRATION.TNC_END")}}</a> </span>
      </div>
    </div>
    <div class="address__whatsapp">
      <BliModal type="info" :bli-active.sync="showWhatsAppPopup"
                @maskClick="showWhatsAppPopup = false" @close="showWhatsAppPopup = false"
                :controls="customControls">
        <BliModalHeader>{{i18n('REGISTRATION.WHATSAPP_ENABLE_HEADER')}}</BliModalHeader>
        <BliModalBody>{{i18n('REGISTRATION.WHATSAPP_ENABLE_MSG')}}</BliModalBody>
      </BliModal>
    </div>
    <div class="mt-2 address__section-footer">
      <BliButton
              color="secondary"
              block
              :disabled="isContinueDisable"
              @click="askWhatsAppPermission"
      >
        {{ i18n("REGISTRATION.DONE") }}
      </BliButton>
    </div>
    <OverlayPopup :isOpen="showTncModal" :closePopup="toggleTncModal" closeVisible :title="i18n('REGISTRATION.TNC_MIDDLE')">
      <div class="address__terms" v-html="getRegistrationTerms">
      </div>
    </OverlayPopup>
  </div>
</template>
<script src="./js/address.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.address{
  padding: 16px 16px 80px 16px;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
  height: calc(100vh - 115px);

  .blu-btn {
    font-family: EffraMedium, sans-serif;
  }

  &__section-head {
    padding: 10px 0;
    font-family: EffraMedium, sans-serif;
  }

  &__djarum-member {
    padding: 16px 0;
  }

  &__no-store-image {
    padding: 2rem 0;
    text-align: center;

    img {
      margin: 0 auto;
      width: 65%;
    }

    &__text {
      color: $color-grey-shade-1;
      margin-top: 10px;
    }
  }

  &__map-tigger {
    border: 1px solid $color-grey;
    padding: 1.2rem;
    border-radius: 8px;

    &__text {
      position: relative;

      &__blue {
        color: $color-blue-3;
      }

      &__grey {
        color: $color-grey-shade;
        font-size: 14px;
      }

      &__icon {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }

  &__location-choosen{
    padding: 16px 0;

    &__head {
      font-family: EffraMedium, sans-serif;
    }

    &__text {
      font-size: 14px;
      color: $color-grey-shade;
    }
  }

  &__section-footer{
    padding: 16px;
    border-top: 1px solid $color-grey;
    position: absolute;
    bottom: 0;
    background-color: $color-white;
    width: 100%;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }

  &__text-container {
    .blu-field {
      margin-bottom: 0;
    }
  }

  &__maps-iframe {
    height: 100px;
    width: 100%;
    border: 1px solid $color-grey;
    position: relative;
    border-radius: 8px;

    img {
      object-fit: cover;
      border-radius: inherit;
    }

    &__clear-area{
      position: absolute;
      width: 100%;
      height: 24px;
      background-color: black;
      bottom: 0;
      opacity: 0.5;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    &__clear-text {
      color: white;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 7px;

      span {
        font-size: 12px;
      }

      img {
        float: right;
      }
    }
  }
  .check-me{
    display: inline-flex;
    color: $color-grey-shade-1;
    &__tnc-text{
      margin-left: 10px;
    }
  }

  &__whatsapp {
    .blu-modal.b-dialog .blu-modal__body {
      color: $color-grey-shade;
      font-size: 14px;
    }
  }

  &__terms {
    padding: 16px;
  }
}

</style>
