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
      <BliField class="input">
          <BliInput v-model="form.registrationId"/>
          <label>Registration Id</label>
      </BliField >
      <BliField class="input">
        <BliInput type="number" maxlength="10" v-model="form.mobileNumber"/>
        <label>Mobile Number</label>
      </BliField>
      <BliField class="input">
        <BliInput type="number" maxlength="10" v-model="form.alternativeNumber"/>
        <label>Alternative Number</label>
      </BliField >
      <BliField class="input" >
      <BliInput type="password" v-model="form.password" />
      <label>Password</label>
    </BliField>
    <BliField class="input">
      <BliInput type="password" v-model="form.confirmPassword"/>
      <label>Confirmation Password</label>
    </BliField>
    <BliField b-clearable class="input">
      <BliInput v-model="address" @click="() => showGoogleMaps = true"/>
      <label>Address</label>
    </BliField>
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
      <BliButton color="secondary" @click="confirmation">Confirmation</BliButton>
      <Alert
      :show-alert="isRegistration"
      :hide-alert="handleAlertClose"
      alertMessage="Registered Successfully!"
    />
    </div>
    </div>
</template>
<script src="./js/registration.js"></script>
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
.input {
      width: 90%;
      margin-left: 20px;
      margin-top: 20px;
    }

</style>
