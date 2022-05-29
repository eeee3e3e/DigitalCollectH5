<template>
  <div class="app-authentication-result">
    <div class="app-authentication-result-header">
      <div class="app-authentication-result-header-body">
        <div class="icon">
          <img src="/static/images/collection-examples/zcsucess.png" alt="">
        </div>
        <p class="text">已成功转赠藏品，快去告诉好友吧！</p>
      </div>
    </div>

    <div class="app-authentication-result-main">
      <div class="app-authentication-result-card">
        <div class="app-authentication-result-card-header">
          <div class="icon">
            <img src="/static/images/authentication-result/idCard-icon.png" alt="">
          </div>
          <span>受赠方账户信息</span>
        </div>
        <div class="app-authentication-result-card-body">
          <CellGroup :border="false">
            <Cell>
              <template>
                <span>{{name}}</span>
              </template>
              <template #title>
                <span>受赠方姓名</span>
              </template>
            </Cell>
            <Cell>
              <template>
                <span>{{iphone}}</span>
              </template>
              <template #title>
                <span>受赠方手机号</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
     <div class="footer">
        <button class="save" @click="goBackHome">返回首页</button>
      </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { BaseToBack } from '@/components'

export default {
  components: {
    CellGroup,
    BaseToBack,
    Cell
  },
  data () {
    return {
      name:'',
      iphone:''
    }
  },
  computed: {
    routeParams() {
      return this.$route.query
    }
  },
  created () {
    const { name,iphone } = this.routeParams
    this.name = name
    this.iphone = iphone
  },
  methods: {
    goBackHome() {
      this.$router.push({ path: '/city-meta/home' })
    }
  }
}
</script>

<style scoped lang="less">
.app-authentication-result {
  padding-top: 87px;
  padding-bottom: 100px;

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
    margin-bottom:30px;
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
</style>
