<template>
  <div class="digital-product--detail">
    <div class="table-row">
      <div class="label">
        {{ i18n("DIGITAL.ORDER.MITRAPAY") }}
      </div>
      <div class="value font-orange">
        {{ order.item.nominal | currency }}
      </div>
    </div>
  </div>
</template>

<script src="./js/pulsa.js"></script>
<style lang="scss" src="./scss/style.scss" scoped />
