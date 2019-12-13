<template>
  <div class="loader-wrapeer">
    <div class="loader-wrapeer__contain">
      <div>
        <img
          src="~assets/icons/new-mitra-logo-color.svg"
          alt="Logo"
          class="logo" />
      </div>
      <div>
        <span class="text mt-3">{{ i18n("LOADING.TEXT") }}</span>
      </div>
      <div class="spinner mt-2">
        <img
          id="spinner"
          src="~assets/icons/common-loader.svg"
          alt="Loading..."
        />
      </div>
    </div>
  </div>
</template>
<script src="./js/common-loader.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.loader-wrapeer {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 25, 0.67);
  z-index: 4;
  text-align: center;
  top: 0;
  left: 0;

  &__contain{
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    position: absolute;
    padding: 20px;
    margin-left: -124px;
    margin-top: -135px;

    .logo {
      width: 130px;
      margin: 0 auto;
      padding-top: 20px;
    }

    .text {
      color: $color-grey-shade-1;
      display: block;
    }

    .spinner {
      display: block;
      img{
        margin: 0 auto;
      }
    }
  }
}

#spinner {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
