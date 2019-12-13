<template>
  <div class="upload">
    <div class="upload__section-head">{{ i18n("REGISTRATION.PHOTO_KTP") }}</div>
    <div class="upload__uploader">
      <ImageUpload
        :id="'ktp'"
        :imagePath="ktpImage"
        :uploadThisItem="handleImageUpload"
        :clearSelectedImage="clearSelectedImage"
        :loadingImage="loadingImage"
        :onImageCompression="onImageCompression"
      ></ImageUpload>
    </div>
    <div class="upload__ktp-input mt-3">
      <BliField :type="ktpNumber.length > 16 ? 'danger' : 'dark'">
        <BliInput
                maxlength="16"
                type="text"
                pattern="[0-9]*"
                inputmode="numeric"
                :value="ktpNumber"
                ref="ktpField"
                @input="handleKtpChange" />
        <label>{{ i18n("REGISTRATION.ID_CARD_NUMBER") }}</label>
        <span class="blu-field__msg" v-if="ktpNumber.length > 16">
          {{ i18n("REGISTRATION.KTP_ERR_MSG") }}
        </span>
        <span v-else class="blu-field__msg">
          {{i18n("BLI_PAY_CASHOUT.MAX_LENGTH", 16)}}
        </span>
      </BliField>
    </div>
    <div class="upload__section-head">
      {{ i18n("REGISTRATION.YOUR_PICTURE") }}
    </div>
    <div class="upload__uploader">
      <ImageUpload
        :id="'profile'"
        :imagePath="profileImage"
        :uploadThisItem="handleImageUpload"
        :clearSelectedImage="clearSelectedImage"
        :loadingImage="loadingProfileImage"
        :placeholder="i18n('REGISTRATION.ADD_PHOTO_PLACEHOLDER')"
        :onImageCompression="onImageCompression"
      ></ImageUpload>
    </div>
    <div class="mt-2 upload__section-footer">
      <BliButton
        color="secondary"
        block
        @click="handleContinue"
        :disabled="isContinueDisable"
      >
        {{ i18n("REGISTRATION.CONTINUE") }}
      </BliButton>
    </div>
  </div>
</template>
<script src="./js/upload.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.upload {
  height: 70vh;
  overflow-y: scroll;
  padding-bottom: 50px;

  &__section-head {
    padding: 16px;
    font-family: EffraMedium, sans-serif;
  }

  &__uploader {
    padding: 0 16px;
  }

  &__ktp-input {
    padding: 0 16px;

    /deep/ .blu-field__counter {
      display: none;
    }
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
}

</style>
