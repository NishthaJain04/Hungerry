<template>
  <div class="pin-container">
    <div class="pin-container__pin-header">
      <img
        class="pin-header-img"
        src="~assets/icons/icon-cross.svg"
        alt="cross"
        @click="closePinModal"
      />
      <span class="pin-header-header">{{ pinHeader }}</span>
    </div>
    <div v-if="settingPin" class="pin-container__description">
      <img
        class="description-img"
        src="~assets/icons/icon-pin.svg"
        alt="pin" />
      <div class="description-header">{{ pinDescriptionHeader }}</div>
      <div class="description-message">{{ i18n("PIN_MSG") }}</div>
    </div>
    <form class="pin-container__pin-form mt-4">
      <div
        class="pin-container__pin-div"
        v-for="(value, index) in pinValues"
        :key="index"
        :class="getClass(index)"
      >
        <input
          ref="pinInput"
          class="pin-container__pin-input"
          type="number"
          :value="pinValues[index].pinValue"
          @keyup="checkKey($event, index)"
          @input="checkValue($event, index)"
          :class="getClass(index)"
          :readOnly="disableInput"
        />
      </div>
    </form>
    <span v-if="isErrorState" class="pin-container__errorMessage mt-4">{{
      message
    }}</span>
    <div
      v-if="handleForgotPinVisible"
      class="forgot-pin"
      @click="goToForgotPin"
    >
      {{ i18n("FORGOT_PIN") }}?
    </div>
  </div>
</template>
<script src="./js/pin-modal.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.pin-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: $color-white;
  z-index: 2;
  &__pin-header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;
    border-bottom: 1px solid $color-grey-lightest-1;
    .pin-header-img {
      position: absolute;
      left: 10px;
    }
  }
  &__description {
    .description-img {
      transform: translate(75%, 15px);
    }
    .description-header {
      text-align: center;
      font-weight: bold;
      margin-top: 5rem;
    }
    .description-message {
      width: 75%;
      text-align: center;
      transform: translate(50px, 10px);
      margin-top: 5px;
      color: $color-grey-shade-1;
    }
  }
  &__pin-form {
    justify-content: center;
    display: flex;
  }
  &__pin-div {
    border: 1px solid $color-grey-lightest-1;
    border-radius: 100%;
    background: $color-grey-lightest-1;
    margin: 2px 10px;
    width: 12px;
    height: 12px;
    &.pin-enter {
      border: 1px solid $color-blue-3;
      background: $color-blue-3;
    }
    &.error {
      border: 1px solid $color-red;
      background: $color-red;
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
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  &__pin-input {
    width: 100%;
    height: 100% !important;
    border: none !important;
    border-radius: 100%;
    background: $color-grey-lightest-1;
    display: block;
    color: transparent;
    &.pin-enter {
      border: 1px solid $color-blue-3;
      background: $color-blue-3;
    }
    &.error {
      background: $color-red;
    }
  }
  &__errorMessage {
    display: block;
    text-align: center;
    color: $color-red;
  }
  .forgot-pin {
    color: $color-blue-3;
    text-align: center;
    font-family: EffraMedium, sans-serif;
    transform: translateY(350px);
  }
}
</style>
