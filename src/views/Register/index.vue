<template>
  <div class="app-invite-friends">
    <div class="title">
      <h6>城市数藏</h6>
    </div>

    <div class="content">
      <img class="invite-text" src="/static/images/register/u32.png" width="91" height="91" alt="">
      <i style="padding-bottom: 10px">登陆城市数藏</i>
      <i>未来近在咫尺</i>
      <div class="QR-code-wraper">
        <div v-if='IsRegistered == false'>
          <input type="number" placeholder="请输入您的手机号码" v-model='phoneNumber'>
          <span class="btn" @click="onSendVerificationCode">立即注册</span>
        </div>
        <div v-if='IsRegistered'>
          <i style="font-size: 17px;">恭喜您成功加入城市数藏，快去实名认证吧！</i>
          <span class="btn" @click="goHome">前往首页</span>
        </div>
      </div>
    </div>

    <van-dialog v-model="isShow" :show-confirm-button="false">
      <div style="text-align:center;">
        <!-- <SlideVerify ref="slideblock" @success="sendSmsCode"></SlideVerify> -->
      </div>
    </van-dialog>

    <van-dialog v-model="isRegShow" showConfirmButton showCancelButton confirm-button-color="#285AC6" class='resShow' @confirm="getDataSource">
      <div class="header">
        <img src="/static/images/register/1.png" alt="" width="11" height="14">
        <span>请输入手机号</span>
      </div>
      <div class="content1">
        <div class="text1">已发送验证码至手机尾号（8888）</div>
        <div class="inputArea">
          <input type="text" placeholder="请输入验证码" v-model='VerifiCode'>
          <span><i>{{ stepTime }}</i>s后重发</span>
        </div>
      </div>
      <div class="line"></div>
    </van-dialog>

  </div>
</template>

<script>
import { CellGroup, Cell, Dialog, Notify } from 'vant'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'
import { registerApi, userApi } from "@/api"
// import { mapGetters } from 'vuex'
import SlideVerify from "@/components/check/SlideVerify.vue" // 图片验证
import { mapGetters, mapMutations } from 'vuex'

function formatVerificationCodeValue(value) {
  if (value && value !== '') {
    value = value.replace(/[^\d+]/ig, '')
  }
  return value
}

export default {
  components: {
    CellGroup,
    Cell,
    BaseActionSheet,
    UserServiceAgreement,
    PrivacyAgreement,
    [Dialog.Component.name]: Dialog.Component,
    Notify
  },
  data() {
    return {
      isShow: false,
      isRegShow: false,
      showUserServiceAgreement: false,
      showPrivacyAgreement: false,
      phoneNumber: '',
      IsRegistered: false,
      stepTime: 60,
      isLost: false,
      VerifiCode: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapGetters(['loginPhone']),
  },
  created () {
    // debugger
    // this.getDataSource()
  },
  beforeDestroy() {
    this.stopCountDown()
  },
  methods: {
    sendSmsCode(){
      alert()
    },
    goHome(){
      this.$router.push({ path: '/city-meta/home' })
    },
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },
    onViewPrivacyAgreement() {
      this.showPrivacyAgreement = true
    },

    // 发送验证码
    onSendVerificationCode() {
      const { loginPhone } = this
      if(this.phoneNumber == ''){
        Notify({ type: 'warn', message: '手机号不能为空' });
        return
      }
      const params = {
        mobileNo: this.phoneNumber
      }

      userApi.getVerificationCode(params) .then(() => {
        Notify({ type: 'success', message: '验证码发送成功' });
        this.isRegShow = true
        this.startCountDown()
      }).finally(() => {})

    },

    // 开始倒计时
    startCountDown() {
      this.isLost = false
      this.stopCountDown()
      this.timerId = setInterval(() => {
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
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.stepTime = 60
    },
    // 验证码输入
    onVerificationCodeInput(event) {
      console.log(event.target.value)
      const value = formatVerificationCodeValue(event.target.value)
      console.log(value)
      this.verificationCode = value.length > 6 ? (value || '').slice(0, 6) : value
    },
    // 获取数据getObjFromUrl
    getDataSource() {
      // console.log(JSON.stringify(this.userInfo,'',4));
      // console.log(this.getObjFromUrl('InviteCode'));
      // const { pagination, userInfo } = this
      // return;
      return new Promise( resolve => {
        const params = {
          "MobileNo": this.phoneNumber,
          "Code": this.VerifiCode,
          "InviteCode": this.getObjFromUrl('InviteCode')
        }
        console.log(JSON.stringify(params,'',4))
        // return;

        const { userInfo } = this
        registerApi.getRegister(params).then(result => {
          // debugger
          const data = result || []
          console.log(JSON.stringify(data, '', 4))
          const { ReturnCode, ReturnMessage, Data } = result
          if(ReturnCode == 200) {
            this.IsRegistered == true
          }
        }).finally( () => { resolve() })

      })
      
    },

    getObjFromUrl(name){
      const temp = window.location.href.split('?')[1];
      const pram = new URLSearchParams('?'+temp);
      return pram.get(name)
    }
  }
}
</script>

<style scoped lang="less">
.app-invite-friends {
  padding-bottom: 20px;
  box-sizing: border-box;
  color: #ccc;

  .title{
    background: #1a1d31;
    padding: 20px;

    h6{
      text-align:center;
      padding-top: 50px;
      font-size: 17px;
      color: #fff
    }
  }

  .content{
    background-image: url(/public/static/images/register/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 720px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    h2{
      font-size: 18px;
      padding: 30px 0;
      color: #eee;
      span{
        font-size: 11px;
        background: #d07822;
        border-radius: 2px;
        padding: 2px;
      }
    }
    img.invite-text {
      padding: 80px 0 20px 0
    }

    i{
      font-size: 18px;
      color: #fff;
    }

    .QR-code-wraper{
      width: 90%;
      margin-top: 270px;
      display: flex;
      flex-direction: column;
      align-items: center;

      input, span {
        display: block;
        width: 315px;
        height: 50px;
        font-size: 15px;
        border-radius: 8px;
      }
      input {
        background-image: url(/public/static/images/register/phone.png);
        background-repeat: no-repeat;
        background-position: 10px 20px;
        text-indent: 30px;
      }

      span {
        width: 100%;
        line-height: 50px;
        margin-top: 20px;
        background: #3487ED;
        text-align: center;
        color: #fff;
      }

    }
    input::-webkit-input-placeholder {
        color: #aaa;
        font-size: 14px;
    }
  }

  .resShow{
    .header{
      padding: 20px 0 20px 20px;
      border-bottom: 1px solid #eee;
      span{
        color: #666;
        font-style: 12px;
        padding-left: 10px
      }
    }
    .content1{
      color: #aaa;
      .text1{
        font-size: 13px;padding: 20px 0 20px 30px;
      }
      .inputArea{
        padding: 5px 15px;
        font-size: 12px;
        border: 1px solid #eeeeee;
        border-radius: 8px;
        box-sizing: border-box;
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        input{
          padding: 10px;border: none;font-size: 14px;
        }
        span{
          font-size: 14px;
        }
      }
    }
    .line{
      border-bottom: 1px solid #eee; margin-top: 30px
    }
  }
}
</style>
