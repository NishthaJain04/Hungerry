<template>
  <div class="electricity--token">
    <digital-header title="Listrik" />
    <div class="electricity--token__content">
      <BliTab>
        <BliTabItem name="Token Listrik" :selected="true">
          <pln-prepaid />
        </BliTabItem>
        <BliTabItem name="Tagihan Listrik">
          <pln-postpaid />
        </BliTabItem>
      </BliTab>
    </div>
    <customer-number-modal />
  </div>
</template>

<script src="./js/electricity-token.js" />
<style lang="scss" scoped>
.electricity--token {
  /deep/ .tabs {
    a {
      width: 50%;
      text-align: center;
    }
  }
  &__content {

  }
}
</style>
