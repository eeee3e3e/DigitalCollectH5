<template>
  <div class="app-collection-header">
    <div class="app-collection-header-body">
      <div class="icon"></div>
      <div class="into">
        <p>我的藏宝库</p>
        <p class="desc">当前拥有 {{ totalCount }} 件藏品</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style scoped lang="less">
.app-collection-header {
  margin-bottom: 20px;
  padding: 20px 24px;
  box-sizing: border-box;
  overflow: hidden;
  background-image: url(/public/static/images/collection/background.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  &-body {
    display: flex;
    align-items: center;
    height: 45px;

    .icon {
      width: 54px;
      height: 100%;
      margin-right: 14px;
    }

    .into {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: justify;
        color: #ffffff;
      }

      p.desc {
        font-size: 13px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #666666;
        padding-top: 8px;
      }
    }
  }
}
</style>
