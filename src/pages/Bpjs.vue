<template>
  <div class="bpjs">
    <digital-header title="BPJS" />
    <div class="bpjs--content padding-16">
      <BliField :type="fieldStyle" b-clearable>
        <BliInput
          type="text"
          @input="onInputBpjsNumber"
          :value="bpjsNumber"
          :disabled="!canInputNumber"
          :maxlength="maxNumber"
          ref="number"
          pattern="[0-9]*"
          inputmode="numeric"
        />
        <label>
          Nomor Peserta BPJS Kesehatan
        </label>
        <span class="blu-field__msg" v-if="isAddCartError">
            {{ addCartErrors.Cart ? i18n(`DIGITAL.ERROR.CART.${addCartErrors.Cart[0]}`) : i18n('UNKNOWN_ERROR') }}
          </span>
          <span class="blu-field__msg" v-else-if="cart && cart.inquiryInfo">
            {{ i18n("DIGITAL.PDAM.NAME") }}
            {{ cart.inquiryInfo.customerName }}
          </span>
      </BliField>
      <p class="font-16 font-bold">
        Nominal BPJS
      </p>
      <div class="products">
        <div class="product" v-for="period in periods" :key="period.period">
          <div>
            <div>{{ period.period }} Bulan</div>
            <div>Periode {{ period.description }}</div>
          </div>
          <div>
            <BliChipChoice
              outline
              type="radio"
              v-model="selectedPeriod"
              :itemValue="period.period"
              @change="onSelectPeriod(period.period)"
            >
              {{ period.period }} Bln
            </BliChipChoice>
          </div>
        </div>
      </div>
    </div>
    <customer-number-modal />
    <cart-summary :validToPay="validToPay" :paymentRequest="paymentRequest" :showError="false"/>
  </div>
</template>

<script src="./js/bpjs.js" />
<style lang="scss" scoped>
.bpjs {
  &--content {
    .products {
      padding-bottom: 200px;
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
