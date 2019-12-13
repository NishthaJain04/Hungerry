<template>
  <div class="order--detail" v-if="order">
    <div class="order--detail__header">
      <router-link :to="orderHistoryPath">
        <img
          src="~assets/icons/icon-left.svg"
          alt="back"/>
      </router-link>
      <div class="font-16">
        {{ i18n("DIGITAL.ORDER.DETAIL") }}
      </div>
      <div class="font-12 font-grey">
        {{ i18n("DIGITAL.ORDER.ORDER_ID", order.orderId) }}
      </div>
    </div>
    <transaction-detail />
    <product-detail />
    <help-action />
  </div>
</template>

<script src="./js/digital-order-detail.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.order--detail {
  background-color: white;
  &__header {
    text-align: center;
    border-bottom: 1px solid #eaeff3;
    padding: 8px;
    position: relative;
    img {
      position: absolute;
      top: 28%;
    }
  }

  .receipt--button {
    padding: 16px;
    .blu-field__msg {
      text-align: left;
      margin-top: 10px;
    }

    .number--label {
      text-align: left;
      margin-bottom: 8px;
    }
  }
}
</style>
