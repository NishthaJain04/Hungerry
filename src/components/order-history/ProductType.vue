<template>
  <div class="product--type">
    <div class="product--type__tabs no-scrollbar" ref="tabs">
      <div
        v-for="(tab, index) in tabs"
        class="tab"
        :key="'product-type-' + index"
        :class="tab.orderStatus === activeProductType ? 'active' : ''"
        @click="switchTab(tab)"
      >
        <div class="tab__product-name">{{ tab.name }}</div>
        <div>{{tab.orderStatus}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./js/product-type.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.product--type {
  &__tabs {
    white-space: nowrap;
    overflow: auto;
    position: relative;
    border-bottom: 1px solid $color-grey-lightest-1;
    .slide {
      border: 1px solid $color-blue-3;
      height: 2px;
      width: 96px;
      position: absolute;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      bottom: 0;
      left: 0;
    }
    .tab {
      width: 50%;
      text-align: center;
      font-size: 16px;
      height: 48px;
      display: inline-block;
      padding: 0px 20px;
      div {
        transform: translate(0px, 10px);
        color: $color-grey-shade-1;
        text-align: center;
      }
      &__product-name {
        font-size: 14px;
        margin-top: 2px;
      }
    }
    .tab.active {
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
      border-bottom: 2px solid $color-blue-3;
        div {
          color: $color-blue-3;
        }
    }
  }
  .no-scrollbar::-webkit-scrollbar {
     width: 0 !important;
     display: none;
  }
  .no-scrollbar {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
}
</style>
