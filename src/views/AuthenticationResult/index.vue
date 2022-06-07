<template>
  <div class="app-authentication-result">

    <base-to-back :go-back-handel="goBackHandel"/>

    <div class="app-authentication-result-header">
      <div class="app-authentication-result-header-body">
        <div class="icon">
          <img :src="`${staticPath}/static/images/authentication-result/header-icon.png`" alt="">
        </div>
        <p class="text">您已通过实名认证，感谢您的支持！</p>
      </div>
    </div>

    <div class="app-authentication-result-main">
      <div class="app-authentication-result-card">
        <div class="app-authentication-result-card-header">
          <div class="icon">
            <img :src="`${staticPath}/static/images/authentication-result/idCard-icon.png`" alt="">
          </div>
          <span>认证信息</span>
        </div>
        <div class="app-authentication-result-card-body">
          <CellGroup :border="false">
            <Cell>
              <template>
                <span v-html="auth.Name"></span>
              </template>
              <template #title>
                <span>真实姓名</span>
              </template>
            </Cell>
            <Cell>
              <template>
                <span v-if="!userInfo.IsIdentityVerify">{{ auth.IDCard | filterIDCard }}</span>
                <span v-else>已认证</span>
              </template>
              <template #title>
                <span>身份证号</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { mapGetters } from "vuex";
import { BaseToBack } from '@/components'

export default {
  components: {
    CellGroup,
    BaseToBack,
    Cell
  },
  computed: {
    ...mapGetters(['auth', 'userInfo']),
  },
  methods: {
    goBackHandel() {
      this.$router.replace({ path: '/city-meta/my-center' })
    }
  }
}
</script>

<style scoped lang="less">
.app-authentication-result {
  padding-top: 87px;
  padding-bottom: 20px;

  &-header {
    padding: 0 16px;
    box-sizing: border-box;

    &-body {
      padding-top: 47px;
      padding-bottom: 37px;
      background: #161616;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .icon {
        width: 135px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .text {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #aaaaaa;
        margin-top: 30px;
      }
    }
  }

  &-main {
    padding: 0 16px;
    box-sizing: border-box;
    margin-top: 20px;
  }

  &-card {
    &-header {
      padding: 14px 0;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #aaaaaa;
      display: flex;


      .icon {
        margin-right: 6px;
        width: 12px;


        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }

    &-body {

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
  }
}
</style>
