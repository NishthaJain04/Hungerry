<template>
  <div class="chips-wrapper">
    <button
      v-for="item in chipData"
      :key="item.value"
      :value="item.value"
      class="chip-button"
      :class="value === item.value ? 'active' : ''"
      @click="selectItem"
    >
      {{ item.label }}
    </button>
  </div>
</template>
<script src="./js/chips.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.chips-wrapper {
  width: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: inline-flex;
  height: 34px;
  font-family: EffraMedium, sans-serif;
  &::-webkit-scrollbar {
    display: none;  // Safari and Chrome
  }

  .chip-button {
    min-width: 100px;
    background-color: $color-grey-light;
    color: $color-blue-3;
    margin-right: 10px;
    margin-bottom: 5px;
    border-radius: 22px;
    border: none;
    outline: none;
    padding: 0;

    &.active {
      background-color: $color-blue-3;
      color: $color-white;
    }
  }
}

</style>
