<template>
  <div class="pulsa">
    <digital-header :title="i18n('DIGITAL.PULSA.HEADER')" />
    <div class="pulsa--content">
      <BliField :type="fieldStyle" b-clearable>
        <BliInput
          @input="onInputPhoneNumber"
          :value="phoneNumber"
          :maxlength="phoneNumberMaxLength"
          ref="number"
          type="text"
          pattern="[0-9]*"
          inputmode="numeric"
        />
        <label>
          {{ i18n("DIGITAL.PULSA.PHONE_NUMBER") }}
        </label>
        <span class="blu-field__msg" v-if="isProductError">
           {{ productErrors.Cart ? i18n(`DIGITAL.ERROR.CART.${productErrors.Cart[0]}`) : i18n('UNKNOWN_ERROR') }}
        </span>
        <span class="blu-field__msg" v-else-if="productData">
          {{ productData.provider }}
          <img :src="productData.iconUrl" />
        </span>
      </BliField>
      <template v-if="productData">
        <p class="font-16 font-bold">
          {{ i18n("DIGITAL.PULSA.NOMINAL") }}
        </p>
        <div class="products" v-bind:style="{ paddingBottom: cart ? '150px': '0px'}">
          <div class="product"
            v-for="product in products"
            :key="product.sku"
          >
            <BliChipChoice
              type="radio"
              :itemValue="product.sku"
              v-model="selectedSku"
              :checked="selectedSku === product.sku"
              :class="product.sku === selectedSku ? 'unclikable' : ''"
              @change="onSelectNominal(product.sku)"
            >
              {{ product.nominal | currency }}
            </BliChipChoice>
          </div>
        </div>
      </template>
    </div>
    <cart-summary v-if="cart" :validToPay="validToPay" :paymentRequest="paymentRequest" />
  </div>
</template>

<script src="./js/pulsa.js" />
<style lang="scss" scoped>
.pulsa {
  &--header {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #eaeff3;
  }
  &--content {
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
        max-width: 150px;
        margin-bottom: 16px;
        width: 48%;
        ::v-deep .blu-chip {
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
}
</style>
