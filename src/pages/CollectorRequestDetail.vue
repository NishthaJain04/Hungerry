<template>
  <div class="order--detail" v-if="order.requestDetails">
    <div class="order--detail__header">
        <img
          src="~assets/icons/icon-left.svg"
          alt="back"
          @click="$router.go(-1)"/>
      <div class="font-16">
        Your Request
      </div>
      <div class="font-12 font-grey">
        Request ID: {{ order.orderId }}
      </div>
    </div>
     <div class="font-16 padding-16">Requested food for </div>
    <ProductList :productList="getRequestDetails" :item="getRequestDetails[0]" :index="index"/>
    <!-- <div v-for="(itemType, index) in order.requestDetails.type" :key="index">
      <img class="padding-left-16" style="display: inline-block;" :src="images[index]"/>
      <div class="label font-blue-3 font-bold padding-left-16">{{ itemType.name }}</div>
      <div class="value font-orange font-16 padding-left-16">{{ itemType.quantity }}</div>
      </div> -->
  </div> 
</template>

<script src="./js/collector-request-detail.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.order--detail {
  background-color: white;
  &__header {
    text-align: center;
    border-bottom: 1px solid #eaeff3;
    padding: 8px;
    position: relative;
    img {
      position: absolute;
      top: 28%;
    }
  }
  .label {
   display: inline-block; 
   line-height: 30px;
   transform: translate(12px, -24px);
  }
  .value {
    display: inline-block;
    float: right;
    margin-right: 12px;
    transform: translate(0, 10px);
  }
}
</style>
