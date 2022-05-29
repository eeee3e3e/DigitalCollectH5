<template>
  <div class="home-card">
      <div class="home-card-info">
        <div>
            <div class="home-card-info-leftShop">
             <img  :src="getImageSrc(goods.CommodityFrontImage)" alt="">
            </div>
            <div class="home-card-info-rightShop">
                <div class="title">{{goods.CommodityName}}</div>
                <div class="code">
                  <p>{{goods && goods.CommodityCode ? goods.CommodityCode.substring(goods.CommodityCode.length - 10) : ''}} #{{goods.CommodityNo}}/{{goods.LimitNum}}</p>
                  <p>
                    <span style="color: #7bf1a9;" v-if="goods.TurnDirection==='in' && goods.TurnStatus==='true' ">转入成功</span>
                     <span style="color: #7bf1a9;" v-else-if="goods.TurnDirection==='in' && goods.TurnStatus==='false' ">转入失败</span>
                     <span style="color: #9cb8ff;" v-else-if="goods.TurnDirection==='out' && goods.TurnStatus==='true' ">转出成功</span>
                     <span style="color: #9cb8ff;" v-else-if="goods.TurnDirection==='out' && goods.TurnStatus==='false' ">转出失败</span>
                  </p>
                  </div>
            </div>
        </div>
            <div class="home-card-info-line"></div>
            <div class="home-card-info-userInfo">
                <div>
                  <p>
                    <span v-if="goods.TurnDirection==='in'">转出方</span>
                     <span v-if="goods.TurnDirection==='out'">转入方</span>
                  </p>
                  <p>{{goods.OppositeUserName}}</p>
                </div>
                <div>
                  <p>
                    <span v-if="goods.TurnDirection==='in'">转出方手机号</span>
                     <span v-if="goods.TurnDirection==='out'">转入方手机号</span>
                  </p>
                  <p>{{goods.OppositeUserMobileNo}}</p>
                </div>
                <div>
                  <p>
                    <span v-if="goods.TurnDirection==='in'">转入时间</span>
                     <span v-if="goods.TurnDirection==='out'">转出时间</span>
                  </p>
                  <p>{{goods.TurnDateTime}}</p>
                </div>
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

    }
  },
  methods:{
     getImageSrc(path) {
      return getImageUrl(path)
    }
  }
}
</script>
<style lang="less" scoped>
    .home-card-info{
          margin-top:26px;
          padding:12px 16px;
          overflow: hidden;
          background: #1e1e1e;
          border-radius: 8px;
          box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.11) inset; 
          >div:nth-child(1) {
            display: flex;
          align-items: center;
          justify-content: space-between;
             .home-card-info-leftShop{
          background-image: url(/public/static/images/collection-examples/shopImage.png);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: 0 0;
          width: 52px;
          height: 52px;
          >img{
            display: inline-block;
            width: 36px;
            height: 28px;
            padding: 7px;
          }
        }
        .home-card-info-rightShop{
          flex: 1;
          padding-left:14px;
          .title{
          height: 14px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
          line-height: 14px;
          }
          .code{
            display:flex;
            align-items: center;
            justify-content: space-between;
            margin-top:14px;
            >p:nth-child(1){
             width: 158px;
              height: 16px;
              font-size: 10px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: justify;
              color: #0b0e15;
              line-height: 16px;
              padding-left:10px;
            border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;
            }
            >p:nth-child(2){
                //  width: 48px;
                // height: 12px;
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                // text-align: justify;
                color: #7bf1a9;
              // .zc{
              // //    width: 48px;
              // // height: 12px;
              // font-size: 12px;
              // font-family: PingFangSC, PingFangSC-Regular;
              // font-weight: 400;
              // // text-align: justify;
              // color: #9cb8ff;
              // // line-height: 12px;
              // }
            }
          }
        }
          }
        &-line{
        margin-top:14px;
        width: 315px;
        height: 1px;
        opacity: 0.06;
        background: #ffffff;
      }
      &-userInfo{
        margin-top:12px;
        >div:nth-child(1){
          display: flex;
          align-items: center;
          justify-content: space-between;
          >p:nth-child(1){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 26px;
          }
          >p:nth-child(2){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: right;
            color: #ffffff;
            line-height: 26px;
          }
        }
        >div:nth-child(2){
          display: flex;
          align-items: center;
          justify-content: space-between;
          >p:nth-child(1){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 26px;
          }
          >p:nth-child(2){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: right;
            color: #ffffff;
            line-height: 26px;
          }
        }
        >div:nth-child(3){
          display: flex;
          align-items: center;
          justify-content: space-between;
          >p:nth-child(1){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 26px;
          }
          >p:nth-child(2){
            height: 26px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: right;
            color: #ffffff;
            line-height: 26px;
          }
        }
      }
        }
</style>