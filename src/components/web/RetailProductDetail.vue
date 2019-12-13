<template>
    <div class="retail-product-detail">
     <div v-if="orderItem.etdMax!=0" class="estimated-time label"> {{ i18n("ESTIMATED_TIME") }}
     </div>
    <div v-if="orderItem.etdMax!=0" class="estimated-time value"> {{ orderItem.etdMax | date }} </div>
    <Stepper v-if="!(selectedOrderStatus === 'CANCELED_ORDER')" :orderStatus="orderItem.shippingStatuses" class="mt-2 stepper" />
    <div class="order-list-item">
     <div class="blu-columns b-mobile b-0 b-gapless">
            <div class="blu-column b-3">
              <div class="img-container">
                <img
                  :src="orderItem.imageUrl"
                  class="item-image"
                  alt="Item Image"
                  @error="imageLoadError"
                />
              </div>
            </div>
            <div class="blu-column b-9 detail-list">
              <div class="item-name">{{ orderItem.name }}</div>
              <div
                class="item-current-price"
                :class="orderItem.offerPrice !== 0 ? 'green' : 'black'"
              >
                {{ orderItem.offerPrice | currency }}
              </div>
<!--              <div class="item-old-price">-->
<!--                <span v-if="orderItem.listPrice !== 0" style="text-decoration: line-through;">{{ orderItem.listPrice | currency }} </span>-->
<!--              </div>-->
              <div class="weight-label">{{ i18n("DIGITAL.CART.TOTAL") }}: {{ orderItem.total | currency }}</div>
              <div class="weight-label-quantity">{{ i18n("QUANTITY") }}: {{orderItem.quantity}} {{orderItem.quantity > 1 ? 'pcs' : 'pc'}}</div>
            <BliButton color="secondary" class="track-item" :disabled="!orderItem.trackable" @click="goToOrderTracking(orderItem.orderItemId)">{{ i18n("ITEM_TRACK") }}</BliButton>
            </div>
          </div>
          </div>
          <OverlayPopup
          :isOpen="isOrderTrackingVisible"
          :closePopup="toggleOrderTracking"
          :title="i18n('ORDER_STATUS')"
          closeVisible>
          <div v-if="isFetchingShipping" class="loader">
            <Loader />
          </div>
          <ShippingTracker v-if="getShippingStatusList" :shipping="getShippingStatus.manifestList"/>
          <div class="mt-2 not-found-result" v-if="!getShippingStatusList && !isFetchingShipping">
          <img class="not-found-image" src="~assets/icons/notification-empty.svg" alt="Not Found" />
          <div class="not-found-result__wording">
            <span class="main-text font-grey">{{i18n('NOT_FOUND')}}</span>
          </div>
          </div>
          </OverlayPopup>
    </div>
</template>
<script src="./js/retail-product-detail.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.retail-product-detail {
    .estimated-time {
        font-size: 14px;
        font-family: Effra, sans-serif;
        color: $color-grey-shade-1;
        &.label {
        display: inline-block;
        padding-left: 10px;
        }
        &.value {
        display: inline-block;
        float: right;
        padding-right: 12px;
    }
    }
    .stepper {
    padding-left: 10px;
    padding-right: 12px;
    }
    .order-list-item {
      border-bottom: 1px solid $color-grey;
      padding: 5px 10px 10px 10px;
    }
    .img-container {
      height: 70px;
      margin-top: 15px;
      width: 70px;
      transform: translate(7px, 0px);
    }
    .item-image {
      width: 100%;
      height: 100%;
    }
    .detail-list {
      margin-left: 5px;
      position: relative;
    }
    .item-name {
      margin-top: 10px;
      color: $color-grey-shade-3;
      font-size: 16px;
    }
    .item-current-price {
      font-family: EffraMedium, serif;
      font-size: 16px;
      display: inline-block;
      &.green {
        color: $color-green;
      }
      &.black {
        color: $color-black;
      }
    }
    .item-old-price {
      font-size: 12px;
      color: $color-grey-shade-1;
    }
    .item-discount {
      background: $color-red-2;
      border-radius: 24px;
      color: $color-white;
      margin-left: 5px;
      padding: 0 10px;
      font-family: EffraMedium, sans-serif;
    }
    .weight-label {
      font-size: 12px;
      color: $color-grey-shade-1;
      display: block;
    }
    .weight-label-quantity{
       font-size: 14px;
       color: $color-grey-shade-1;
       display: block;
    }
    .track-item {
        height: 32px;
        position: absolute;
        right: 15px;
        bottom: 12px;
        width: 115px;
        font-size: 14px;
    }
    .loader {
      position: fixed;
      top: 75%;
      left: 50%;
  }
  .not-found-image {
    max-width: 60%;
    margin: 0 auto;
    display: block;
    margin-bottom: 1rem;
    }
  }
</style>
