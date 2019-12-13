<template>
  <div class="methods">
    <div class="method" @click="changeState">
      <div class="method--icon">
        <img src="@/assets/icons/mitrapay.svg" />
      </div>
      <div class="method--detail">
        <div class="title">
          {{ i18n('DIGITAL.BLIPAY.USE_VA') }}
        </div>
        <div class="description">
          {{ i18n("DIGITAL.BLIPAY.VA_DESCRIPTION") }}
        </div>
      </div>
    </div>
    <div class="method" @click="toTopupScreen">
      <div class="method--icon">
        <img src="@/assets/icons/minimarket.svg" />
      </div>
      <div class="method--detail">
        <div class="title">
          {{ i18n("DIGITAL.BLIPAY.USE_MART") }}
        </div>
        <div class="description">
          {{ i18n("DIGITAL.BLIPAY.MART_DESCRIPTION") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/payment-method.js" />

<style lang="scss" scoped>
  .methods {
    text-align: left;
    .method {
      margin-left: 16px;
      padding: 16px;
      padding-left: 0px;
      display: flex;
      border-bottom: solid 1px #e0e0e0;
      &--icon {
        width: 50px;
      }
      &--detail {
        margin-left: 16px;
        .description {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.38);
        }
      }
    }
  }
</style>
