<template>
  <div>
  <Transition effectName="slide-up">
    <!-- v-if="navTabs.isNavigationTabVisible" -->
    <div class="navigation-tab">
      <div
        class="slider"
        :style="sliderStyle"
      ></div>
      <div class="blu-columns b-mobile b-0 b-gapless tab-row">
        <div
          v-for="v in items"
          :key="'nav-item-' + v.name"
          class="blu-column b-3"
          >
          <div
            class="single-tab"
            :class="isActive(v) ? 'active-tab' : 'inactive-tab'"
            @click="selectThisTab(v.url)"
          >
            <img
                class="icon-svg"
                :src="v.icons[isActive(v) ? 1 : 0]"
                :alt="v.alt"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
  </div>
</template>
<script src="./js/navigation-tab.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.navigation-tab{
  background-color: white;
  bottom: 0;
  left: 0;
  z-index: 1;
  position: fixed; //sticky
  width: 100%;
  text-align: center;
  color: $color-grey;
  border-top: 1px solid $color-grey-lightest-1;

  &.visible{
    display: block;
    transform: translateY(0%);
    transition: all 0.3s ease;
    height: 57px;
  }

  &.hide{
    height: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }

  .tab-row {
    padding: 10px 0;
    height: 56px;
  }

  .slider {
    height: 2px;
    width: 25%;
    background-color: $color-blue-3;
    position: absolute;
    transition: all 0.2s ease;
    top: -1px;
    left: 0;
  }

  a {
    color: transparent !important;
  }

  .single-tab {

    .blu-ripple {
      display: none !important;
      position: absolute;
      background: #4d4d4d !important;
      transition: none;
    }

    .blu-ripple-wave{
      display: none !important;
    }

    .blu-ripple-enter-active {
      display: none !important;
    }

    .blu-ripple-enter-active {}

    .blu-ripple-enter {
      background-color: red !important;
    }


    img{
      height: 20px;
      width: 20px;
    }

    .tab-text{
      line-height: 15px;
      margin-top: 3px;
    }

    div {
      font-size: 12px;
      user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
    }

    &.active-tab {
      transition: all 0.2s ease;
      color: $color-blue-3;
    }

    &.inactive-tab {
      color: $color-grey-dark4;
      transition: all 0.2s ease;
    }
  }
  &__rejectionReasonList {
    text-align: left;
  }
  &__section-footer {
    border-top: 1px solid $color-grey;
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: $color-white;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }
}

</style>
