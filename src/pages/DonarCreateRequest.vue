<template>
  <div class="donarCreateRequest">
  <div class="donarCreateRequest__header">
    Donar Create Request
      <img
        v-show="false"
        class="bell"
        src="~assets/icons/icon-bell-grey.svg"
        alt="Notification" />
    </div>
        <div class="blu-columns b-mobile b-0 b-gapless ">
            <div class="blu-column b-5 center-text" style="margin-left:3%;">
            <label style="background-color:$color-blue-1"> Type</label>
            </div>
            <div class="blu-column b-5 center-text">
                <label> Quantity </label>
            </div>
        </div>
         <div class="blu-columns b-mobile b-0 b-gapless" v-for="(item, index) in donatingItems" :key="index">
            <div class="blu-column b-5 center-text" >
                <BliField b-clearable v-model="index.categories" style="margin-left:8%;" >
                    <BliInput style="margin-left:5%; margin-right:5%; width:90%;height:56%;"/>
                    <label>Type of Food</label>
                </BliField>
            </div>
            <div class="blu-column b-5 center-text" >
                <BliField b-clearable v-model="item.quantity" style="margin-left:5%; margin-right:5%; width:90%;">
                    <BliInput style="height:56%;"/>
                    <label>Quantity</label>
                </BliField>
            </div>
            <div class="blu-column b-2 center-text" >
                <img src="../assets/icons/icon-cross.svg" alt="add icon" width="35px" style="margin-left:10%;margin-top:5%;" @click="() =>{deleteProduct(index)}">
            </div>
        </div>
         <div class="blu-column b-2 center-text" style="margin-left:5%;padding:0px;" >
                <img src="../assets/icons/icon-add-circle.svg" alt="add icon" width="30px" class="donarCreateRequest__header__img-donar" @click="() =>{displayProduct()}">
        </div>
        <div class="blu-columns b-mobile b-0 b-gapless" style="margin-top:5%;">
            <div class="blu-column b-8 center-text" style="margin-left:1%;">
                <label>Do food contain Non-Veg?</label>
            </div>
            <div class="blu-column b-3 center-text">
                <BliSwitch v-model="switchedCustom">
                </BliSwitch>
             </div>
        </div>
        <div class="blu-columns b-mobile b-0 b-gapless mt-3" style="margin-top:10%;">
            <div class="blu-column b-8 center-text" style="margin-top:4%;">
                <label slot="label">Select pickup within time</label>
            </div>
            <div class="blu-column b-3 center-text" style="padding-right:4%;">
                <BliDropdown v-model="selectTime" selection autoclose>
                    <BliList scrollable >
                        <BliListItem value="Item 1">15 </BliListItem>
                        <BliListItem value="Item 2">30 </BliListItem>
                        <BliListItem value="Item 3">45 </BliListItem>
                        <BliListItem value="Item 4">60 </BliListItem>
                        <BliListItem value="Item 5">75 </BliListItem>
                        <BliListItem value="Item 6">90 </BliListItem>
                    </BliList>
                </BliDropdown>
            </div>
        </div>
        <div style="margin-left:3%; margin-top:10%;">
            <BliField b-clearable v-model="additionalInfo" style="margin-right:2%; width:95%;">
                <BliInput />
                <label>Additional Information</label>
            </BliField>
        </div>
        </div>
</template>
<script src="./js/donarCreateRequest.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.donarCreateRequest{
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
    margin-bottom: 4%;
  }
}

</style>
