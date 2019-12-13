<template>
  <div class="va--instruction">
    <ul class="instructions" v-if="paymentMethod">
      <li
        class="instruction"
        v-for="(instruction, index) in paymentMethod.instructions"
        :key="index"
      >
        <div class="counter">
          <div>{{ index + 1 }}</div>
        </div>
        <div class="content" v-html="instruction" />
      </li>
    </ul>
    <div class="va--code">
      <div>
        <div class="font-grey">
          {{ i18n("DIGITAL.BLIPAY.PAYMENT_CODE") }}
        </div>
        <div class="font-bold">{{ vaNumber }}</div>
      </div>
      <div v-clipboard:copy="vaNumber" class="copy--button font-blue-3">
        Salin
      </div>
    </div>
  </div>
</template>

<script src="./js/va-instruction.js" />

<style lang="scss" scoped>
  .va--instruction {
    .instructions {
      list-style: none;
      display: table;
      padding: 16px;
      border-spacing: 0px 7px;
      .instruction {
        display: table-row;
        text-align: left;
        div {
          display: table-cell;
        }
        .counter {
          width: 22px;
          div {
            color: white;
            text-align: center;
            min-width: 22px;
            height: 22px;
            border-radius: 100%;
            background-color: #0095da;
          }
        }
        .content {
          padding-left: 10px;
        }
      }
    }
    .va--code {
      display: flex;
      padding: 16px;
      align-items: center;
      text-align: left;
      border-top: 1px solid #eaeff3;
      .copy--button {
        margin-left: auto;
        border-radius: 8px;
        border: solid 2px #e0e0e0;
        width: 76px;
        padding: 10px;
        text-align: center;
      }
    }
  }
</style>
