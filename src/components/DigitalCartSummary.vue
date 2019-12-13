<template>
  <div class="product--summary">
    <template v-if="cart">
      <div class="errors" v-if="payErrors">
        <BliTicker closeable type="danger" has-icon aria-close-label="Close notification">
          <div class="ticker__content">
            {{ payErrors.Cart ? i18n(`DIGITAL.ERROR.CART.${payErrors.Cart[0]}`) : i18n('UNKNOWN_ERROR') }}
          </div>
        </BliTicker>
      </div>
      <div class="product--summary__pricing" v-if="showSummary">
        <div class="table-row" v-if="cart.inquiryInfo && cart.inquiryInfo.totalFamilyMembers > 0">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.TOTAL_MEMBER") }}
          </div>
          <div>{{ cart.inquiryInfo.totalFamilyMembers }} Orang</div>
        </div>
        <div class="table-row" v-if="cart.inquiryInfo && cart.inquiryInfo.adminOfferCharge > 0">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.ADMIN_FEE") }}
          </div>
          <div class="">
            {{ cart.inquiryInfo.adminOfferCharge | currency }}
          </div>
        </div>
        <div class="table-row" v-if="cart.inquiryInfo && cart.inquiryInfo.additionalData.BPJS_PAYMENT_PERIOD_RANGE">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.PAYMENT_PERIOD") }}
          </div>
          <div class="">
            {{ cart.inquiryInfo.additionalData.BPJS_PAYMENT_PERIOD_RANGE }}
          </div>
        </div>
        <div class="table-row" v-if="cart.totalOrderAdjustment < 0">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.DISCOUNT") }}
          </div>
          <div class="font-red">-{{ -cart.totalOrderAdjustment | currency }}</div>
        </div>
        <div class="table-row">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.TOTAL") }}
          </div>
          <div>{{ cart.payment.amount | currency }}</div>
        </div>
        <div class="table-row" v-if="cart.walletCashbackAmount">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.CASHBACK") }}
          </div>
          <div class="font-blue-3">{{ cart.walletCashbackAmount | currency }}</div>
        </div>
        <div class="table-row">
          <div class="font-grey">
            {{ i18n("DIGITAL.CART.BLIPAY_BALANCE") }}
          </div>
          <div>{{ cart.walletPaymentMethod.balance | currency }}</div>
        </div>
      </div>
      <div class="product--summary__pay">
        <BliButton color="secondary" block @click="pay" :disabled="!validToPay">
          Bayar Sekarang
        </BliButton>
      </div>
    </template>
    <div class="loader" v-else-if="isAddingToCart"> 
      <loader />
    </div>
    <div class="errors" v-else-if="addCartErrors && showError">
      <BliTicker type="danger" has-icon aria-close-label="Close notification">
        <div class="ticker__content">
          {{ addCartErrors.Inquiry ? i18n(`DIGITAL.ERROR.INQUIRY.${addCartErrors.Inquiry[0]}`) : i18n('UNKNOWN_ERROR') }}
        </div>
      </BliTicker>
    </div>
    <BliModal
      type="info"
      :bli-active="modalVisible"
      @close="modalVisible = false"
      :controls="customControls"
    >
      <BliModalHeader>
        {{ i18n("DIGITAL.CART.NOT_ENOUGH_BALANCE_TITLE") }}
      </BliModalHeader>
      <BliModalBody>
        {{ i18n("DIGITAL.CART.NOT_ENOUGH_BALANCE_DESC") }}
      </BliModalBody>
    </BliModal>
  </div>
</template>

<script src="./js/digital-cart-summary.js" />
<style lang="scss" scoped>
.product--summary {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  max-width: 420px;
  &__pricing {
    box-shadow: 0 -16px 16px -16px rgba(0, 0, 0, 0.12);
    display: table;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    .table-row {
      width: 100%;
      div:last-child {
        text-align: right;
      }
    }
  }
  &__pay {
    padding: 11px 16px;
  }
  .otp-label {
    margin-bottom: 25px;
    padding: 9px;
  }
  .loader {
    display: flex;
    justify-content: center;
  }
}
</style>
