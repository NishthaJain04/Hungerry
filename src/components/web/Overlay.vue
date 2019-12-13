<template>
  <div class="overlay-wrapper" @click="requestClose">
    <slot />
  </div>
</template>
<script src="./js/overlay.js"></script>
<style lang="scss" scoped>
.overlay-wrapper{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 4;
  position: fixed;
  top:0;
  left: 0;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
</style>
