<template>
  <div class="app-collection-detail">
    <div class="exhibition-hall">
      <div class="exhibition-hall-show">
        <div class="exhibition-hall-show-body">
          <img v-if="collectStatus === '2' && goodsDetail.AttachmentList && goodsDetail.AttachmentList.length && goodsDetail.AttachmentList[0].split('.')[goodsDetail.AttachmentList[0].split('.').length-1] !== 'mp4'"
               :src="getImageSrc(goodsDetail.AttachmentList[0])" alt="">
          <img v-if="collectStatus === '1' && collectionDetail.AttachmentList && collectionDetail.AttachmentList.length && collectionDetail.AttachmentList[0].split('.')[collectionDetail.AttachmentList[0].split('.').length-1] !== 'mp4'"
               :src="getImageSrc(collectionDetail.AttachmentList[0])" alt="">
               <div @click="play">
               <video id="videoid" :poster="getImageSrc(goodsDetail.FrontImage)" x5-video-player-type="h5"  webkit-playsinline playsinline muted v-if="collectStatus === '2' && goodsDetail.AttachmentList && goodsDetail.AttachmentList.length && goodsDetail.AttachmentList[0].split('.')[goodsDetail.AttachmentList[0].split('.').length-1] === 'mp4'"
               :src="getImageSrc(goodsDetail.AttachmentList[0])"  loop="loop" ></video>
               <video id="videoid" :poster="getImageSrc(collectionDetail.FrontImage)" x5-video-player-type="h5"  webkit-playsinline playsinline muted v-if="collectStatus === '1' && collectionDetail.AttachmentList && collectionDetail.AttachmentList.length && collectionDetail.AttachmentList[0].split('.')[collectionDetail.AttachmentList[0].split('.').length-1] === 'mp4'"
               :src="getImageSrc(collectionDetail.AttachmentList[0])" loop="loop" a></video>
               </div>
        </div>
      </div>
      <div class="exhibition-hall-body">
        <div class="content">
          <div class="content-body">
            <p class="title">
              <span v-if="collectStatus === '2'">{{ goodsDetail.Name }}</span>
              <span v-if="collectStatus === '1'">{{ collectionDetail.CommodityName }}</span>
            </p>
            <div class="tags">
              <div class="tags-item">
                <div class="bg" v-if="collectStatus === '1'">
                  <p>{{ collectionDetail && collectionDetail.CommodityCode ? collectionDetail.CommodityCode.substring(collectionDetail.CommodityCode.length - 12):'' }}</p>
                  <p> #{{ collectionDetail.CommodityNo }}/{{ collectionDetail.LimitNum }}</p>
                </div>
                <div class="unit" v-if="collectStatus === '2'">
                  <span>限量</span>
                </div>
                <div class="value" v-if="collectStatus === '2'">
                  <span>{{ goodsDetail.LimitNum }}</span>
                </div>
              </div>
              <div class="tags-item" v-if="collectStatus === '2'">
                <div class="value">
                  <span>{{ goodsDetail.SerialType }}</span>
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
            <!--            <p>藏品品牌方</p>-->
            <p v-if="collectStatus === '2'">{{ goodsDetail.BrandName }}</p>
            <p v-if="collectStatus === '1'">{{ collectionDetail.BrandName }}</p>
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
              <img
                  v-if="collectionDetail.OwnerUserInfo && collectionDetail.OwnerUserInfo.UserHead !==null && collectionDetail.OwnerUserInfo.UserHead !==''"
                  style="display:inline-block;vertical-align: top;margin-right:8px;width:18px;height:18px;border-radius: 9px;object-fit: cover;"
                  :src="getImageSrc(collectionDetail.OwnerUserInfo.UserHead)" alt="">
              <img v-else
                   style="display:inline-block;vertical-align: top;margin-right:8px;width:18px;height:18px;border-radius: 9px;object-fit: cover;"
                   src="/static/images/avatar.png" alt="">
              <span v-if="collectionDetail.OwnerUserInfo">{{ collectionDetail.OwnerUserInfo.NickName }}</span>
            </div>
          </div>

          <div class="story-card-title-detail">
            <div>生成时间</div>
            <div>
              <span>{{ collectionDetail.CommodityExchangesDateTime }}</span>
            </div>
          </div>
          <div class="story-card-title-detail">
            <div>链上标识</div>
            <div>
              <span
                  v-if="collectionDetail.DDCID !==null &&  collectionDetail.DDCID !==''">{{
                  collectionDetail.DDCID
                }}</span>
              <span v-else>正在上链中...</span>
            </div>
          </div>
          <div class="story-card-title-detail">
            <div>藏品哈希值</div>
            <div>
              <span></span>
            </div>
          </div>
          <p class="story-card-title-detail-describe">
            {{ collectionDetail.HashCode }}
          </p>
        </div>
        <img v-if="collectionDetail.DDCID !==null && collectionDetail.DDCID !=='' " class="ddcid"
             src="/static/images/collection-detail/sl-logo.png" alt="">
      </div>
      <div class="work-information">
        <div class="work-information-card">
          <div class="work-information-card-title">
            作品信息
            <div class="background"></div>
          </div>
          <div class="work-information-card-title-des">
            <div>发行方</div>
            <div>{{ collectionDetail.ReleaseUserName }}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>创作者</div>
            <div>{{ collectionDetail.AuthorName }}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>发行时间</div>
            <div>{{ collectionDetail.CommodityStartDateTime }}</div>
          </div>

        </div>
      </div>
      <div class="footer">
        <button class="save" :disabled="this.collectionDetail.CommodityStatus !== 'allow-give'" @click="examplesCollection" :class="this.collectionDetail.CommodityStatus === 'allow-give' ? 'save':'zzBtn'" >转赠藏品</button>
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
            <div v-html="goodsDetail.Description"></div>
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
            <div>{{ goodsDetail.ReleaseUserName }}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>创作者</div>
            <div>{{ goodsDetail.AuthorName }}</div>
          </div>
          <div class="work-information-card-title-des">
            <div>发行时间</div>
            <div>{{ goodsDetail.StartDateTime }}</div>
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
            <p>
              {{ goodsDetail.PurchaseNote }}
            </p>
          </div>
        </div>
      </div>
      <div class="footerdes">
        <p class="price">￥{{ goodsDetail.Price }}</p>
        <button class="save_one" v-if="HomeStatus === '1'" @click="goBuy">前往购买</button>
        <button class="save_two" v-else-if="HomeStatus === '0'">
          <p>距抢购开始</p>
          <p style="margin-top:3px;">{{ count }}</p>
        </button>
        <button class="save_three" v-else-if="HomeStatus === '2'">藏品已售空</button>



        <!-- 报名参与抽签 相关按钮 -->
        <button class="save_seven" v-else-if="HomeStatus === '-6'">
          <p>报名未开始</p>
          <!-- <p style="margin-top:3px;">祝您下次好运</p> -->
        </button>

        <button class="save_four" v-else-if="HomeStatus === '-3'" @click="goSignUp">报名抽签</button>
        <button class="save_five" v-else-if="HomeStatus === '-4'">
          <p>报名成功</p>
          <p style="margin-top:3px;font-size:10px;">开售前 1 小时公布结果</p>
        </button>

        <button class="save_five" v-else-if="HomeStatus === '-8'">
          <p>报名结束，距发售</p>
          <p style="margin-top:3px;font-size:10px;">{{ count||'倒计时' }}</p>
        </button>

        <button class="save_one" v-else-if="HomeStatus === '-7'" @click="goBuy">
          <p style="font-size:11px;">恭喜您中签</p>
          <p style="margin-top:3px;font-size:10px;">立即前往购买</p>
        </button>
        <button class="save_six" v-else-if="HomeStatus === '-5'">
          <p>本次未中签</p>
          <p style="margin-top:3px;">祝您下次好运</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import underDevelopmentTip from "@/utils/under-development-tip";
import { BaseReuseCard } from '@/components'
import { goodsApi } from '@/api'
import getImageUrl from "@/utils/get-image-url";
// import { getMyCommodityDetails } from "@/api/goods";
import moment from 'moment'
import { mapGetters } from 'vuex'
import {
  judgeSignUpTime,
  judgeSignUpStatus,
  judgeSellTime,
  judgeWin,
  countDown
} from '@/utils/draw-lots'

export default {
  components: {
    BaseReuseCard
  },
  data() {
    this.timer = 0
    return {
      seconds: '', //倒计时
      count: '',
      StartDateTime: '', // 預售時間
      collectStatus: '', // 通过状态判断显示当前显示dom
      goodsDetail: {},
      collectionDetail: {},
      HomeStatus: '',
      btnStatus:'',
    }
  },
  computed: {
    ...mapGetters(['userInfo','hasUserInfo']),
    routeParams() {
      return this.$route.query
    }
  },
  created() {
    // 读取路由[collectStatus]参数 ’1‘ || ’2‘
    const { collectStatus } = this.routeParams
    this.collectStatus = collectStatus
    this.btnStatus = this.collectStatus && this.collectStatus.CommodityStatus ? this.collectStatus.CommodityStatus : ''
    if (this.collectStatus === '2') {
      this.getDetail()
    } else if (this.collectStatus === '1') {
      this.getCollDetail()
    }
  },
  mounted () {
    this.timer = setTimeout(()=>{
      this.play()
    },1000)
  },
  methods: {
    play() {
      const videoEl = document.getElementById("videoid")
      videoEl && videoEl.play()
    },
    // 天 时 分 秒 格式化函数
    countDown(seconds) {
      let d = parseInt(seconds / (24 * 60 * 60))
      d = d < 10 ? "0" + d : d
      let h = parseInt(seconds / (60 * 60) % 24);
      h = h < 10 ? "0" + h : h
      let m = parseInt(seconds / 60 % 60);
      m = m < 10 ? "0" + m : m
      let s = parseInt(seconds % 60);
      s = s < 10 ? "0" + s : s
      this.count = d + '天' + h + '时' + m + '分' + s + '秒'
    },
    //定时器没过1秒参数减1
    Time() {
      const { goodsDetail } = this
      const StartDateTime = goodsDetail.StartDateTime.replace(/\-/ig, '/')
      const nowDate = moment().valueOf()
      const StartDateTimeMoment = moment(StartDateTime).valueOf()
      if (StartDateTimeMoment <= nowDate) {
        this.HomeStatus = '1'
        return
      }
      this.timer = setTimeout(() => {
        this.seconds = (StartDateTimeMoment - nowDate) / 1000
        this.countDown()
        this.Time(this.seconds)
      }, 1000)
    },
    // 转赠藏品
    examplesCollection() {
      // underDevelopmentTip()
      // this.$router.push('collection-examples')
      this.$router.push({
        path:'collection-examples',
        query:{
          AttachmentList:JSON.stringify(this.collectionDetail.AttachmentList),
          CommodityName:this.collectionDetail.CommodityName,
          CommodityCode:this.collectionDetail.CommodityCode,
          CommodityNo:this.collectionDetail.CommodityNo,
          LimitNum:this.collectionDetail.LimitNum,
          CommodityDetailsID:this.collectionDetail.CommodityDetailsID,
          ReleaseUserName:this.collectionDetail.ReleaseUserName
        }
      }
        )
    },
    getImageSrc(path) {
      return getImageUrl(path)
    },
    // 前往购买
    goBuy() {
      window.location.href = this.goodsDetail.YouzanUrl ? this.goodsDetail.YouzanUrl : ''
    },
    // 获取商品详情
    getDetail() {
      const { id } = this.routeParams
      this.HomeStatus = ''
      const params = {id}
      if (this.hasUserInfo) {
        params.userid = this.userInfo.ID
      }
      goodsApi
          .getGoodsDetailById(params)
          .then(result => {
            const resultData = result.Data
            let {
              SignUpStartTime:signUpStartTime,
              SignUpEndTime:signUpEndTime,
              SignUp:signUp,
              Bonus:bonus,
              ServerTime:serverTime,
              HomeStatus:homeStatus,
              StartDateTime: startDateTime
            } = resultData

            this.HomeStatus = homeStatus

            this.goodsDetail = resultData

            // YYYY-MM-DD HH:mm:ss 转 时间戳
            const timeConversion= time => moment(time.replace(/\-/ig, '/')).valueOf()
            // 正常逻辑
            const normalBusiness = () => {
              if (this.HomeStatus === '0') {
                this.Time()
              }
            }
            // 报名逻辑
            if (signUpStartTime&&signUpEndTime) {
              /**
               * signUpStartTime: 报名开始时间
               * signUpEndTime: 报名结束时间
               * startDateTime: 预售开始时间
               * endDateTime: 预售结束时间
               * signUp: 是否报名
               * bonus: 是否中签
               * homeStatus: 售空状态
               *
               *   if(当前时间 小于 报名开始时间) --- 报名未开始
               *      return 报名未开始
               *
               *   if((当前时间 大于 报名开始时间) && (当前时间 小于 报名结束时间)) --- 报名中
               *      if(signUp的值为true) --- 未报名
               *        return 未报名
               *      else ------------------ 已报名
               *        return 已报名
               *
               *   if(当前时间 大于 报名结束时间) --- 报名已结束
               *      if(报名结束时间 到 预售时间前1小时) --- 倒计时
               *        return 报名结束，开始倒计时
               *      else if(售空状态 === '2') --- 已售空
               *        return 已售空
               *      else if(是否中签状态 === 100) --- 已中签
               *        return 报名结束，已中签
               *      else if(是否中签状态 === 0) --- 未中签
               *        return 报名结束，未中签
               *      else
               *        return -1(异常状态)
               *
               */

              const nowTimeStamp = timeConversion(serverTime)
              // 报名时间
              const signUpStartTimeStamp = timeConversion(signUpStartTime)
              const signUpEndTimeStamp = timeConversion(signUpEndTime)
              // 预售时间
              const startDateTimeStamp = timeConversion(startDateTime)
              let result = judgeSignUpTime(nowTimeStamp, signUpStartTimeStamp, signUpEndTimeStamp)
              // console.log('判断报名时间--',result)
              if (result.status === 0) {
                this.HomeStatus = '-6'
              } else if (result.status === 1) {
                result = judgeSignUpStatus(signUp)
                // console.log('判断报名状态--',result)
                if (result.status === 0) {
                  this.HomeStatus = '-3'
                } else if (result.status === 1) {
                  this.HomeStatus = '-4'
                }
              } else if (result.status === 2) {
                const offset = 60 * 60 * 1000
                result = judgeSellTime(nowTimeStamp, startDateTimeStamp, offset, homeStatus==='2')
                // console.log('判断开售时间--',result)
                if (result.status === 0) {
                  this.HomeStatus = '2'
                } else if (result.status === 1) {
                  result = judgeWin(bonus === 100)
                  // console.log('判断中签状态--',result)
                  if (result.status === 1) {
                    this.HomeStatus = '-7'
                  }else if(result.status === 0) {
                    this.HomeStatus = '-5'
                  }
                } else if (result.status === 2) {
                  // 倒计时
                  this.HomeStatus = '-8'
                  countDown(nowTimeStamp, startDateTimeStamp - offset, 1000, res=>{
                    this.timer = res.timer
                    if(res.status === 0){
                      // window.location.reload()
                      this.getDetail()
                      return
                    }
                    this.countDown(res.timeDiff)
                  })
                }
              }
            } else {
              normalBusiness()
            }
          })
    },
    // 获取我的藏品详情
    getCollDetail() {
      // 需要两个参数
      const { userId, commodityDetailsID } = this.routeParams
      const params = {
        userId: userId,
        commodityDetailsID: commodityDetailsID
      }
      goodsApi
          .getMyCommodityDetails(params)
          .then(result => {
            this.collectionDetail = result.Data
            console.log('this.collectionDetail', this.collectionDetail)
          })
    },
    // 报名
    goSignUp() {
      if (!this.hasUserInfo) {
        // 去登陆
        this.$router.push('/city-meta/verification-code-login')
        return
      }
      if (!this.userInfo.IsIdentityVerify) {
        // 没有实名认证
        this.$router.push('/city-meta/authentication')
        return
      }
      goodsApi.postSignUp({
        userId: this.userInfo.ID,
        commodityId: this.$route.query.id
      }).then(res=>{
        // window.location.reload()
        this.getDetail()
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/styles/global-variable";

.app-collection-detail {
  background: #0b0e15;
  padding-bottom: 110px;

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
        height: 265px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        box-sizing: border-box;
        // overflow: hidden;
        video {
          object-fit:cover;
           width: 265px;
          height: 265px;
        }
        img {
          display: inline-block;
          width: 265px;
          height: 265px;
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
                padding-left: 25px;
                padding-right: 10px;
                display: flex;
                justify-content: space-between;
                width: 164px;
                height: 20px;
                border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;

                > p {
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
          margin-top: -3px;

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
          margin-top: 22px;
          display: flex;
          justify-content: space-between;
          padding: 5px 0;

          > div:nth-child(1) {
            width:85px;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
          }
          > div:nth-child(2) {
            text-align: right;
            width: calc(100% - 85px);
            flex-wrap: wrap;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #aaaaaa;
          }

          &-describe {
            overflow: hidden;
            text-overflow: ellipsis;
            //height: 82px;
            min-height: 82px;
            margin-top: 18px;
            width: 100%;
            word-break: break-all;
            background: #0b0e15;
            border-radius: 8px;
            white-space: normal;
            padding: 10px 16px;
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

        .background {
          width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg, rgba(255, 178, 243, 0.00), #ff7af9);
        }

        &-des {
          display: flex;
          justify-content: space-between;
          margin-top: 22px;

          > div:nth-child(1) {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 30px;
          }

          > div:nth-child(2) {
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
     .zzBtn {
      width: 100%;
      height: 50px;
      background: #999999;
      border-radius: 25px;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
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
          display: flex;
          color: #aaaaaa;
          font-size: 16px;
          box-sizing: border-box;
          overflow: hidden;
          height: 100%;
          align-items: center;
          box-sizing: border-box;
          justify-content: center;

          ::v-deep img {
            object-fit: cover;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }

          > div {
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
        margin-bottom: 17px;

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

          > p {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #aaaaaa;
            line-height: 24px;
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
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border: none;
    }

    .save_three {
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border: none;
    }

    .save_two {
      letter-spacing: 2px;
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);;
      font-size: 11px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border: none;
    }

    .save_four {
      width: 170px;
      height: 42px;
      background-color: #3487ed;
      background: linear-gradient(90deg,#3487ed, #5484ff);
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      border: none;
      outline: none;
    }

    .save_five,
    .save_six,
    .save_seven {
      width: 170px;
      height: 42px;
      background: #999999;
      border-radius: 21px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);
      font-size: 11px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #101012;
      border: none;
      outline: none;
    }
  }

  .ddcid {
    width: 128px;
    height: 128px;
    opacity: 0.2;
    position: absolute;
    right: 22px;
    top: 60px;
    display: inline-block;
  }
}
</style>
