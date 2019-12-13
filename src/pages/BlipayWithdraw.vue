<template>
  <div>
    <div class="blipay-withdraw">
      <digital-header :title="i18n('BLI_PAY_CASHOUT.HEADER')"></digital-header>
      <div class="blipay-withdraw__content">
        <div class="blipay-withdraw__content__total-balance">
          <p class="available">
            {{ i18n("BLI_PAY_CASHOUT.RETRACTABLE_BALANCE") }}
          </p>
          <span class="amount">{{(getWalletRequest.refundBalance+getWalletRequest.withdrawableBalance) | currency }}</span>
        </div>
        <div class="blipay-withdraw__content__msg-all-withdraw">
          {{i18n('BLI_PAY_CASHOUT.ALL_WITHDRAW_MSG')}}
        </div>
        <div class="blipay-withdraw__content__to-be-withdraw">
          <p class="heading" v-if="getMemberBankList && getMemberBankList.length">
            {{ i18n("BLI_PAY_CASHOUT.AMOUNT_OF_WITHDRAW") }}
          </p>
          <BliField :type="parseFloat(this.enteredAmount) > parseFloat(this.getWalletRequest.balance) ? 'danger' : 'dark'" v-if="getMemberBankList && getMemberBankList.length">
            <BliInput
              ref="amount"
              @input="onInputAmount"
              :value="amountToSend"
              type="text"
              @blur="isInputActive = false"
              @focus="isInputActive = true"
              :disabled="parseFloat(this.retractableBalance) === 0"
              pattern="[0-9]*"
              maxlength="18"
              inputmode="numeric"
            />
            <label>Rp</label>
            <span class="blu-field__msg" v-if="parseFloat(this.enteredAmount) > parseFloat(this.getWalletRequest.balance)">
              {{ i18n("BLI_PAY_CASHOUT.EXCEEDS") }}
            </span>
            <span class="blu-field__msg" v-if="parseFloat(this.enteredAmount) < parseFloat(this.getWalletRequest.balance)">
              {{ i18n("BLI_PAY_CASHOUT.LESSER_AMOUNT") }}
            </span>
          </BliField>
          <p class="heading" v-if="getMemberBankList && getMemberBankList.length">{{ i18n("BLI_PAY_CASHOUT.BANK_ACCOUNT") }}</p>
          <div class="bank-list mb-2">
            <div
              class="bank-item"
              v-for="bank in getMemberBankList"
              :key="bank.id"
            >
              <div class="blu-columns b-gapless b-mobile">
                <div class="blu-column b-11">
                  <BliRadio v-model="selectedBank" :value="bank">
                    {{ bank.bankAccountName }}
                  </BliRadio>
                  <p class="sub-text">
                    {{ bank.bankAccountNumber }} - {{ bank.bankName }}
                  </p>
                </div>
                <div class="blu-column b-1 pop-over-menu text-right" ref="popOver">
                  <BliButton
                    ghost
                    icon
                    :disabled="!selectedBank"
                    @click="toggleEditAccountModal"
                  >
                    <img
                      src="~assets/icons/icon-more.svg"
                      alt="More" />
                  </BliButton>
                  <Transition>
                    <Overlay
                      v-if="isEditAccountVisibile"
                      :closeOverlay="toggleEditAccountModal"
                    >
                      <div
                        class="pop-over-menu__content"
                        :style="getStyleForMenu()"
                      >
                        <ul>
                          <li @click="editAccountDetails(bank)">{{ i18n("BLI_PAY_CASHOUT.EDIT_ACCOUNT") }}</li>
                          <li @click="deleteAccount(bank)">{{ i18n("BLI_PAY_CASHOUT.DELETE_ACCOUNT") }}</li>
                        </ul>
                      </div>
                    </Overlay>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
          <div :class="getMemberBankList && getMemberBankList.length === 0 ? 'mt-5' : 'mt-3'" v-if="getMemberBankList && getMemberBankList.length === 0">
            <BliButton color="secondary" block outline @click="addNewAccount">
              {{ i18n("BLI_PAY_CASHOUT.ADD_NEW_ACCOUNT") }}
            </BliButton>
          </div>
          <div class="mt-3">
            <BliTicker
              type="info"
              :closeable="false"
              has-icon
              aria-close-label="Close notification"
            >
              <div
                class="ticker__content"
                @click="isBankTermsAndConditionVisible = true"
              >
                {{ i18n("BLI_PAY_CASHOUT.READ_TNC") }}
              </div>
            </BliTicker>
          </div>
        </div>
      </div>
      <div class="blipay-withdraw__section-footer">
        <BliButton
                color="secondary"
                block
                :disabled="!isWithdrawDisable"
                @click="continueToPay"
        >
          {{ i18n("BLI_PAY_CASHOUT.WITHDRAW_BALANCE") }}
        </BliButton>
      </div>
    </div>

    <!--  TRANSITION AND MODALS WILL GO BELOW THIS LINE -->
    <Transition effect-name="slide-up">
      <PinModal
        v-if="showPin"
        :pinHeader="i18n('ENTER_PIN')"
        :handlePinEnter="pinEntered"
        :handlePinClose="exitPin"
        :message="i18n('INCORRECT_PIN')"
        :isError="isIncorrectPinEntered"
        :disableInput="disableInput"
      ></PinModal>
    </Transition>
    <Transition effect-name="slide-left">
      <div class="blipay-withdraw__payment-success" v-if="showPaymentSuccess">
        <CashoutPaymentPage
          :orderDetails="slip"
          :paymentStatus="paymentStatus"
        ></CashoutPaymentPage>
      </div>
    </Transition>
    <OverlayPopup
      :isOpen="showBankList"
      :closePopup="toggleOverlayPopup"
      closeVisible
      :title="selectedBank !== null ? i18n('BLI_PAY_CASHOUT.EDIT_ACCOUNT_TITLE') : i18n('BLI_PAY_CASHOUT.ADD_ACCOUNT')"
    >
      <div class="blipay-withdraw__bank-list">
        <div class="mb-2">
          <div class="blipay-withdraw__bank-list__autocomplete-wrapper">
            <BliField type="dark">
              <input
                :class="{ 'has-input': bankDetails.bankName }"
                type="text"
                @input="
                  e => this.handleAutoComplete(e.target.value, 'bankName')
                "
                :value="bankDetails.bankName"
                :disabled="selectedBank && selectedBank.bankName"
              />
              <label :class="{ 'is-active': bankDetails.bankName, 'is-inactive': selectedBank && selectedBank.bankName }">
                {{ i18n("BLI_PAY_CASHOUT.BANK_NAME") }}
              </label>
            </BliField>
            <Transition effectName="slide-down">
              <div v-if="isAutoCompleteVisible" class="autocompete-list">
                <div
                  v-for="item in bankList"
                  class="autocompete-list__items"
                  :key="item.id"
                  @click="handleItemClick(item)"
                >
                  {{ item.bankName }}
                </div>
              </div>
            </Transition>
          </div>

          <BliField :type="bankAccountNameValid === false ? 'danger': 'dark'">
            <BliInput
              type="text"
              :value="bankDetails.bankAccountName"
              @input="value => handleInput(value, 'bankAccountName')"
            />
            <label>{{ i18n("BLI_PAY_CASHOUT.HOLDER_NAME") }}</label>
            <span v-if="bankAccountNameValid === false && bankDetails.bankAccountName.length < 50" class="blu-field__msg">{{i18n('BLI_PAY_CASHOUT.ONLY_ALPHABETS')}}</span>
            <span v-if="bankAccountNameValid === false && bankDetails.bankAccountName.length > 50" class="blu-field__msg">{{i18n('BLI_PAY_CASHOUT.MAXIMUM_ALLOWED_CHARS', 50)}}</span>
          </BliField>
          <BliField type="dark">
            <BliInput
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              ref="accountNumber"
              :value="bankDetails.bankAccountNumber"
              @input="value => handleInput(value, 'bankAccountNumber')"
            />
            <label>{{ i18n("BLI_PAY_CASHOUT.ACCOUNT_NUMBER") }}</label>
            <span class="blu-field__msg" v-if="bankDetails && (bankDetails.accountLength !== null) && (bankDetails.accountLength > 0)">
              {{ i18n("BLI_PAY_CASHOUT.MAX_LENGTH", bankDetails.accountLength) }}
            </span>
            <span class="blu-field__msg" v-if="bankDetails && bankDetails.accountLength === null">{{ i18n("BLI_PAY_CASHOUT.MAXIMUM_ALLOWED_CHARS", 20) }} </span>
          </BliField>
        </div>
        <div class="mt-3 check-me">
          <BliCheckbox :value="acceptedTnC" @input="checkBoxChange">
            {{ i18n("BLI_PAY_CASHOUT.WILLING_TO_SAVE_DATA") }}
          </BliCheckbox>
        </div>
        <div class="mt-2 instruction">
          <span>{{ i18n("BLI_PAY_CASHOUT.INSTRUCTION") }}</span>
        </div>
      </div>
      <div class="mt-2 blipay-withdraw__bank-list__section-footer">
        <BliButton
          color="secondary"
          block
          :disabled="!isSaveDataDisabled"
          @click="saveData"
        >
          {{ i18n("BLI_PAY_CASHOUT.SAVE_DATA") }}
        </BliButton>
      </div>
    </OverlayPopup>
    <div class="blipay-withdraw__delete-account-popup">
      <BliModal
        type="warning"
        maxWidth="600"
        :bli-active.sync="isDeleteAccountPopupVisible"
        @maskClick="isDeleteAccountPopupVisible = false"
        @close="isDeleteAccountPopupVisible = false"
        :controls="customControlsModal"
      >
        <BliModalHeader>
          {{ i18n("BLI_PAY_CASHOUT.SURE_TO_DELETE") }}
        </BliModalHeader>
        <BliModalBody>
          {{ i18n("BLI_PAY_CASHOUT.DELETION_WARNING") }}
        </BliModalBody>
      </BliModal>
    </div>
    <div class="blipay-withdraw__tnc-popup">
      <OverlayPopup
        :isOpen="isBankTermsAndConditionVisible"
        :closePopup="
          () => {
            this.isBankTermsAndConditionVisible = false;
          }
        "
        closeVisible
        :title="i18n('BLI_PAY_CASHOUT.BANK_TNC_TITLE')"
      >
        <div class="bank-tnc">
            <ul v-if="getConfigs && getConfigs.terms">
              <li v-for="item in getConfigs.terms" v-bind:key="item.label">
                <b>{{item.label}}</b>
                <span class="sub-text">{{item.text}}</span>
              </li>
            </ul>
        </div>
      </OverlayPopup>
    </div>
  </div>
</template>
<script src="./js/blipay-withdraw.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.blipay-withdraw {
  position: relative;
  height: 100vh;
  width: 100%;

  &__content {
    padding: 16px;
    height: 80vh;
    overflow-y: scroll;
    padding-bottom: 30px;

    &__total-balance{
      border-radius: 10px;
      box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
      background-color: $color-white;
      padding: 8px 10px;

      .available{
        font-size: 14px;
        color: $color-grey-shade;
      }

      .amount {
        font-size: 18px;
        font-family: EffraMedium, sans-serif;
      }
    }

    &__msg-all-withdraw{
      font-size: 14px;
      color: $color-grey-shade;
      margin-top: 10px;
    }

    &__to-be-withdraw {
      .blu-field{
        margin-bottom: 0;
      }
      .blu-field__msg {
        float: left;
      }
      .blu-btn {
        font-family: EffraMedium, sans-serif;
      }
      .ticker__content {
        font-size: 14px;
        color: $color-grey-shade-1;
      }
      .heading {
        font-family: EffraMedium, sans-serif;
        font-size: 16px;
        padding: 15px 0 0 0;
      }
      .bank-list {
        text-align: left;
        .bank-item {
          padding: 10px 0;

          .blu-columns {
            .blu-column {
              .blu-radio {
                margin: 0;
                vertical-align: middle;
                word-break: break-word;
              }
            }
          }

          img{
            float: right;
          }

          .sub-text{
            margin-left: 28px;
            margin-bottom: 0;
            color: $color-grey-shade;
            font-size: 14px;
            margin-top: -1px;
          }
        }
      }
    }
  }

  &__section-footer{
    padding: 16px;
    border-top: 1px solid $color-grey;
    position: absolute;
    bottom: 0;
    background-color: $color-white;
    width: 100%;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }

  &__bank-list{
    padding: 16px;
    text-align: left;
    overflow-y: scroll;
    max-height: 350px;

    .checkbox {
      color: $color-grey-shade-1;
    }

    .instruction{
      text-align: left !important;
      span {
        font-size: 14px;
        color: $color-grey-shade-1
      }
    }

    &__section-footer {
      padding: 16px;
      border-top: 1px solid $color-grey;
      background-color: $color-white;

      button {
        font-family: EffraMedium, sans-serif;
      }
    }

    &__autocomplete-wrapper {
      position: relative;

      .blu-field {
        .has-input {
          border: 2px solid #0eb3ff;
        }

        input[disabled] {
          border: 2px solid $color-grey;
        }

        label {
          &.is-active {
            color: #0eb3ff;
            font-size: 12px;
            font-weight: 400;
            top: 2px;
            padding-top: 2px;
          }
          &.is-inactive {
            color: $color-grey-dark;
          }
        }
      }

      .autocompete-list {
        max-height: 300px;
        background-color: $color-white;
        width: 100%;
        overflow-y: scroll;
        border-radius: 8px;
        box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.12);
        margin-top: -13px;
        position: absolute;
        z-index: 1;
        text-align: left;

        &__items {
          padding: 14px;
          font-size: 14px;
          border-bottom: 1px solid $color-grey;
        }
      }
    }
  }

  &__payment-success {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #0096d9;
    top: 0;
    left: 0;
    z-index: 4;
    .slip-wrapper {
      transform: translate(0, 50%);
    }

    .close-img {
      margin-left: 1rem;
      margin-top: 1rem;
      position: absolute;
      width: 28px;
      z-index: 3;
    }
  }

  &__delete-account-popup {

    .blu-modal.b-dialog .blu-modal__header {
      color: $color-grey-shade-3;
    }
    .blu-modal.b-dialog .blu-modal__body {
      margin-bottom: 16px;
      font-size: 14px;
      color: $color-grey-shade;
    }
    .blu-modal.b-dialog .blu-modal__footer {
      .blu-btn {
        font-family: EffraMedium, sans-serif;
      }
    }
  }

  &__tnc-popup{

    /deep/ .modal-popup {
      min-height: 150px;
    }

    .bank-tnc{
      bottom: 0;
      position: absolute;
      width: 100%;
      text-align: left;

      ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: -1px;
        overflow-y: hidden;
      }

      li{
        padding: 20px 16px;
        border-bottom: 1px solid $color-grey;

        .sub-text {
          display: block;
          font-size: 14px;
          color: $color-grey-shade;
        }
      }
    }
  }

  .pop-over-menu {
    position: relative;

    .blu-btn {
      width: 30px;
    }

    &__content{
      position: absolute;
      background-color: white;
      right: 1rem;
      border-radius: 5px;

      ul {
        list-style: none;
        padding-left: 0;
        margin-top: 0;
        margin-bottom: 0;
      }

      li{
        border-bottom: 1px solid $color-grey;
        font-size: 16px;
        width: auto;
        text-align: left;
        padding: 14px 25px 14px 12px;
      }
      :last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
