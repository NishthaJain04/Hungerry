<template>
  <div class="game--voucher">
    <digital-header title="Game Voucher" />
    <div class="game--voucher__content padding-16">
      <BliDropdown
        v-model="operator"
        selection
        @selectItem="onChooseOperator"
        autoclose
      >
        <label slot="label">
          Jenis Voucher
        </label>
        <BliList scrollable>
          <BliListItem
            v-for="operator in operators"
            :value="operator.name"
            :key="operator.name"
          >
            {{ operator.description }}
          </BliListItem>
        </BliList>
      </BliDropdown>
      <div class="products">
        <div class="product" v-for="product in products" :key="product.sku">
          <div>
            <div>{{ product.name }}</div>
            <div class="font-grey" v-html="product.description" />
          </div>
          <div>
            <BliChipChoice
              outline
              type="radio"
              :itemValue="product.sku"
              v-model="selectedSku"
              :class="product.sku === selectedSku ? 'unclikable' : ''"
              @change="onSelectNominal(product.sku)"
            >
              {{ product.nominal | currency }}
            </BliChipChoice>
          </div>
        </div>
      </div>
    </div>
    <customer-number-modal />
    <digital-cart :validToPay="!!(cart && !cart.walletPaymentMethod.disabled)" :paymentRequest="paymentRequest" />
  </div>
</template>

<script src="./js/game-voucher.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";
.game--voucher {
  &__content {
    padding-bottom: 150px;
    .products {
      margin-top: 16px;
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
        border-bottom: 1px solid $color-grey-lighter;
        padding-bottom: 16px;
        margin-bottom: 16px;
      }
    }
  }
}

</style>
