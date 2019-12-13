<template>
  <div class="digital-product--detail">
    <div class="table-row" v-if="order.transactionData && order.transactionData.tokenPln">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.TOKEN_NO") }}
      </div>
      <div class="value">
        {{ order.transactionData.tokenPln }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.METER_NO") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.customerId }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.CUSTOMER_NAME") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.customerName }}
      </div>
    </div>
    <div class="table-row" v-if="order.inquiryInfo.adminOfferCharge">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.ADMIN_FEE") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.adminOfferCharge | currency }}
      </div>
    </div>
    <div class="table-row" v-if="order.inquiryInfo.additionalData.TOTAL_PENALTY">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.FINE") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.TOTAL_PENALTY | currency }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.POWER_RATING") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData["PLN-POWER"] || order.inquiryInfo.additionalData.POWER_RATING }}
      </div>
    </div>
    <div class="table-row" v-if="order.inquiryInfo.paymentPeriod">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.PERIOD") }}
      </div>
      <div class="value">
        {{  i18n("DIGITAL.ORDER.MONTH_PERIOD", order.inquiryInfo.paymentPeriod, order.inquiryInfo.additionalData.POSTPAID_PLN_PAYMENT_PERIOD_RANGE) }}
      </div>
    </div>
    <div class="table-row" v-if="order.inquiryInfo.additionalData.TOTAL_BILL_AMOUNT">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.TOTAL_FEE") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.TOTAL_BILL_AMOUNT | currency }}
      </div>
    </div>
  </div>
</template>

<script src="./js/pln.js"></script>
<style lang="scss" src="./scss/style.scss" scoped />
