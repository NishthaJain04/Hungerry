<template>
  <div
    class="thankyou--page__confirm"
    :class="backgrounColorClass"
  >
    <div class="order--summary">
      <div class="order--summary__header">
        <img :src="headerIcon" />
        <div
          class="font-bold"
          :class="isSuccess ? 'font-green' : 'font-red'"
        >
          {{
          isSuccess
              ? i18n("DIGITAL.THANK_YOU.SUCCESS")
              : i18n("DIGITAL.THANK_YOU.FAIL")
          }}
        </div>
        <div class="currency font-bold">{{ orderDetails.paymentAmount | currency }}</div>
      </div>
      <div class="order--summary__content">
        <div class="order--info">
          <div class="">
            <span class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER") }}
            </span>
            <div class="value">
              {{ orderDetails.orderId }}
            </div>
          </div>
          <div class="">
            <span class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER_DATE") }}
            </span>
            <div class="value">{{ orderDetails.orderDate | date}}</div>
          </div>
          <div class="">
            <span class="label">
              {{ i18n("DIGITAL.THANK_YOU.BALANCE") }}
            </span>
            <div class="value font-bold">
              {{ walletBalance | currency }}
            </div>
          </div>
        </div>
        <div
          class="order--label"
          :class="labelBackgrounColorClass"
        >
          <img
            :src="statusIcon"
            class="statusIcon"
          />
          <span>{{
            isSuccess
              ? i18n("DIGITAL.THANK_YOU.RECEIPT")
              : i18n("DIGITAL.THANK_YOU.RECEIPT_FAIL")
          }}</span>
        </div>
      </div>
      <div
        class="order--summary__footer"
        :class="isSuccess ? 'font-blue-3' : 'font-red'"
      >
        <div
          class="circle"
          :class="backgrounColorClass"
        ></div>
        <div @click="showOrderDetail">
          {{ i18n("DIGITAL.THANK_YOU.DETAIL") }}
        </div>
        <div
          class="circle"
          :class="backgrounColorClass"
        ></div>
      </div>
      <div class="returnButton">
        <router-link to="/">
          <BliButton block outline>
            {{ i18n("BLI_PAY_CASHOUT.RETURN_TO_HOME_PAGE") }}
          </BliButton>
        </router-link>
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
            {{ i18n("BLI_PAY_CASHOUT.ORDER_DETAILS") }}
          </div>
          <div class="price--table">
            <div class="table-row">
              <div class="label">{{ i18n("DIGITAL.THANK_YOU.ORDER_ID") }}</div>
              <div class="value">{{ orderDetails.orderId }}</div>
            </div>

            <div class="table-row">
              <div class="label">{{ i18n("DIGITAL.THANK_YOU.TRANSACTION_DATE") }}</div>
              <div class="value">{{ orderDetails.orderDate | date }}</div>
            </div>

            <div class="table-row" v-if="orderDetails.totalOrder !== 0">
              <div class="label">{{ i18n("ORDER_PRICE") }}</div>
              <div class="value">{{ Math.abs(orderDetails.totalOrder) | currency }}</div>
            </div>

            <div class="table-row" v-if="orderDetails.totalOrderAdjustment !== 0">
              <div class="label">{{ i18n("ORDER_PRICE") }}</div>
              <div class="value">{{ Math.abs(orderDetails.totalOrderAdjustment) | currency }}</div>
            </div>

            <div class="table-row" v-if="orderDetails.totalShipping !== 0">
              <div class="label">{{ i18n("SHIPPING_COST") }}</div>
              <div class="value">{{ Math.abs(orderDetails.totalShipping) | currency }}</div>
            </div>

            <div class="table-row" v-if="orderDetails.totalShippingAdjustment !== 0">
              <div class="label">{{ i18n("DISCOUNT_SHIPPING") }}</div>
              <div class="value font-blue-3">- {{ Math.abs(orderDetails.totalShippingAdjustment) | currency }}</div>
            </div>

            <div class="table-row">
              <div class="label">{{ i18n("DIGITAL.ORDER.TOTAL_PAYMENT") }}</div>
              <div class="value">{{ orderDetails.paymentAmount  | currency }}</div>
            </div>
          </div>
        </div>
        <div class="order--detail__product">
          <div class="font-grey font-bold">
            {{ i18n("DIGITAL.THANK_YOU.ITEM_DETAILS") }}
          </div>
          <div class="product--table">
            <div class="table-row">
              <div class="label">{{ i18n("DIGITAL.THANK_YOU.ORDER") }}</div>
              <div class="value">{{ i18n("HOME_PAGE.PRODUCTS.GROCER")}}</div>
            </div>
            <div class="table-row">
              <div class="label">{{ i18n("DIGITAL.THANK_YOU.TOTAL_GOODS") }}</div>
              <div class="value">{{ orderDetails.itemQuantity }} {{i18n("DIGITAL.THANK_YOU.GOODS")}}</div>
            </div>
          </div>
        </div>
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
  </div>
</template>
<script src="./js/payment-page.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.thankyou--page__confirm {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .order--summary {
    width: 100%;
    border-radius: 8px;
    background-color: $color-white;
    &__header {
      text-align: center;
      padding-top: 70px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eaeff3;
      display: flex;
      flex-direction: column;
      font-family: EffraMedium, sans-serif;
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
        .value {
          float: right;
          color: $color-black;
        }
        .label {
          color: $color-grey-shade-1;
        }
      }
      .order--label {
        text-align: center;
        border-radius: 8px;
        margin-top: 16px;
        color: $color-grey-shade-1;
        font-size: 14px;
        line-height: 36px;
        height: 36px;
        .statusIcon {
          display: inline-block;
          vertical-align: middle;
        }
      }
      padding-bottom: 30px;
      border-bottom: 1px dashed $color-grey-lighter;
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
    .returnButton {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      padding: 20px 16px;
      .blu-btn {
        color: $color-white;
        font-family: EffraMedium, sans-serif;
      }
      a {
        color: transparent;
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
    .table-row {
      width: 100%;
      .value {
        text-align: right;
      }
      .label {
        color: rgba(0, 0, 0, 0.6);
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
  }
}
</style>
