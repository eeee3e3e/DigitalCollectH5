<template>
  <div class="app-verification-code-input">
    <div class="app-verification-code-input-header">
      <div class="icon-wrapper">
        <img class="icon" src="/static/images/password/pay.png" alt="">
      </div>
      <div class="text-wrapper">
        <p>请设置您的账户支付密码，为了保障您的账户安全， 建议避免设置生日、连续数字等</p>
      </div>
    </div>
    <div class="app-verification-code-input-main">
      <div class="app-verification-code-input-main-body" @click="onInputFocus">
        <div v-for="(_, index) of array6" :key="index" class="code-item" >
          <span v-if="verificationCodeArray[index]">*</span>
          <i class="active" v-else/>
        </div>
      </div>
      <input ref="codeInput" autofocus class="hidden-input" :value="verificationCode" type="tel" :maxlength="6"
             @input="onVerificationCodeInput"/>
    </div>
  </div>
</template>

<script>

function formatVerificationCodeValue(value) {
  if (value && value !== '') {
    value = value.replace(/[^\d+]/ig, '')
  }
  return value
}
export default {
  data() {
    return {
      verificationCode: undefined,
      array6: Object.freeze(Array.from({ length: 6 }))
    }
  },
  computed: {
    verificationCodeArray() {
      const { verificationCode } = this
      if (!verificationCode) return []
      return verificationCode.split('')
    }
  },
  created() {
    // this.$nextTick(this.startCountDown)
  },
  methods: {

    // 聚焦input
    onInputFocus() {
      this.$refs.codeInput.focus()
    },

    // 验证码输入
    onVerificationCodeInput(event) {
      const value = formatVerificationCodeValue(event.target.value)
      this.verificationCode = value.length > 6 ? (value || '').slice(0, 6) : value
      console.log(this.verificationCode.length)
      if (this.verificationCode.length === 6) {
        this.$router.push({
          path:'again-password',
          query:{
            password:this.verificationCode
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
.app-verification-code-input {
  &-header {
    padding: 100px  24px 95px 24px;
    box-sizing: border-box;

    .icon-wrapper {
      .icon {
        width: 168px;
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
    padding: 30px 18px;
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
          display: inline-block;
          width: 40px;
          vertical-align: middle;
          height: 54px;
          line-height: 68px;
          margin: 0 auto;
          margin-right:15px;
          border: 2px solid #333333;
          font-size: 36px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
        }
      }
    }

    .hidden-input {
      position: fixed;
      background-color: transparent;
      width: 100%;
      height: 100%;
      top: -100%;
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
.active{
   display: inline-block;
          width: 40px;
          height: 54px;
          line-height: 54px;
          margin-right:15px;
          border: 2px solid #aaaaaa;
          font-size: 24px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
}
.i {
          display: inline-block;
          width: 40px;
          height: 54px;
          // opacity: 0.3;
          margin-right:15px;
          border:2px solid #333333;
          background: transparent;
          // margin: 0px 10px;
        }
</style>
