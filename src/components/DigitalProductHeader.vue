<template>
  <div class="digital--product__header">
    <b>{{ title }}</b>
    <router-link :to="exitPath">
      <img src="~assets/icons/icon-left.svg" />
    </router-link>
  </div>
</template>

<script src="./js/digital-product-header.js" />
<style lang="scss" scoped>
.digital--product__header {
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #eaeff3;
  position: relative;

  img {
    position: absolute;
    top: 15px;
  }
}
</style>
