<template>
  <ActionSheet class="app-base-action-sheet" :value="value" closeable close-on-popstate
               close-on-click-overlay
               @close="close"
               @click-overlay="close">
    <div class="app-base-action-sheet-header">
      <div class="app-base-action-sheet-header-body">
        <span v-html="title"></span>
        <i @click="close" class="van-icon van-icon-cross van-action-sheet__close"></i>
      </div>
    </div>
    <div class="app-base-action-sheet-content">
      <slot v-if="value"/>
    </div>
  </ActionSheet>
</template>

<script>
import { ActionSheet } from 'vant'

export default {
  props: {
    value: [Boolean],
    title: [String]
  },
  components: {
    ActionSheet
  },
  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="less">


.app-base-action-sheet {
  background-color: #282828;
  overflow: hidden;

  &-header {
    padding: 0 20px;
    box-sizing: border-box;

    &-body {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
      height: 58px;
      line-height: 58px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #ffffff;
    }
  }

  &-content {
    height: 80vh;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
