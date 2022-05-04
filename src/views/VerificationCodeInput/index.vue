<template>
  <div class="app-verification-code-input">
    <div class="app-verification-code-input-header">
      <div class="icon-wrapper">
        <img class="icon" src="/static/images/login/input-icon.png" alt="">
      </div>
      <div class="text-wrapper">
        <p>验证码已发送至 {{ loginPhone | filterMobileNo }}，</p>
        <p>请在下方输入 6 位数字验证码</p>
      </div>
    </div>
    <div class="app-verification-code-input-main">
      <div class="app-verification-code-input-main-body">
        <div v-for="(_, index) of array6" :key="index" class="code-item">
          <span v-if="verificationCodeArray[index]">{{ verificationCodeArray[index] }}</span>
          <i v-else/>
        </div>
      </div>
      <input class="hidden-input" :value="verificationCode" type="number" :maxlength="6"
             @input="onVerificationCodeInput"/>
    </div>

    <div class="app-verification-code-input-footer">
      <p v-if="!isLost">{{ stepTime }}s 后重新发送</p>
      <p v-else><span @click="onResendCode">重新发送</span></p>
      <button class="submit" @click="onUserSubmitLogin">
        <span>确认登录</span>
      </button>
    </div>
  </div>
</template>

<script>
import { userApi } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
import tip from "@/utils/tip";
import { setAuthorization } from "@/utils/cookies";
import AppLoading from "@/utils/app-loading";

function formatVerificationCodeValue(value) {
  if (value && value !== '') {
    value = value.replace(/[^\d+]/ig, '')
  }
  return value
}

let timerId

export default {
  data() {
    return {
      verificationCode: undefined,
      array6: Object.freeze(Array.from({ length: 6 })),
      loading: false,
      stepTime: 60,
      isLost: false
    }
  },
  computed: {
    ...mapGetters(['loginPhone']),
    verificationCodeArray() {
      const { verificationCode } = this
      if (!verificationCode) return []
      return verificationCode.split('')
    }
  },
  beforeDestroy() {
    this.stopCountDown()
  },
  created() {
    this.$nextTick(this.startCountDown)
  },
  methods: {
    ...mapMutations(['SET_USER_INFO', 'DEL_LOGIN_PHONE']),

    // 重新发送验证码
    onResendCode() {
      if (this.loading) return
      if (!this.isLost) return
      this.onSendVerificationCode()
    },

    // 发送验证码
    onSendVerificationCode() {
      const { loginPhone } = this

      AppLoading.showAppLoading()

      const params = {
        mobileNo: loginPhone
      }

      userApi
          .getVerificationCode(params)
          .then(() => {
            tip('验证码发送成功')
            this.startCountDown()
          })
          .finally(() => {
            AppLoading.closeAppLoading()
          })
    },

    // 验证码输入
    onVerificationCodeInput(event) {
      const value = formatVerificationCodeValue(event.target.value)
      this.verificationCode = value.length > 6 ? (value || '').slice(0, 6) : value
    },

    // 开始倒计时
    startCountDown() {
      this.isLost = false
      this.stopCountDown()
      timerId = setInterval(() => {
        if (this.stepTime <= 0) {
          this.isLost = true
          this.stopCountDown()
          return
        }
        this.stepTime--
      }, 1000)
    },

    // 结束倒计时
    stopCountDown() {
      if (timerId) {
        clearInterval(timerId)
      }
      this.stepTime = 60
    },

    // 用户提交登录
    onUserSubmitLogin() {
      const { verificationCode } = this
      if (this.loading) return

      if (!this.loginPhone) {
        return tip.error('用户手机号为空')
      }
      if (!verificationCode) return tip.error('验证码不能为空')

      AppLoading.showAppLoading()

      this.loading = true
      const params = {
        MobileNo: this.loginPhone,
        Code: verificationCode
      }
      userApi
          .verifyVerificationCode(params)
          .then(result => {
            const data = result.Data
            setAuthorization(data.Ticket)
            this.SET_USER_INFO(data)
            this.DEL_LOGIN_PHONE()
            this.$router.replace('/city-meta/home')
          })
          .finally(() => {
            AppLoading.closeAppLoading()
            this.loading = false
          })
    }
  }
}
</script>

<style scoped lang="less">
.app-verification-code-input {
  &-header {
    padding: 70px 24px;
    box-sizing: border-box;

    .icon-wrapper {
      .icon {
        width: 192px;
      }
    }

    .text-wrapper {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 22px;
      margin-top: 16px;
    }
  }

  &-main {
    padding: 30px 35px;
    box-sizing: border-box;
    position: relative;

    &-body {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .code-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 44px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
        }

        i {
          display: inline-block;
          width: 26px;
          height: 4px;
          opacity: 0.3;
          background: #ffffff;
          margin: 20px 0;
        }
      }
    }

    .hidden-input {
      position: absolute;
      background-color: transparent;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      outline: none;
      border: none;
      opacity: 0;
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 35px;
    box-sizing: border-box;

    p {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #999999;
    }

    button.submit {
      width: 100%;
      height: 50px;
      background: linear-gradient(90deg, #3487ed, #5484ff);
      border-radius: 25px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
      margin: 20px 0;
      outline: none;
      border: none;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
      text-align: center;
      letter-spacing: 1px;
    }
  }
}
</style>
