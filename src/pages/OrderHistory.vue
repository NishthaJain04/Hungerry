<template>
  <div class="order--history">
    <div class="order--history__header">
      <!-- v-if="memberType === 'donator'" -->
      <b>
        Your Donations
      </b>
      <!-- v-else -->
      <!-- <b>
        Your Collections
      </b> -->
      <img
        class="notification"
        src="~assets/icons/icon-bell.svg" />
    </div>
    <div class="order--history__product-type">
      <product-type />
    </div>
    <div class="order--history__listing margin-top-16">
      <div class="status--filter margin-bottom-16">
        <div>
          <!-- <BliChipChoice
            :class="filter.code === selectedOrderStatusFilter ? 'unclikable' : ''"
            v-for="filter in orderStatusFilter"
            type="radio"
            :key="filter.code"
            :itemValue="filter.code"
            :checked="filter.code === selectedOrderStatusFilter"
            v-model="selectedOrderStatusFilter"
            @change="changeOrderStatusFilter(filter)"
          >
            {{ filter.name }}
          </BliChipChoice> -->
        </div>
      </div>
        <div v-if="getOrderHistory && getOrderHistory.length !== 0">
        <router-link
        v-for="(order, index) in getOrderHistory"
        :key="index"
        :to="getRetailOrderDetailPath(order)"
      >
        <retail-order-summary :key="index" :order="order"/>
        </router-link>
        </div>
      <!-- <infinite-loading v-if="orders.length > 0 || getOrderHistory.length" force-use-infinite-wrapper @infinite="getNextPage">
        <div slot="no-more" class="font-grey">
          ORDER_HISTORY.NO_MORE_DATA
        </div>
      </infinite-loading>
      <div class="loader" v-if="(isFetchingOrderHistory && orders.length === 0) || (isFetchingRetailOrderHistory && getOrderHistory.length === 0)">
        <Loader />
      </div> -->
      <div class="not--found__message" v-if="showEmptyMessage">
          <img src="~assets/icons/icon-own-store.svg" alt="No Data" />
          <div class="not--found__message__heading">ORDER_HISTORY.EMPTY_MESSAGE_HEADING</div>
          <div class="not--found__message__text">ORDER_HISTORY.EMPTY_MESSAGE_TEXT</div>
      </div>
    </div>
  </div>
</template>

<script src="./js/order-history.js" />
<style lang="scss" scoped>
  @import "~assets/scss/colors";

  .order--history {
  .unclikable {
    pointer-events: none;
  }
  font-size: 14px;
  background-color: white;
  min-height: 100vh;
  &__header {
    text-align: center;
    font-size: 16px;
    padding: 16px 0px;
    font-weight: bold;
    .notification {
      position: absolute;
      right: 20px;
      top: 15px;
    }
  }

  &__filter {
    border-bottom: 1px solid $color-grey-lightest-1;
  }

  &__listing {
    padding-bottom: 60px;
    .status--filter {
      white-space: nowrap;
      overflow: auto;
      div {
        margin-left: 16px;
        /deep/ .blu-chip {
          letter-spacing: normal;
          font-size: 16px;
        }
      }
    }
    .not--found__message {
      width: 100%;
      text-align: center;
      margin-top: 10%;
      img{
        margin: 0 auto;
        display: block;
      }
      &__heading {
        font-family: EffraMedium, serif;
        font-size: 20px;
        letter-spacing: normal;
        color: $color-grey-shade-3;
        margin-top: 10px;
      }
      &__text {
        font-size: 16px;
        letter-spacing: normal;
        color: $color-grey-shade-1;
        margin-top: 8px;
        padding: 0 10px;
      }
    }
    .loader {
      text-align: center;
      display: block;
      margin-top: 25%;
    }
  }
}
</style>
