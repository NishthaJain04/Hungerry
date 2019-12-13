<template>
    <div class="retail-order-detail">
        <div class="loader" v-if="isFetchingRetailOrderHistory">
          <Loader />
        </div>
        <div v-else>
        <div class="retail-order-detail__header">
            <img src="~assets/icons/icon-left.svg" alt="Go Back" @click="goBack" />
            <span>{{ i18n("DIGITAL.ORDER.DETAIL") }}</span>
            <div class="order-id">{{ i18n("DIGITAL.THANK_YOU.ORDER_ID") }} {{ getRetailOrderDetail.orderId }}</div>
        </div>
        <div class="transaction-header">{{ i18n("DIGITAL.ORDER.TRANSACTION_DETAIL")}} </div>
    <div class="retail-order-detail__breakdown">
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.TRANSACTION_STATUS") }}
        </div>
        <div class="value">
          <BliLabelSuccess v-if="getRetailOrderDetail.paymentStatus === 'APPROVED'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_SUCCESS") }}
          </BliLabelSuccess>
          <BliLabelWarning v-else-if="getRetailOrderDetail.paymentStatus === 'PENDING'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_PENDING") }}
          </BliLabelWarning>
          <BliLabelError v-else-if="getRetailOrderDetail.paymentStatus === 'CANCELLED'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_FAILED") }}
          </BliLabelError>
          <BliLabelError v-else-if="getRetailOrderDetail.paymentStatus === 'APPROVED'
           && $route.query.orderStatus === 'CANCELED_ORDER'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_FAILED_PAID") }}
          </BliLabelError>
        </div>
      </div>
      <div class="table-row">
        <div class="label">{{ i18n("DIGITAL.ORDER.TRANSACTION_DATE") }}</div>
        <div class="value">{{ getRetailOrderDetail.orderDate | date }}</div>
      </div>

      <div class="table-row">
        <div class="label">{{ i18n("DIGITAL.ORDER.PRICE") }}</div>
        <div class="value">{{ getRetailOrderDetail.totalOrder | currency }}</div>
      </div>

      <div class="table-row">
        <div class="label">{{ i18n("SHIPPING_COST") }}</div>
        <div v-if="getRetailOrderDetail.totalShipping === 0" class="value green">{{ i18n('FREE') }}</div>
        <div v-else class="value">{{ getRetailOrderDetail.totalShipping | currency }}</div>
      </div>

      <div class="table-row" v-if="getRetailOrderDetail.totalShippingAdjustment !== 0">
         <div class="label">{{ i18n("DISCOUNT_SHIPPING") }}</div>
         <div class="value font-blue-3">- {{ Math.abs(getRetailOrderDetail.totalShippingAdjustment) | currency }}</div>
      </div>

      <div v-if="getRetailOrderDetail.totalOrderAdjustment !== 0" class="table-row">
        <div class="label">{{ i18n("DIGITAL.CART.DISCOUNT") }}</div>
        <div class="value font-blue-3">- {{ Math.abs(getRetailOrderDetail.totalOrderAdjustment) | currency }}</div>
      </div>

      <div class="table-row">
        <div class="label">{{ i18n("DIGITAL.ORDER.TOTAL_PAYMENT") }}</div>
        <div class="value">{{ getRetailOrderDetail.paymentAmount | currency }}</div>
      </div>

    </div>
    <div class="product-detail transaction-header">
        {{ i18n("DIGITAL.ORDER.PRODUCT_DETAIL") }}
    </div>
    <div v-for="(orderItem, index) in getRetailOrderDetail.orderItems" :key="index">
    <RetailProductDetail :orderItem="orderItem"/>
    </div>
    <div class="shipping-address-label mt-2">
        {{ i18n("SHIPPING_ADDRESS")}}
    </div>
    <div v-if="getRetailOrderDetail.mitraMember.address" class="shipping-address"> {{ getRetailOrderDetail.mitraMember.address.address }} </div>
    <help-action />
        </div>
  </div>
</template>
<script src="./js/retail-order-detail.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.retail-order-detail {
  .loader {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    &__header {
    text-align: center;
    padding: 10px;
    font-family: EffraMedium, sans-serif;
    border-bottom: 1px solid $color-grey;
    position: relative;
    img {
      left: 10px;
      top: 16px;
      position: absolute;
    }
    .order-id {
        color: $color-grey-shade-1;
        font-size: 12px;
        font-family: EffraRegular, sans-serif;
    }
  }
  .transaction-header {
      margin: 12px;
      font-size: 14px;
      font-family: EffraMedium, sans-serif;
  }
  &__breakdown {
    margin-top: 10px;
    display: table;
    width: 100%;
    border-collapse:collapse;
    border-spacing: 0 8px;
    margin-bottom: 10px;
    .table-row {
      border-bottom: 10px solid transparent;
      .value {
        ::v-deep .label {
          color: white;
        }
      }
    }
  }

  .table-row {
    margin-bottom: 8px;
    .label {
      color: $color-grey-shade;
      padding-left: 12px;
    }
    .value {
      vertical-align: middle;
      padding-right: 12px;
      &.green {
        color: $color-green;
      }
    }
    div:last-child {
      text-align: right;
    }
    .green-label {
      border-radius: 24px;
      background-color: #9bce59;
      float: right;
      color: white;
      padding: 0px 16px;
    }
  }
  .shipping-address-label {
      padding-left: 16px;
      font-family: EffraMedium, 'sans-serif';
  }
  .shipping-address {
      padding-left: 16px;
      font-family: EffraRegular, 'sans-serif';
      font-size: 14px;
      color: $color-grey-shade;
  }
  .help {
    padding: 16px;
    &--title {
      margin-bottom: 22px;
    }

    &--button {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      div {
        width: 48%;
      }
    }
  }
}
</style>
