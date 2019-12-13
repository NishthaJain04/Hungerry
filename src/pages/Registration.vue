<template>
  <div class="registration">
    <div class="registration__header">
      <img
        v-if="isBackButtonEnabled"
        src="~assets/icons/icon-left.svg"
        alt="Go Back"
        @click="closeLoginScreen" />
      <span>{{ i18n("REGISTRATION.ACCOUNT_REGISTRATION") }}</span>
    </div>
    <div class="registration__tabs mt-1">
      <Tabs :tabStatus="tabStatus" :onTabClick="handleTabClick"></Tabs>
    </div>
    <div>
      <Upload
        v-if="activeTab === 'step1'"
        :onContinueClick="continueStep1"
      ></Upload>
      <Personal
        v-if="activeTab === 'step2'"
        :onContinueClick="continueStep2"
      ></Personal>
      <Address v-if="activeTab === 'step3'"></Address>
    </div>
  </div>
</template>
<script src="./js/registration.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.registration{
  position: relative;
  height: 100vh;
  width: 100%;

  &__header {
    text-align: center;
    padding: 16px;
    font-family: EffraMedium, sans-serif;

    img{
      left: 10px;
      position: absolute;
    }
  }
}

</style>
