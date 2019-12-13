<template>
  <div class="tab-wrapper blu-columns b-mobile b-gapless">
    <div
      v-for="(tab, index) in tabStatus"
      :key="tab.name"
      :class="`blu-column b-${getColSpan()} ${tab.status}`"
      class="tab-current"
      @click="selectThis(tab)"
    >
      <img
        v-if="tab.status === 'complete'"
        src="~assets/icons/icon-done.svg"
        class="tab-icon"
        alt="Tab"
      />
      <span v-if="tab.status === 'active'" class="indicator active-tab">
        {{ index + 1 }}</span
      >
      <span v-if="tab.status === 'inactive'" class="indicator inactive-tab">
        {{ index + 1 }}</span
      >
      {{ tab.name }}
    </div>
  </div>
</template>
<script src="./js/tabs.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.tab-wrapper {
  height: 45px;
  background-color: $color-white;
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-family: EffraMedium, 'serif';

  .tab-current {
    padding-top: 10px;
    user-select: none;
    line-height: 25px;

    &.active {
      border-bottom: 2px solid $color-blue-3;
      color: $color-blue-3;
    }

    &.inactive {
      border-bottom: 1px solid $color-grey;
      color: $color-grey-dark2;
    }

    &.complete {
      border-bottom: 1px solid $color-grey;
      color: $color-green;
    }
  }

  .tab-icon {
    display: block;
    margin: 0 auto;
    width: 18px;
  }

  .indicator {
    height: 18px;
    width: 18px;
    border-radius: 15px;
    color: white;
    display: block;
    margin: 0 auto;
    line-height: 18px;

    &.active-tab {
      background-color: $color-blue-3;
    }

    &.inactive-tab {
      background-color: $color-grey-dark2;
    }
  }
}

</style>
