<template>
   <Transition effectName="slide-left">
    <div class="onboarding-wrapper" v-if="showOnboardingScreen">
      <div class="onboarding-wrapper__heading">
        <img
                src="~assets/icons/new-mitra-logo-color.svg"
                alt="Logo"
                class="logo-img" />
        <span class="help-btn" @click="toggleHelpVisible">
        <img
                src="~assets/icons/icon-call.svg"
                alt="Help" />
        <div class="help-text">{{ i18n("HELP") }}</div>
      </span>
      </div>
      <div class="onboarding-wrapper__main-image">
        <img
                src="~assets/icons/icon-onboarding-screen.svg"
                alt="Main Image" />
      </div>
      <div class="onboarding-wrapper__swipe-screen">
        <hooper
                ref="hooper"
                :infinite-scroll="false"
                :items-to-show="1"
                :items-to-slide="1"
                :center-mode="false"
                pagination="no"
                :mouse-drag="false"
                :short-drag="true"
                :auto-play="false"
                :play-speed="3000"
                :transition="500"
                @slide="watchCurrentSlide"
        >
          <slide v-for="(slide, index) in sliderData" :key="index" :index="index">
            <div>
              <b>{{ slide.heading }}</b>
              <br />
              <span>{{ slide.text }}</span>
            </div>
          </slide>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
      </div>
      <div class="onboarding-wrapper__actions">
        <BliButton color="secondary" block @click="skipOnboarding">
          {{ i18n("ONBOARDING.START_SELLING") }}
        </BliButton>
<!--        <BliButton color="secondary" block @click="showNextScreen">-->
<!--          {{ i18n("ONBOARDING.CONTINUE") }}-->
<!--        </BliButton>-->
<!--        <BliButton-->
<!--                ghost-->
<!--                block-->
<!--                color="secondary"-->
<!--                ripple-off-->
<!--                class="ghost-btn"-->
<!--                @click="skipOnboarding"-->
<!--        >-->
<!--          {{ i18n("ONBOARDING.SKIP") }}-->
<!--        </BliButton>-->
      </div>
      <Transition effectName="slide-up">
        <OverlayPopup
                v-if="isHelpVisible"
                :isOpen="true"
                :closePopup="toggleHelpVisible"
                :title="i18n('ONBOARDING.HELP')"
                closeVisible
        >
          <div class="onboarding-wrapper__help">
            <div class="onboarding-wrapper__help__customer-service">
              <div class="text-left">
                <span class="font-bold">{{ i18n("ONBOARDING.MITRA_CUSTOMER_SERVICE") }}</span><br />
                <span class="font-grey">{{ i18n("ONBOARDING.SERVICE_AVAILABILITY") }}</span>
              </div>
              <div class="text-right"><img src="~assets/icons/icon-help-center.svg" alt="Help" /></div>
            </div>
            <div class="onboarding-wrapper__help__description">
              {{ i18n("ONBOARDING.READY_TO_HELP") }}
            </div>
            <div class="onboarding-wrapper__help__button">
              <div>
                <a href="tel:021-579-777-00">
                  <BliButton block size="small" outline color="secondary" class="help-btn">
                    {{ i18n("ONBOARDING.CALL_US") }}
                  </BliButton>
                </a>
              </div>
              <div>
                <a target="_blank" href="https://livechat.blibli.com/chatserver/chatwindow.aspx?siteid=1000185&planId=882">
                  <BliButton block size="small" outline color="secondary" class="help-btn">
                    {{ i18n("ONBOARDING.MESSAGE") }}
                  </BliButton>
                </a>
              </div>
            </div>
          </div>
        </OverlayPopup>
      </Transition>
    </div>
  </Transition>
</template>
<script src="./js/on-boarding-screen.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
@import "~hooper/dist/hooper.css";

.onboarding-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  background: $color-white;
  z-index: 5;
  margin: 0;
  top: 0;
  left: 0;

  &__heading{
    font-family: EffraMedium, sans-serif;
    padding: 0 16px;
    height: 56px;
    border-bottom: 1px solid $color-grey;

    .logo-img {
      margin-top: 10px;
      width: 70px;
    }

    img{
      display: inline-block;
      vertical-align: middle;
    }

    .help-btn {
      position: absolute;
      right: 16px;
      top: 8px;
      text-align: center;

      .help-text{
        font-size: 12px;
        margin-top: 0;
        color: $color-grey-shade;
      }
    }
  }

  &__main-image {
    text-align: center;
    margin-top: 6vh;
    img {
      display: inline-block;
    }
  }

  &__swipe-screen{
    padding: 16px;

    /deep/ .hooper {
      margin-top: 4vh;
      height: 120px;
      text-align: center;

      .hooper-slide {
        img {
          height: 100%;
          width: 100%;
        }

        span {
          color: $color-grey-shade-1;
        }

        :empty {
          background-color: $color-grey-lighter;
          transition: all 0.5s ease;
        }
      }

      .hooper-pagination {
        .hooper-indicator {
          margin: 0 3px;
          width: 14px;
          height: 4px;
          border-radius: 2px;
          border: none;
          padding: 0;
          cursor: pointer;
          background-color: $color-grey;

          &.is-active {
            background-color: #4285f4;
          }
        }
      }
    }
  }

  &__actions {
    bottom: 0;
    position: absolute;
    width: 100%;
    padding: 16px;

    .blu-btn {
      font-family: EffraMedium, sans-serif;
    }

    .ghost-btn{
      margin-top: 12px;
    }
  }

  &__help {
    position: absolute;
    bottom: 0;
    width: 100%;

    &__customer-service {
      display: flex;
      justify-content: space-between;
      padding: 10px 16px 10px 16px;
      border-top: 1px solid #e0e0e0;
      div {
        width: 50%;
        img {
          display: inline-block;
          vertical-align: bottom;
        }
      }
    }

    &__description {
      text-align: left;
      border-top: 1px solid #e0e0e0;
      padding: 16px;
    }

    &__button {
      display: flex;
      justify-content: space-between;
      padding: 0 16px 16px 16px;
      div {
        width: 48%;
        a {
          .help-btn {
            font-family: EffraMedium, serif;
            height: 36px !important;
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>
