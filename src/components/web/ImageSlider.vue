<template>
  <div class="slider-wrapper">
    <hooper
      :infinite-scroll="true"
      :items-to-show="1.1"
      :items-to-slide="1"
      :center-mode="true"
      pagination="no"
      :mouse-drag="false"
      :short-drag="false"
      :auto-play="true"
      :play-speed="3000"
      :transition="500"
    >
      <slide
        v-for="(slide, index) in promotionList"
        :key="slide.id"
        :index="index"
      >
        <a :href="slide.url" :target="slide.newTab ? '_blank' : '_self'">
          <img :src="slide.image" alt="Image" @click="handleSlideClick" />
        </a>
      </slide>
    </hooper>
  </div>
</template>
<script src="./js/image-slider.js"></script>
<style lang="scss" scoped>
@import "~hooper/dist/hooper.css";
.slider-wrapper{
  width: 100%;
  height: 120px;

  /deep/ .hooper {
    height: 120px;
  }

  /deep/ .hooper-list {
    width: 100%;
    height: 120px;

    .hooper-slide {
      img{
        width: 98% !important;
        height: 100% !important;
        border-radius: 10px;
      }
    }
  }
}
</style>
