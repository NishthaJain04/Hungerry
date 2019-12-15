<template>
  <div class="home">
    <div class="home__header">
      <h2>No Food Wasted</h2>
      <!-- v-if="memberType === 'donator' -->
      <div class="request-action" @click="startDonating">Start Donating</div>
      <!-- v-if="memberType === 'collector' -->
      <div class="request-action" @click="startCollecting">Start Collecting</div>
      <!-- v-if="memberType === 'donator' && isrequestActive" -->
      <!-- <div class="confirm-msg">Please verify if your order was picked up</div> -->
      <!-- v-if="memberType === 'collector' && isrequestActive" -->
      <div class="confirm-msg">Please verify if your order was received
      <BliButton outline color="secondary"> Confirm</BliButton></div>
      <div class="request-action"><router-link :to="getRequestPath()">Click here to see your created request!</router-link></div>
      <!-- <BliButton outline color="secondary" @click="startDonating"> Start Donating </BliButton> -->
      <!-- <BliButton outline color="secondary" @click="startCollecting"> Start Collecting</BliButton> -->
      <BliCard width="50" style="visibility: hidden;">
        <BliCardContent>
        </BliCardContent>
      </BliCard>
      <ImageSlider :dataToShow="bannersToShow"></ImageSlider>
      <BliCard  class="donar" width="50" style="margin-top:8%">
        <BliCardContent>
          <h3>Pick Up%</h3>
          <p>{{analysis.pickUp}}</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar1" width="50" style="margin-top:8%">
        <BliCardContent>
          <h3>People fed</h3>
          <p>{{analysis.peopleFed}}</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar2" width="50">
        <BliCardContent>
          <h3>Our Reach</h3>
          <p>{{analysis.numberOfOrgs}}</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar3" width="50">
        <BliCardContent>
          <h3>Food Saved(Tons)</h3>
          <p>{{analysis.foodSaved}}</p>
        </BliCardContent>
      </BliCard>
    </div>
    </div>
</template>
<script src="./js/home.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.home {
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;
    .request-action {
      width: 100%;
      border-radius: 5px;
      background: $color-blue-1;
      color: $color-white;
      margin: 16px 0px;
      height: 50px;
      padding-top: 12px;
      a {
        color: $color-white;
      }
    }
    .confirm-msg {
      position: fixed;
      bottom: 70px;
      display: inline-block;
    }
  }
  .donar {
    display: inline-block;
    background-color:  rgb(38, 173, 117);
  }
  .donar1 {
    display: inline-block;
    background-color:  rgb(38, 140, 173);
  }
  .donar2 {
    display: inline-block;
    background-color:  rgb(236, 100, 207);
  }
  .donar3 {
    display: inline-block;
    background-color:  rgb(171, 173, 38);
  }
}

</style>
