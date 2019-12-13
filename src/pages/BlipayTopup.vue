<template>
  <div class="blipay--topup">
    <digital-header :title="i18n('DIGITAL.BLIPAY.BLIPAY_BALANCE')" />
    <div class="blipay--topup__content">
      <BliField type="dark" b-clearable>
        <BliInput
          ref="nominal"
          @input="onInputNominal"
          :value="nominal"
          type="text"
          pattern="[0-9]*"
          inputmode="numeric"
        />
        <label>
          {{ i18n("DIGITAL.BLIPAY.CURRENCY") }}
        </label>
        <span class="blu-field__msg">
          {{ i18n("DIGITAL.BLIPAY.TOPUP_MESSAGE") }}
        </span>
      </BliField>
      <div class="products">
        <div class="product" v-for="product in products" :key="product.sku">
          <BliChipChoice type="radio" :itemValue="product.sku" v-model="selectedSku" @input="onSelectNominal">
            {{ product.nominal | currency }}
          </BliChipChoice>
        </div>
      </div>
    </div>
    <div class="pay--btn">
      <BliButton
        color="secondary"
        block
        :disabled="!validToPay"
        @click="addCart"
      >
        {{ i18n("DIGITAL.BLIPAY.PAY") }}
      </BliButton>
    </div>
  </div>
</template>

<script src="./js/blipay-topup.js" />
<style lang="scss" scoped>
.blipay--topup {

  &__content {
    padding: 15px 16px;
    .blu-field__msg {
      vertical-align: middle;
      img {
        vertical-align: middle;
        width: 15px;
        display: inline-block;
      }
    }
    .products {
      display: flex;
      flex-flow: row wrap;
      align-content: space-between;
      justify-content: space-between;
      .product {
        width: 48%;
        margin-bottom: 16px;

        /deep/ .blu-chip {
          width: 100%;
          span {
            width: 100%;
            justify-content: center;
            padding: 15px;
            height: auto;
            border-radius: 8px;
          }
        }
      }
    }
  }

  .pay--btn {
    padding: 16px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

}
</style>
