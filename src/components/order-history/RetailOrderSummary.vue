<template>
  <div class="order">
    <div class="order--top">
    <div class="date">
      {{ order.orderDate }}
    <div class="transaction">
            <BliLabelSuccess v-if="$route.query.orderStatus === 'FINISHED_ORDER'">
              RETAIL_ORDER_HISTORY.ORDER_SUCCESS
            </BliLabelSuccess>
            <BliLabelError v-if="$route.query.orderStatus === 'CANCELED_ORDER' && order.paymentStatus ==='APPROVED'">
              ORDER_HISTORY.ORDER_CANCELLED_PAID
            </BliLabelError>
            <BliLabelError v-if="$route.query.orderStatus === 'CANCELED_ORDER' && order.paymentStatus ==='DECLINED'">
              ORDER_HISTORY.ORDER_CANCELLED
            </BliLabelError>
            <BliLabelInfo v-if="currentStatus === 'FP'">
              RETAIL_ORDER_HISTORY.ORDER_PROCESSING
            </BliLabelInfo>
            <BliLabelInfo v-else-if="currentStatus === 'PU'">
              RETAIL_ORDER_HISTORY.ORDER_READY_TO_SHIP
            </BliLabelInfo>
            <BliLabelInfo v-else-if="currentStatus === 'CX'">
              RETAIL_ORDER_HISTORY.ORDER_ON_DELIVERY
            </BliLabelInfo>
            <BliLabelSuccess v-else-if="currentStatus === 'D'">
              RETAIL_ORDER_HISTORY.ORDER_SENT
            </BliLabelSuccess>
            <BliLabelWarning v-if="order.paymentStatus === 'PENDING'">
            DIGITAL.ORDER.TRANSACTION_PENDING
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
            {{ order.quantity }} kg Food
          </div>
          <div class="product-information">
            Order Number {{ order.orderId }}
          </div>
          <div class="product-information">
            Donor: {{ order.donorName }}
          </div>
          <div class="font-blue font-bold font-16 mb-1">
              Order Date {{ order.date }}
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
