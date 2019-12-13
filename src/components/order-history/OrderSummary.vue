<template>
  <div class="order-digital">
    <div class="order-digital--top">
      <div class="date">
        {{order.orderDate | date("dd MMM yyyy")}}
      <div class="transaction">
        <BliLabelSuccess v-if="order.status === 'APPROVED'">
          {{ i18n("ORDER_HISTORY.ORDER_SUCCESS") }}
        </BliLabelSuccess>
        <BliLabelWarning v-else-if="order.status === 'PENDING'">
          {{ order.paymentStatus === 'SUCCESS' ? i18n("ORDER_HISTORY.ORDER_PENDING_PAID")  : i18n("ORDER_HISTORY.ORDER_PENDING") }}
        </BliLabelWarning>
        <BliLabelError v-else>
          {{ order.paymentStatus === 'SUCCESS' ? i18n("ORDER_HISTORY.ORDER_CANCELLED_PAID") : i18n("ORDER_HISTORY.ORDER_CANCELLED") }}
        </BliLabelError>
      </div>
      </div>
    </div>
    <div class="order-digital--bottom">
      <div class="blu-columns b-mobile b-0 b-gapless">
        <div class="blu-column b-3">
          <div class="icon">
            <img class="item-image" v-if="order.productType === 'GROCERIES'" :src="icon.retailIcon" />
            <img class="item-image" v-if="order.productType === 'DATA_PACKAGE'" :src="icon.dataIcon" />
            <img class="item-image" v-else-if="order.productType === 'PHONE_CREDIT'" :src="icon.pulsaIcon" />
            <img class="item-image" v-else-if="order.productType === 'WATER_BILL'" :src="icon.pdamIcon" />
            <img class="item-image" v-else-if="order.productType === 'ELECTRICITY_CREDIT' || order.productType === 'ELECTRICITY_POSTPAID'" :src="icon.plnIcon"/>
            <img class="item-image" v-else-if="order.productType === 'GAME_VOUCHER'" :src="icon.gameIcon" />
            <img class="item-image" v-else-if="order.productType === 'BPJS'" :src="icon.bpjsIcon" />
            <img class="item-image" v-else-if="order.productType === 'WALLET_BALANCE'" :src="icon.mitrapayIcon" />
          </div>
        </div>
        <div class="blu-column b-9">
          <div class="font-16 product-type font-grey-3">
            {{ productName }}
          </div>
          <div class="product-description">
            {{ productDescription }}
          </div>
          <div class="product-information">
            {{ i18n("DIGITAL.ORDER.ORDER_NO") }} {{ order.orderId }}
          </div>
          <div class="font-blue font-bold font-16 mb-1">
            {{ order.payment.amount | currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/order-summary.js"></script>
<style lang="scss" scoped>
  @import "~assets/scss/colors";
  .order-digital {
    margin: 10px 14px;
    border-radius: 10px;
    box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
    padding-bottom: 4px;
    &--top {
      padding-bottom: 9px;
      padding-top: 10px;
      div:last-child {
        margin-left: auto;
      }
      .date {
        padding-left: 16px;
        color: $color-grey-shade-1;
      }
      .transaction {
        display: inline-block;
        float: right;
        margin-right: 10px;

        /deep/ .label {
          height: 16px;
          letter-spacing: normal;
          font-family: EffraMedium, serif;
        }
      }
    }

    &--bottom {
      .icon {
        padding-left: 16px;
        .item-image {
          display: inline-block;
          transform: translate(0px, 2px);
          height: 48px;
          width: 48px;
        }
      }

      .product-information {
        color: $color-grey-shade-1;
        font-size: 14px;
      }

      .product-description {
        color: $color-grey-shade-3;
        font-size: 16px;
      }
    }
  }
</style>
