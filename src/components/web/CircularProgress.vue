<template>
  <div class="circular-progress-wrapper">
    <svg
      class="timer"
      :width="sqSize"
      :height="sqSize"
      :viewBox="`0 0 ${sqSize} ${sqSize}`"
    >
      <circle
        class="circle-background"
        :cx="sqSize / 2"
        :cy="sqSize / 2"
        :r="(sqSize - strokeWidth) / 2"
        :stroke-width="`${strokeWidth}px`"
      />
      <circle
        class="circle-progress"
        :cx="sqSize / 2"
        :cy="sqSize / 2"
        :r="(sqSize - strokeWidth) / 2"
        :stroke-width="`${strokeWidth}px`"
        :transform="`rotate(-270 ${this.sqSize / 2} ${this.sqSize / 2})`"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="-dashOffset"
      />
      <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle">
        {{ this.getTimeString() }}
      </text>
      <text
        class="circle-text-label"
        x="50%"
        y="70%"
        dy=".1em"
        text-anchor="middle"
      >
        {{ i18n("MINUTE") }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{ i18n("SECOND") }}
      </text>
    </svg>
    <div class="waiting-msg-header">{{ i18n("PLEASE_WAIT") }}</div>
    <div v-if="!isTimeUp" class="waiting-msg">{{ i18n("PROCESSING") }}</div>
    <div v-if="isTimeUp" class="waiting-msg">{{ i18n("TIME_UP_MSG") }}</div>
    <div class="returnButton">
    <router-link to="/">
      <BliButton block outline>
          {{ i18n("BLI_PAY_CASHOUT.RETURN_TO_HOME_PAGE") }}
      </BliButton>
    </router-link>
    </div>
  </div>
</template>
<script src="./js/circular-progress.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.circular-progress-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: $color-blue-5;
  z-index: 2;
  text-align: center;
  color: $color-white;
}
.timer {
  transform: translateY(25vh);
}
#progressInput {
  margin: 20px auto;
  width: 30%;
}

.circle-background,
.circle-progress {
  fill: none;
}

.circle-background {
  stroke:  $color-blue-1;
  stroke-width: 4px;
}

.circle-progress {
  stroke: #0072a7;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.4s ease;
}

.circle-text {
  font-size: 2em;
  font-weight: bold;
  fill: $color-white;
}

.circle-text-label {
  font-size: 11px;
  font-weight: normal;
  fill: $color-white;
}
.waiting-msg-header {
  margin-top: 25vh;
  font-size: 20px;
  font-family: EffraMedium, sans-sarif;
}
.waiting-msg {
  font-family: EffraRegular, sans-serif;
  font-size: 16px;
}
.returnButton {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 20px 16px;
  .blu-btn {
      color: $color-white;
      font-family: EffraMedium, sans-serif;
  }
  a {
      color: transparent;
  }
}

</style>
