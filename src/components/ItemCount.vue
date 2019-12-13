<template>
  <div class="count-wrapper"
       :class="getIsFetchingList ? 'unclickable': ''"
  >
    <button
      :class="minusDisabled ? 'disable-left' : ''"
      class="count-wrapper__count-change left"
      @click="decrementQuantity"
      :disabled="minusDisabled"
    >
      -
    </button>
    <div class="count-wrapper__count">
      <input
        type="text"
        class="count-wrapper__count-field"
        :min="minVal"
        :value="quantity"
        @input="sendQuantity"
        pattern="[0-9]*"
        onkeypress='return (event.charCode >= 48 && event.charCode <= 57)'
        inputmode="numeric"
        ref="countnumber"
      />
    </div>
    <button
      :class="plusDisabled ? 'disable-right' : ''"
      class="count-wrapper__count-change right"
      @click="incrementQuantity"
      :disabled="plusDisabled"
    >
      +
    </button>
  </div>
</template>
<script src="./js/item-count.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.count-wrapper {
    width: 90px;
    height: 32px;
    border-radius: 8px;
    border: solid 2px $color-grey-lightest-1;
    background: $color-white;
    display: flex;
    &__count {
      width: 45%;
      padding: 2px;
    }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  &__count-field {
    width: 100%;
    text-align: center !important;
    color: $color-blue-3;
    background-color: transparent;
    font-size: 19px;
    border: none;
    :focus {
      outline: none;
    }
  }
  &__count-change {
    width: 24px;
    font-size: 30px;
    line-height: 0;
    color: $color-blue-3;
    padding: 0px;
    &:focus {
      outline: none;
    }
  }
  .left {
    color: $color-grey-dark-1;
  }
  .right {
    // color: $color-white;
    // background: $color-blue-3 !important;
  }
  .disable-right {
    color: $color-grey-mitra;
  }
  &.disable-item {
    background-color: $color-grey;
    border-color: $color-grey-dark;
    pointer-events: none;
    opacity: 0.5;
    button {
      color: $color-grey-dark;
    }
    input {
      color: $color-grey-dark;
    }
  }
  .unclickable {
    pointer-events: none;
  }
}
</style>
