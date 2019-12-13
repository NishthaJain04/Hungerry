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
                    ? i18n("BLI_PAY_CASHOUT.WITHDRAW_SUCCESS")
                    : i18n("DIGITAL.THANK_YOU.FAIL")
                    }}
                </div>
                <div class="currency font-bold">{{ orderDetails.totalOrder | currency}}</div>
            </div>
            <div class="order--summary__content">
                <div class="order--info">
                    <div class="mt-1">
            <span class="label">
              {{ i18n("DIGITAL.THANK_YOU.ORDER") }}
            </span>
                        <div class="value">
                            {{i18n('BLI_PAY_CASHOUT.TYPE_TRANSACTION')}}
                        </div>
                    </div>
                    <div class="mt-1">
            <span class="label">
              {{ i18n("BLI_PAY_CASHOUT.DATE_TIME") }}
            </span>
                        <div class="value">
                            {{ orderDetails.transactionDateTime | date('dd MMM yyyy, hh:mm a') }}
                        </div>
                    </div>
                    <div class="mt-1">
            <span class="label">
              {{ i18n("BLI_PAY_CASHOUT.AVAILABLE_SALDO") }}
            </span>
                        <div class="value font-bold">
                            {{ orderDetails.availableWalletBalance | currency}}
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
              ? i18n("BLI_PAY_CASHOUT.CASHOUT_SUCCESS")
              : i18n("BLI_PAY_CASHOUT.CASHOUT_FAIL")
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
                :title="i18n('BLI_PAY_CASHOUT.ORDER_DETAILS')"
        >
            <div class="order--detail">
                <div class="order--detail__price">
                    <div class="price--table">
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("DIGITAL.THANK_YOU.ORDER_ID") }}
                            </div>
                            <div class="value font-bold">{{ orderDetails.orderNumber }}</div>
                        </div>
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("BLI_PAY_CASHOUT.BANK_NAME") }}
                            </div>
                            <div class="value font-bold">{{ orderDetails.bankName }}</div>
                        </div>
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("BLI_PAY_CASHOUT.ON_BEHALF_OF") }}
                            </div>
                            <div class="value">{{ orderDetails.accountHolderName }}</div>
                        </div>
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("BLI_PAY_CASHOUT.ACCOUNT_NUMBER") }}
                            </div>
                            <div class="value">{{ orderDetails.accountNumber }}</div>
                        </div>
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("BLI_PAY_CASHOUT.DATE_TIME") }}
                            </div>
                            <div class="value">{{ orderDetails.transactionDateTime | date('dd MMM yyyy, hh:mm a') }}</div>
                        </div>
                        <div class="table-row">
                            <div class="label">
                                {{ i18n("BLI_PAY_CASHOUT.BALANCE_WITHDRAW_AMOUNT") }}
                            </div>
                            <div class="value">{{ orderDetails.totalOrder | currency }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </overlay-popup>
    </div>
</template>
<script src="./js/cashout-payment-page.js" />
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

        /deep/ .modal-popup {
            min-height: 220px;
        }


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
                    font-size: 14px;
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
                    line-height: 24px;
                    padding: 5px;
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
                font-size: 14px;
                word-break: break-word;
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
