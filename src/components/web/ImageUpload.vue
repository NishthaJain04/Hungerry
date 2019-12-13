<template>
  <div class="image-upload">
    <div v-if="loadingImage" class="image-upload__loading-image">
      <Loader/>
      <span>{{i18n('LOADING_IMAGE')}}</span>
    </div>
    <input v-if="!loadingImage && !loadingImage" type="file" @change="onFileChanged" :id="id" accept="image/*" :value="fileValue"/>
    <label  v-if="!loadingImage && !capturedImage" :for="id" @click="clearInputFakeValue">
      <div class="search-icon">
        <img
                src="~assets/icons/icon-camera.svg"
                class="icon-svg"
                alt="Camera" />
      </div>
      <span>{{ placeholder }}</span>
    </label>
    <img
            v-if="!loadingImage && capturedImage"
            :src="capturedImage"
            alt="Pic"
            class="preview-image"
            @error="handleImageLoadErr"
    />
    <div v-if="!loadingImage && capturedImage" class="cancel-upload-bar"></div>
    <button v-if="!loadingImage && capturedImage" @click="cancelImage" class="cancel-button">
      <img
              src="~assets/icons/icon-cancel.svg"
              alt="Cancel" />
    </button>
    <span v-if="!loadingImage" class="cancel-text" @click="handleClickOnChangePic">{{ i18n("CHANGE_PHOTO") }}</span>
    <BliModal type="warning" :bli-active.sync="isImageErrorVisible" @maskClick="isImageErrorVisible = false" @close="isImageErrorVisible = false">
      <BliModalHeader>{{imageErrorMessage}}</BliModalHeader>
    </BliModal>
  </div>
</template>
<script src="./js/image-upload.js"></script>
<style lang="scss" scoped>
  @import "~assets/scss/colors";

  .image-upload {
    height: 18vh;
    border-radius: 10px;
    text-align: center;
    position: relative;
    border: 1px solid $color-grey;
    width: 100%;

    /deep/ .blu-modal.b-dialog.b-warning .blu-modal__container {
      text-align: left;
    }

    &__loading-image{
      padding: 5vh;
      span {
        font-size: 14px;
        color: $color-grey-dark-1;
      }
    }

    input {
      display: none !important;
    }

    label {
      /*position: absolute;*/
      /*top: calc(50% - 28px);*/
      /*left: calc(50% - 56px);*/
    }

    .preview-image {
      width: 100%;
      max-height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }

    .cancel-upload-bar {
      width: 100%;
      background-color: black;
      opacity: 0.5;
      position: absolute;
      bottom: 0;
      text-align: right;
      height: 30px;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    .cancel-button {
      position: absolute;
      bottom: 3px;
      right: 5px;
      padding: 0;
    }

    .cancel-text {
      position: absolute;
      font-size: 12px;
      color: $color-white;
      left: 12px;
      bottom: 7px;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .search-icon {
      line-height: 30px;
      margin-top: 5vh;
    }
  }
</style>
