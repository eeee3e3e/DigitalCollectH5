<template>
  <div class="home-card">
      <div class="home-card-info">
        <div>
            <div class="home-card-info-leftShop">
              <img src="/static/images/collection-examples/shop.png" alt="">
            </div>
            <div class="home-card-info-rightShop">
                <div class="title">城市数藏 & Xmeta 联合勋章</div>
                <div class="code">
                  <p>JISHADGIN #0001/1000</p>
                  <p>转入成功</p>
                  </div>
            </div>
        </div>
            <div class="home-card-info-line"></div>
            <div class="home-card-info-userInfo">
                <div>
                  <p>转出方</p>
                  <p>孙**</p>
                </div>
                <div>
                  <p>转出方手机号</p>
                  <p>188***88888*</p>
                </div>
                <div>
                  <p>转入时间</p>
                  <p>2022-05-22 10:00:00</p>
                </div>
            </div>
          </div>
          <div class="home-card-info">
        <div>
            <div class="home-card-info-leftShop">
              <img src="/static/images/collection-examples/shop.png" alt="">
            </div>
            <div class="home-card-info-rightShop">
                <div class="title">城市数藏 & Xmeta 联合勋章</div>
                <div class="code">
                  <p>JISHADGIN #0001/1000</p>
                  <p>转入成功</p>
                  </div>
            </div>
        </div>
            <div class="home-card-info-line"></div>
            <div class="home-card-info-userInfo">
                <div>
                  <p>转出方</p>
                  <p>孙**</p>
                </div>
                <div>
                  <p>转出方手机号</p>
                  <p>188***88888*</p>
                </div>
                <div>
                  <p>转入时间</p>
                  <p>2022-05-22 10:00:00</p>
                </div>
            </div>
          </div>
           <div class="home-card-info">
        <div>
            <div class="home-card-info-leftShop">
              <img src="/static/images/collection-examples/shop.png" alt="">
            </div>
            <div class="home-card-info-rightShop">
                <div class="title">城市数藏 & Xmeta 联合勋章</div>
                <div class="code">
                  <p>JISHADGIN #0001/1000</p>
                  <p>转入成功</p>
                  </div>
            </div>
        </div>
            <div class="home-card-info-line"></div>
            <div class="home-card-info-userInfo">
                <div>
                  <p>转出方</p>
                  <p>孙**</p>
                </div>
                <div>
                  <p>转出方手机号</p>
                  <p>188***88888*</p>
                </div>
                <div>
                  <p>转入时间</p>
                  <p>2022-05-22 10:00:00</p>
                </div>
            </div>
          </div>
           <div class="home-card-info">
        <div>
            <div class="home-card-info-leftShop">
              <img src="/static/images/collection-examples/shop.png" alt="">
            </div>
            <div class="home-card-info-rightShop">
                <div class="title">城市数藏 & Xmeta 联合勋章</div>
                <div class="code">
                  <p>JISHADGIN #0001/1000</p>
                  <p>转入成功</p>
                  </div>
            </div>
        </div>
            <div class="home-card-info-line"></div>
            <div class="home-card-info-userInfo">
                <div>
                  <p>转出方</p>
                  <p>孙**</p>
                </div>
                <div>
                  <p>转出方手机号</p>
                  <p>188***88888*</p>
                </div>
                <div>
                  <p>转入时间</p>
                  <p>2022-05-22 10:00:00</p>
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
             width: 127px;
              height: 12px;
              font-size: 10px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: justify;
              color: #0b0e15;
              line-height: 12px;
            border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;
            }
            >p:nth-child(2){
              width: 48px;
              height: 12px;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: justify;
              color: #7bf1a9;
              line-height: 12px;
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