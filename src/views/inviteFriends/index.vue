<template>
  <div class="app-about-us">

      

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
