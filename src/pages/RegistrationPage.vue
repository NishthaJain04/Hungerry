<template>
  <div class="registration">
    <div class="registration__header">
      <h2> Personal Details </h2>
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
      <BliTextarea v-model="form.address" />
      <label>Address</label>
    </BliField>
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
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;

    img{
      left: 10px;
      position: absolute;
    }
  }
}

</style>
