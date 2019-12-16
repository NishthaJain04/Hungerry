<template>
  <div class="login-wrapper">
    <div class="login-wrapper__profile-header">
      App Title
    </div>
    <div class="chips">
    <BliChipChoice type="radio" v-for="i in items" :key="'blichipchoice' + i.value"
    :itemValue="i.value" v-model="value">
    {{ i.label }}
  </BliChipChoice>
    </div>
    <BliField class="input" b-clearable>
    <BliInput v-model="name"/>
    <label>Organisation Name</label>
  </BliField>
    <BliField class="input" b-clearable >
      <BliInput v-model="email"/>
      <label>Organisation Mail ID</label>
    </BliField>
  <div>
  <div v-if="name && email" class="register">
    <BliButton color="secondary" @click="registerMember()">Register</BliButton>
  </div>
  <div v-else class="register">
    <BliButton disabled  @click="registerMember()">Register</BliButton>
  </div>
  </div>
    <OverlayPopup
        :isOpen="isOtpModalVisible"
        :closePopup="() => !isOtpModalVisible"
        title="Enter Otp"
        closeVisible
      >
    <Transition effect-name="slide-right">
      <OtpModal
        v-if="isOtpModalVisible"
        :isOtpCorrect="true"
        :resendVisible="resendVisible"
        :countDownVisible="countDownVisible"
        :minuteTimer="minuteTimerString"
        :secondTimer="secondTimerString"
        :resendSuccessVisible="resendSuccessVisible"
        ref="otpModal"
        :registeredNumber="registeredNumber"
        :handleOtpEnter="verifyOtpAndSetPin"
        :handleOtpResend="generateOtp"
        class="mt-3"
      />
    </Transition>
    </OverlayPopup>
  </div>
</template>
<script src="./js/sign-up.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
  .login-wrapper {
    &__profile-header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
  }
    .chips {
      margin-top: 12px;
      text-align: center;
    }
    .label {
      padding: 16px;
    }
    .input {
      width: 90%;
      margin-left: 20px;
      margin-top: 20px;
    }
    .register {
      text-align: center;
    }
    .blu-chip {
       input:checked {
          span {
          border-color: #673ab7;
          background-color: #673ab7;
          }
       }
    }
  }
</style>