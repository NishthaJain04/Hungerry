<template>
  <div class="digital-product--detail">
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.PACKAGE_DATA") }}
        {{ order.item.networkOperator }}
        {{ order.customerNumber }}
      </div>
      <div class="value">
        {{ order.item.nominal | currency }}
      </div>
    </div>
  </div>
</template>

<script src="./js/package-data.js"></script>
<style lang="scss" src="./scss/style.scss" scoped />
