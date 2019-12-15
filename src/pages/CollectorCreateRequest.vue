<template>
  <div class="create-request">
    <div class="create-request__header">
      <div class="blu-columns b-mobile b-0 b-gapless create-request__header__wrapper">
        <div class="blu-column b-2">
          <router-link to="/">
            <img src="~assets/icons/icon-left.svg" alt="Go Back" class="back"/>
          </router-link>
        </div>
        <div class="blu-column b-9 center-text">
          <div class="search-block font-bold">Start Collecting!
          </div>
        </div>
      </div>
    </div>
    <div class="input-label ">Please enter the number of people you want us to serve today!!</div>
      <div class="input-wrapper">
        <BliField type="dark">
          <BliInput v-model="quantity" type="number"/>
          <label>No of People</label>
        </BliField>
    </div>
    <div class="collect" v-if="quantity">
      <BliButton color="secondary" @click="createCollectorRequest()">Collect</BliButton>
    </div>
    <div v-else class="collect">
      <BliButton disabled @click="createCollectorRequest()">Collect</BliButton>
    </div>
  </div>
</template>
<script src="./js/collector-create-request.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.create-request {
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
    }
    }
    .input-label {
      text-align: center;
      font-family: EffraMedium, 'sans-serif';
      font-size: 20px;
      margin: 5px;
      transform: translate(0px, 50%);
      background: $color-blue-1;
      border-radius: 5px;
      color: $color-white;
    }
    .input-wrapper {
      width: 120px;
      transform: translate(100%, 50%);
      margin-top: 15px;
      input {
        font-size: 30px;
        text-align: center;
      }
    }
    .collect {
      display: inline-block;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 5px;
      .blu-btn {
        width: 97%;
      }
    }
}
</style>
