<template>
  <div class="bank--list">
    <ul class="banks" v-if="vaInstruction">
      <li
        class="bank"
        v-for="bank in vaInstruction.banks"
        :key="bank.code"
        @click="selectBank(bank.code)"
      >
        <div>{{ bank.name }}</div>
        <div class="font-blue-3 arrow">
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./js/bank-list.js" />

<style lang="scss" scoped>
  .bank--list {
    .banks {
      padding-left: 16px;
      .bank {
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

