<template>
  <div class="app-verification-code-login">
    <div class="app-verification-code-login-header">
      <img class="icon" :src="`${staticPath}/static/images/login/background.png`" alt="">
    </div>
    <div class="app-verification-code-login-main">
      <div class="form">
        <div class="form-item">
          <div class="form-item-phone">
            <div class="form-item-content">
              <input v-model="userPhone" class="phone-input" type="tel" placeholder="请输入手机号" :maxlength="11"/>
              <p class="desc">未注册手机号通过验证后将自动注册</p>
            </div>
          </div>

          <div class="agreement">
            <div class="agreement-tips">
              <div class="agreement-tips-body" :class="{
                'agreement-tips-body-highlight': isCheck,
                'agreement-shake': agreementIsNotCheckError
              }">
                <p v-show="!isCheck">请阅读并同意协议</p>
                <p v-show="isCheck">感谢您的信任与支持！</p>
              </div>
            </div>
            <div class="agreement-content">
              <vant-checkbox v-model="isCheck"/>
              <p>
                已阅读并同意 <span @click="onViewUserServiceAgreement">《用户服务协议》</span> <span @click="onViewPrivacyPolicy">《隐私权政策》</span>
              </p>
            </div>
          </div>

          <div class="form-submit">
            <button class="common-save-button form-submit-button" :class="!isSend ? 'submit-disabled' : ''"
                    :disabled="!isCheck" @click="onSendVerificationCode">
              <span>发送短信验证码</span>
            </button>
          </div>
        </div>
      </div>
    </div>
     <van-dialog v-model="isShow" :show-confirm-button="false">
        <div style="text-align:center;padding-bottom:5px;">
          <!-- <SlideVerify ref="slideblock" @success="sendSmsCode"></SlideVerify> -->
          <Verify :type="1" codeLength="2" @success="sendSmsCode" @error="error" width="100%"  ></Verify>
        </div>
     </van-dialog>
    <base-action-sheet title="用户服务协议" v-model="showUserServiceAgreement">
      <user-service-agreement/>
    </base-action-sheet>
    <base-action-sheet title="隐私权协议" v-model="showPrivacyPolicy">
      <privacy-agreement/>
    </base-action-sheet>
  </div>
</template>

<script>
import Verify from 'vue2-verify'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'
import { Checkbox,Dialog } from 'vant'
import { userApi } from '@/api'
import { verifyPhone } from '@/utils/regexp'
import tip from "@/utils/tip";
import { mapMutations } from "vuex";
import AppLoading from "@/utils/app-loading"
// import SlideVerify from "@/components/check/SlideVerify.vue" // 图片验证
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    BaseActionSheet,
    VantCheckbox: Checkbox,
    UserServiceAgreement,
    PrivacyAgreement,
    // SlideVerify,
    Verify
  },
  data() {
    return {
      isShowSlide:false,
      isShow:false,
      userPhone: undefined,
      showUserServiceAgreement: false,
      showPrivacyPolicy: false,
      isCheck: false,
      agreementIsNotCheckError: false
    }
  },
  // mounted() {
  //   this.isShow = true
  // },
  computed: {
    isSend() {
      return this.isCheck && this.userPhone && this.userPhone.length === 11 // verifyPhone(this.userPhone)
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN_PHONE']),
    hideSlide() {
      setTimeout(() => {
        this.isShowSlide = false;
      }, 500);
    },
    error () {
      tip('验证失败，重新输入')
    },
    sendSmsCode() {
      tip('验证成功')
      const { userPhone } = this
	  //此处的处理是：图片验证通过后，发送短信验证码，这个要根据具体情况单独处理
      setTimeout(() => {
       const params = {
        mobileNo: userPhone
      }
      userApi
          .getVerificationCode(params)
          .then(() => {
            tip('验证码发送成功')
            this.SET_LOGIN_PHONE(userPhone)
            this.$router.push('/city-meta/verification-code-input')
          })
          .finally(() => {
            this.isShow = false
            AppLoading.closeAppLoading()
          })
      }, 500);
    },
    // 查看用户协议
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },

    // 隐私权政策
    onViewPrivacyPolicy() {
      this.showPrivacyPolicy = true
    },

    startShake() {
      if (this.agreementIsNotCheckError) return
      this.agreementIsNotCheckError = true
      setTimeout(() => {
        this.agreementIsNotCheckError = false
      }, 600)
    },

    // 发送验证码
    onSendVerificationCode() {
      const { userPhone } = this

      if (!userPhone) {
        return tip.error({
          message: '请填写手机号！'
        })
      }

      if (!verifyPhone(userPhone)) {
        return tip.error({
          message: '手机号码格式不正确！'
        })
      }

      if (!this.isCheck || this.agreementIsNotCheckError) {
        this.startShake()
        return
      }

      // AppLoading.showAppLoading()
      this.isShow = true
      const params = {
        mobileNo: userPhone
      }
      // userApi
      //     .getVerificationCode(params)
      //     .then(() => {
      //       tip('验证码发送成功')
      //       this.SET_LOGIN_PHONE(userPhone)
      //       this.$router.push('/city-meta/verification-code-input')
      //     })
      //     .finally(() => {
      //       AppLoading.closeAppLoading()
      //     })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .verify-btn {
  background-color: #1989fa;
  border-radius: 20px;
  width:70vw;
  margin-left: 30px;
}
/deep/ .verify-code-area{
  padding:0px 33px 0px 36px;
  .verify-change-code{
    padding-left: 0.3rem
  }
}
/deep/ .van-dialog__content{
  min-height:156px;
  text-align: center;
}
@-webkit-keyframes shake {
  10% {
    transform: translateX(5px);
  }
  20% {
    transform: translateX(0px);
  }
  30% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(0px);
  }
  70% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(0px);
  }
  90% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
}

.app-verification-code-login {
  &-header {
    padding: 80px 70px;
    box-sizing: border-box;

    .icon {
      width: 100%;
      object-fit: cover;
    }
  }

  &-main {
    padding: 10px 24px;
    box-sizing: border-box;

    .form {
      &-item {

        &-content {
          .phone-input {
            height: 16px;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #FFFFFF;
            width: 100%;
            background-color: transparent;
            padding: 18px 0;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            outline: none;
          }

          .desc {
            padding: 14px 0;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
          }
        }

        .agreement {
          margin-top: 34px;

          &-tips {
            //height: 30px;

            .agreement-shake {
              animation: shake 0.5s;
            }

            &-body {
              display: inline-block;
              background: #333333;
              position: relative;
              padding: 6px 8px;
              border-radius: 4px 4px 4px 0;
              margin-left: 3px;
              transition: all 0.05s ease-in;

              &-highlight {
                background-color: #1989fa;
                color: #FFFFFF;

                &:after {
                  border-color: #1989fa transparent transparent transparent !important;
                }
              }

              &:after {
                content: '';
                position: absolute;
                border-width: 5px;
                border-style: solid;
                border-color: #333333 transparent transparent transparent;
                bottom: -9px;
                left: 0;
                width: 0;
                height: 0;
              }

              p {
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #eeeeee;
              }
            }
          }

          &-content {
            padding: 10px 0;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            display: flex;
            align-items: center;

            span {
              color: #FFFFFF;
            }

            ::v-deep {
              .van-checkbox {
                transform: scale(0.6) translateX(-5px);
              }
            }
          }

        }
      }

      &-submit {
        padding: 33px 11px 0;
        box-sizing: border-box;

        &-button {
        }

        .submit-disabled {
          background: linear-gradient(270deg, #19191a, #23242b) !important;
          color: #666666 !important;
        }
      }
    }
  }
}
</style>
