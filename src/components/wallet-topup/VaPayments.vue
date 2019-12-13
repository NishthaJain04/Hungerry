<template>
  <div class="va--list">
    <ul class="payments" v-if="bank">
      <li
        class="payment"
        v-for="method in bank.methods"
        :key="method.code"
        @click="selectPaymentMethod(method)"
      >
        <div>{{ method.name }}</div>
        <div class="font-blue-3 arrow">
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./js/va-payments.js" />

<style lang="scss" scoped>
  .va--list {
    .payments {
      padding-left: 16px;
      .payment {
        padding: 16px;
        padding-left: 0px;
        border-bottom: solid 1px #e0e0e0;
        display: flex;
        .arrow {
          margin-left: auto;
        }
      }
    }
  }
</style>