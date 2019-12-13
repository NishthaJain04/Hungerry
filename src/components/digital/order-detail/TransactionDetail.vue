<template>
  <div class="transaction--detail">
    <div class="transaction--detail__title font-grey font-bold">
      {{ i18n("DIGITAL.ORDER.TRANSACTION_DETAIL") }}
    </div>
    <div class="transaction--detail__breakdown">
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.TRANSACTION_STATUS") }}
        </div>
        <div class="value">
          <BliLabelSuccess v-if="order.status === 'APPROVED'">
            {{ i18n("DIGITAL.ORDER.TRANSACTION_SUCCESS") }}
          </BliLabelSuccess>
          <BliLabelWarning v-else-if="order.status === 'PENDING'">
            {{ order.paymentStatus === 'SUCCESS' ? i18n("DIGITAL.ORDER.TRANSACTION_PENDING_PAID") : i18n("DIGITAL.ORDER.TRANSACTION_PENDING") }}
          </BliLabelWarning>
          <BliLabelError v-else>
            {{ order.paymentStatus === 'SUCCESS' ? i18n("DIGITAL.ORDER.TRANSACTION_FAILED_PAID") : i18n("DIGITAL.ORDER.TRANSACTION_FAILED") }}
          </BliLabelError>
        </div>
      </div>
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.TRANSACTION_DATE") }}
        </div>
        <div class="value">
          {{ order.orderDate | date("dd/MM/yyyy") }}
        </div>
      </div>
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.PAYMENT_METHOD") }}
        </div>
        <div class="value">
          {{ order.payment.description }}
        </div>
      </div>
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.PRICE") }}
        </div>
        <div class="value">
          {{ order.totalOrder | currency }}
        </div>
      </div>
      <div class="table-row" v-if="order.totalOrderAdjustment > 0">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.DISCOUNT") }}
        </div>
        <div class="value font-blue-3">
          -{{ order.totalOrderAdjustment | currency }}
        </div>
      </div>
      <div class="table-row">
        <div class="label">
          {{ i18n("DIGITAL.ORDER.TOTAL_PAYMENT") }}
        </div>
        <div class="value">
          {{ order.payment.amount | currency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/transaction-detail.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.transaction--detail {
  padding: 0px 16px;
  &__title {
    padding: 9px 0px;
  }
  &__breakdown {
    margin-top: 10px;
    display: table;
    width: 100%;
    border-collapse:separate;
    border-spacing: 0 8px;
    margin-bottom: 10px;

    .table-row {
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
    }
    .value {
      color: $color-grey-shade-3;
      vertical-align: middle;
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
}
</style>
