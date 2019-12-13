<template>
  <div class="store-page">
    <div class="store-page__page-header">
      <div v-if="getUserLoginStatus">
        <span class="store-page__page-header__logo-icon">
          <img
            src="~assets/icons/new-mitra-logo-white.svg"
            alt="Logo" />
        </span>
        <span class="store-page__page-header__bell-icon" v-show="false">
          <img
            class="icon-svg"
            src="~assets/icons/icon-bell.svg"
            alt="Bell" />
        </span>
      </div>
    </div>

    <div class="store-page__login-section" v-bind:style="{ marginTop: !getUserLoginStatus ? '-100px': '-65px', height: !getUserLoginStatus ? '126px': '102px'}">
      <div v-if="!getUserLoginStatus" class="not-logged-in">
        <div class="blu-columns b-mobile b-0 b-gapless">
          <div class="blu-column b-9">
            <img
              class="icon-svg"
              src="~assets/icons/new-mitra-logo-color.svg"
              alt="Logo"
              @click="tapHandler"
            />
            <br />
            <span class="head-sub-text">
              {{ i18n("HOME_PAGE.LOGIN_INSTRUCTION") }}
            </span>
          </div>
          <div class="blu-column b-3">
            <button class="login-button" @click="goToLoginPage">
              {{ i18n("HOME_PAGE.LOGIN") }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="getUserLoginStatus" class="logged-in">
        <div class="blu-columns b-mobile b-0 b-gapless mb-0 col-container">
          <div class="left-part blu-column b-7">
            <span class="head-sub-text">
              {{ i18n("HOME_PAGE.YOUR_BALANCE") }}
            </span>
            <h6 v-if="getWalletRequest && Object.keys(this.getWalletRequest).length" class="head-text">{{getWalletRequest.balance | currency}}</h6>
            <h6 v-if="getWalletRequest && !Object.keys(this.getWalletRequest).length" class="head-text">Rp -</h6>
          </div>
          <div class="right-part blu-column b-5">
              <button :disabled="isMemberIdSuspended" class="top-up-btn" @click="checkWalletAccess('/digital/blipay', true)">
                {{ i18n("HOME_PAGE.FILL_BALANCE") }}
              </button>
          </div>
        </div>
        <div class="actions">
          <div class="blu-columns b-mobile b-gapless">
            <div class="blu-column b-6 center-text">
              <button :disabled="isMemberIdSuspended" class="left-action" @click="checkWalletAccess('/blipay/cashout')">
                <img src="~assets/icons/icon-fill-balance.svg" alt="Fill" />
                <span :class="userLang === 'en' ? 'shrink-text': ''">{{ i18n("HOME_PAGE.WITHDRAW") }}</span>
              </button>
            </div>
            <div class="blu-column b-6 center-text">
              <button class="right-action" @click="checkWalletAccess('/wallet-transactions')">
                <img src="~assets/icons/icon-transactions.svg" alt="Fill" />
                <span>{{ i18n("HOME_PAGE.BALANCE_HISTORY") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 store-page__login-status-bar">
      <BliTicker type="danger" has-icon aria-close-label="Close notification" v-if="isMemberIdSuspended">
        <div class="ticker__content">
          {{ i18n("HOME_PAGE.USER_SUSPENDED_MSG") }} <b @click="toggleSuspendDetailPopup" class="suspended-user-learn-more">{{ i18n("HOME_PAGE.USER_SUSPENDED_REASON") }}</b>
        </div>
      </BliTicker>
      <BliTicker type="info" has-icon aria-close-label="Close notification" v-if="showDataIncompleteMsg">
        <div class="ticker__content" @click="handleTickerClick('data_incomplete')">
          {{ i18n("HOME_PAGE.DATA_INCOMPLETE_MSG") }}
        </div>
      </BliTicker>
      <BliTicker type="warning" has-icon aria-close-label="Close notification" v-if="showRejectedTicker">
        <div class="ticker__content" @click="showRejectionOverlay()">
          {{ i18n("HOME_PAGE.APPLICATION_REJECTION_MSG") }}
        </div>
      </BliTicker>
      <BliTicker type="warning" has-icon aria-close-label="Close notification" v-if="getWalletRequest && getWalletRequest.pinRegistered === true && parseInt(getWalletRequest.balance) === 0">
         <div class="ticker__content">
            {{ i18n("HOME_PAGE.EMPTY_BALANCE") }}
         </div>
      </BliTicker>
      <BliTicker type="info" has-icon aria-close-label="Close notification" v-if="showUnderReviewTicker">
        <div class="ticker__content">
          {{ i18n("HOME_PAGE.STORE_UNDER_REVIEW") }}
        </div>
      </BliTicker>
      <router-link to="/setting-pin">
        <BliTicker type="info" has-icon aria-close-label="Close notification" v-if="getMembersData && getMembersData.registrationStatus === 'REGISTERED' && getWalletRequest && getWalletRequest.pinRegistered === false">
          <div class="ticker__content">
            {{ i18n("HOME_PAGE.SET_PIN_MSG") }}
          </div>
        </BliTicker>
      </router-link>
    </div>
    <div class="mt-4 mb-3">
      <ImageSlider :dataToShow="getBanners"></ImageSlider>
    </div>
    <div class="store-page__product-part mt-1">
      <div class="store-page__product-part__product-list">
        <div
          class="grid"
          :class="{suspended: isMemberIdSuspended}"
          v-for="product in listOfProducts"
          :key="product.id"
        >
          <BliLabelInfo v-if="shouldComingSoonAppear(product)">{{i18n('HOME_PAGE.COMING_SOON_HEADER')}}</BliLabelInfo>
          <button :disabled="isMemberIdSuspended" @click="navigateToProduct(product)" class="item"><img :src="product.image" alt="Name" /></button>
          <div class="product-name">
            {{ i18n(`HOME_PAGE.PRODUCTS.${product.title}`) }}
          </div>
        </div>
      </div>
    </div>
    <OverlayPopup
      :isOpen="isRejectionOverlayVisible"
      :closePopup="toggleRejectionOverlay"
      :title="i18n('HOME_PAGE.APPLICATION_REJECTION_HEADER')"
      :closeVisible="true"
    >
      <ul class="rejectionReasonList">
        <li
            v-for="(reason, index) in reasons"
            :key="index"
            class="font-grey-1 font-16"
        >
          {{ reason }}
        </li>
      </ul>
      <div>
        <div class="mt-2 store-page__section-footer">
          <router-link to="/registration">
            <BliButton
                    color="secondary"
                    block
            >
              {{ i18n("ACCOUNT_PAGE.RE_REGISTER") }}
            </BliButton>
          </router-link>
        </div>
      </div>
    </OverlayPopup>
    <PopupMessage
            :isPopupVisible="showIncompleteDataPopup"
            :isCloseIconVisible="true"
            :popupCrossBtnClick="togglePopup"
            popupTitle=""
            :popupHeading="i18n('HOME_PAGE.DATA_INCOMPLETE_HEADING')"
            :popupText="i18n('HOME_PAGE.DATA_INCOMPLETE_MSG_TEXT')"
            :popupButtonText="i18n('HOME_PAGE.DATA_INCOMPLETE_BTN_TEXT')"
            :popupButtonClickHandler="handleIncompleteDataPopup"
    ></PopupMessage>
    <PopupMessage
            :isPopupVisible="isUnderVerificationVisible"
            :isCloseIconVisible="true"
            :popupCrossBtnClick="handleUnderVerificationClick"
            popupTitle=""
            :popupHeading='i18n("VERIFICATION_HEADER")'
            :popupText='i18n("VERIFICATION_MSG")'
            :popupButtonText='i18n("BROWSE")'
            :popupButtonClickHandler="handleUnderVerificationClick"
    >
    </PopupMessage>
    <PopupMessage
            :isPopupVisible="isComingSoonRetailVisible"
            :isCloseIconVisible="false"
            :popupCrossBtnClick="handleComingSoonClick"
            popupTitle=""
            :popupHeading='i18n("HOME_PAGE.COMING_SOON_HEADER")'
            :popupText='i18n("HOME_PAGE.COMING_SOON_TEXT")'
            :popupButtonText='i18n("HOME_PAGE.COMING_SOON_BUTTON")'
            :popupButtonClickHandler="handleComingSoonClick"
    >
    </PopupMessage>
    <BliModal type="warning"
              :bli-active.sync="isOutsideZoneModalVisible"
              @maskClick="isOutsideZoneModalVisible = false"
              @close="isOutsideZoneModalVisible = false">
      <BliModalHeader>{{i18n('HOME_PAGE.OUTSIDE_ZONE')}}</BliModalHeader>
      <BliModalBody>{{i18n('HOME_PAGE.TRY_NEW_ADDRESS')}}</BliModalBody>
    </BliModal>
    <BliModal type="warning"
              :bli-active.sync="isRetailOutsideZoneModalVisible"
              @maskClick="isRetailOutsideZoneModalVisible = false"
              @close="isRetailOutsideZoneModalVisible = false">
      <BliModalHeader>{{i18n('HOME_PAGE.RETAIL_OUTSIDE_ZONE')}}</BliModalHeader>
      <BliModalBody>{{i18n('HOME_PAGE.RETAIL_OUTSIDE_ZONE_MSG')}}</BliModalBody>
    </BliModal>
    <BliModal type="info"
              :bli-active.sync="isNoAccessModalVisible"
              @maskClick="isNoAccessModalVisible = false"
              @close="isNoAccessModalVisible = false">
      <BliModalHeader>{{i18n('HOME_PAGE.NO_ACCESS')}}</BliModalHeader>
      <BliModalBody>{{i18n('HOME_PAGE.SORRY_APPLICATION_REJECTED')}}</BliModalBody>
    </BliModal>
    <WalletTopupModal
      :visible="isTopupModalVisible"
      @onCloseModal="isTopupModalVisible = false"
    />
    <OverlayPopup
            :isOpen="isUserSuspendedPopupVisible"
            :closePopup="toggleSuspendDetailPopup"
            :title="i18n('HOME_PAGE.WHY_MY_ACCOUNT_SUSPENDED')"
            :closeVisible="true"
    >
      <div class="store-page__suspended-detail">
        <span class="store-page__suspended-detail__text">
          Ada beberapa alasan kenapa akun Anda
          dibekukan, dimana alasannya adalah sebagai
          berikut:
        </span>
        <ul>
          <li>
            Menemukan celah keamanan di aplikasi kami
            dan menyalahgunakan nya untuk keuntungan
            Anda
          </li>
          <li>
            Munggunakan “hack” untuk menambah saldo
            Anda secara instan
          </li>
          <li>
            Kecurangan yang terstruktur saat bertransaksi
            di dalam aplikasi kami
          </li>
        </ul>
        <b>Apa yang bisa saya lakukan?</b>
        <span class="store-page__suspended-detail__text">
          Anda bisa menghubungi customer service
          kami untuk mengetahui dan menyelesaikan
          kasus ini.
        </span>
        <span class="store-page__suspended-detail__text">
          Anda masih bisa menarik saldo Anda dari akun
          milik Anda.
        </span>
        <span class="store-page__suspended-detail__text">
          Saldo Anda diblokir selma {{getWalletRequest.suspensionTime}},
          karena salah memasukan PIN sebanyak {{getWalletRequest.failedPinAttempt}} kali.
        </span>
      </div>
    </OverlayPopup>
  </div>
</template>
<script src="./js/store.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.store-page {
  overflow-y: auto;
  height: calc(100% - 56px);
  padding-bottom: 56px;

  &__page-header {
    background-color: $color-blue-3;
    height: 120px;
    width: 100%;
    line-height: 50px;
    padding: 0 16px;

    &__logo-icon {
      img {
        display: inline-block;
        vertical-align: middle;
      }
    }

    &__bell-icon {
      float: right;
      img {
        vertical-align: middle;
      }
    }
  }

  &__login-section{
    background-color: $color-white;
    height: 126px;
    border-radius: 10px;
    margin: -65px 16px 0 16px;
    box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);

    .logged-in{
      border-bottom: 1px solid $color-grey;
      position: relative;
      height: 64px;
      padding: 0 16px;
      margin-top: 1px;

      .col-container{
        padding-top: 7px;
        margin-bottom: 9px;
      }

      .left-part {
        .head-sub-text {
          color: $color-grey-shade-1;
          font-size: 14px;
        }
        .head-text {
          font-size: 18px;
          font-family: EffraMedium, sans-serif;
          margin: 0;
        }
      }
      .right-part {
        .top-up-btn {
          background-color: $color-orange;
          color: $color-white;
          font-family: EffraMedium, sans-serif;
          border-radius: 8px;
          padding: 8px 12px;
          margin-top: 10px;
          font-size: 14px;
          float: right;
          height: 32px;
          -webkit-user-select: none; /* Safari */
          -moz-user-select: none; /* Firefox */
          user-select: none;
        }

        button[disabled] {
          background-color: $color-grey;
          cursor: not-allowed;
        }
      }
      .actions {
        height: 40px;
        line-height: 40px;

        img {
          vertical-align: middle;
          margin-right: 6px;
          display: inline-block;
          margin-top: -3px;
        }

        .left-action {
          font-size: 14px;
          font-family: EffraMedium, serif;
          padding: 0;
          color: $color-grey-shade-1;
          width: 100%;

          @media only screen and (max-width: 320px) {
            .shrink-text {
              width: 60%;
              display: inline-block;
              vertical-align: bottom;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .right-action {
          font-size: 14px;
          font-family: EffraMedium, serif;
          padding: 0;
          color: $color-grey-shade-1;
          width: 100%;
        }
      }
    }

    .not-logged-in {
      padding: 16px;
      .head-text {
        font-family: EffraMedium, sans-serif;
      }
      .head-sub-text {
        margin-top: 1.5rem;
        font-size: 14px;
        display: block;
      }

      .login-button {
        color: $color-white;
        background-color: $color-orange;
        margin-top: 30px;
        float: right;
        padding: 10px 12px;
        border-radius: 8px;
        font-size: 14px;
        font-family: EffraMedium, sans-serif;
      }
    }
  }

  &__product-part {
    font-family: EffraMedium, sans-serif;

    span {
      margin: 0 16px;
    }

    &__product-list {
      width: 100%;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      padding: 0 8px;

      .grid {
        padding: 1rem;
        width: 25%;

        &.suspended {
          opacity: 0.5;
        }

        .label {
          font-size: 10px;
          margin-top: -13px;
          margin-left: 0;
          position: absolute;
          padding: 0 2px;
          height: 16px;
        }

        .item{
          background-color: $color-white;
          text-align: center;
          box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
          border-radius: 10px;
          padding: 5px;
          width: 50px;
          height: 50px;

          img {
            display: inline-block;
            width: 40px;
            height: 40px;
          }
        }
        .product-name {
          font-size: 14px;
          color: $color-grey-shade-3;
          margin-top: 5px;
          font-family: EffraRegular, sans-serif;
          line-height: 1.29;
        }
      }
    }
  }

  .login-screen {
    position: fixed;
    width: 100%;
    background-color: $color-white;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;

    &__header {
      text-align: center;
      padding: 15px;
      border-bottom: 1px solid $color-grey;
      font-family: EffraMedium, sans-serif;

      img{
        left: 10px;
        position: absolute;
      }
    }

    &__phone {
      padding: 16px;

      &__top-text {
        font-family: EffraMedium, sans-serif;
      }

      .blu-field {
        input {
          margin-bottom: 10px;
        }
      }

      .blu-field__msg {
        font-size: 14px;
      }
    }
  }

  &__login-status-bar {
    padding: 0 16px;
    font-size: 14px;
    color: $color-grey-shade-1;

    a {
      color: $color-grey-shade-1;
    }

    .suspended-user-learn-more {
      color: $color-blue-3;
    }
  }
  .rejectionReasonList {
    text-align: left;
  }
  &__section-footer {
    border-top: 1px solid $color-grey;
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: $color-white;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }

  &__suspended-detail {
    padding: 16px;
    text-align: left;
    padding-bottom: 60px;

    ul {
      color: $color-grey-shade-1;
    }

    &__text {
      color: $color-grey-shade-1;
      display: block;
      margin-top: 10px;
    }
  }
}
</style>

