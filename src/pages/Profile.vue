<template>
  <div class="profile-page">
    <div class="profile-page__profile-header">
      Your Account
    </div>

    <div class="profile-page__profile-scroller">
      <div class="profile-page__profile-detail">
      <span class="profile-name">
        {{ profile.nameOfOrganisaton }}
      </span>
        <img src="~assets/icons/icon-face.svg"
             class="profile-img icon-svg"
             alt="profileIcon"
        />
        <div class="profile-number">{{ profile.mobileNumber }}</div>
        <span class="complete">
          Verified
        </span>
        <span class="font-grey">{{ profile.emailId }}</span>
      </div>
      <div class="profile-page__address">
        <span class="address-label">Type</span>
        <span class="address-text">
        {{ profile.memberType }}
      </span>
      </div>
      <div class="profile-page__address padding-16" v-if="profile && profile.address">
        <span class="address-label">Your Address</span>
        <span class="address-text">
        {{ profile.address }}
      </span>
      </div>
      <div class="profile-page__change-pin mt-4">
        <img class="icon-svg icon-lock"
             src="~assets/icons/icon-lock.svg"
             alt="Lock" />
        <span class="pin-label" @click="handleChangePIN">Forgot Password</span>
      </div>
      <div class="profile-page__exit-app mt-3">
        <img class="icon-svg icon-exit"
             src="~assets/icons/icon-exit.svg"
             alt="Exit" />
        <span class="exit-label" @click="logOutFromApp">Logout</span>
      </div>
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
      display: inline-block;
      float: left;
      margin-left: 5px;
    }
  }
  &__profile-scroller {
    overflow-y: scroll;
    height: calc(100vh - 110px);
  }
  &__profile-detail {
    padding: 10px 16px;
    min-height: 60px;
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
    .complete {
      color: $color-blue-3;
      float: right;
    }
  }
  &__address {
    padding: 4px 16px;
    border-top: 1px solid $color-grey;
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
}

</style>
