<template>
  <div class="app-home-card">
    <div class="app-home-card-header">
      <div class="app-home-card-header-left">
        <img class="icon" src="/static/images/home/timer-icon.png" alt="">

        <!-- <span v-if="goods.BrandName === '景德镇市古窑民俗旅游有限公司'">2022-06-11 11:08:00</span> -->
        <span  v-html="goods.ActivityStartTime||goods.StartDateTime"></span>
      </div>
      <div class="app-home-card-header-right">
        <span v-html="goods.SerialType"></span>
      </div>
    </div>
    <div class="app-home-card-main" @click="() => $emit('click', goods)">
      <div class="card-view">
        <div class="card-view-body">
          <base-image :src="getImageSrc(goods.FrontImage)"
                      width="100%"
                      fit="cover">
            <template v-slot:loading>
              <Loading type="spinner" size="20"/>
            </template>
          </base-image>
        </div>
        <div v-if="goods.HomeStatus === '2'" class="time-end">
          <img class="icon" src="/static/images/home/time-end.png" alt="">
          <!--            <img class="icon" src="/static/images/home/have-not-started-icon.png" alt="">-->
          <!--            <span v-html="goods.HomeStatusName"></span>-->
        </div>

        <!-- 报名抽签相关藏品状态 -->
        <div v-else-if="drawLotsCollection" class="card-view-tag">
          <!-- 未开始 -->
          <div v-if="drawLotsCollectionTag.status === '-1'" class="card-view-tag-body have-not-started">
            <img class="icon" src="/static/images/home/have-not-started-icon.png" alt="">
            <span>{{drawLotsCollectionTag.text}}</span>
          </div>
          <!-- 报名中 -->
          <div v-else-if="drawLotsCollectionTag.status === '-2'" class="card-view-tag-body sign-up">
            <img class="icon" src="/static/images/home/sign-up-icon.png" alt="">
            <span>{{drawLotsCollectionTag.text}}</span>
          </div>
          <!-- 抽签中 -->
          <div v-else-if="drawLotsCollectionTag.status === '-3'" class="card-view-tag-body luck-draw">
            <img class="icon" src="/static/images/home/luck-draw-icon.png" alt="">
            <span>{{drawLotsCollectionTag.text}}</span>
          </div>
          <!-- 正在热售 -->
          <div v-else-if="drawLotsCollectionTag.status === '-4'" class="card-view-tag-body is-hot-sale">
            <img class="icon" src="/static/images/home/is-hot-sale-icon.png" alt="">
            <span>{{drawLotsCollectionTag.text}}</span>
          </div>
        </div>

        <div v-else class="card-view-tag">
          <div v-if="goods.HomeStatus === '1'" class="card-view-tag-body is-hot-sale">
            <img class="icon" src="/static/images/home/is-hot-sale-icon.png" alt="">
            <span v-html="goods.HomeStatusName"></span>
          </div>
          <div v-else-if="goods.HomeStatus === '0'" class="card-view-tag-body have-not-started">
            <img class="icon" src="/static/images/home/have-not-started-icon.png" alt="">
            <span v-html="goods.HomeStatusName"></span>
            <!-- <span>报名中</span> -->
          </div>
        </div>
      </div>
      <div class="card-info">
        <p class="card-info-title" v-html="goods.Name"></p>
        <div class="card-info-inventory">
          <div class="card-info-inventory-wrapper">
            <p class="card-info-inventory-unit">限量</p>
            <p class="card-info-inventory-total">{{ goods.LimitNum }}份</p>
          </div>
        </div>
        <div class="card-info-desc">
          <p class="source" v-html="goods.BrandName"></p>
          <p class="price">￥{{ goods.Price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Loading } from 'vant'
import getImageUrl from "@/utils/get-image-url";
import moment from 'moment'
import {
  judgeSignUpTime,
  judgeSignUpStatus,
  judgeSellTime,
  judgeWin,
  countDown
} from '@/utils/draw-lots'

export default {
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      drawLotsCollection: false,
      drawLotsCollectionTag: {}
    }
  },
  created() {
    let {HomeStatus, ServerTime, SignUpEndTime, SignUpStartTime, StartDateTime} = this.goods
    if ((HomeStatus !== '2') && SignUpEndTime && SignUpStartTime) {
      // 报名抽签的藏品
      this.drawLotsCollection = true
      const timeConversion= time => moment(time.replace(/\-/ig, '/')).valueOf()
      // 当前服务器时间
      const nowTimeStamp = timeConversion(ServerTime)
      // 报名时间
      const signUpStartTimeStamp = timeConversion(SignUpEndTime)
      const signUpEndTimeStamp = timeConversion(SignUpStartTime)
      // 预售时间
      const startDateTimeStamp = timeConversion(StartDateTime)
      // 报名阶段
      let result = judgeSignUpTime(nowTimeStamp, signUpStartTimeStamp, signUpEndTimeStamp)
      if (result.status === 0) {
        this.drawLotsCollectionTag = {
          status: '-1',
          text: '未开始'
        }
      } else if (result.status === 1) {
        this.drawLotsCollectionTag = {
          status: '-2',
          text: '报名中'
        }
      } else if (result.status === 2) {
        result = judgeSellTime(nowTimeStamp, startDateTimeStamp, 60*60*1000)
        if (result.status === 1) {
          this.drawLotsCollectionTag = {
            status: '-4',
            text: '正在热售'
          }
        } else if (result.status === 2) {
          this.drawLotsCollectionTag = {
            status: '-3',
            text: '抽签中'
          }
        }
      }
    }
  },
  components: {
    BaseImage: Image,
    Loading
  },
  methods: {
    getImageSrc(path) {
      return getImageUrl(path)
    }
  }
}
</script>

<style scoped lang="less">
.app-home-card {
  margin-top: 8px;

  &-header {
    padding: 16px 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-left {
      font-size: 16px;
      font-weight: 700;
      text-align: justify;
      color: #ffffff;
      display: flex;
      align-items: center;
      white-space: nowrap;
      margin-right: 15px;

      span {
        font-family: DINAlternate, DINAlternate-Bold;
        // font-size: 11px;
      }

      .icon {
        width: 12px;
        margin-right: 8px;
      }
    }

    &-right {
      letter-spacing: 1px;
      opacity: 0.2;
      font-size: 13px;
      font-weight: 400;
      text-align: right;
      color: #ffffff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }

  &-main {
    padding: 16px;
    background-color: #161616;
    border-radius: 8px;
    background-image: url(/public/static/images/home/card-background.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0 0;

    .card-view {
      width: 100%;
      position: relative;
      //height: 323px;
      min-height: 200px;
      border-radius: 2px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      //padding: 10px 10px 0 10px;
      box-sizing: border-box;

      &-body {
        width: 100%;

        img {
          //max-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .time-end {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 3px;
        width: 100%;
        //height: 100%;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 50%;
        }
      }

      &-tag {
        position: absolute;
        //width: 73px;
        //height: 28px;
        opacity: 0.6;
        background: #000000;
        border-radius: 4px;
        top: 14px;
        left: 14px;

        &-body {
          font-size: 11px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          padding: 8px 10px;
          box-sizing: border-box;

          .icon {
            height: 11px;
            margin-right: 6px;
          }
        }

        .is-hot-sale {
          color: #90c2ff;
        }
        .sign-up {
          color: #6594FF;
        }
        .luck-draw {
          color: #60DE9F;
        }
        .have-not-started {
          color: #FF8B37;
        }
      }
    }

    .card-info {
      //padding: 0 16px;
      padding-bottom: 11px;

      &-title {
        line-height: 1;
        padding: 16px 0;
        margin-bottom: 2px;
        font-size: 16px;
        font-weight: 500;
        text-align: justify;
        color: #ffffff;
      }

      &-inventory {
        &-wrapper {
          height: 20px;
          display: flex;
          overflow: hidden;

          p {
            height: auto;
            line-height: 20px;
          }
        }

        &-unit {
          width: 38px;
          height: 20px;
          background: #eece76;
          text-align: center;
          font-size: 12px;
          border-radius: 4px 0 0 4px;
          color: #333333;
        }

        &-total {
          font-size: 11px;
          padding: 0 8px;
          height: 20px;
          background: #444444;
          border-radius: 0 4px 4px 0;
          color: #FFFFFF;
        }
      }

      &-desc {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .source {
          //transform: translateY(50%);
          opacity: 0.4;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: justify;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 15px;
        }

        .price {
          font-size: 28px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: justify;
          color: #ffdc7a;
        }
      }

    }
  }
}
</style>
