<template>
  <div class="app-authentication">
    <div class="app-authentication-header">
      <div class="icon">
        <img src="/static/images/authentication/header-icon.png.png" alt="">
      </div>
      <div class="text">
        <p>填写的实名信息须与登录手机号持有人相符。 </p>
        <p>当前登录手机号：{{ userInfo.MobileNo | filterMobileNo }} </p>
      </div>
    </div>
    <div class="app-authentication-main">
      <div class="form">
        <div class="form-item">
          <Field v-model="formData.Name" placeholder="请输入您的姓名">
            <template #label>
              <img class="code-input-icon" src="/static/images/authentication/user-icon.png" alt="">
            </template>
          </Field>
        </div>
        <div class="form-item">
          <Field v-model="formData.IDCard" placeholder="请输入您的身份证号码">
            <template #label>
              <img class="code-input-icon" src="/static/images/authentication/idCard-icon.png" alt="">
            </template>
          </Field>
          <div class="form-item-tips">
            <img class="icon" src="/static/images/authentication/safety-icon.png" alt="">
            <span>安全保障中，输入信息仅用于身份确认</span>
          </div>
        </div>
      </div>
    </div>
    <div class="app-authentication-footer">
      <div class="app-authentication-footer-content">
        <button class="submit" :class="hasValue ? 'common-save-button' : ''" @click="onToAuthenticationResult">实名认证
        </button>
      </div>
    </div>
     <van-dialog v-model="isShow" :show-confirm-button="false">
        <div style="text-align:center;">
          <!-- <SlideVerify ref="slideblock" @success="sendSmsCode"></SlideVerify> -->
          <Verify v-if="isVerify" :type="1" :codeLength="codeLength" @success="sendSmsCode" @error="error" width="100%"  ></Verify>
        </div>
     </van-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Field,Dialog } from 'vant'
import { BaseActionSheet } from '@/components'
import { userApi } from '@/api'
import AppLoading from "@/utils/app-loading";
import SlideVerify from "@/components/check/SlideVerify.vue" // 图片验证
import Verify from 'vue2-verify'
import tip from "@/utils/tip";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    Field,
    BaseActionSheet,
    // SlideVerify
    Verify
  },
  data() {
    return {
      isVerify: true,
      codeLength:2,
      isShow:false,
      code: undefined,
      showHistory: false,
      loading: false,
      formData: {
        IDCard: undefined,
        Name: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    hasValue() {
      return this.formData.Name && this.formData.IDCard
    }
  },
  methods: {
    ...mapMutations(['SET_AUTH']),
    ...mapActions(['REFRESH_USER_INFO']),

    onClickHistory() {
    },
    // 显示历史记录
    onShowHistory() {
      this.showHistory = true
    },
    onToAuthenticationResult() {
      if (this.loading) return

      // AppLoading.showAppLoading()
      this.isShow = true
      this.isVerify = false
			this.$nextTick(()=>{
        		this.isVerify = true
      		})
      // const data = {
      //   ...this.formData,
      //   UserId: this.userInfo.ID
      // }

      // userApi
      //     .userVerifyIDCard(data)
      //     .then(async () => {
      //       await this.REFRESH_USER_INFO()
      //       this.SET_AUTH(data)
      //       await this.$router.push('/city-meta/authentication-result')
      //     })
      //     .finally(() => {
      //       AppLoading.closeAppLoading()
      //     })
    },
    error () {
      tip('验证失败，重新输入')
    },
    sendSmsCode() {
      tip('验证成功')
      const { userPhone } = this
	  //此处的处理是：图片验证通过后，发送短信验证码，这个要根据具体情况单独处理
      setTimeout(() => {
       const data = {
        ...this.formData,
        UserId: this.userInfo.ID
      }

      userApi
          .userVerifyIDCard(data)
          .then(async () => {
            await this.REFRESH_USER_INFO()
            this.SET_AUTH(data)
            await this.$router.push('/city-meta/authentication-result')
          })
          .finally(() => {
            this.isShow = false
            AppLoading.closeAppLoading()
          })
      }, 500);
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .verify-btn {
  background-color: #1989fa;
  border-radius: 20px;
  width:70vw;
  margin-left:30px;
}
/deep/ .verify-code-area{
  padding:0px 33px 0px 36px;
}
/deep/ .van-dialog__content{
  min-height:156px;
  text-align: center;
}
.app-authentication {
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
              width: 15px;

              img {
                max-width: 100%;
              }
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
