<template>
  <div class="digital-product--detail">
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.ORDER") }}
      </div>
      <div class="value">
        {{ i18n("DIGITAL.ORDER.GAME") }}
      </div>
    </div>
    <div class="table-row" v-if="order.transactionData && order.transactionData.serial_number">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.SERIAL_NUMBER") }}
      </div>
      <div class="value">
        {{ order.transactionData.serial_number }}
      </div>
    </div>
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.VOUCHER_TYPE") }}
      </div>
      <div class="value">
        {{ order.item.name }}
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
</template>

<script src="./js/game-voucher.js"></script>
<style lang="scss" src="./scss/style.scss" scoped />
