<template>
  <div>
    <div class="pln--postpaid padding-16">
      <BliField :type="fieldStyle" b-clearable>
        <BliInput
          @input="onInputNumber"
          :value="plnNumber"
          :maxlength="maxNumber"
          type="text"
          ref="number"
          pattern="[0-9]*"
          inputmode="numeric"
        />
        <label>
          {{ i18n("DIGITAL.PLN_POSTPAID.CUSTOMER_NUMBER") }}
        </label>
        <span class="blu-field__msg" v-if="isAddCartError">
          {{ i18n(`DIGITAL.ERROR.CART.${errorValue}`) }}
        </span>
        <span class="blu-field__msg" v-else-if="cart">
          {{ i18n("DIGITAL.PLN_POSTPAID.NAME") }}
          {{ cart.inquiryInfo.customerName }}
        </span>
      </BliField>
      <template v-if="cart">
        <div>
          {{ i18n("DIGITAL.PLN_POSTPAID.BILL_DETAIL") }}
        </div>
        <div class="cart--detail">
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.METER_NUMBER") }}
            </div>
            <div class="value">
              {{ cart.inquiryInfo.customerId }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.NAME") }}
            </div>
            <div class="value">
              {{ cart.inquiryInfo.customerName }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.POWER_RATING") }}
            </div>
            <div class="value">
              {{ cart.inquiryInfo.additionalData.POWER_RATING }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.USAGE_PERIOD") }}
            </div>
            <div class="value">
              {{
                cart.inquiryInfo.additionalData
                  .POSTPAID_PLN_PAYMENT_PERIOD_RANGE
              }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.BILLING") }}
            </div>
            <div class="value">
              {{ cart.inquiryInfo.amount | currency }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.FINE") }}
            </div>
            <div class="value font-red">
              {{ cart.inquiryInfo.additionalData.TOTAL_PENALTY | currency }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.ADMIN_FEE") }}
            </div>
            <div class="value">
              {{ cart.inquiryInfo.adminOfferCharge | currency }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.TOTAL") }}
            </div>
            <div class="value">
              {{ cart.payment.amount | currency }}
            </div>
          </div>
          <div class="table-row" v-if="cart.walletCashbackAmount">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.CASHBACK") }}
            </div>
            <div class="value font-blue-3">
              {{ cart.walletCashbackAmount | currency }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.PLN_POSTPAID.BLIPAY_BALANCE") }}
            </div>
            <div class="value">
              {{ cart.walletPaymentMethod.balance | currency }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <cart-summary :validToPay="validToPay" :showSummary="false" :paymentRequest="paymentRequest" :showError="false"/>
  </div>
</template>

<script src="./js/pln-postpaid.js" />
<style lang="scss" scoped>
.pln--postpaid {
  .cart--detail {
    display: table;
    border-spacing: 8px;
    padding-bottom: 50px;
    width: 100%;
    .table-row {
      .value {
        text-align: right;
      }
      .label {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
