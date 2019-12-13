<template>
  <div class="thankyou--page__pending">
    <circular-progress
      v-if="!isTimeup"
      :percentage="120"
      :onTimeUp="handleTimeup"
    />
    <div v-else class="timeup" v-html="i18n('DIGITAL.THANK_YOU.TIMEUP_DESC')" />
    <router-link v-if="isTimeup" to="/" class="home__button--wrapper">
      <div class="home__button">
        {{ i18n("DIGITAL.THANK_YOU.TO_HOME") }}
      </div>
    </router-link>
  </div>
</template>

<script src="./js/thankyou-page-pending.js" />
<style lang="scss" scoped>
@import "~assets/scss/colors";

.thankyou--page__pending {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $color-blue-5;
  color: white;
  justify-content: center;
  align-items: center;

  .timeup {
    text-align: center;
  }

  .home__button--wrapper {
    position: absolute;
    color: white;
    bottom: 16px;
    padding: 16px;
    width: 100%;
    .home__button {
      text-align: center;
      border: solid 2px #ffffff;
      border-radius: 8px;
      padding: 7px;
    }
  }

  .close {
    position: absolute;
    display: flex;
    top: 23px;
    left: 23px;
    align-items: center;
    div {
      margin-left: 10px
    }
  }
}
</style>
