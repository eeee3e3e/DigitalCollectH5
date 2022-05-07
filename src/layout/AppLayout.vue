<template>
  <div class="app-layout">
    <!--    <base-header/>-->
    <div class="app-layout-main" :class="showTabBar ? 'has-app-tab-bar' : ''">
      <base-to-back v-if="showToBack"/>
      <base-router-view/>
    </div>
    <base-tab-bar v-if="showTabBar"/>
  </div>
</template>

<script>
import { BaseTabBar, BaseHeader, BaseToBack, BaseRouterView } from '@/components'

export default {
  components: {
    BaseTabBar,
    BaseHeader,
    BaseToBack,
    BaseRouterView
  },
  data() {
    return {
      showSheet: false
    }
  },
  computed: {
    showTabBar() {
      return this.$route?.meta?.showTabBar || false
    },
    showToBack() {
      return this.$route?.meta?.showToBack || false
    }
  },
  created() {
    setTimeout(() => {
      this.showSheet = true
    }, 2000)
  }
}
</script>

<style scoped lang="less">
@import "../assets/styles/global-variable";

.app-layout {
  height: 100%;

  &-main {
    position: relative;
    height: 100%;
    //padding-top: @nav-bar-height;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .has-app-tab-bar {
    padding-bottom: @tabbar-height;
  }
}
</style>
