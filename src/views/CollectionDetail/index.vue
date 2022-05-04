<template>
  <div class="app-collection-detail">
    <div class="exhibition-hall">
      <div class="exhibition-hall-show">
        <div class="exhibition-hall-show-body">
<!--          <img src="/static/images/collection-detail/_default_slot.png" alt="">-->
          <img v-if="collectStatus === '2'" :src="getImageSrc(goodsDetail.FrontImage)"alt="">
          <img v-if="collectStatus === '1'" :src="getImageSrc(collectionDetail.FrontImage)"alt="">
        </div>
      </div>
      <div class="exhibition-hall-body">
        <div class="content">
          <div class="content-body">
            <p class="title">
              城市数藏 & Xmeta 联合勋章
            </p>
            <div class="tags">
              <div class="tags-item">
                <div class="bg" v-if="collectStatus === '1'">
                  <p style="padding-left: 25px;width: 125px; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">J{{collectionDetail.CommodityCode}}</p>
                </div>
                <div class="unit" v-if="collectStatus === '2'">
                  <span>限量</span>
                </div>
                <div class="value" v-if="collectStatus === '2'">
                  <span >{{goodsDetail.LimitNum}}</span>
                </div>
              </div>
              <div class="tags-item" v-if="collectStatus === '2'">
                <div class="value">
                  <span>{{goodsDetail.Name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hr">
      <img class="icon" src="/static/images/collection-detail/hr-icon.png" alt="">
      <p>官方授权 · 限量发行 · BSN链技术</p>
    </div>
    <div class="brand-party">
      <div class="brand-party-card">
        <div class="brand-party-card-body" @click="(event) => $emit('click', event)">
          <div class="icon">
            <img src="/static/images/collection-detail/brand-party-icon.png" alt="">
          </div>
          <div class="into">
            <p>城市数藏 · 数字文化馆</p>
            <p class="desc">藏品品牌方</p>
          </div>
          <div class="right">
            <img src="/static/images/right-icon.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 查看藏品-->
    <div v-if="collectStatus === '1' ">
      <div class="story">
        <!-- 收藏信息-->
        <div class="story-card">
          <div class="story-card-title">
            收藏信息
            <div class="background"></div>
          </div>
          <div class="story-card-title-detail">
            <div>收藏者</div>
            <div>
              <img style="display:inline-block;vertical-align: top;margin-right:8px;width:18px;height:18px;border-radius: 9px;object-fit: cover;" :src="getImageSrc(collectionDetail.OwnerUserInfo.UserHead)" alt="">
              <span>{{collectionDetail.OwnerUserInfo.NickName}}</span>
            </div>
          </div>

          <div class="story-card-title-detail">
            <div>生成时间</div>
            <div>
              <span>{{collectionDetail.CommodityStartDateTime}}</span>
            </div>
          </div>
          <div class="story-card-title-detail">
            <div>链上标识</div>
            <div>
              <span>{{collectionDetail.DDCID}}</span>
            </div>
          </div>
          <div class="story-card-title-detail">
            <div>藏品哈希值</div>
            <div>
              <span></span>
            </div>
          </div>
          <p class="story-card-title-detail-describe">
            {{collectionDetail.HashCode}}
          </p>
        </div>
          <img v-if="collectionDetail.DDCID !==null" class="ddcid" src="/static/images/collection-detail/sl-logo.png" alt="">
      </div>
      <div class="work-information">
        <div class="work-information-card">
          <div class="work-information-card-title">
            作品信息
            <div class="background"></div>
          </div>
          <div class="work-information-card-title-des">
            <div>发行方</div>
            <div>{{collectionDetail.ReleaseUserName}}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>创作者</div>
            <div>{{collectionDetail.AuthorName}}</div>
          </div><div class="work-information-card-title-des">
          <div>发行时间</div>
          <div>{{collectionDetail.CommodityExchangesDateTime}}</div>
        </div>

        </div>
      </div>
      <div class="footer">
        <button class="save">转赠藏品</button>
      </div>
    </div>
    <!--藏品详情-->
    <div v-if="collectStatus === '2' ">
      <div class="storydes">
        <!-- 收藏信息-->
        <div class="storydes-card">
          <div class="storydes-card-title">
            作品故事
            <div class="background"></div>
          </div>
          <div class="storydes-card-title-detail">
            <div  v-html="goodsDetail.Description"></div>
          </div>
        </div>
      </div>
      <div class="work-information">
        <div class="work-information-card">
          <div class="work-information-card-title">
            作品信息
            <div class="background"></div>
          </div>
          <div class="work-information-card-title-des">
            <div>发行方</div>
            <div>{{goodsDetail.ReleaseUserName}}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>创作者</div>
            <div>{{goodsDetail.AuthorName}}</div>
          </div><div class="work-information-card-title-des">
          <div>发行时间</div>
          <div>{{goodsDetail.CreateDateTime}}</div>
        </div>

        </div>
      </div>

      <!-- 收藏信息-->
      <div class="info">
        <div class="info-card">
        <div class="info-card-title">
          购买须知
          <div class="background"></div>
        </div>
        <div class="info-card-title-detail">
          <span>
            {{goodsDetail.PurchaseNote}}
          </span>
        </div>
        </div>
      </div>
      <div class="footerdes">
        <p class="price">￥{{goodsDetail.Price}}</p>
        <button class="save_one" v-if="this.HomeStatus === '1'" @click="goBuy">前往购买</button>
        <button class="save_two" v-if="this.HomeStatus === '0'">距抢购开始<br/>{{goodsDetail.Countdown}}</button>
        <button class="save_three" v-if="this.HomeStatus === '2'">藏品已售空</button>

      </div>
    </div>
  </div>
</template>

<script>
import { BaseReuseCard } from '@/components'
import { goodsApi } from '@/api'
import getImageUrl from "@/utils/get-image-url";
import { getMyCommodityDetails } from "@/api/goods";

export default {
  components: {
    BaseReuseCard
  },
  data() {
    return {
      collectStatus:'', // 通过状态判断显示当前显示dom
      goodsDetail: {},
      collectionDetail:{},
      HomeStatus:''
    }
  },
  computed: {
    routeParams() {
      return this.$route.query
    }
  },
  created() {
    // 读取路由[collectStatus]参数 ’1‘ || ’2‘
    const { collectStatus} = this.routeParams
    this.collectStatus = collectStatus
    if (this.collectStatus === '2') {
      this.getDetail()
    } else if (this.collectStatus === '1') {
      this.getCollDetail()
    }
  },
  methods: {
    getImageSrc(path) {
      return getImageUrl(path)
    },
    // 前往购买
    goBuy () {
      window.location.href =  this.goodsDetail.YouzanUrl ? this.goodsDetail.YouzanUrl : 'http://www.baidu.com'
    },
    // 获取商品详情
    getDetail() {
      const { id, homeStatus} = this.routeParams
      this.HomeStatus = homeStatus
      goodsApi
          .getGoodsDetailById(id)
          .then(result => {
            this.goodsDetail = result.Data
          })
    },
    // 获取我的藏品详情
    getCollDetail() {
      // 需要两个参数
      const { userId,commodityDetailsID } = this.routeParams
      const params = {
        userId: userId,
        commodityDetailsID:commodityDetailsID
      }
      goodsApi
          .getMyCommodityDetails(params)
          .then(result => {
            this.collectionDetail = result.Data
            console.log('this.collectionDetail',this.collectionDetail)
          })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/styles/global-variable";

.app-collection-detail {
  background: #0b0e15;
  padding-bottom:100px;
  .exhibition-hall {
    background-image: url(/public/static/images/collection-detail/background.png);
    background-size: 100% 670px;
    background-position: 0 -@nav-bar-height;
    background-repeat: no-repeat;
    //height: 670px;
    height: 615px;
    position: relative;

    &-show {
      padding-top: 94px;
      padding-left: 30px;
      padding-right: 30px;
      box-sizing: border-box;

      &-body {
        width: 100%;
        height: 255px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        box-sizing: border-box;

        img {
          width: 315px;
          height: 256px;
        }
      }
    }

    &-body {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 32px 16px;
      box-sizing: border-box;

      .content {
        position: relative;
        height: 58px;
        width: 100%;

        &-body {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;

          .title {
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
          }

          .tags {
            display: flex;
            align-items: center;

            &-item {
              display: flex;
              margin: 0 5px;
              border-radius: 4px;
              overflow: hidden;
              .bg {
                width: 164px;
                height: 20px;
                border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;
                >p{
                  font-size: 11px;
                  font-family: PingFangSC, PingFangSC-Regular;
                  font-weight: 400;
                  text-align: center;
                  color: #0b0e15;
                  line-height: 20px;
                }
              }
              .unit {
                background: #fed89b;
                padding: 4px 8px;
                font-size: 11px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-size: 11px;
                font-weight: 400;
                color: #333333;
              }

              .value {
                flex: 1;
                padding: 4px 8px;
                background: #282d38;
                font-size: 11px;
                font-family: PingFangSC, PingFangSC-Regular;
                text-align: justify;
                color: #ffffff;
              }
            }
          }
        }

        &:before {
          content: '';
          width: 28px;
          height: 100%;
          top: 0;
          position: absolute;
          background-image: url(/public/static/images/collection-detail/ear-left.png);
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: 0 0;
        }

        &:after {
          content: '';
          width: 28px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          background-image: url(/public/static/images/collection-detail/ear-right.png);
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: 0 0;
        }
      }
    }
  }

  .hr {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #cccccc;

    .icon {
      width: 14px;
      object-fit: cover;
      height: auto;
      margin-right: 8.6px;
    }

    &:before {
      content: '';
      width: 55px;
      height: 100%;
      top: 0;
      position: absolute;
      background-image: url(/public/static/images/collection-detail/needle-left-icon.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: 0 4px;
      left: 16px;
    }

    &:after {
      content: '';
      width: 55px;
      height: 100%;
      position: absolute;
      right: 16px;
      top: 0;
      background-image: url(/public/static/images/collection-detail/needle-right-icon.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: 0 4px;
    }
  }

  .brand-party {
    padding: 0 16px;
    margin-top: 37px;

    &-card {
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #191c23;
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
  }

  .story {
    position: relative;
    padding: 0 16px;
    margin-top: 12px;

    &-card {
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #191c23;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

      &-title {
        position: relative;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: justify;
        color: #ffffff;
        line-height: 16px;
        .background{
          width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg,rgba(178,227,255,0.00), #7ac3ff);
        }
        &-detail {
          margin-top: 22px;
          display: flex;
          justify-content: space-between;

          > div{
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
          }

          &-describe {
            height: 52px;
            margin-top: 8px;
            width: 100%;
            word-break: break-all;
            background: #0b0e15;
            border-radius: 8px;
            white-space: normal;
            padding: 6px 16px;
            box-sizing: border-box;
            font-size: 15px;
            text-align: justify;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #aaaaaa;
            line-height: 26px;
          }
        }
      }
    }
  }

  .work-information {
    padding: 0 16px;
    margin-top: 12px;
    &-card {
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #191c23;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
      &-title {
        font-size: 16px;
        position: relative;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: justify;
        color: #ffffff;
        line-height: 16px;
        .background{
          width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg,rgba(255,178,243,0.00), #ff7af9);
        }
        &-des{
          display: flex;
          justify-content: space-between;
          margin-top: 22px;
          >div:nth-child(1){
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 30px;
          }
          >div:nth-child(2){
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: right;
            color: #ffffff;
            line-height: 30px;
          }
        }
      }
    }
  }

  .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px 36px;
      box-sizing: border-box;
      background: #0b0e15;
      width: 100%;

      .save {
        width: 100%;
        height: 50px;
        background: linear-gradient(90deg, #3487ed, #5484ff);
        border-radius: 25px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        line-height: 50px;
        border: none;
        outline: none;
      }
  }
  .storydes {
    padding: 0 16px;
    margin-top: 12px;

    &-card {
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #191c23;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

      &-title {
        position: relative;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: justify;
        color: #ffffff;
        line-height: 16px;
        .background{
          width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg,rgba(178,227,255,0.00), #7ac3ff);
        }
        &-detail {
          color: #aaaaaa;
          font-size: 16px;
          box-sizing: border-box;
          overflow: hidden;
          height: 100%;
          align-items:center;
          box-sizing: border-box;
          justify-content:center;
          >div{
            display: inline-block;
            object-fit: cover;
            margin-top: 28px;
            width: 303px;
            height: auto;
          }
        }
      }
    }
  }
  .info {
    padding: 0 16px;
    margin-top: 12px;
    &-card {
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #191c23;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
      &-title {
        position: relative;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: justify;
        color: #ffffff;
        line-height: 16px;
        margin-bottom:17px;
        .background {
          width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg, rgba(178, 227, 255, 0.00), #7ac3ff);
        }
        &-detail {
          box-sizing: border-box;
          overflow: hidden;
          height: 100%;
          align-items: center;
          justify-content: center;
          >span {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 20px;
          }
        }
        }
    }
  }
  .footerdes {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px 36px;
    box-sizing: border-box;
    background: #0b0e15;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 26px;
      font-family: DINAlternate, DINAlternate-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
      line-height: 26px;
    }
    .save_one {
      width: 170px;
      height: 42px;
      background: #fed89b;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border:none;
    }
    .save_three {
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border:none;
    }
    .save_three {
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border:none;
    }
    .save_two {
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);;
      font-size: 11px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border:none;
    }
  }
  .ddcid {
    width: 128px;
    height: 128px;
    opacity: 0.2;
    position:absolute;
    right: 22px;
    top: 60px;
    display: inline-block;
  }
}
</style>
