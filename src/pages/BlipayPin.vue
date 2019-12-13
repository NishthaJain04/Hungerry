<template>
  <div class="blipay--pin">
    <pin-modal
      :handlePinEnter="submitPin"
      :isError="pinError"
      :message="pinErrorMessage"
      :pinHeader="i18n('DIGITAL.BLIPAY.ENTER_PIN')"
      :handlePinClose="() => visibleModal = true"
      :disableInput="disableInput"
    />
    <BliModal
      type="warning"
      :bli-active="visibleModal"
      @maskClick="visibleModal = false"
      @close="visibleModal = false"
      :controls="modalControls"
    >
      <BliModalHeader>
        {{ i18n("DIGITAL.BLIPAY.EXIT_NOTIFICATION") }}
      </BliModalHeader>
      <BliModalBody>
       {{ i18n("DIGITAL.BLIPAY.EXIT_INFO") }}
      </BliModalBody>
    </BliModal>
  </div>
</template>

<script src="./js/blipay-pin.js" />
<style lang="scss" scoped>
.blipay--pin {
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
  &__content {
    margin-top: 50px;
  }
}
</style>
