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
        <div class="blu-columns b-mobile b-0 b-gapless" style="margin-top:5%;">
            <div class="blu-column b-6 center-text" style="margin-left:1%;">
                <b><label>Do food contain Non-Veg?</label></b>
            </div>
            <div class="blu-column b-6 center-text">
                <BliSwitch v-model="switchedCustom">
                </BliSwitch>
             </div>
        </div>
        <div class="blu-columns b-mobile b-0 b-gapless mt-3" style="margin-top:10%;">
            <div class="blu-column b-6 center-text" style="margin-top:4%;">
                <b><label slot="label">Select pickup within time</label></b>
            </div>
            <div class="blu-column b-6 center-text" >
                <BliDropdown v-model="selectTime" selection autoclose>
                    <BliList scrollable >
                        <BliListItem value="Item 1">15 min</BliListItem>
                        <BliListItem value="Item 2">30 mins</BliListItem>
                        <BliListItem value="Item 3">45 mins</BliListItem>
                        <BliListItem value="Item 4">60 mins</BliListItem>
                        <BliListItem value="Item 5">75 mins5</BliListItem>
                        <BliListItem value="Item 6">90 mins</BliListItem>
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
