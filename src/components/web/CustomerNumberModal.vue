<template>
  <div class="customer--number">
    <overlay-popup
      :isOpen="modalVisible"
      closeVisible
      :closePopup="closeModal"
    >
      <div class="customer--number__content">
        <BliField type="dark" b-clearable>
          <BliInput
            type="text"
            :maxlength="13"
            ref="number"
            pattern="[0-9]*"
            inputmode="numeric"
            @input="onInputNumber" />
          <label>
            {{ i18n("DIGITAL.CUSTOMER_NUMBER") }}
          </label>
          <span class="blu-field__msg">
            {{ i18n("DIGITAL.RECEIPT") }}
          </span>
        </BliField>
        <BliButton
          color="secondary"
          block
          @click="submitNumber"
          :disabled="!validToSubmit"
        >
          {{ i18n("DIGITAL.CONTINUE") }}
        </BliButton>
      </div>
    </overlay-popup>
  </div>
</template>

<script src="./js/customer-number-modal.js" />
<style lang="scss" scoped>
.customer--number {
  &__content{
    padding: 16px;
    text-align: left;
  }
}
</style>
