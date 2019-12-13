<template>
  <div class="help font-14">
    <div v-if="showTitle" class="help--title">
      {{ i18n("DIGITAL.ORDER.HELP") }}
    </div>
    <div class="help--description font-16">
      {{ i18n("DIGITAL.ORDER.HELP_HEADER") }}
      <img src="~assets/icons/icon-help.svg" class="help--help-image"/>
    </div>
    <div class="help--description header-message font-14 font-grey-1">
      {{ i18n("DIGITAL.ORDER.HELP_HEADER_MESSAGE") }}
    </div>
    <div class="help--description font-16">
      {{ i18n("DIGITAL.ORDER.HELP_MESSAGE") }}
    </div>
    <div class="help--button">
      <div class="help--button__item">
        <a :href="getConfigs.customerServicePhoneNumber">
          {{ i18n("DIGITAL.ORDER.CALL_US") }}
        </a>
      </div>
      <div>
        <a target="_blank" :href="getConfigs.liveChatUrl">
          {{ i18n("DIGITAL.ORDER.MESSAGE") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./js/help-action.js" />

<style lang="scss" scoped>
  .help {
    padding: 16px;
    margin-top: 10px;
    &--title {
      margin-bottom: 22px;
      font-family: EffraMedium, 'sans-serif';
    }
    &--help-image {
      display: inline-block;
      float: right;
      transform: translate(0px, -3px);
    }
    .header-message {
      margin-bottom: 28px;
    }
    &--button {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      div {
        width: 48%;
        color: #0095da;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        text-align: center;
        padding: 5px;
        font-family: EffraMedium, serif;
        letter-spacing: normal;
      }
    }
  }
</style>

