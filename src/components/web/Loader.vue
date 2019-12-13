<template>
  <div :class="{ 'fullscreen-spinner': isFullScreen }">
    <img
      id="spinner"
      src="~assets/loaders/success.svg"
      alt="Loading..." />
  </div>
</template>
<script src="./js/loader.js"></script>
<style lang="scss" scoped>
.fullscreen-spinner {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(10, 10, 25, 0.67);
  z-index: 4;
  text-align: center;
  top: 0;
  left: 0;

  img{
    margin: 44vh 0;
  }
}

#spinner {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  height: 30px;
  width: 30px;
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
