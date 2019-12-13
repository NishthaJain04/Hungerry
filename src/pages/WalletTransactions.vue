<template>
    <div class="wallet-transactions">
        <DigitalHeader
                exitPath="/"
                :title="i18n('HOME_PAGE.BALANCE_HISTORY')">
        </DigitalHeader>
        <div class="wallet-transactions__list">
            <CommonLoader v-if="isLoadingTransactions"/>
            <div class="wallet-transactions__list__no-transactions" v-if="!isLoadingTransactions && !getWalletTransactions.length">
                <img src="~assets/icons/notification-empty.svg" alt="not_found">
                <div class="wallet-transactions__list__no-transactions__text">
                    {{i18n('HOME_PAGE.NO_TRANSACTION_YET')}}
                </div>
            </div>
            <div v-if="!isLoadingTransactions">
                <div class="wallet-transactions__list__item"
                     v-for="item in getSortedTransactions"
                     v-bind:key="item.transactionId"
                >
                <span class="detail">
                    <span class="payment ellipsis">{{item.description}}</span>
                    <span class="timestamp">{{parseInt(item.date) | date('hh:mm a, dd/MM/yyyy')}}</span>
                 </span>
                 <span class="denomination" :class="getTransactionClass(item)">
                     <b v-if="getTransactionClass(item) === 'debit'">-</b>
                     <b v-if="getTransactionClass(item) === 'credit'">+</b>
                     {{item.amount | currency}}
                 </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./js/wallet-transactions.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.wallet-transactions {
    &__list {
        max-height: calc(100vh - 55px);
        overflow-y: scroll;

        &__item {
            margin-left: 16px;
            padding: 10px 16px 10px 0;
            border-bottom: 1px solid $color-grey;

            .detail{
                .payment{
                    width: 75%;
                    display: block;
                }
                .timestamp {
                    color: $color-grey-shade;
                    font-size: 14px;
                }
            }

            .denomination{
                float: right;
                font-weight: bold;

                &.credit {
                    color: $color-green;
                }
                &.debit {
                    color: $color-red-1;
                }
                &.failed {
                    color: $color-grey-shade-3;
                }
            }
        }

        &__no-transactions {
            margin-top: 30%;
            img {
                margin: 0 auto;
                max-width: 80%;
            }
            &__text {
                font-family: EffraMedium, 'sans-sarif', serif;
                font-size: 18px;
                text-align: center;
                margin-top: 18px;
            }
        }
    }
}
</style>
