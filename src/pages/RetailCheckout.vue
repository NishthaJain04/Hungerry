<template>
  <div class="checkout">

    <div class="checkout__header">
      <div class="blu-columns b-mobile b-0 b-gapless checkout__header__wrapper">
        <div class="blu-column b-2 center-text">
          <router-link to="/">
            <img src="~assets/icons/icon-left.svg" alt="Go Back" class="back"/>
          </router-link>
        </div>
        <div class="blu-column b-6 center-text">
          <div class="search-block">
            <img src="~assets/icons/icon-search.svg" class="search-icon" alt="Search"/>
            <input class="search-input ellipsis" :placeholder="i18n('SEARCH_MSG')" @input="getSearchProductList" :value="searchValue"/>
          </div>
        </div>
        <div class="blu-column b-4 center-text">
          <BliButton class="last-order" ghost color="secondary" @click="goToLastOrder"> {{ i18n("LAST_ORDER") }}</BliButton>
        </div>
      </div>
    </div>

    <div class="checkout__categories no-scrollbar blu-columns b-mobile b-0 b-gapless" v-bind:style="mainContainerObject">
      <div class="blu-column b-4 category-wrapper no-scrollbar" v-if="getCategories && getCategories.length">
        <div
           v-for="(category, index) in getCategories"
           class="category-list no-scrollbar"
           :class="selectedCategoryIndex === index ? 'selected': 'not-selected'"
           :key="index" @click="getSelectedCategory(index, category)"
        >
          <div>{{ category.name }}</div>
        </div>
      </div>
      <div class="blu-column b-8 list-wrapper no-scrollbar" infinite-wrapper>
        <div v-if="subCategories && subCategories.length" class="sub-categories-list no-scrollbar">
          <div v-for="(subCat, index) in subCategories" :key="index" class="sub-category">
            <BliChipChoice
              type="radio"
              :value="subCat.name"
              @change="onSubCategorySelect(subCat.code)"
              :checked="subCat.code === selectedSubCat"
              :itemValue="subCat.code"
              v-model="selectedSubCat"
              :class="subCat.code === selectedSubCat ? 'unclickable' : ''"
              >{{ subCat.name }}
            </BliChipChoice>
          </div>
        </div>
        <div v-for="(item, index) in getProductsList" :key="index">
          <ProductList :productList="getProductsList" :item="item" :index="index"/>
        </div>
        <infinite-loading
          v-if="getProductsList.length"
          force-use-infinite-wrapper
          @infinite="getNextPage"
          :distance="100"
        >
          <div slot="no-more" class="font-grey">{{ i18n("ORDER_HISTORY.NO_MORE_PRODUCTS") }}</div>
        </infinite-loading>
        <div v-if="searchValue.length >= 3 && getProductsList.length === 0 && !getIsFetchingList"  class="no-search-result">
          <img src="@/assets/icons/icon-not-verified.svg" />
          <div class="no-search-header">{{ i18n("NO_SEARCH_HEADER") }}</div>
          <div class="no-search-text">{{ i18n("NO_SEARCH_MSG") }}</div>
        </div>
        <div v-if="getProductsList.length === 0 && !getIsFetchingList && !searchValue"  class="no-search-result">
          <img src="@/assets/icons/icon-not-verified.svg" />
          <div class="no-search-header">{{ i18n("NO_PRODUCT_HEADER") }}</div>
          <div class="no-search-text">{{ i18n("NO_PRODUCT_MSG") }}</div>
        </div>
        <div class="loader" v-if="getIsFetchingList && this.getProductsList.length === 0"><Loader></Loader></div>
      </div>
    </div>

    <OverlayPopup
      :isOpen="lastOrderPopupVisible"
      :closePopup="toggleLastOrderPopupVisible"
      closeVisible
      :title="i18n('LAST_ORDER')"
     >
      <div class="last-order-wrapper" v-if="getLastOrder && getLastOrder.orderItems && getLastOrder.orderItems.length">
        <div class="last-order-items" v-for="(item, index) in getLastOrder.orderItems" :key="index">
          <ProductList colSpan1="4" colSpan2="8" :productList="getLastOrder.orderItems" :item="item" :index="index"/>
        </div>
      </div>
      <div v-else>
        <img src="@/assets/icons/notification-empty.svg" class="no-search-image"/>
          <div class="no-search-header">{{ i18n("NO_LAST_ORDER_HEADER") }}</div>
          <div class="no-search-text">{{ i18n("NO_LAST_ORDER_MSG") }}</div>
      </div>
      <div class="last-order-button">
        <BliButton
           v-if="getLastOrder && getLastOrder.orderItems && getLastOrder.orderItems.length"
           color="secondary"
           block
           @click="() => lastOrderPopupVisible = false"
        >
          {{ i18n("ADD_TO_CART") }}
        </BliButton>
      </div>
    </OverlayPopup>

    <Transition effectName="slide-up">
      <div class="checkout__footer" v-if="getCartDetails && getCartDetails.items && getCartDetails.items.length">
        <router-link to="/confirm-order">
          <BliButton block color="secondary" class="pay-now">
            {{ i18n("SEE_CART") }}  {{ totalCartItemCount }} {{ i18n("GOODS") }} - {{ getCartDetails.totalOrder | currency }}
          </BliButton>
        </router-link>
      </div>
    </Transition>

    <div class="addcart-loader" v-if="isAddingItemToCart"><Loader></Loader></div>
  </div>
</template>
<script src="./js/retail-checkout.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.checkout {
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    padding: 9px 0;
    border-bottom: 1px solid $color-grey;
    height: 56px;
    position: relative;

    &__wrapper {
      height: 38px;
      line-height: 38px;

      .back {
        display: inline-block;
        vertical-align: middle;
      }

      .search-block {
        background: $color-grey-light;
        border-radius: 19px;
        color: $color-grey-shade;

        .search-icon {
          display: inline-block;
          transform: translate(4px, 1px);
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
        .search-input {
          background: $color-grey-light;
          border: none;
          transform: translate(-8px, 0px);
          width: 77%;
          font-size: 16px;
          margin-left: 12px;
          color: $color-grey-shade-3;

          &.ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        input::placeholder {
          font-size: 16px;
          font-family: EffraRegular, sans-serif;
          color: $color-grey-shade;
        }
      }
      .last-order {
        letter-spacing: normal;
        font-family: EffraMedium, serif;
        /deep/ .blu-ripple {
          padding: 0;
        }
      }
    }
  }

  &__categories {
    height: calc(100vh - 56px);
    overflow-y: scroll;
    margin-bottom: 0 !important;
    position: relative;
    transition: all 0.3s ease;

    .category-wrapper {
      background-color: $color-grey-light;
      height: 100%;
      overflow-y: scroll;

      .category-list {
        height: 60px;
        line-height: 55px;
        text-align: center;
        overflow: scroll;
        color: $color-grey-shade-1;
        text-transform: capitalize;
        border-bottom: 1px solid $color-grey-lightest-1;
        &.selected {
          background: $color-white;
          border-right: 4px solid $color-blue-3;
          font-size: 14px;
          font-family: EffraMedium, serif;
          color: $color-blue-3;
          border-bottom: none;
        }
        &.not-selected {
          background: $color-grey-light;
          font-size: 14px;
          font-family: EffraRegular, serif;
        }
      }
    }

    .list-wrapper {
      height: 100%;
      overflow-y: scroll;

      .sub-categories-list {
        display: flex;
        overflow: scroll;
        height: 60px;
        line-height: 60px;
        padding: 0 10px;

        .sub-category {
          /deep/ .blu-chip {
            width: 100%;
            span {
              justify-content: center;
              padding: 15px;
              letter-spacing: normal;
            }
          }
          .unclickable {
            pointer-events: none;
          }
        }
      }
    }
  }

  &__footer {
    z-index: 1;
    padding: 0 16px;
    border-top: 1px solid $color-grey;
    position: absolute;
    bottom: 0;
    background-color: $color-white;
    width: 100%;
    height: 72px;
    line-height: 72px;

    .item-total {
      border-top: 1px solid $color-grey;
      border-bottom: 1px solid $color-grey;
      height: 40px;
      line-height: 2.5;
      color: $color-grey-darker;
      padding-left: 15px;
      margin-bottom: 15px;
    }
    .item-total-price {
      float: right;
      padding-right: 20px;
      color: $color-black;
    }
    .pay-now {
      z-index: 1;
      letter-spacing: normal;
      font-family: EffraMedium, serif;
      height: 48px;
    }
  }

  .last-order-wrapper {
    position: relative;
    margin-bottom: 85px;

    .last-order-items {
      .product-items {
       /deep/ .img-container {
          height: 80px;
          width: 80px;
          transform: translate(0px, 9px);
        }

        /deep/ .detail-list {
          padding-left: 10px !important;
          padding-right: 8px !important;
        }
      }
    }
  }

  .last-order-button {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    height: 72px;
    line-height: 72px;
    padding: 0 16px;
    box-shadow: 0 -4px 16px -4px rgba(0, 0, 0, 0.12);

    button {
      font-family: EffraMedium, 'serif';
      letter-spacing: normal;
    }
  }

  .loader {
    position: fixed;
    top: 50%;
    left: 60%;
  }

  .addcart-loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    opacity: 0.3;
    z-index: 10;
  }
  .no-search-result {
    margin: 12px;
    text-align: center;
    transform: translate(0px, 45px);
  }
  .no-search-header {
    font-family: EffraMedium, 'sans-serif';
    font-size: 16px;
    margin: 5px;
  }
  .no-search-text {
    color: $color-grey-shade-1;
  }
  .no-search-image {
    display: inline-block;
  }

  .no-scrollbar::-webkit-scrollbar {
     width: 0 !important;
     display: none;
  }
  .no-scrollbar {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  /deep/ .modal-popup {
      min-height: 90vh;
  }
}
</style>
