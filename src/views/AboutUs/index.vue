<template>
  <div class="app-about-us">
    <div class="app-about-us-main">
      <div class="app-about-us-card">
        <div class="app-about-us-card-body">
          <div class="logo">
            <!-- <img src="/static/images/collection-detail/hr-icon.png" alt=""> -->
            <img src="/static/images/about-us/logo.png" alt="">
          </div>
          <div class="hr">
            <span>版本号 v1.0.0</span>
          </div>
          <p class="content">
            城市数藏通过平台体系的管理运作，以数字藏品为核心承载形式，真正实现“版权链+产业链+区块链+数据链+消费链”的闭环商业，为拓展实体经济的服务渠道，促进数字商品的孵化，实现与国际接轨，打造立足粤港澳、辐射全国、联通国际、具有核心竞争力的数字商品和产业权威的创新平台。
          </p>
        </div>
      </div>

      <div class="app-about-us-main-agreement">
        <CellGroup :border="false">
          <Cell is-link @click="onViewUserServiceAgreement">
            <template #title>
              <span>用户服务协议</span>
            </template>
          </Cell>
          <Cell is-link @click="onViewPrivacyAgreement">
            <template #title>
              <span>隐私权协议</span>
            </template>
          </Cell>
        </CellGroup>
      </div>

      <div class="app-about-us-main-footer">
        <div class="app-about-us-main-footer-header">
          <span class="version">最新版本 v1.0.0</span>
          <span class="timer">2022-05-09</span>
        </div>
        <div class="app-about-us-main-footer-body">
          <p>城市数藏平台正式上线！</p>
          <p>- 支持藏品空投兑换</p>
          <p>- 支持在线购买藏品</p>
          <p>- 支持藏品BSN上链</p>
          <p>- 全新UI交互升级</p>
        </div>
      </div>
    </div>

    <base-action-sheet title="用户服务协议" v-model="showUserServiceAgreement">
      <user-service-agreement/>
    </base-action-sheet>
    <base-action-sheet title="隐私权协议" v-model="showPrivacyAgreement">
      <privacy-agreement/>
    </base-action-sheet>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'

export default {
  components: {
    CellGroup,
    Cell,
    BaseActionSheet,
    UserServiceAgreement,
    PrivacyAgreement
  },
  data() {
    return {
      showUserServiceAgreement: false,
      showPrivacyAgreement: false,
    }
  },
  methods: {
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },
    onViewPrivacyAgreement() {
      this.showPrivacyAgreement = true
    }
  }
}
</script>

<style scoped lang="less">
.app-about-us {
  padding-top: 87px;
  padding-bottom: 20px;
  box-sizing: border-box;

  &-main {
    padding: 0 16px;

    &-agreement {
      margin-top: 14px;
    }

    &-footer {
      margin-top: 14px;
      padding: 18px 20px;
      box-sizing: border-box;
      background: #161616;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 18px;

        .version {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #88afff;
        }

        .timer {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #aaaaaa;
        }
      }

      &-body {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;

        p {
          padding-bottom: 12px;
        }
      }
    }


    ::v-deep {
      .van-cell-group {
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
        overflow: hidden;
        padding: 0 18px;
        background-color: #161616;

        .van-cell {
          padding: 20px 0;
          line-height: 1;
          align-items: center;
          background-color: transparent;
          border-bottom: 1px solid #222222;

          &:nth-last-of-type(1) {
            border-bottom: none;
          }


          &::after {
            display: none;
          }

          .van-cell__title {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }

          .van-cell__value {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
    }
  }

  &-card {
    background: #161616;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

    &-body {
      padding: 20px;
      box-sizing: border-box;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 20px;

        img {
          width: 156px;
          height: 40px;
          object-fit: cover;
        }
      }

      .hr {
        font-size: 11px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #666666;
        padding-top: 16px;
        padding-bottom: 18px;
      }

      .content {
        font-size: 13px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #aaaaaa;
        line-height: 24px;
      }
    }
  }
}
</style>
