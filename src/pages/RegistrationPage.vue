<template>
  <div class="registration">
    <div class="registration__profile-header">
      Personal Details
      <img
        v-show="false"
        class="bell"
        src="~assets/icons/icon-bell-grey.svg"
        alt="Notification" />
    </div>
    <div class="registration__header">
      <BliField>
        <BliInput v-model="form.organisationName"/>
        <label>Organisation Name</label>
      </BliField>
      <BliField >
          <BliInput v-model="form.emailId"/>
          <label>Email Id</label>
      </BliField>
      <BliField >
          <BliInput v-model="form.registrationId"/>
          <label>Registration Id</label>
      </BliField>
      <BliField>
        <BliInput type="number" maxlength="10" v-model="form.mobileNumber"/>
        <label>Mobile Number</label>
      </BliField>
      <BliField>
        <BliInput type="number" maxlength="10" v-model="form.alternativeNumber"/>
        <label>Alternative Number</label>
      </BliField>
      <BliField>
      <BliInput type="password" v-model="form.password" />
      <label>Password</label>
    </BliField>
    <BliField>
      <BliInput type="password" v-model="form.confirmPassword" />
      <label>Confirmation Password</label>
    </BliField>
    <BliField b-clearable>
      <BliTextarea v-model="address" @click="() => showGoogleMaps = true"/>
      <label>Address</label>
    </BliField>
    <Transition effect-name="slide-left">
        <LocationMap
          v-if="showGoogleMaps"
          id="myMap"
          :onCloseRequest="toggleMapsVisibility"
          :currentPosition="address ? currentPosition : { lat: 12.9716, lng: 77.5946 }"
          :onPlaceChanged="handlePlaceChange"
          :onContinueClick="saveAddress"
        >
        </LocationMap>
      </Transition>
      <BliButton color="secondary" @click="confirmation">Confirmation</BliButton>
    </div>
    </div>
</template>
<script src="./js/registrationPage.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.registration{
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;

    img{
      left: 10px;
      position: absolute;
    }
  }
  &__profile-header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
  }
}

</style>
