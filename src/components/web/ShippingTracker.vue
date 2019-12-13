<template>
  <div class="shipping-tracker-wrapper">
      <div v-for="(item,index) in shipping" :key="index" class="shipping-tracker">
        <div class="blu-columns b-mobile b-0 b-gapless">
        <div class="blu-column b-2">
            <div class="active-pointer" :class="index === 0 ? 'background-green' : ''"></div>
            <div class="active-line" :class="index == 0 ? 'background-green' : ''"></div>
        </div>
        <div class="blu-column b-10 shipping-tracker-detail">
            <div class="blu-columns b-mobile b-0 b-gapless">
            <div class="blu-column b-6">
                <div class="transaction-status" :class="index === 0 ? 'green' : ''">
                {{ item.status }}
            </div>
            </div>
            <div class="blu-column b-6">
             <div v-if="item.timestamp" class="shipping-date">
                <div class="system-date" :class="index === 0 ? 'green' : ''"> {{ parseInt(item.timestamp) | day }} </div>
                <div class="shipping-time" :class="index === 0 ? 'green' : ''">{{ parseInt(item.timestamp) | time }}</div>
            </div>
        </div>
            </div>
        </div>
        </div>
      </div>
  </div>
</template>
<script src="./js/shipping-tracker.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.shipping-tracker-wrapper {
    .shipping-tracker {
        .active-pointer {
            border-radius: 50%;
            height: 12px;
            width: 12px;
            background: $color-grey-lightest-1;
            transform: translate(15px, 12px);
        }
        .active-line {
            height: 27px;
            width: 1px;
            background: $color-grey-lightest-1;
            transform: translate(20px, 15px);
        }
    .shipping-tracker-detail {
        border-bottom: 1px solid $color-grey-lightest-1;
        font-size: 14px;
        color: $color-grey-shade-1;
        padding: 10px 0px !important;
        .shipping-date {
            height: 20px;
        }
        .system-date {
            text-align: left;
        }
        .shipping-time {
            float: left;
        }
        .transaction-status {
            text-align: left;
        }
    }
    .green {
        color: $color-green;  
    }
    .background-green {
       background: $color-green; 
    }
    }
}
</style>