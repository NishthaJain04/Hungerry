<template>
  <div class="forgot-pin">
    <OverlayPopup
      :is-open="isKtpOverlayOpen"
      :close-popup="toggleKtpOverlayPopup"
      :closeVisible="true"
    >
      <div class="forgot-pin__ktp-header mt-3">
        {{ i18n("INPUT_KTP_HEADER") }}
      </div>
      <div class="forgot-pin__input-header mt-2">
        <BliField type="dark">
          <BliInput type="number" v-model="ktpNumber" />
          <label>{{ i18n("INPUT_KTP") }}</label>
        </BliField>
      </div>
      <BliButton v-if="!(ktpNumber.length === 16)" disabled class="continue-button mt-2">{{
        i18n("REGISTRATION.CONTINUE")
      }}</BliButton>
      <BliButton
        v-if="ktpNumber.length === 16"
        color="secondary"
        @click="checkForCorrectKtp"
        class="continue-button mt-2"
        >{{ i18n("REGISTRATION.CONTINUE") }}</BliButton
      >
    </OverlayPopup>
    <Transition effect-name="slide-up">
      <PinModal
        v-if="changePinEnable"
        :forgotPinVisible="false"
        :isError="false"
        :pinHeader="i18n('ENTER_NEW_PIN')"
        :handlePinEnter="handlePinEnter"
        :handlePinClose="exitPinModal"
      />
    </Transition>
    <div>
      <Transition effect-name="slide-left">
        <PinModal
          v-if="confirmPinEnable"
          :forgotPinVisible="false"
          :message="i18n('INCORRECT_PIN')"
          :pinHeader="i18n('CONFIRM_PIN')"
          :handlePinEnter="handleConfirmPinEnter"
          :handlePinClose="exitConfirmPinModal"
          :isError="isError"
          :disableInput="disableInput"
        />
      </Transition>
    </div>
    <OverlayPopup
      :is-open="isOtpOverlayOpen"
    >
      <OtpModal
        :isOtpCorrect="isOtpCorrect"
        :resendVisible="resendVisible"
        :countDownVisible="countDownVisible"
        :minuteTimer="minuteTimerString"
        :secondTimer="secondTimerString"
        :resendSuccessVisible="resendSuccessVisible"
        ref="otpModal"
        :message="i18n('INCORRECT_PIN')"
        :registeredNumber="registeredNumber"
        :handleOtpEnter="verifyOtpAndSetPin"
        :handleOtpResend="generateOtp"
        class="mt-3"
      />
    </OverlayPopup>
    <Alert
      :show-alert="isPinChangeSuccess"
      :hide-alert="handleAlertClose"
      :alertMessage="i18n('PIN_CHANGE_SUCCESS')"
    />
    <div>
      <BliModal
        type="danger"
        :bli-active.sync="visibleModal"
        @maskClick="visibleModal = false"
        @close="visibleModal = false"
        :controls="customControls"
      >
        <BliModalHeader>{{ i18n("KTP_NOT_FOUND") }}</BliModalHeader>
        <BliModalBody>{{ i18n("NOT_FOUND_MSG") }}</BliModalBody>
      </BliModal>
    </div>
  </div>
</template>
<script src="./js/forgot-pin.js"></script>
<style lang="scss" scoped>
.forgot-pin {
  &__input-header {
    padding: 0px 15px;
  }
  &__ktp-header {
    text-align: left;
    padding-left: 15px;
    font-weight: bold;
  }
  .continue-button {
    width: 93%;
  }

  .modal-popup {
    min-height: 216px;
  }
}
</style>
