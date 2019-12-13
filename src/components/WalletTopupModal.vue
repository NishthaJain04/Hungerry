<template>
  <div class="wallet--topup__modal">
    <overlay-popup
      title="Pilih cara pembayaran"
      :isOpen="visible"
      closeVisible
      :closePopup="closeModal"
    >
      <div @click.stop>
        <payment-method
          v-if="screenState === 'PAYMENT_METHOD'"
          @changeState="changeScreenState"
        />
        <bank-list
          v-else-if="screenState === 'BANK_LIST'"
          @selectBank="selectBank"
        />
        <va-payments
          :bankCode="bankCode"
          v-else-if="screenState === 'VA_PAYMENT'"
          @selectPaymentMethod="selectPaymentMethod"
        />
        <va-instruction
          :paymentMethod="paymentMethod"
          v-else-if="screenState === 'VA_INSTRUCTION'"
        />
      </div>
    </overlay-popup>
  </div>
</template>

<script src="./js/wallet-topup-modal.js" />

<style lang="scss" scoped>
  .wallet--topup__modal {
    .methods {
      text-align: left;
      .method {
        margin-left: 16px;
        padding: 16px;
        padding-left: 0px;
        display: flex;
        border-bottom: solid 1px #e0e0e0;
        &--detail {
          margin-left: 16px;
          .description {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.38);
          }
        }
      }
    }
  }
</style>
