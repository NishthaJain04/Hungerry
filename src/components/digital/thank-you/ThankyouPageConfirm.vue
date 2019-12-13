<template>
  <div class="thankyou--page__confirm" :class="baseClass">
    <div class="order--summary">
      <div class="order--summary__header">
        <img v-if="isOrderSuccess" src="~assets/transaction-success.svg" />
        <img v-else src="~assets/transaction-failed.svg" />
        <div class="font-bold order--status">
          <template v-if="isOrderSuccess">
            {{ i18n("DIGITAL.THANK_YOU.SUCCESS") }}
          </template>
          <template v-else>
            {{ i18n("DIGITAL.THANK_YOU.FAILED") }}
          </template>
        </div>
        <div class="currency">{{ order.payment.amount | currency }}</div>
      </div>
      <div class="order--summary__content">
        <div class="order--info">
          <div class="table-row">
            <div class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER") }}
            </div>
            <div class="value">
              {{ orderTypeDescription }}
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
          <template v-if="isOrderSuccess">
            {{ i18n("DIGITAL.THANK_YOU.RECEIPT") }}
          </template>
          <template v-else>
            {{ i18n("DIGITAL.THANK_YOU.FAILED_MESSAGE") }}
          </template>
        </div>
      </div>
      <div class="order--summary__footer">
        <div class="circle" />
        <div @click="showOrderDetail">
          {{ i18n("DIGITAL.THANK_YOU.DETAIL") }}
        </div>
        <div class="circle" />
      </div>
    </div>
    <overlay-popup
      :isOpen="orderDetailVisible"
      :closeVisible="true"
      :closePopup="closeOrderDetail"
    >
      <div class="order--detail">
        <div class="order--detail__price">
          <div class="font-grey font-bold">
            {{ i18n("DIGITAL.THANK_YOU.PRICE_DETAIL") }}
          </div>
          <div class="price--table">
            <div class="table-row">
              <div class="label">
                {{ i18n("DIGITAL.THANK_YOU.ORDER_ID") }}
              </div>
              <div class="value">{{ order.orderId }}</div>
            </div>
            <div class="table-row">
              <div class="label">
                {{ i18n("DIGITAL.THANK_YOU.ORDER_DATE") }}
              </div>
              <div class="value">{{ order.orderDate | date }}</div>
            </div>
            <div class="table-row">
              <div class="label">
                {{ i18n("DIGITAL.THANK_YOU.TOTAL_PRICE") }}
              </div>
              <div class="value font-green">{{ order.payment.amount | currency }}</div>
            </div>
            <div class="table-row" v-if="order.totalCashbackAmount">
              <div class="label">
                {{ i18n("DIGITAL.THANK_YOU.CASHBACK") }}
              </div>
              <div class="value font-blue-3">{{ order.totalCashbackAmount | currency }}</div>
            </div>
          </div>
        </div>
        <div class="font-grey font-bold padding-left-16 margin-top-16">
          {{ i18n("DIGITAL.THANK_YOU.ORDER") }}
        </div>
        <bpjs-detail v-if="order.productType === 'BPJS'" />
        <game-voucher-detail
          v-else-if="order.productType === 'GAME_VOUCHER'"
        />
        <package-data-detail
          v-else-if="order.productType === 'DATA_PACKAGE'"
        />
        <pdam-detail v-else-if="order.productType === 'WATER_BILL'" />
        <pln-detail v-else-if="order.productType === 'ELECTRICITY_CREDIT' || order.productType === 'ELECTRICITY_POSTPAID'" />
        <balance-detail v-else-if="order.productType === 'WALLET_BALANCE'" />
        <pulsa-detail v-else />

        <div class="help">
          <div class="help--title font-grey font-bold">
            {{ i18n("DIGITAL.THANK_YOU.HELP") }}
          </div>
          <div class="help--description">
            {{ i18n("DIGITAL.THANK_YOU.HELP_DESCRIPTION") }}
          </div>
          <div class="help--button">
            <div class="help--button__item">
              <a href="tel:021-579-777-00">
                {{ i18n("DIGITAL.THANK_YOU.CALL_US") }}
              </a>
            </div>
            <div>
              <a target="_blank" href="https://livechat.blibli.com/chatserver/chatwindow.aspx?siteid=1000185&planId=882">
                {{ i18n("DIGITAL.THANK_YOU.MESSAGE") }}
              </a>
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

<script src="./js/thankyou-page-confirm.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.thankyou--page__confirm {
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
      .font-green {
        margin-top: 17px;
      }
      .currency {
        font-size: 32px;
      }
      img {
        margin-top: -130px;
      }
    }
    &__content {
      padding: 16px;
      .order--info {
        display: table;
        width: 100%;
        .value {
          text-align: right;
        }
        .label {
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .order--label {
        text-align: center;
        background-color: #daedc2;
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
    &__price {
      padding: 16px;
      border-bottom: 1px solid $color-grey-lighter;
      .price--table {
        width: 100%;
        display: table;
        border-spacing: 4px;
      }
    }

    &__product {
      padding: 16px;
      border-bottom: 1px solid $color-grey-lighter;
      .product--table {
        display: table;
        width: 100%;
        border-spacing: 4px;
      }
    }

    .help {
      padding: 16px;
      &--button {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        div {
          width: 45%;
          color: #0095da;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          text-align: center;
          padding: 5px;
        }
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

.thankyou--page__confirm.order--success {
  background-color: $color-blue-5;
  .order--status {
    color: $color-green;
  }

  .order--summary {
    &__footer {
      .circle {
        background-color: #0096d9;
      }
    }
    &__content {
      .order--label {
        background-color: #daedc2;
      }
    }
  }
}

.thankyou--page__confirm.order--failed {
  background-color: $color-red;
  .order--status {
    color: $color-red;
  }
  .order--summary {
    &__footer {
      .circle {
        background-color: $color-red;
      }
    }
    &__content {
      .order--label {
        background-color: #f9b9bc;
      }
    }
  }
}
</style>
