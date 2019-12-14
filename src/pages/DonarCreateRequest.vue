<template>
  <div class="donarCreateRequest">
    <div class="donarCreateRequest__header">
      <h2 style="text-align:center;">Donar Create Request</h2>
        <div class="blu-columns b-mobile b-0 b-gapless ">
            <div class="blu-column b-5 center-text" style="margin-left:3%;">
            <BliLabelInfo style="padding: 17px 23px;"> Type of Food </BliLabelInfo>
            </div>
            <div class="blu-column b-5 center-text">
                <BliLabelInfo style="padding: 17px 23px;"> Quantity </BliLabelInfo>
            </div>
        </div>
         <div class="blu-columns b-mobile b-0 b-gapless" v-for="(item, index) in donatingItems" :key="index">
            <div class="blu-column b-5 center-text" >
                <BliField b-clearable v-model="index.categories" style="margin-left:8%;" >
                    <BliInput style="margin-left:5%; margin-right:5%; width:90%;"/>
                    <label>Type of Food</label>
                </BliField>
            </div>
            <div class="blu-column b-5 center-text" >
                <BliField b-clearable v-model="item.quantity" style="margin-left:5%; margin-right:5%; width:90%;">
                    <BliInput />
                    <label>Quantity</label>
                </BliField>
            </div>
            <div class="blu-column b-2 center-text" >
                <img src="../assets/icons/icon-cross.svg" alt="add icon" width="35px" style="margin-left:10%;margin-top:5%;" @click="() =>{deleteProduct(index)}">
            </div>
        </div>
            <img src="../assets/icons/icon-add-circle.svg" alt="add icon" width="30px" class="donarCreateRequest__header__img-donar" @click="() =>{displayProduct()}">
        </div>
    </div>
</template>
<script src="./js/donarCreateRequest.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.DonarCreateRequest{
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;
    &__img-donar {
      margin-left:6%;
  }
  }
}

</style>
