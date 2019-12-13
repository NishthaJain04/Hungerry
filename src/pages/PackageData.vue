<template>
  <div class="package--data">
    <digital-header :title="i18n('DIGITAL.PACKAGE_DATA.HEADER')" />
    <div class="package--data__content">
      <BliField :type="fieldStyle" b-clearable>
        <BliInput
          @input="onInputPhoneNumber"
          :value="phoneNumber"
          :maxlength="phoneNumberMaxLength"
          type="text"
          ref="number"
          pattern="[0-9]*"
          inputmode="numeric"
        />
        <label>
          {{ i18n("DIGITAL.PACKAGE_DATA.PHONE_NUMBER") }}
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
          {{ i18n("DIGITAL.PACKAGE_DATA.NOMINAL") }}
        </p>
        <div class="products">
          <div class="product" v-for="product in products" :key="product.sku">
            <div>
              <div>{{ product.name }}</div>
              <div
                class="font-blue-3 font-bold"
                @click="showDetail(product.sku)"
              >
                {{ i18n("DIGITAL.PACKAGE_DATA.DETAIL") }}
              </div>
            </div>
            <div>
              <BliChipChoice
                outline
                type="radio"
                :value="product.sku"
                :class="product.sku === selectedSku ? 'unclikable' : ''"
                @change="onSelectNominal(product.sku)"
              >
                {{ product.nominal | currency }}
              </BliChipChoice>
            </div>
          </div>
        </div>
      </template>
    </div>
    <cart-summary :validToPay="validToPay" :paymentRequest="paymentRequest" />
    <overlay-popup
      v-if="selectedProductDetail"
      :isOpen="productDetailVisible"
      closeVisible
      :closePopup="closeDetail"
    >
      <div class="text-left padding-16">
        <div class="font-bold">{{ selectedProductDetail.name }}</div>
        <div v-html="selectedProductDetail.description" />
      </div>
    </overlay-popup>
  </div>
</template>

<script src="./js/package-data.js" />
<style lang="scss" scoped>
.package--data {
  &__header {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #eaeff3;
  }

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
      .product {
        display: flex;
        align-items: center;
        &>div:last-child {
          margin-left: auto;
          /deep/ .blu-chip {
            /deep/ span {
              padding: 15px 8px;
              border-radius: 8px;
              height: 48px;
            }
          }
        }
        border-bottom: 1px solid #eaeff3;
        padding-bottom: 16px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
