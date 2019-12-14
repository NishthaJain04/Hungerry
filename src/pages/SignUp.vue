<template>
  <div class="login-wrapper">
    <div class="chips">
    <BliChipChoice type="radio" v-for="i in items" :key="'blichipchoice' + i.value"
    :itemValue="i.value" v-model="value">
    {{ i.label }}
  </BliChipChoice>
    </div>
    <div class="label">Registration ID</div>
    <BliField class="input" b-clearable>
    <BliInput />
    <label>Registration ID</label>
  </BliField>
   <div class="label">Organisation Mail ID</div>
    <BliField class="input" b-clearable>
    <BliInput />
    <label>Organisation Mail ID</label>
  </BliField>
  <div>
  <div class="register">
    <BliButton color="secondary" @click="registerMember()">Register</BliButton>
  </div>
  </div>
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
    <Alert
      :show-alert="isOtpCorrect"
      :hide-alert="handleAlertClose"
      alertMessage="Logged in Successfully!"
    />
  </div>
</template>
<script src="./js/sign-up.js"></script>
<style lang="scss" scoped>
  .login-wrapper {
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
    }
    .register {
      text-align: center;
    }
  }
</style>