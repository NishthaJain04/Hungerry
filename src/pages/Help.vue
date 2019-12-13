<template>
  <div class="help">
    <div class="help--header">
      {{ i18n("HELP_PAGE.TITLE") }}
    </div>
    <help-action :showTitle="false" />
  </div>
</template>

<script src="./js/help.js" />

<style lang="scss" scoped>
  .help {
    &--header {
      padding: 16px;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid #eaeff3;
    }
  }
</style>

