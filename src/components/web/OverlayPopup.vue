<template>
  <Transition effect-name="slide-up">
    <Overlay v-if="isOpen" :closeOverlay="overlayClicked">
      <div class="modal-popup" ref="modal">
        <span class="modal-popup__top-bar"></span>
        <div
          v-if="title.length || closeVisible"
          class="modal-popup__action-bar"
        >
          <span>{{ title }}</span>
          <img
            @click="closePopup"
            src="~assets/icons/icon-close.svg"
            alt="Close" />
        </div>
        <slot />
      </div>
    </Overlay>
  </Transition>
</template>
<script src="./js/overlay-popup.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.modal-popup {
  width: 100%;
  min-height: 270px;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: $color-white;
  text-align: center;
  max-height: 90vh;
  overflow: auto;

  &__top-bar {
    height: 6px;
    display: inline-block;
    background-color: $color-grey-mitra;
    width: 50px;
    border-radius: 5px;
  }

  &__action-bar{
    height: 20px;
    line-height: 20px;
    padding: 0 16px;
    margin-bottom: 5px;

    span {
      float: left;
      font-family: EffraMedium, sans-serif;
      font-size: 16px;
    }
    img {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      float: right;
    }
  }
}

</style>
