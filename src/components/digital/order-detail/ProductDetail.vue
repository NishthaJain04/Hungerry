<template>
  <div class="product--detail">
    <div class="product--detail__title font-grey font-bold">
      {{ i18n("DIGITAL.ORDER.PRODUCT_DETAIL") }}
    </div>
    <div class="product--detail__summary">
      <div class="product">
        <div class="product--type">
          {{ order.type }}
        </div>
        <div class="font-grey">
          {{ order.item.name }}
        </div>
      </div>
      <div class="icon">
        <img
          :src="productIcon"
        />
      </div>
    </div>
    <div class="product--detail__information">
      <div
        class="product--information__header padding-left-16 font-blue-3 font-bold clickable"
        @click="productDetailVisible = true"
      >
        {{ i18n("DIGITAL.ORDER.SHOW_DETAIL") }}
      </div>
      <overlay-popup
        :isOpen="productDetailVisible"
        title="Detail Harga"
        closeVisible
        :closePopup="() => (productDetailVisible = false)"
      >
        <div class="price--detail">
          <div class="table-row">
            <div>
              {{ i18n("DIGITAL.ORDER.ORDER_NO") }}
            </div>
            <div>{{ order.orderId }}</div>
          </div>
          <div class="table-row">
            <div>
              {{ i18n("DIGITAL.ORDER.TRANSACTION_DATE") }}
            </div>
            <div>{{ order.orderDate | date }}</div>
          </div>
          <div class="table-row">
            <div>
              {{ i18n("DIGITAL.ORDER.PAYMENT_PRICE") }}
            </div>
            <div class="font-green">{{ order.payment.amount | currency }}</div>
          </div>
          <div class="table-row" v-if="order.totalCashbackAmount > 0">
            <div>
              {{ i18n("DIGITAL.ORDER.CASHBACK") }}
            </div>
            <div class="font-blue-3">
              {{ order.totalCashbackAmount | currency }}
            </div>
          </div>
        </div>
        <bpjs-detail v-if="order.productType === 'BPJS'" />
        <game-voucher-detail
          v-else-if="order.productType === 'GAME_VOUCHER'"
        />
        <package-data-detail
          v-else-if="order.productType === 'DATA_PACKAGE'"
        />
        <pdam-detail v-else-if="order.productType === 'WATER_BILL'" />
        <pln-detail v-else-if="order.productType === 'ELECTRICITY_CREDIT' || order.productType === 'ELECTRICITY_POSTPAID'" />
        <balance-detail v-else-if="order.productType === 'WALLET_BALANCE'" />
        <pulsa-detail v-else />
      </overlay-popup>
    </div>
  </div>
</template>

<script src="./js/product-detail.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.product--detail {
  &__title {
    padding: 9px 16px;
  }
  &__summary {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 10px;
    padding-bottom: 11px;
    display: flex;
    align-items: center;

    .icon {
      width: 10%;
      margin-left: auto;
    }
  }

  &__information {
    .price--detail {
      display: table;
      padding: 16px;
      text-align: left;
      width: 100%;
      border-spacing: 0 4px;
      border-bottom: 1px solid $color-grey-lightest-1;
    }
  }
  .table-row {
    margin-bottom: 8px;
    .label {
      color: $color-grey-shade;
    }
    .value {
      color: $color-grey-shade-3;
    }
    div:last-child {
      text-align: right;
    }
  }
}
</style>
