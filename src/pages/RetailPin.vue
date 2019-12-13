<template>
  <div class="retail--pin">
    <Transition effect-name="slide-up">  
        <PinModal
          :desiredPin="userPin"
          :handlePinEnter="handlePinEnter"
          :handlePinClose="handleClosePin"
          :pinHeader="i18n('ENTER_PIN')"
          :message="i18n('INCORRECT_PIN')"
          :isError="isError"
          :disableInput="disableInput"
        ></PinModal>
    </Transition>
    <BliModal
        type="info"
        :bli-active="isGoBackOrRefresh"
        @close="isGoBackOrRefresh = false"
        :controls="customControlsGoBack"
    >
      <BliModalHeader>
        {{ i18n("CLOSE_PIN_WARNING") }}
      </BliModalHeader>
      <BliModalBody>
        {{ i18n("CLOSE_PIN_WARNING_TEXT") }}
      </BliModalBody>
    </BliModal>
  </div>
</template>

<script src="./js/retail-pin.js" />
<style lang="scss" scoped>
.retail--pin {
  &__header {
    text-align: center;
    padding: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eaeff3;

    img {
      position: absolute;
      top: 15px;
    }
  }
}
</style>
