<template>
  <div class="app-conversion">
    <div class="app-conversion-header">
      <div class="icon">
        <img src="/static/images/conversion/header-icon.png" alt="">
      </div>
      <div class="text">
        <p>藏品兑换完成后自动与登录手机号持有人绑定。 </p>
        <p>当前登录手机号：{{ userInfo.MobileNo | filterMobileNo }} </p>
      </div>
      <div class="history" @click="onShowHistory">
        <p>兑换记录</p>
        <img class="icon" src="/static/images/conversion/right-fill.png" alt="">
      </div>
    </div>
    <div class="app-conversion-main">
      <div class="form">
        <div class="form-item">
          <Field v-model="code" placeholder="请输入您的兑换码">
            <template #label>
              <img class="code-input-icon" src="/static/images/conversion/input-icon.png" alt="">
            </template>
          </Field>
          <div class="form-item-tips">
            <img class="icon" src="/static/images/conversion/attention-icon.png" alt="">
            <span>兑换码核对完成后无法取消，请谨慎操作</span>
          </div>
        </div>
      </div>
    </div>
    <div class="app-conversion-footer">
      <div class="app-conversion-footer-content">
        <button class="submit" :class="hasCode ? 'common-save-button' : ''" @click="onToConversionResult">立即兑换</button>
      </div>
    </div>

    <base-action-sheet v-model="showHistory" title="兑换记录">
      <History/>
    </base-action-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Field } from 'vant'
import { BaseActionSheet } from '@/components'
import History from './components/History'
import { goodsApi } from '@/api'

export default {
  components: {
    Field,
    BaseActionSheet,
    History
  },
  data() {
    return {
      code: undefined,
      showHistory: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    hasCode() {
      const { code } = this
      if (!code) return false
      return !!code.replace(/ /ig, '').length
    }
  },
  methods: {
    onClickHistory() {
    },
    // 显示历史记录
    onShowHistory() {
      this.showHistory = true
    },
    // 前往兑换结果
    onToConversionResult() {
      if (this.loading) return
      this.loading = false
      const data = {
        CommodityDetailsCode: this.code,
        UserId: this.userInfo.ID
      }
      goodsApi
          .postUserExchanges(data)
          .then(result => {
            this.$router.push('/city-meta/conversion-result?id=' + result.Data.CommodityDetailsID)
          })
          .finally(() => {
            this.loading = false
          })
    }
  }
}
</script>

<style scoped lang="less">
.app-conversion {
  &-header {
    padding: 102px 24px 0 24px;

    .icon {
      img {
        width: 192px;
        object-fit: cover;
      }
    }

    .text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 22px;
      padding: 24px 0;
    }

    .history {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #eece76;
      line-height: 14px;

      .icon {
        height: 10px;
        margin-left: 10px;
      }
    }
  }

  &-main {
    padding: 50px 24px 0 24px;

    .form {

      &-item {

        &-tips {
          padding: 17px 0;
          display: flex;
          align-items: center;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #666666;

          .icon {
            width: 14px;
            margin-right: 8px;
            margin-left: 10px;
          }
        }

        .code-input-icon {
          width: 14px;
          object-fit: cover;
        }

        ::v-deep {
          .van-field {
            padding: 18px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, .1);

            .van-field__control {
              color: #ffffff;
            }

            .van-field__label {
              display: flex;
              align-items: center;
              justify-content: center;
              width: auto;
            }
          }
        }
      }
    }

  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    &-content {
      padding: 20px 35px;
      box-sizing: border-box;

      .submit {
        width: 100%;
        height: 50px;
        background: linear-gradient(270deg, #19191a, #23242b);
        border-radius: 25px;
        outline: none;
        border: none;
        display: flex;
        font-size: 16px;
        align-items: center;
        justify-content: center;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #666666;
      }
    }
  }
}
</style>
