<template>
  <div class="pdam">
    <digital-header title="PDAM" />
    <div class="pdam--content">
      <BliDropdown
        v-model="operator"
        selection
        @selectItem="onChooseOperator"
        autoclose
      >
        <label slot="label">
          {{ i18n("DIGITAL.PDAM.OPERATING_AREA") }}
        </label>
        <BliList scrollable>
          <b class="company--label">
            {{ i18n("DIGITAL.PDAM.OPERATING_AREA") }}
          </b>
          <div class="search--input">
            <img class="icon" src="@/assets/icons/icon-search.svg" />
            <input @input="onInputQuery" />
          </div>
          <BliListItem
            v-for="childOperator in childOperatorsFiltered"
            :value="childOperator.name"
            :key="childOperator.name"
          >
            {{ childOperator.description }}
          </BliListItem>
        </BliList>
      </BliDropdown>
      <div class="margin-top-16">
        <BliField :type="fieldStyle" b-clearable>
          <BliInput
            @input="onInputNumber"
            :value="number"
            :maxlength="maxNumber"
            :disabled="!canInputNumber"
            type="text"
            ref="number"
            pattern="[0-9]*"
            inputmode="numeric"
          />
          <label>
            {{ i18n("DIGITAL.PDAM.CUSTOMER_NUMBER") }}
          </label>
          <span class="blu-field__msg" v-if="isAddCartError">
            {{ addCartErrors.Cart ? i18n(`DIGITAL.ERROR.CART.${addCartErrors.Cart[0]}`) : i18n('UNKNOWN_ERROR') }}
          </span>
          <span class="blu-field__msg" v-else-if="cart">
            {{ i18n("DIGITAL.PDAM.NAME") }}
            {{ cart.inquiryInfo.customerName }}
          </span>
        </BliField>
      </div>
    </div>
    <customer-number-modal />
    <DigitalCart
      :validToPay="validToPay"
      :paymentRequest="paymentRequest"
      :showError="false"
    />
  </div>
</template>

<script src="./js/pdam.js" />
<style lang="scss" scoped>
.pdam {
  &--content {
    padding: 16px;
    @media screen and (max-width: 768px) {
      ::v-deep .blu-dropdown__content {
        padding-top: 0;
        .blu-list {
          max-height: 80vh !important;
          min-height: 80vh;
        }
      } 
      ::v-deep .blu-dropdown:not(.b-active) {
        .blu-dropdown__content {
          bottom: -100%;
        }
      }
    }
    .search--input {
      border-radius: 19px;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      background-color: #f1f1f1;
      margin: 16px;
      padding: 9px;
      display: flex;
      input {
        background-color: transparent;
        border: 0;
        width: 100%;
        font-size: 16px;
      }
    }
    .company--label {
      margin-left: 16px;
    }
  }
}
</style>
