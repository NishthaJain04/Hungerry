<template>
  <div>
    <div class="padding-16 pln--prepaid">
      <BliField :type="fieldStyle" b-clearable>
        <BliInput
          @input="onInputNumber"
          :value="plnNumber"
          :maxlength="maxNumber"
          type="text"
          pattern="[0-9]*"
          inputmode="numeric"
          ref="number"
        />
        <label>
          {{ i18n("DIGITAL.PLN_PREPAID.CUSTOMER_NUMBER") }}
        </label>
        <span class="blu-field__msg" v-if="isInquiryError">
          {{ i18n(`DIGITAL.ERROR.CART.${errorValue}`) }}
        </span>
        <span class="blu-field__msg" v-if="inquiryDetail">
          {{ i18n("DIGITAL.PLN_PREPAID.NAME") }}
          {{ inquiryDetail.CUSTOMER_NAME }}
        </span>
      </BliField>
      <template v-if="productData">
        <p class="font-16 font-bold">
          {{ i18n("DIGITAL.PLN_PREPAID.NOMINAL") }}
        </p>
        <div class="products" v-if="ableToSelectProduct">
          <div class="product" v-for="product in products" :key="product.sku">
            <BliChipChoice
              type="radio"
              :value="product.sku"
              @change="onSelectNominal(product.sku)"
              :checked="product.sku === selectedSku"
              :itemValue="product.sku"
              v-model="selectedSku"
              :class="product.sku === selectedSku ? 'unclikable' : ''"
            >
              {{ product.nominal | currency }}
            </BliChipChoice>
          </div>
        </div>
      </template>
    </div>
    <cart-summary :validToPay="validToPay" :paymentRequest="paymentRequest" />
  </div>
</template>

<script src="./js/pln-prepaid.js" />
<style lang="scss" scoped>
.pln--prepaid {
  .products {
    display: flex;
    flex-flow: row wrap;
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
</style>
