<template>
<div>
  <div class="home-card">
      <div class="home-card-title">
        <div>{{goods.CreateTime}}</div>
        <div>系统推送</div>
      </div>
      <div class="home-card-info" @click="returnUrl">
        <div>{{goods.Title}}</div>
        <div ref="infoItem" class="ellipsis" :class="{'more':showMore}">{{goods.Content}}</div>
           <div class="switch-arrow"
        v-if="hasMoreArrow" 
        @click="showMore=!showMore">{{this.showMore?'收起内容':'展开内容'}}</div>
        </div>
  </div>
  </div>
</template>
<script>
import getImageUrl from "@/utils/get-image-url";
export default {
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showMore:false,
      hasMoreArrow:false
    }
  },
  mounted () {
    let cellChild=this.$refs.infoItem
    this.hasMoreArrow=cellChild.scrollHeight>cellChild.offsetHeight
  },
  methods:{
    returnUrl () {
      this.$router.push('/city-meta/collection')
    },
     getImageSrc(path) {
      return getImageUrl(path)
    }
  }
}
</script>
<style lang="less" scoped>
.ellipsis{
   position: relative;
   padding-right:3px;
   overflow:hidden; 
   word-break: break-all;
   text-overflow:ellipsis;
   display:-webkit-box; 
   -webkit-box-orient:vertical;
   -webkit-line-clamp:4; 
      &.more{
        display:block;
        text-overflow:initial;
    }
}
.home-card-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
   margin-top:26px;
   padding:0px 16px;
   >div:nth-child(1){
      font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 700;
    color: #666666;
    line-height: 12px;
   }
   >div:nth-child(2){
      font-size: 12px;
    font-family:  PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #666666;
    line-height: 12px;
   }
  }
    .home-card-info{
          margin-top:14px;
          padding:12px 16px;
          overflow: hidden;
          background: #1e1e1e;
          border-radius: 8px;
          box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.11) inset; 
          >div:nth-child(1) {
            margin: 0px 0px 14px 0px;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #aaaaaa;
            line-height: 16px;
          }
          >div:nth-child(2) {
            margin: 14px 0px 14px 0px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 400;
            color: #aaaaaa;
            line-height: 20px;
          }
           >div:nth-child(3) {
            margin: 14px 0px 14px 0px;
            text-align: center;
        color: #666666;
        font-size: 13px;
        font-family: PingFangSC, PingFangSC-Regular;
          }
        }
</style>