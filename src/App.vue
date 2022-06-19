<template>
  <div id="app">
    <base-router-view/>
  </div>
</template>

<script>
import { BaseRouterView } from '@/components'

export default {
  components: {
    BaseRouterView
  },
  data () {
    return {

    }
  },
  mounted () {
  //   const url = location.href.split('#')[0];
	//  const dataForWeixin = {
  //     title: '城市数藏',		// 分享标题
  //     desc: '',						// 分享内容
  //     linkurl: "http://www.csscmeta.com/", // 分享链接
  //     img: 'http://show.1m2.net/sj/static/img/share.jpg',				// 分享内容显示的图片(图片必须是正方形的链接)
	//    };
  //   const ua = window.navigator.userAgent.toLowerCase();
  //   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  //     sdk.getJSSDK(url,dataForWeixin); 					//传入sdk.js需要的参数
  //   } else {
  //     console.log('不是微信浏览器')
  //   }
  },
  methods: {
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
.svg-icon{
	position: relative;
	z-index: 10000
}
</style>
