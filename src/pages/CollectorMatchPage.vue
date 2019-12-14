<template>
  <div class="checkout">

    <div class="checkout__header">
      <div class="blu-columns b-mobile b-0 b-gapless checkout__header__wrapper">
        <div class="blu-column b-2">
          <router-link to="/">
            <img src="~assets/icons/icon-left.svg" alt="Go Back" class="back"/>
          </router-link>
        </div>
        <div class="blu-column b-9 center-text">
          <div class="search-block">Donators Match List For You
          </div>
        </div>
      </div>
    </div>
    <div class="checkout__categories" v-bind:style="mainContainerObject">
      <div class="list-wrapper no-scrollbar" infinite-wrapper>
        <div
           v-for="(donor, index) in getDonors"
           class="category-list no-scrollbar"
           :key="index"
        >
          <ProductList :productList="getDonors" :item="donor" :index="index"/>
        </div>
        <!-- <infinite-loading
          v-if="getDonors.length"
          force-use-infinite-wrapper
          @infinite="getNextPage"
          :distance="100"
        > -->
          <!-- <div slot="no-more" class="font-grey">NO MORE DONORS</div> -->
        <!-- </infinite-loading> -->
        <div class="loader" v-if="getIsFetchingList && this.getDonors.length === 0"><Loader></Loader></div>
      </div>
    </div>
    <div class="addcart-loader" v-if="isAddingItemToCart"><Loader></Loader></div>
  </div>
</template>
<script src="./js/collector-match-page.js"></script>
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
        input::placeholder {
          font-size: 16px;
          font-family: EffraRegular, sans-serif;
          color: $color-grey-shade;
        }
      }
    }

  &__categories {
    height: calc(100vh - 56px);
    overflow-y: scroll;
    margin-bottom: 0 !important;
    position: relative;
    transition: all 0.3s ease;

    .list-wrapper {
      height: 100%;
      overflow-y: scroll;
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

  .no-scrollbar::-webkit-scrollbar {
     width: 0 !important;
     display: none;
  }
  .no-scrollbar {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
}
</style>
