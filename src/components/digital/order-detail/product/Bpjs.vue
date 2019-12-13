<template>
  <div class="digital-product--detail">
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.ORDER") }}
      </div>
      <div class="value">
        {{ i18n("DIGITAL.ORDER.BPJS", order.inquiryInfo.additionalData.BPJS_PAYMENT_PERIOD_RANGE) }}
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
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.TOTAL_FAMILY_MEMBER") }}
      </div>
      <div class="value">
        {{ i18n("DIGITAL.ORDER.NO_PEOPLE", order.inquiryInfo.totalFamilyMembers) }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.BPJS_PERIOD") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.BPJS_PAYMENT_PERIOD_RANGE }} ({{ i18n("DIGITAL.ORDER.MONTH", parseInt(order.inquiryInfo.paymentPeriod)) }})
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
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.TOTAL_FEE") }}
      </div>
      <div class="value">
        {{ order.inquiryInfo.additionalData.TOTAL_AMOUNT | currency }}
      </div>
    </div>
  </div>
</template>

<script src="./js/bpjs.js" />
<style lang="scss" src="./scss/style.scss" scoped />
