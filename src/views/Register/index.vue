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
          <input type="number" placeholder="请输入您的手机号码" v-model='phoneNumber' style="color: #333">
          <span class="btn" @click="onSendVerificationCode">立即注册</span>
        </div>
        <div v-if='IsRegistered'>
          <i style="font-size: 17px;">恭喜您成功加入城市数藏，快去实名认证吧！</i>
          <span class="btn" @click="goHome">前往首页</span>
        </div>
      </div>
    </div>

    <van-dialog v-model="isShowVerify" :show-confirm-button="false">
      <div style="text-align:center;">
        <!-- <SlideVerify ref="slideblock" @success="sendSmsCode"></SlideVerify> -->
        <slide-verify :l="42"
            :r="10"
            :w="310"
            :h="155"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            slider-text="向右滑动完成验证"
            ></slide-verify>
      </div>
    </van-dialog>

    <van-dialog v-model="isRegShow" showConfirmButton showCancelButton confirm-button-color="#285AC6" class='resShow' @confirm="getDataSource">
      <div class="header">
        <img src="/static/images/register/1.png" alt="" width="11" height="14">
        <span>请输入手机号</span>
      </div>
      <div class="content1">
        <div class="text1">已发送验证码至手机尾号（{{phoneNumber.substring(7)}}）</div>
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
// import SlideVerify from "@/components/check/SlideVerify.vue" // 图片验证
import SlideVerify from 'vue-monoplasty-slide-verify';
import { mapGetters, mapMutations } from 'vuex'
import { setAuthorization } from "@/utils/cookies";
import axios from "axios";
// Vue.use(SlideVerify);
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
      isShowVerify: false,
      isRegShow: false,
      phoneNumber: '',
      IsRegistered: false,
      stepTime: 60,
      isLost: false,
      VerifiCode: '',
      msg: '',
      text: '向右滑',
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapGetters(['loginPhone']),
  },
  created () {
    // debugger
    // this.getDataSource()
    console.log("shuaxinuserInfo:", JSON.stringify(this.userInfo, null, 4));
    // console.log(JSON.stringify(this.loginPhone,'',4));
    // this.getObjFromUrl('InviteCode')
    this.getDataSource()
  },
  beforeDestroy() {
    this.stopCountDown()
  },
  methods: {
    ...mapMutations(['SET_USER_INFO', 'DEL_LOGIN_PHONE']),
    onSuccess(){
      Notify({ type: 'success', message: '右滑成功' });
      this.isShowVerify = false
    },
    onFail(){
      // Notify({ message: 'onFail' });
    },
    onRefresh(){
      Notify({ type: 'success', message: 'onRefresh' });
    },
    goHome(){
      this.$router.push({ path: '/city-meta/home' })
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

      // userApi.verifyVerificationCode(params) .then(() => {
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

    getDataSource() {

      const params = {
        "MobileNo": this.phoneNumber,
        "Code": this.VerifiCode,
        "InviteCode": this.getObjFromUrl('InviteCode')
      }
      console.log('params: ', JSON.stringify(params,'',4))

      axios({ 
        method: 'post',
        url: 'http://121.196.44.29:8001/api/UserInfo/VerifyVerificationCodeByRecommend',
        data: params
      }).then(res => {
        console.log(JSON.stringify(res, '', 4))
        const { ReturnCode, ReturnMessage, Data } = res.data
        const data = res.data.Data
        setAuthorization(data.Ticket)
        this.SET_USER_INFO(data)
        if(ReturnCode == 200 && ReturnMessage == '获取用户成功') {
          Notify({ type: 'success', message: '注冊成功' });
          this.IsRegistered = true
        }
      }).catch(error => {
        console.info(error);
      });
      
      /*return new Promise( resolve => {
        // const params = {
        //   "MobileNo": this.phoneNumber,
        //   "Code": this.VerifiCode,
        //   "InviteCode": this.getObjFromUrl('InviteCode')
        // }
        const params = {
          "MobileNo": 15901227160,
          "Code": '751779',
          "InviteCode": this.getObjFromUrl('InviteCode')
        }
        console.log('params: ', JSON.stringify(params,'',4))

        userApi.VerifyVerificationCodeByRecommend(params).then(res => {
        // registerApi.VerifyVerificationCodeByRecommend(params).then(res => {
          console.log("res: ", JSON.stringify(res, '', 4))

          const { ReturnCode, ReturnMessage, Data } = res.data
          setAuthorization(Data.Ticket)
          this.SET_USER_INFO(Data)
          if(ReturnCode == 200 && ReturnMessage == '获取用户成功') {
            Notify({ type: 'success', message: '注冊成功' });
            this.IsRegistered = true
          }
        }).finally( () => { resolve() })

      })*/
      
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
  height: 100%;

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

.slide-verify{
  width:100% !important;
  padding: 0 !important;
}
.slide-verify-slider{
  margin-top:0px !important;
}
</style>
