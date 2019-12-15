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
        <div class="blu-columns b-mobile b-0 b-gapless">
          <div class="blu-column b-3 center-text">
          <BliRadio class="add-item" v-model="radio" :value="index" @change="getSelectedDonor(donor)"></BliRadio>
          </div>
          <div class="blu-column b-9 center-text">
          <ProductList :productList="getDonors" :item="donor" :index="index"/>
          </div>
        </div>
        </div>
        <Transition effectName="slide-up">
          <div class="checkout__footer">
          <BliButton v-if="!isNotSelected" block color="secondary" class="pay-now" @click="submitDonorDetails()">
            Submit
          </BliButton>
          <BliButton v-if="isNotSelected" disabled block class="pay-now">
            Submit
          </BliButton>
          <Alert
        :show-alert="submitSuccess"
        :hide-alert="handleAlertClose"
        alertMessage="Your match was successful!"
           />
      </div>
      </Transition>
        <!-- <infinite-loading
          v-if="getDonors.length"
          force-use-infinite-wrapper
          @infinite="getNextPage"
          :distance="100"
        > -->
          <!-- <div slot="no-more" class="font-grey">NO MORE DONORS</div> -->
        <!-- </infinite-loading> -->
      </div>
    </div>
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
      height: calc(100vh - 130px);
      overflow-y: scroll;
    }
    .add-item {
      transform: translate(0px, 20px);
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
}
</style>
