<template>
  <div class="blipay--cart" v-if="cart">
    <digital-header title="Konfirmasi Order" />
    <div class="blipay--cart__product">
      <div class="product--label">
        {{ i18n("DIGITAL.BLIPAY.PRODUCT_LABEL") }}
      </div>
      <div class="product--summary">
        <div class="product--summary__image">
          <img src="@/assets/icons/mitrapay.svg" />
        </div>
        <div class="product--summary__description">
          <div>
            {{ i18n("DIGITAL.BLIPAY.BLIPAY_BALANCE") }}
          </div>
          <div class="font-grey">{{ cart.item.nominal | currency }}</div>
        </div>
      </div>
    </div>
    <div class="blipay--cart__payment">
      <div class="font-bold payment-label">
        {{ i18n("DIGITAL.BLIPAY.PAYMENT_METHOD") }}
      </div>
      <template v-for="paymentCategory in cart.paymentCategoryList">
        <template v-for="paymentOption in paymentCategory.paymentOptionList">
          <template v-for="paymentMethod in paymentOption.paymentMethodList">
            <div class="payments" :key="paymentMethod.method">
              <div class="payment">
                <div class="payment--logo">
                  <img :src="getPaymentIcon(paymentMethod.method)" />
                </div>
                <div class="payment--description">
                  <div class="payment--name">
                    <div>{{ paymentOption.name }}</div>
                    <div class="selection--button">
                      <BliRadio
                        v-model="selectedPaymentMethod"
                        :value="paymentMethod.method"
                        @change="changePayment"
                      />
                    </div>
                  </div>
                  <div class="font-14 font-grey" v-html="paymentMethod.tnc" />
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
    </div>

    <div class="blipay--cart__pay">
      <BliButton
        color="secondary"
        block
        :disabled="!validToPay"
        @click="payOrder"
      >
        {{ i18n("DIGITAL.BLIPAY.PAY") }}
      </BliButton>
    </div>
  </div>
</template>

<script src="./js/blipay-cart.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.blipay--cart {
  min-height: 100vh;
  position: relative;
  &__product {
    padding: 16px;
    .product--label {
      margin-bottom: 28px;
      font-weight: bold;
    }
    .product--summary {
      display: flex;
      &__description {
        margin-left: 20px;
      }
    }
  }

  &__payment {
    .payment-label {
      margin-left: 16px;
      margin-bottom: 6px;
      margin-top: 25px;
    }
    .payments {
      .payment {
        display: flex;
        margin-left: 16px;
        border-bottom: solid 1px $color-grey-lightest-1;
        padding-bottom: 15px;
        padding-top: 16px;
        &--logo {
          width: 15%;
        }
        &--description {
          width: 80%;
          padding: 0 16px;
          .payment--name {
            display: flex;
            .selection--button {
              margin-left: auto;
              /deep/ .blu-radio {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }

  &__pay {
    padding: 12px 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: solid 1px $color-grey-lightest-1;
  }
}
</style>
