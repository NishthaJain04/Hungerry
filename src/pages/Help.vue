<template>
  <div class="help">
    <div class="help--header">Notifications
    </div>
    <div v-if="showNoti" class="confirm-msg">Please verify if your order was received
      <BliButton outline color="secondary"> Confirm</BliButton></div>
    <!-- <help-action :showTitle="false" /> -->
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
    .confirm-msg {
      text-align: center;
      margin: 12px;
    }
  }
</style>

