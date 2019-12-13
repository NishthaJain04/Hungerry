<template>
  <div class="order">
    <div class="order--top">
    <div class="date">
      {{ order.orderDate | date("dd MMM yyyy") }}
    <div class="transaction">
            <BliLabelSuccess v-if="$route.query.orderStatus === 'FINISHED_ORDER'">
              {{ i18n("RETAIL_ORDER_HISTORY.ORDER_SUCCESS") }}
            </BliLabelSuccess>
            <BliLabelError v-if="$route.query.orderStatus === 'CANCELED_ORDER' && order.paymentStatus ==='APPROVED'">
              {{ i18n("ORDER_HISTORY.ORDER_CANCELLED_PAID") }}
            </BliLabelError>
            <BliLabelError v-if="$route.query.orderStatus === 'CANCELED_ORDER' && order.paymentStatus ==='DECLINED'">
              {{ i18n("ORDER_HISTORY.ORDER_CANCELLED") }}
            </BliLabelError>
            <BliLabelInfo v-if="currentStatus === 'FP'">
              {{ i18n("RETAIL_ORDER_HISTORY.ORDER_PROCESSING") }}
            </BliLabelInfo>
            <BliLabelInfo v-else-if="currentStatus === 'PU'">
              {{ i18n("RETAIL_ORDER_HISTORY.ORDER_READY_TO_SHIP") }}
            </BliLabelInfo>
            <BliLabelInfo v-else-if="currentStatus === 'CX'">
              {{ i18n("RETAIL_ORDER_HISTORY.ORDER_ON_DELIVERY") }}
            </BliLabelInfo>
            <BliLabelSuccess v-else-if="currentStatus === 'D'">
              {{ i18n("RETAIL_ORDER_HISTORY.ORDER_SENT") }}
            </BliLabelSuccess>
            <BliLabelWarning v-if="order.paymentStatus === 'PENDING'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_PENDING") }}
          </BliLabelWarning>
    </div>
    </div>
    </div>
    <div class="order--bottom">
      <div class="blu-columns b-mobile b-0 b-gapless">
        <div class="blu-column b-3">
              <div class="icon">
                <img
                  src="@/assets/icons/icon-retail.svg"
                  class="item-image"
                  alt="Item Image"
                />
              </div>
            </div>
        <div class="blu-column b-9">
          <div class="font-16 product-type font-grey-3">
            {{ order.orderItems.length }} {{ i18n("DIGITAL.THANK_YOU.GOODS") }}
          </div>
          <div class="product-information">
            {{ i18n("DIGITAL.ORDER.ORDER_NO") }} {{ order.orderId }}
          </div>
          <div class="font-blue font-bold font-16 mb-1">
              {{ order.paymentAmount | currency }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/retail-order-summary.js"></script>
<style lang="scss" scoped>
    @import "~assets/scss/colors";
    .order {
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
  }
}
</style>
