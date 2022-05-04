<template>
  <div class="app-to-back" @click="toBack">
    <svg class="svg-icon" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="9px"
         height="16px">
      <g transform="matrix(1 0 0 1 -12 -9 )">
        <path
            d="M 8.6625 0.258064516129032  C 9.1125 0.716845878136201  9.1125 1.29032258064516  8.6625 1.74910394265233  C 8.6625 1.74910394265233  2.3625 8.05734767025089  2.3625 8.05734767025089  C 2.3625 8.05734767025089  8.6625 14.3655913978495  8.6625 14.3655913978495  C 9 14.7096774193548  9 15.3978494623656  8.6625 15.741935483871  C 8.325 16.0860215053764  7.65 16.0860215053764  7.3125 15.741935483871  C 7.3125 15.741935483871  0.449999999999999 8.86021505376344  0.449999999999999 8.86021505376344  C 0.449999999999999 8.86021505376344  0.3375 8.86021505376344  0.3375 8.74551971326165  C 0.1125 8.63082437275986  0 8.28673835125448  0 8.05734767025089  C 0 7.82795698924731  0.1125 7.48387096774193  0.3375 7.36917562724014  C 0.3375 7.36917562724014  0.449999999999999 7.36917562724014  0.449999999999999 7.25448028673835  C 0.449999999999999 7.25448028673835  7.3125 0.258064516129032  7.3125 0.258064516129032  C 7.65 -0.086021505376344  8.325 -0.086021505376344  8.6625 0.258064516129032  Z "
            fill-rule="nonzero" fill="#ffffff" stroke="none" transform="matrix(1 0 0 1 12 9 )"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/styles/global-variable";

//@interval: @nav-bar-height + 22px;
@interval: 22px;

.app-to-back {
  position: fixed;
  top: @interval;
  left: 22px;
  z-index: 999;
  width: 34px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  //opacity: 0.14;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .svg-icon {
    margin-left: -3px;
  }
}
</style>
