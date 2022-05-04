<template>
  <div class="app-collection-for-entry" @click="onToConversion">
    <div class="app-collection-for-entry-body">
      <div class="icon">
        <img src="/static/images/collection/for-entry-icon.png" alt="">
      </div>
      <div class="into">
        <p>会员 · 空投兑换</p>
        <p class="desc">输入兑换码兑换您的藏品</p>
      </div>
      <div class="right">
        <img src="/static/images/right-icon.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { BaseReuseCard } from '@/components'

export default {
  components: {
    BaseReuseCard
  },
  methods: {
    onToConversion() {
      this.$router.push('/city-meta/conversion')
    }
  }
}
</script>

<style scoped lang="less">

.app-collection-for-entry {
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
