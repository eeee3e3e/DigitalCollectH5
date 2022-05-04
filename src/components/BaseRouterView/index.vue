<template>
  <transition name="fade-in">
    <router-view/>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      transitionName: undefined
    }
  }
}
</script>

<style scoped lang="less">
//.fade-in-enter-active

//.slide-right-enter-active,
//.slide-right-leave-active,
//.slide-left-enter-active,
//.slide-left-leave-active {
//  will-change: transform;
//  transition: all 500ms;
//  position: absolute;
//}
//
//.slide-right-enter {
//  opacity: 0;
//  transform: translate(-100%);
//}
//
//.slide-right-leave-active {
//  opacity: 0;
//  transform: translateX(100%);
//}
//
//.slide-left-enter {
//  opacity: 0;
//  transform: translateX(100%);
//}
//
//.slide-left-leave-active {
//  opacity: 0;
//  transform: translateX(-100%);
//}
</style>
