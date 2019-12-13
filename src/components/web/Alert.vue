<template>
  <Transition>
    <Overlay v-if="showAlert">
      <div class="alert-message">
        <div class="iconCheck">
          <img
            src="~assets/icons/icon-check.svg"
            alt="Check"
            class="icon-svg" />
        </div>
        <span>{{ alertMessage }}</span>
      </div>
    </Overlay>
  </Transition>
</template>
<script src="./js/alert.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.alert-message {
  background-color: $color-black;
  border-radius: 10px;
  text-align: center;
  width: 200px;
  height: 200px;
  padding: 20px;
  margin: calc(50vh - 100px) auto;

  span {
    color: $color-white;
    font-size: 20px;
    font-family: EffraMedium, sans-serif;
    display: inline-block;
    margin-top: 2rem;
    padding: 0.5rem;
  }
  .iconCheck {
    position: relative;
    top: 10px;
  }
}

</style>
