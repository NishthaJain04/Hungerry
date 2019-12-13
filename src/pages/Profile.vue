<template>
  <div class="profile-page">
    <div class="profile-page__profile-header">
      {{ i18n("ACCOUNT") }}
      <img
        v-show="false"
        class="bell"
        src="~assets/icons/icon-bell-grey.svg"
        alt="Notification" />
    </div>

    <div class="profile-page__profile-scroller">
      <div class="profile-page__profile-detail">
      <span class="profile-name">
        {{ profile.memberDetails.firstName }}
        {{ profile.memberDetails.lastName }}
      </span>
        <img src="~assets/icons/icon-female.svg"
             class="profile-img icon-svg"
             alt="profileIcon"
             v-if="profile.memberDetails && profile.memberDetails.gender && profile.memberDetails.gender.toLowerCase() === 'female'"
        />
        <img class="profile-img icon-svg"
             src="~assets/icons/icon-male.svg"
             alt="profileIcon"
             v-if="profile.memberDetails && profile.memberDetails.gender && profile.memberDetails.gender.toLowerCase() === 'male'"
        />
        <div class="profile-number">{{ phoneNumber }}</div>
      </div>
      <div class="profile-page__verification mt-4 mb-4">
        <img class="icon-svg verification-img" src="~assets/icons/icon-face.svg" alt="img" />
        <span
                class="verification-status"
                :class="verificationStatus"
                @click="handleStatusClick"
        >
        <span v-if="isCompleteRegistrationVisible" class="verification-status incomplete">
          {{i18n('ACCOUNT_PAGE.COMPLETE_DATA')}}
        </span>
        <span v-else>
          {{ i18n(profile.memberDetails.verificationStatus) }}
        </span>
      </span>
        <span class="verification-label">{{ i18n("VERIFICATION_LABEL") }}</span>
      </div>
      <div class="profile-page__profile-type" v-if="getMembersData.memberDetails && getMembersData.memberDetails.isOwnStore">
        <div class="partner-type-label mt-1">{{ i18n("MITRA_TYPE") }}</div>
        <div class="partner-type-type mb-2">
          {{ profile.memberDetails.isOwnStore ? i18n("INDIVIDUAL") : "" }}
        </div>
      </div>
      <div class="profile-page__address" v-if="getMembersData.addressDetails && getMembersData.addressDetails.addressLine">
        <span class="address-label">{{ i18n("ADDRESS_LABEL") }}</span>
        <span class="address-text">
        {{ getMembersData.addressDetails.addressLine }}
      </span>
      </div>
      <div class="profile-page__change-pin mt-4">
        <img class="icon-svg icon-lock"
             src="~assets/icons/icon-lock.svg"
             alt="Lock" />
        <span class="pin-label" @click="handleChangePIN">{{i18n("FORGOT_PIN")}}</span>
      </div>
      <div class="profile-page__opt-whatsapp">
        <img class="icon-svg icon-whatsapp"
             src="~assets/icons/icon-green-whatsApp.svg"
             alt="WhatsApp" />
        <span class="whatsapp-label">
          {{i18n("WHATS_APP_TEXT")}}
          <BliSwitch
                  :disabled="disableSwitch()"
                  true-value="yes"
                  false-value="no"
                  v-model="isWhatsappEnabled"
                  @input="onSwitchClick"></BliSwitch>
        </span>
      </div>
      <div class="profile-page__exit-app mt-3">
        <img class="icon-svg icon-exit"
             src="~assets/icons/icon-exit.svg"
             alt="Exit" />
        <span class="exit-label" @click="logOutFromApp">{{ i18n("EXIT_APP") }}</span>
      </div>
      <div class="profile-page__lang-chooser">
        <b>{{i18n('LANGUAGE')}}</b><br/>
        <BliRadio v-model="language" value="en">English</BliRadio>
        <BliRadio v-model="language" value="id">Bahasa</BliRadio>
      </div>
    </div>

    <OverlayPopup
      :isOpen="isRejectionOverlayVisible"
      :closePopup="toggleRejectionOverlay"
      :title="i18n('HOME_PAGE.APPLICATION_REJECTION_HEADER')"
      :closeVisible="true"
    >
      <ul class="rejectionReasonList">
        <li
            v-for="(reason, index) in reasons"
            :key="'rejection-reason' + index"
            class="font-grey-1 font-16"
        >
          {{ reason }}
        </li>
      </ul>
      <div>
        <div class="mt-2 profile-page__section-footer">
          <router-link to="/registration">
            <BliButton color="secondary" block>
              {{ i18n("ACCOUNT_PAGE.RE_REGISTER") }}
            </BliButton>
          </router-link>
        </div>
      </div>
    </OverlayPopup>
    <PopupMessage
       :isPopupVisible="isOverlayOpen"
       :isCloseIconVisible="false"
       popupTitle=""
       :popupHeading='i18n("VERIFICATION_HEADER")'
       :popupText='i18n("VERIFICATION_MSG")'
       :popupButtonText='i18n("BROWSE")'
       :popupCrossBtnClick="handleBrowse"
       :popupButtonClickHandler="handleBrowse"
    >
    </PopupMessage>
    <PopupMessage
            :isPopupVisible="showIncompleteDataPopup"
            :isCloseIconVisible="true"
            :popupCrossBtnClick="togglePopup"
            popupTitle=""
            :popupHeading="i18n('HOME_PAGE.DATA_INCOMPLETE_HEADING')"
            :popupText="i18n('HOME_PAGE.DATA_INCOMPLETE_MSG_TEXT')"
            :popupButtonText="i18n('HOME_PAGE.DATA_INCOMPLETE_BTN_TEXT')"
            :popupButtonClickHandler="handleIncompleteDataPopup"
    ></PopupMessage>
    <div class="profile-page__whatsapp">
      <BliModal type="info" :bli-active.sync="showWhatsAppPopup"
                @maskClick="closeModalPopup" @close="closeModalPopup"
                :controls="customControls">
        <BliModalHeader>{{i18n('REGISTRATION.WHATSAPP_ENABLE_HEADER')}}</BliModalHeader>
        <BliModalBody>{{i18n('REGISTRATION.WHATSAPP_ENABLE_MSG')}}</BliModalBody>
      </BliModal>
    </div>
  </div>
</template>

<script src="./js/profile.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.profile-page {
  background-color: $color-white;
  &__profile-header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
    .bell {
      float: right;
      position: relative;
      right: 14px;
    }
  }
  &__profile-scroller {
    overflow-y: scroll;
    height: calc(100vh - 110px);
  }
  &__profile-detail {
    padding: 10px 16px;
    min-height: 60px;
    border-bottom: 1px solid $color-grey;
    .profile-name {
      position: relative;
    }
    .profile-img {
      position: relative;
      float: right;
      width: 34px;
    }
    .profile-number {
      font-size: 13px;
      color: $color-grey-dark;
    }
  }
  &__verification {
    padding: 0 16px;

    .verification-img {
      vertical-align: sub;
      position: relative;
    }
    .verification-label {
      position: relative;
      left: 5px;
    }
    .verification-status {
      float: right;
      position: relative;
      line-height: 1.5;
      font-family: EffraMedium, sans-serif;
      &.verified {
        color: $color-green;
      }
      &.incomplete, &.rejected {
        color: $color-orange;
      }
      &.processing {
        color: $color-blue-3;
      }
    }
  }
  &__profile-type {
    padding: 0 16px;
    .partner-type-label {
      color: $color-grey-shade-1;
      font-family: EffraMedium, serif;
      font-size: 14px;
    }
    .partner-type-type {
      font-size: 16px;
    }
  }
  &__address {
    padding: 0 16px;
    .address-label {
      color: $color-grey-shade-1;
      font-family: EffraMedium, serif;
      font-size: 14px;
    }
    .address-text {
      display: block;
      font-size: 14px;
      color: $color-grey-shade;
    }
  }
  &__change-pin {
    border-top: 1px solid $color-grey;
    padding: 16px;

    .icon-lock {
      position: relative;
      vertical-align: sub;
      width: 16px;
    }
    .pin-label {
      position: relative;
      left: 10px;
    }
  }
  &__exit-app {
    padding: 0 16px;

    .icon-exit {
      position: relative;
      vertical-align: sub;
    }
    .exit-label {
      position: relative;
      left: 10px;
    }
  }
  &__opt-whatsapp {
    padding: 0 13px;

    .icon-whatsapp {
      position: relative;
      vertical-align: bottom;
      width: 23px;
    }
    .whatsapp-label {
      position: relative;
      left: 1px;
      margin-top: 4px;

      .switch {
        float: right;
        margin-top: -6px;
      }
    }

  }
  .rejectionReasonList {
    text-align: left;
  }
  &__section-footer {
    border-top: 1px solid $color-grey;
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: $color-white;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }
  &__lang-chooser {
    padding: 16px;

    .blu-radio {
      margin: 5px 16px 0 0;
    }
  }
  &__whatsapp {
    .blu-modal.b-dialog .blu-modal__body {
      color: $color-grey-shade;
      font-size: 14px;
    }
  }
}

</style>
