<template>
  <div class="app-home-banner" v-if="bannerImages.length">
    <Swipe :autoplay="4000" @change="bannerChange">
      <SwipeItem v-for="(bannerItem, index) of bannerImages" :key="index" @click="onToHelpDocument(bannerItem)">
        <div class="app-home-banner-item">
          <base-image :src="getImageSrc(bannerItem.ImgUrl)" alt=""/>
        </div>
      </SwipeItem>
      <template #indicator>
        <div class="app-home-banner-indicator">
          <div v-for="(_, index) of bannerImages" :key="index" class="app-home-banner-indicator-item"
               :class="currentBannerIndex === index ? 'indicator-active' : ''"/>
        </div>
      </template>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from 'vant'
import { dictionaryApi } from '@/api'
import getImageUrl from "@/utils/get-image-url";

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  components: {
    Swipe,
    SwipeItem,
    BaseImage: Image
  },
  data() {
    return {
      currentBannerIndex: 0,
      bannerImages: [],
    }
  },
  created() {
    this.getDataSource()
  },
  methods: {
    getImageSrc(path) {
      return getImageUrl(path)
    },
    onToHelpDocument(bannerItem) {
      const { LinkUrl } = bannerItem
      // console.log(bannerItem)
      // const LinkUrl = '/city-meta/help-document'
      // if (isExternal(LinkUrl)) {
      //   return window.location.href = LinkUrl
      // }
      this.$router.push({ path: LinkUrl })
    },
    bannerChange(index) {
      this.currentBannerIndex = index
      // 跳转操作指南 （新建一个vue文件：一张操作指南图片）
      // this.$router.push('')
    },

    // 获取banner资源
    getDataSource() {

      const params = {
        category: '首页'
      }

      dictionaryApi
          .getBannerListByCategory(params)
          .then(result => {
            this.bannerImages = result.Data
          })

    }
  }
}
</script>

<style scoped lang="less">
@banner-item-height: auto; // 170px;

.app-home-banner {
  margin-top: -50px;
  position: relative;
  z-index: 1;
  width: 100%;
  height: @banner-item-height;
  border-radius: 8px;
  overflow: hidden;

  &-item {
    height: @banner-item-height;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
      //height: 100%;
    }
  }

  &-indicator {
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    width: auto;

    &-item {
      width: 4px;
      height: 4px;
      opacity: 0.4;
      background: #ffffff;
      border-radius: 2px;
      margin: 0 2px;
      transition: all 0.3s ease-in;
    }
  }

  .indicator-active {
    width: 8px;
    opacity: 1;
  }
}
</style>
