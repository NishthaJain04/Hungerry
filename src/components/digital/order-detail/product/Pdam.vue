<template>
  <div class="digital-product--detail">
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
        {{ i18n("DIGITAL.ORDER.COMPANY") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.operator.childOperators[0].description }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.PERIOD") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.PDAM_PAYMENT_PERIOD_RANGE }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.TOTAL_FEE") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.TOTAL_BILL_AMOUNT | currency }}
      </div>
    </div>
  </div>
</template>

<script src="./js/pdam.js"></script>
<style lang="scss" src="./scss/style.scss" scoped />
