<template>
  <div class="thankyou--page__confirm">
    <div class="order--summary">
      <div class="order--summary__header">
        <img src="~assets/transaction-waiting.svg" />
        <div class="font-grey">
          {{ i18n("DIGITAL.THANK_YOU.PAYMENT_CALL") }}
        </div>
        <div class="order--date">{{ order.expiredOrderDate | date }}</div>
      </div>
      <div class="order--summary__content">
        <div class="order--info">
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER") }}
            </div>
            <div class="value">
              {{ order.item.name || i18n(`DIGITAL.THANK_YOU.ORDER_TYPE.${order.productType}`) }}
            </div>
          </div>
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER_DATE") }}
            </div>
            <div class="value">{{ order.orderDate | date }}</div>
          </div>
        </div>
        <div class="order--label">
          {{
          i18n("DIGITAL.THANK_YOU.PAYMENT_INSTRUCTION", paymentCode)
          }}
        </div>
      </div>
      <div class="order--summary__footer">
        <div class="circle" />
        <div @click="showPaymentInstruction">
          {{ i18n("DIGITAL.THANK_YOU.VIEW_PAYMENT_INSTRUCTION") }}
        </div>
        <div class="circle" />
      </div>
    </div>
    <overlay-popup
      :isOpen="orderDetailVisible"
      :closeVisible="true"
      :closePopup="closePaymentInstruction"
      :title="order.payment.description"
    >
      <div class="order--detail">
        <div>{{ i18n("DIGITAL.THANK_YOU.TOPUP_INSTRUCTION") }}</div>
        <div class="instructions-wrapper" v-if="order.paymentInstruction && order.paymentInstruction.instructions">
          <ul class="instructions">
            <li
              class="instruction"
              v-for="(instruction, index) in order.paymentInstruction.instructions"
              :key="index"
            >
              <div class="counter">
                <div>{{ index + 1 }}</div>
              </div>
              <div class="content" v-html="instruction" />
            </li>
          </ul>
        </div>
        <div class="payment--info">
          <div>
            <div class="font-grey">
              {{ i18n("DIGITAL.THANK_YOU.PAYMENT_CODE") }}
            </div>
            <div class="font-bold">{{ paymentCode }}</div>
          </div>
          <div>
            <div v-clipboard:copy="paymentCode">
              {{ i18n("DIGITAL.THANK_YOU.COPY") }}
            </div>
          </div>
        </div>
      </div>
    </overlay-popup>
    <router-link to="/" class="home__button--wrapper">
      <div class="home__button">
        {{ i18n("DIGITAL.THANK_YOU.TO_HOME") }}
      </div>
    </router-link>
  </div>
</template>

<script src="./js/payment-instruction.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.thankyou--page__confirm {
  background-color: $color-blue-5;
  height: 100vh;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .order--summary {
    width: 100%;
    border-radius: 8px;
    background-color: white;
    &__header {
      text-align: center;
      padding-top: 70px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eaeff3;
      display: flex;
      flex-direction: column;
      .font-grey {
        margin-top: 17px;
      }
      .order--date {
        font-size: 24px;
        color: #f37021;
        font-weight: bold;
      }
      img {
        margin-top: -130px;
      }
    }
    &__content {
      padding: 16px;
      .order--info {
        width: 100%;
        display: table;
        .value {
          text-align: right;
        }
        .label {
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .order--label {
        text-align: center;
        background-color: #daf3ff;
        border-radius: 8px;
        padding: 5px;
        margin-top: 16px;
      }
      padding-bottom: 30px;
      border-bottom: 1px dashed #eaeff3;
    }
    &__footer {
      text-align: center;
      color: #0095da;
      padding: 18px;
      font-weight: bold;
      position: relative;
      .circle {
        width: 30px;
        height: 30px;
        background-color: #0096d9;
        border-radius: 100%;
        position: absolute;
        &:first-child {
          left: -15px;
          top: -15px;
        }
        &:last-child {
          top: -15px;
          right: -15px;
        }
      }
    }
  }

  .order--detail {
    text-align: left;
    padding: 16px;
    .instructions-wrapper {
      overflow-y: auto;
      max-height: 70vh;
      padding-bottom: 70px;
      .instructions {
        list-style: none;
        display: table;
        padding: 0;
        border-spacing: 0px 7px;
        .instruction {
          display: table-row;
          text-align: left;
          div {
            display: table-cell;
          }
          .counter {
            width: 22px;
            div {
              color: white;
              text-align: center;
              min-width: 22px;
              height: 22px;
              border-radius: 100%;
              background-color: #0095da;
            }
          }
          .content {
            padding-left: 10px;
          }
        }
      }
    }
    div {
      /deep/ ol {
        padding-left: 16px;
      }
    }

    .payment--info {
      display: flex;
      align-items: center;
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 16px;
      left: 0;
      border-top: 1px solid #eaeff3;
      background-color: white;

      > div:last-child {
        margin-left: auto;
        border-radius: 8px;
        border: solid 2px #e0e0e0;
        padding: 5px 20px;
        color: #0095da;
      }
    }

    .table-row {
      width: 100%;
      .value {
        text-align: right;
      }
      .label {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  /deep/ .overlay-wrapper {
    .modal-popup {
      min-height: 90%;
    }
  }
  .home__button--wrapper {
    position: absolute;
    color: white;
    bottom: 16px;
    padding: 16px;
    width: 100%;
    .home__button {
      text-align: center;
      border: solid 2px #ffffff;
      border-radius: 8px;
      padding: 7px;
    }
  }
}

</style>
