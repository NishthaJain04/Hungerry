<template>
  <div class="home">
    <div class="home__header">
      <h2>No Food Waste</h2>
      <BliButton outline color="secondary" @click="startDonating"> Start Donating </BliButton>
      <BliButton outline color="secondary" @click="startCollecting"> Start Collecting</BliButton>
      <BliCard width="50" style="visibility: hidden;">
        <BliCardContent>
        </BliCardContent>
      </BliCard>
      <ImageSlider :dataToShow="bannersToShow"></ImageSlider>
      <BliCard  class="donar" width="50" style="margin-top:8%">
        <BliCardContent>
          <h3>Pick Up%</h3>
          <p>96</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar1" width="50" style="margin-top:8%">
        <BliCardContent>
          <h3>People fed</h3>
          <p>974219</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar2" width="50">
        <BliCardContent>
          <h3>Revenue Saved(Rs)</h3>
          <p>4.87 Crores</p>
        </BliCardContent>
      </BliCard>
      <BliCard  class="donar3" width="50">
        <BliCardContent>
          <h3>Food Saved(Tons)</h3>
          <p>321</p>
        </BliCardContent>
      </BliCard>
    </div>
    </div>
</template>
<script src="./js/home.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.home{
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;
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
