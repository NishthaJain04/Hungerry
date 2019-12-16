<template>
<div class="product-items">
  <div class="blu-columns b-mobile b-0 b-gapless">
    <div :class="`blu-column b-${colSpan1} image-list`">
        <div class="img-container">
            <img src="~assets/icons/icon-face.svg" class="item-image" alt="Item Image" />
        </div>
    </div>
    <div :class="`blu-column b-${colSpan2} detail-list`">
      <div class="item-name ellipsis">{{ item.name }}</div>
      <div
        class="item-current-price red">
        {{ item.email }}
      </div>
      <div class="item-old-price" v-if="item.foodResponse && item.foodResponse.length">Food Type:
        <span >{{ item.foodResponse[0].foodType }} </span>
      </div>
      <div class="item-old-price" v-if="item.foodResponse && item.foodResponse.length">Can serve:
        <span >{{ item.foodResponse[0].feedCount }} </span>  people
      </div>
      <div class="weight-label ellipsis">Quantity: {{ item.foodResponse[1].quantity }} kg</div>
      <div class="item-old-price"  v-if="item.foodResponse && item.foodResponse.length">Food Type:
        <span >{{ item.foodResponse[1].foodType }} </span>
      </div>
      <div class="weight-label ellipsis">Quantity: {{ item.foodResponse[1].quantity }} kg</div>
      <div class="item-old-price" v-if="item.foodResponse && item.foodResponse.length">Can serve:
        <span >{{ item.foodResponse[1].feedCount }} </span>  people
      </div>
    </div>
  </div>
</div>
</template>
<script src="./js/product-list.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.product-items {
    margin: 7px;
    border-radius: 4px;
    box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
    background-color: $color-white;

    .image-list {
      padding-left: 5px !important;
    }
    .detail-list {
      text-align: left;
      position: relative;
      padding-left: 5px !important;

      .label {
        width: 36px;
        height: 16px;
        font-size: 12px;
        letter-spacing: normal;
        text-align: center;
        padding: 0 5px;
        background: $color-red-2;
        font-family: EffraMedium, sans-serif;
        margin-left: 8px;
      }
    }
    .img-container {
      transform: translate(0px, 25px);
      height: 40px;
      width: 40px;
      display: inline-block;
    }
    .item-image {
      width: 100%;
      height: 100%;
      display: block;
    }
    .item-name {
      margin-top: 5px;
    }
    .item-current-price {
      font-size: 14px;
      font-family: EffraMedium, sans-serif;
      display: inline-block;
      &.black {
        color: $color-black-1;
      }
      &.red {
        color: $color-red-1;
      }
    }
    .item-old-price {
      font-size: 10px;
      color: $color-grey-shade-1;
    }
    .weight-label {
      width: 32%;
      font-size: 12px;
      overflow-wrap: break-word;
      color: $color-grey-shade-1;
    }
    .add-item {
        height: 32px;
        max-width: 90px;
        font-size: 14px;
        position: absolute;
        right: 8px;
        bottom: 8px;
        font-family: EffraMedium, sans-serif;
        letter-spacing: normal;
    }
    .item-count-wrapper {
      position: absolute;
      right: 8px;
      bottom: 8px;
    }
    #toast {
    visibility: hidden;
    position: fixed;
    z-index: 1;
    left: 0;right:0;
    bottom: 125px;
    font-size: 14px;
    white-space: nowrap;
    color: $color-white;
    background: $color-black-1;
    width: 92%;
    height: 37px;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 0px 15px;
    line-height: 16px;
    &.show {
      visibility: visible;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }
    @keyframes fadein {
      from {opacity: 0;}
      to {opacity: 1;}
    }

    @keyframes fadeout {
      from {opacity: 1;}
      to {opacity: 0;}
    }
  }
}
</style>
