<template>
  <div class="order-list">
    <div class="order-list__header">
      <img src="~assets/icons/icon-left.svg" alt="Go Back" @click="goBack" />
      <span>{{ i18n("CONFIRM_ORDER") }}</span>
    </div>
    <div class="loader" v-if="getIsFetchingList && !getCheckoutCart" :isFullScreen="true">
      <Loader />
    </div>
    <div v-if="getCheckoutCart && getCheckoutCart.items && getCheckoutCart.items.length" class="order-list__list">
    <div class="order-list__address-wrapper">
      <div class="address-label">{{ i18n("ADDRESS_LABEL") }}</div>
      <div class="address-detail-header">
        {{ getCheckoutCart.addressHeader }}
      </div>
      <div v-if="getCheckoutCart.member.address" class="address-detail">{{ getCheckoutCart.member.address.streetAddress1 }}</div>
      <div class="address-extra">
        <BliField type="dark">
          <BliInput @input="saveShippingAddress" v-model="shippingAddress" />
          <label>{{ i18n("ADDRESS_NOTES") }}</label>
        </BliField>
      </div>
    </div>
    <div class="order-list__wrapper no-scrollbar">
      <span class="order-label"> {{ i18n("ORDER") }}</span>
      <div>
        <div
          class="order-list-items"
          v-for="(item, index) in getCheckoutCart.items"
          :key="index"
        >
          <div class="blu-columns b-mobile b-0 b-gapless">
            <div class="blu-column b-4" :class="checkIfUnbuyableOrOOS(item)">
              <div class="img-container">
                <BliButton v-if="visibleModal" disabled color="secondary" class="add-item">
                {{ i18n("OUT_OF_STOCK_LABEL") }}
              </BliButton>
                <img
                  :src="item.imageUrl"
                  class="item-image"
                  alt="Item Image"
                  @error="imageLoadError"
                />
              </div>
            </div>
            <div class="blu-column b-8 detail-list">
              <div v-if="!checkIfUnbuyableOrOOS(item)" class="item-name">{{ item.name }}</div>
              <div v-else>
                <span class="font-grey font-16" style="text-decoration: line-through;">{{ item.name }} </span>
              </div>
              <div
                class="item-current-price"
                :class="item.offerPrice !== item.listPrice ? 'red' : 'black'"
              >
                {{ item.offerPrice | currency }}
              </div>
              <BliLabelError v-if="item.discount !== 0"> {{ item.discount }}% </BliLabelError>
              <div v-if="item.offerPrice !== item.listPrice" class="item-old-price">
                <span style="text-decoration: line-through;">{{ item.listPrice | currency }}</span>
              </div>
              <div class="weight-label ellipsis">{{ item.shortDescription }}</div>
              <BliButton @click="deleteItemAtCheckout(item)" class="delete-label" v-if="checkIfUnbuyableOrOOS(item)" outline color="secondary">
                {{ i18n("DELETE") }}
              </BliButton>
             <div class="item-count-wrapper">
              <ItemCount
                v-if="!checkIfUnbuyableOrOOS(item)"
                :minVal="0"
                :currentItem="item"
                :maxValReached="maxValReached"
                :inputValue="item.quantity"
                :getQuantity="getItemQuantity"
              />
            </div>
            <div>
            </div>
            </div>
          </div>
          <div id="toast" ref="limitToast">{{ i18n("MAX_LIMIT") }}</div>
        </div>
        <div class="order-list__price-detail-wrapper">
        <div class="payment-label label">{{ i18n("PAYMENT_DETAILS") }}</div>
        <div class="balance-label label">{{ i18n("YOUR_BALANCE") }}
            <span class="amount balance-amount">
            {{ getWalletRequest.balance | currency }}
          </span>
        </div>
        <div class="price-label label">{{ i18n("ORDER_PRICE") }}
            <span class="amount order-price">{{ getCheckoutCart.totalOrder | currency }} </span>
        </div>
          <div v-if="getCheckoutCart.totalOrderAdjustment !== 0" class="discount-label label">
            {{ i18n("DISCOUNT") }}
          <span class="discount-price amount">
            - {{ Math.abs(getCheckoutCart.totalOrderAdjustment) | currency }}
          </span>
          </div>
            <div class="shipping-label label">{{ i18n("SHIPPING_COST") }}
               <span v-if="getCheckoutCart.totalShipping === 0"
              class="shipping-price amount green"
            >
               {{ i18n('FREE') }}
            </span>
            <span v-else
              class="shipping-price amount"
            >
               {{ getCheckoutCart.totalShipping | currency }}
            </span>
            </div>
          <div v-if="getCheckoutCart.totalShippingAdjustment !== 0" class="discount-label label">
            {{ i18n('DISCOUNT_SHIPPING') }}
            <span class="discount-price amount">
            - {{ Math.abs(getCheckoutCart.totalShippingAdjustment) | currency }}
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-list__footer">
      <div class="item-total">
        {{ i18n("DIGITAL.ORDER.TOTAL_PAYMENT") }}
        <span class="item-total-price">
          {{ getCheckoutCart.paymentAmount | currency }}
        </span>
      </div>
      <BliButton color="secondary" class="pay-now" :disabled="disablePay" @click="checkOutandEnterPin">
        {{ i18n("PAY_NOW") }}
      </BliButton>
    </div>
    </div>
    <BliModal type="warning"
              :bli-active.sync="visibleModal"
              @maskClick="visibleModal = false"
              @close="visibleModal = false">
       <BliModalHeader>{{ i18n("OUT_OF_STOCK") }}</BliModalHeader>
       <BliModalBody>{{ i18n("OUT_OF_STOCK_MSG") }}</BliModalBody>
    </BliModal>
    <BliModal
      type="info"
      :bli-active="modalVisible"
      @close="modalVisible = false"
      :controls="customControls"
    >
      <BliModalHeader>
        {{ i18n("DIGITAL.CART.NOT_ENOUGH_BALANCE_TITLE") }}
      </BliModalHeader>
      <BliModalBody>
        {{ i18n("DIGITAL.CART.NOT_ENOUGH_BALANCE_DESC") }}
      </BliModalBody>
    </BliModal>
    <div
      v-if="!(getCheckoutCart !== null && getCheckoutCart.items && getCheckoutCart.items.length) && !getIsFetchingList"
      class="order-list__empty-cart"
    >
      <img
        src="~assets/icons/icon-empty-bag.svg"
        alt="empty" />
      <div class="empty-cart-header">{{ i18n("EMPTY_CART") }}</div>
      <div class="empty-cart-msg">{{ i18n("EMPTY_CART_MSG") }}</div>
    </div>
    <div class="add-item-loader" v-if="getIsFetchingList && getCheckoutCart">
          <Loader />
      </div>
  </div>
</template>
<script src="./js/confirm-order.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.order-list {
  position: relative;
  height: 100vh;
  width: 100%;
  .loader {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 1;
  }
  .add-item-loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    opacity: 0.3;
    z-index: 10;
  }
  &__header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;
    border-bottom: 1px solid $color-grey;
    position: relative;
    img {
      left: 10px;
      position: absolute;
    }
  }
  &__list {
    overflow-y: scroll;
    height: calc(100vh - 165px);
    padding-bottom: 15px;
  }
  &__address-wrapper {
    margin-top: 15px;
    padding-left: 16px;
    .address-label {
      color: $color-black;
      margin-bottom: 5px;
      font-size: 16px;
      font-family: EffraMedium;
    }
    .address-extra {
      padding: 10px 0px;
    }
    .address-detail {
      font-size: 14px;
      color: $color-grey-shade-1;
      font-family: EffraRegular;
    }
    .blu-field {
      height: 40px !important;
      width: 95%;
    }
    .b-dark.has-value textarea+label {
      background: none;
    }
  }
  &__wrapper {
    position: relative;
    font-size: 14px;
    .order-label {
      padding-left: 16px;
      font-family: EffraMedium, serif;
      color: $color-black;
    }
    .order-list-items {
      border-radius: 4px;
      box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
      background-color: $color-white;
      margin: 10px;
    }
    .disable-item {
      pointer-events: none;
      opacity: 0.4;
    }
    .add-item {
      height: 20px;
      max-width: 82px;
      font-family: EffraMedium, sans-serif;
      letter-spacing: normal;
      font-size: 12px;
      color: $color-grey-shade-3;
      background-color: $color-grey-lightest-1;
      opacity: 1;
      position: absolute;
      transform: translate(2px, 30px);
    }
    .img-container {
      height: 86px;
      width: 86px;
      margin: 10px;
    }
    .item-image {
      width: 100%;
      height: 100%;
    }
    .item-name {
      margin-top: 5px;
      color: $color-grey-shade-3;
      font-size: 16px;
    }
    .detail-list .label {
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
    .item-current-price {
      font-family: EffraMedium, serif;
      font-size: 16px;
      &.red {
        color: $color-red-1;
        display: inline-block;
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
      padding: 0px 10px;
      font-family: EffraMedium, sans-serif;
    }
    .weight-label {
      font-size: 11px;
      color: $color-grey-shade-1;
      display: inline-block;
      transform: translate(0px, 5px);
    }
    .delete-label {
      position: absolute;
      height: 32px;
      right: 20px;
      width: 80px;
      pointer-events: all;
      opacity: 1;
    }
    .item-count-wrapper {
      float: right;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    #toast {
    visibility: hidden;
    margin: auto;
    position: fixed;
    z-index: 1;
    left: 15px;
    right: 15px;
    bottom: 120px;
    font-size: 14px;
    white-space: nowrap;
    color: $color-white;
    background: $color-black-1;
    height: 37px;
    border-radius: 8px;
    padding: 10px 15px;
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
  &__price-detail-wrapper {
    font-size: 14px;
    .label {
      padding-left: 16px;
      line-height: 30px;
      color: $color-grey-shade-1;
    }
    .amount {
      float: right;
      padding-right: 20px;
      color: $color-black;
    }
    .payment-label {
      margin: 10px 0px;
      font-family: EffraMedium, sans-serif;
      color: $color-black;
    }
    .balance-amount {
      font-family: EffraMedium, sans-serif;
    }
    .order-price {
      color: $color-black;
    }
    .discount-price {
      color: $color-blue-3;
    }
    .green {
        color: $color-green;
      }
  }
  &__footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 10px;
    background: $color-white;
    .item-total {
      border-top: 1px solid $color-grey;
      height: 40px;
      line-height: 2.5;
      color: $color-black;
      padding-left: 15px;
      margin-bottom: 15px;
    }
    .item-total-price {
      float: right;
      padding-right: 20px;
      color: $color-black;
      font-family: EffraMedium, 'sans-serif';
    }
    .pay-now {
      width: 92%;
      margin-left: 15px !important;
    }
  }
  &__empty-cart {
    img {
      transform: translate(25%, 65%);
    }
    .empty-cart-header {
      text-align: center;
      font-size: 20px;
      color: $color-black;
      font-family: EffraMedium, sans-serif;
      margin-top: 20vh;
    }
    .empty-cart-msg {
      font-size: 16px;
      color: $color-grey-shade-1;
      width: 75%;
      margin: 0 auto;
      text-align: center;
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
