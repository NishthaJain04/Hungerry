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
      <BliField class="input" style="margin-top:5%;">
          <BliInput v-model="form.registrationId"/>
          <label>Registration Id</label>
      </BliField>
      <BliField class="input">
        <BliInput type="number" maxlength="10" v-model="form.mobileNumber"/>
        <label>Mobile Number</label>
      </BliField>
      <BliField class="input">
        <BliInput type="number" maxlength="10" v-model="form.alternativeNumber"/>
        <label>Alternative Number</label>
      </BliField>
      <BliField class="input">
      <BliInput type="password" v-model="form.password"/>
      <label>Password</label>
    </BliField>
    <BliField class="input">
      <BliInput type="password" v-model="form.confirmPassword"/>
      <label>Confirmation Password</label>
    </BliField>
    <BliField b-clearable class="input">
      <BliTextarea v-model="form.address"/>
      <label>Address</label>
    </BliField>
    <div v-if="form.registrationId && form.mobileNumber && form.password && form.confirmPassword && form.address" class="register">
      <BliButton color="secondary" @click="confirmation">Confirmation</BliButton>
    </div>
    <div v-else class="register">
      <BliButton color="disabled" @click="confirmation">Confirmation</BliButton>
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
}
.register {
      text-align: center;
    }

</style>
