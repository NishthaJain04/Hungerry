<template>
  <div class="otp-container">
    <div class="otp-container__otp-header">
      <div class="otp-header-header"> OTP is sent to your org mail ID</div>
      <div class="otp-header-message font-grey-1">
        Please enter your received OTP here:
      </div>
    </div>
    <form class="otp-container__otp-form">
      <div
        class="otp-container__otp-div"
        v-for="(value, index) in otpValues"
        :key="index"
        :class="getClass(index)"
      >
        <input
          ref="otpInput"
          class="otp-container__otp-input"
          type="number"
          :value="otpValues[index].otpValue"
          @keyup="checkKey($event, index)"
          @input="checkValue($event, index)"
          :class="getClass(index)"
        />
      </div>
    </form>
    <div v-if="!isOtpCorrect" class="otp-container__errorMessage mb-2">
      <span class="otp-mismatch">OTP_MISMATCH</span>
    </div>
    <div v-if="resendVisible" class="otp-container__errorMessage mb-2 mt-2 font-grey-1">
      <span>{{ "OTP_NOT_RECEIVED" }}</span>
      <div class="font-blue-3" @click="resendOtp">RESEND </div>
    </div>
    <div v-if="resendSuccessVisible" class="otp-container__errorMessage mb-2 font-green">
      RESEND_SUCCESSFUL
    </div>
    <div v-if="countDownVisible && minuteTimer && secondTimer" class="otp-container__resendMessage mb-2">
      <span class="resend-clicked">RESEND_CLICKED {{ minuteTimer }}:{{ secondTimer }}</span>
    </div>
  </div>
</template>
<script src="./js/otp-modal.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.otp-container {
  &__otp-header {
    .otp-header-header {
      font-weight: bold;
      text-align: center;
    }
    .otp-header-message {
      text-align: center;
      padding: 5px;
    }
  }
  &__otp-form {
    justify-content: center;
    display: flex;
  }
  &__otp-div {
    border-radius: 8px;
    background: $color-grey-lightest-1;
    margin: 5px;
    width: 45.5px;
    height: 56px;
    &.error {
      border: 2px solid $color-red;
      -webkit-animation: mover 150ms infinite  alternate;
      animation: mover 150ms infinite  alternate;
    }
    @-webkit-keyframes mover {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
    @keyframes mover {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
  }
  &__otp-input {
    width: 100%;
    height: 100% !important;
    text-align: center;
    color: $color-blue-3;
    font-size: 25px;
    border: 2px solid $color-grey-lightest-1 !important;
    border-radius: 10px;
    &.error {
      color: $color-red;
    }
    &.error:focus {
      border: none !important;
    }
    &:focus {
      border: 2px solid $color-blue-3 !important;
    }
  }
  &__errorMessage {
    .otp-mismatch {
      display: block;
      text-align: center;
      color: $color-red;
    }
    .not-received {
      display: block;
      text-align: center;
    }
    .or, .not-received {
      color: $color-grey-shade-1;
    }
    .resend {
      color: $color-blue-5;
    }
  }
  &__resendMessage {
    margin-top: 28px;
    .resend-clicked {
      color: $color-grey-shade-1;
      font-size: 14px;
    }
  }
}
</style>
