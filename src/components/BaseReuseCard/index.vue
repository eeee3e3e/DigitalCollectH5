<template>
  <div class="app-reuse" :style="{backgroundColor: backgroundColor || '#1e1e1e'}">
    <div class="app-reuse-body" @click="(event) => $emit('click', event)">
      <template v-if="!revert">
        <div class="icon">
          <img :src="iconSrc" alt="">
        </div>
        <div class="into">
          <p v-html="title"></p>
          <p class="desc" v-html="desc"></p>
        </div>
      </template>
      <template v-else>
        <div class="into">
          <p v-html="title"></p>
          <p class="desc" v-html="desc"></p>
        </div>
        <div class="icon">
          <img :src="iconSrc" alt="">
        </div>
      </template>
      <div class="right">
        <img src="/static/images/right-icon.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: [String],
    desc: [String],
    iconSrc: [String],
    revert: [Boolean],
    backgroundColor: [String]
  }
}
</script>

<style scoped lang="less">
.app-reuse {
  padding: 16px 20px;
  box-sizing: border-box;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

  &-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    .icon {
      width: 40px;
      height: 40px;
      //background: linear-gradient(180deg, #414141, #282828);
      border-radius: 20px;
      margin-right: 14px;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .into {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      p {
        font-size: 15px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: justify;
        color: #ffffff;
      }

      p.desc {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #666666;
        padding-top: 6px;
      }
    }

    .right {
      width: 15px;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
