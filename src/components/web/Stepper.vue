<template>
  <div class="stepper-wrapper">
    <div
      v-for="el in itemOrderStatus"
      :key="el.label"
      class="steps"
      :class="!orderStatus.includes(el.key)? 'incomplete-step' :
      ((orderStatus[orderStatus.length -1]).includes(el.key) ? 'active-step' : 'completed-step')"
    >
      {{ el.label }}
    </div>
  </div>
</template>
<script src="./js/stepper.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.stepper-wrapper {
  width: 100%;
  display: flex;
  position: relative;

  .steps {
    width: calc(100% / 4);
    text-align: center;
    font-size: 12px;
    line-height: 25px;
    background-color: $color-green-light;
    position: relative;
    color: $color-white;
    &:before {
      content: "";
      display: block;
      height: 100%;
      width: 10px;
      z-index: 0;
      clip-path: polygon(0% 0, 96% 50%, 0% 100%, 0% 100%, 0% 50%, 0% 0%);
      background-color: darken($color-green, 20%);
      position: absolute;
      top: 0;
      left: 1%;
    }

    &:after {
      content: "";
      display: block;
      height: 100%;
      width: 10px;
      z-index: 1;
      clip-path: polygon(5% 0%, 100% 50%, 5% 100%, 0% 100%, 0% 50%, 0% 0%);
      background-color: $color-green-light;
      position: absolute;
      top: 0;
      left: 99.5%;
    }

    &.completed-step {
      background-color: $color-green-light;

      &:before {
        background-color: $color-green;
      }

      &:after {
        background-color: $color-green-light;
      }
    }

    &.active-step {
      background-color: $color-green;

      &:before {
        background-color: $color-grey-light;
        display: none;
      }

      &:after {
        background-color: $color-green;
      }
    }

    &.incomplete-step {
      background-color: $color-grey-lightest-1;

      &:before {
        background-color: $color-green;
        display: none;
      }

      &:after {
        background-color: $color-green;
        display: none;
      }
    }


    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;

      &:before {
        display: none;
      }
    }

    &:last-of-type {
      clip-path: polygon(93% 0, 100% 50%, 93% 100%, 0% 100%, 0% 50%, 0% 0%);
    }
  }
}

</style>
