<template>
  <div class="app-invite-friends">
    <div class="app-to-back" @click="toBack()">
        <svg class="svg-icon" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"
             width="9px"
             height="16px">
          <g transform="matrix(1 0 0 1 -12 -9 )">
            <path
                d="M 8.6625 0.258064516129032  C 9.1125 0.716845878136201  9.1125 1.29032258064516  8.6625 1.74910394265233  C 8.6625 1.74910394265233  2.3625 8.05734767025089  2.3625 8.05734767025089  C 2.3625 8.05734767025089  8.6625 14.3655913978495  8.6625 14.3655913978495  C 9 14.7096774193548  9 15.3978494623656  8.6625 15.741935483871  C 8.325 16.0860215053764  7.65 16.0860215053764  7.3125 15.741935483871  C 7.3125 15.741935483871  0.449999999999999 8.86021505376344  0.449999999999999 8.86021505376344  C 0.449999999999999 8.86021505376344  0.3375 8.86021505376344  0.3375 8.74551971326165  C 0.1125 8.63082437275986  0 8.28673835125448  0 8.05734767025089  C 0 7.82795698924731  0.1125 7.48387096774193  0.3375 7.36917562724014  C 0.3375 7.36917562724014  0.449999999999999 7.36917562724014  0.449999999999999 7.25448028673835  C 0.449999999999999 7.25448028673835  7.3125 0.258064516129032  7.3125 0.258064516129032  C 7.65 -0.086021505376344  8.325 -0.086021505376344  8.6625 0.258064516129032  Z "
                fill-rule="nonzero" fill="#ffffff" stroke="none" transform="matrix(1 0 0 1 12 9 )"/>
          </g>
        </svg>
    </div>
    <!-- <div class="title">
      <h6>城市数藏</h6>
    </div> -->

    <div class="content">
      <img class="invite-text" src="/static/images/register/u32.png" width="91" height="91" alt="">
      <i style="padding-bottom: 10px">登陆城市数藏</i>
      <i>未来近在咫尺</i>
      <div class="QR-code-wraper">
        <div v-if='IsRegistered == false'>
          <input type="number" placeholder="请输入您的手机号码" v-model='phoneNumber' style="color: #333">
          <span class="btn" @click="isRegByMobileNo">立即注册</span>
        </div>
        <div v-if='IsRegistered'>
          <i style="font-size: 17px;">恭喜您成功加入城市数藏，快去实名认证吧！</i>
          <span class="btn" @click="goHome">前往首页</span>
        </div>
      </div>
    </div>

    <van-dialog v-model="isShowVerify" :show-confirm-button="false">
      <div style="text-align:center;">
        <Verify :type="1" :codeLength="codeLength" @success="onSendVerificationCode" @error="error" width="100%"></Verify>
      </div>
    </van-dialog>

    <van-dialog v-model="isRegShow" showConfirmButton showCancelButton confirm-button-color="#285AC6" class='resShow' @confirm="getDataSource">
      <div class="header">
        <img src="/static/images/register/1.png" alt="" width="11" height="14">
        <span>请输入验证码</span>
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
// import SlideVerify from 'vue-monoplasty-slide-verify';
import { mapGetters, mapMutations } from 'vuex'
import { setAuthorization } from "@/utils/cookies";
import { verifyPhone } from '@/utils/regexp'
import tip from '@/utils/tip'
import Verify from 'vue2-verify'
import axios from "axios";

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
    Notify,
    Verify,
  },
  data() {
    return {
      codeLength:2,
      isShowVerify: false,
      isRegShow: false,
      phoneNumber: '',
      IsRegistered: false,
      stepTime: 60,
      isLost: false,
      VerifiCode: '',
      msg: '',
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapGetters(['loginPhone']),
  },
  created () {
    // debugger
    // this.getDataSource()
    // setTimeout(()=> {
      // this.isShowVerify = true
    // },1000)
    // console.log("shuaxinuserInfo:", JSON.stringify(this.userInfo, null, 4));
    // console.log(JSON.stringify(this.loginPhone,'',4));
    // this.getObjFromUrl('InviteCode')
    // this.isRegByMobileNo()
    // this.onSendVerificationCode()
    // Notify({ type: 'warning', message: 'ReturnMessage' });
  },
  beforeDestroy() {
    this.stopCountDown()
  },
  methods: {
    ...mapMutations(['SET_USER_INFO', 'DEL_LOGIN_PHONE']),
    error() {
      tip('验证失败，重新输入')
      return tip.error({
        message: '验证失败，重新输入'
      })
    },

    goHome(){
      this.$router.push({ path: '/city-meta/home' })
    },

    // 是否已注册
    isRegByMobileNo(){
      // const params = {
      //   // mobileNo: this.phoneNumber
      //   mobileNo: 13485508100
      // }
      // debugger
      /*userApi.IsRegByMobileNo(params) .then((res) => {
        const { ReturnCode, ReturnMessage } = res
        if(ReturnCode == 200 && ReturnMessage == '该用户未被注册'){
          // Notify({ type: 'success', message: '该用户未被注册' });
          this.onSendVerificationCode()
        } else {
          // this.IsRegistered = true
          Notify({ type: 'success', message: '该用户已注册' });
        }

      }).finally(() => {})*/
      if(this.phoneNumber == ''){
        Notify({ type: 'warn', message: '手机号不能为空' });
        return
      }
      if (!verifyPhone(this.phoneNumber)) {
        return tip.error({
          message: '手机号码格式不正确！'
        })
      }
      axios({ 
        method: 'get',
        // url: `http://121.196.44.29:8001/api/UserInfo/IsRegByMobileNo?mobileNo=${this.phoneNumber}`,
        // url: `https://api.csscmeta.com:8443/api/UserInfo/IsRegByMobileNo?mobileNo=${this.phoneNumber}`,
        url: `https://apitest.csscmeta.com/api/UserInfo/IsRegByMobileNo?mobileNo=${this.phoneNumber}`,
      })
      // const params = {
      //   // mobileNo: this.phoneNumber
      //   mobileNo: 13485508100
      // }
      // axios({ 
      //   method: 'POST',
      //   url: 'http://121.196.44.29:8001/api/UserInfo/IsRegByMobileNo',
      //   data: params
      // })

      .then(res => {
        // debugger;
        const { ReturnCode, ReturnMessage, Data } = res.data
        if(ReturnCode == 200 && Data == false){
          // Notify({ type: 'success', message: '该用户未被注册' });
          // debugger
          this.isShowVerify = true
          // this.showVerify()
          // this.onSendVerificationCode()
        } else {
          Notify({ type: 'success', message: '该用户已注册' });
        }
      }).catch(error => {
        console.info(error);
      });

    },

    // showVerify(){
    //   this.isShowVerify = true
    // },
    // 发送验证码
    onSendVerificationCode() {
      // this.isShowVerify = false
      const params = {
        mobileNo: this.phoneNumber
        // mobileNo: '15901227160'
      }
      // this.startCountDown()
      // userApi.verifyVerificationCode(params) .then(() => {
      userApi.getVerificationCode(params) .then(() => {
        Notify({ type: 'success', message: '验证码发送成功' });
        this.isRegShow = true
        this.isShowVerify = false
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

      // const params = {
      //   "MobileNo": 18411012586,
      //   "Code": '279383',
      //   "InviteCode": this.getObjFromUrl('InviteCode')
      // }
      const params = {
        "MobileNo": this.phoneNumber,
        "Code": this.VerifiCode,
        "InviteCode": this.getObjFromUrl('InviteCode')
      }
      console.log('params: ', JSON.stringify(params,'',4))

      axios({ 
        method: 'post',
        // url: 'http://121.196.44.29:8001/api/UserInfo/VerifyVerificationCodeByRecommend',
        // url: `https://api.csscmeta.com:8443/api/UserInfo/VerifyVerificationCodeByRecommend`,
        url: `https://apitest.csscmeta.com/api/UserInfo/VerifyVerificationCodeByRecommend`,
        data: params
      }).then(res => {
        console.log(JSON.stringify(res, '', 4))
        const { ReturnCode, ReturnMessage, Data } = res.data
        if(ReturnCode == 200 && ReturnMessage == '获取用户成功') {
          setAuthorization(Data.Ticket)
          this.SET_USER_INFO(Data)
          this.IsRegistered = true
          this.isRegShow = false
          Notify({ type: 'success', message: '注冊成功' });
        } else {
          console.log(ReturnMessage)
          Notify({ type: 'warning', message: ReturnMessage });
          // Notify({ type: 'success', message: '注冊成功' });
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
        debugger
        registerApi.VerifyVerificationCodeByRecommend(params).then(res => {
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
    },

    toBack() {
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped lang="less">
@import "../../assets/styles/global-variable";

//@interval: @nav-bar-height + 22px;
@interval: 22px;

.app-to-back {
  position: fixed;
  top: @interval;
  left: 22px;
  z-index: 999;
  width: 34px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  //opacity: 0.14;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .svg-icon {
    margin-left: -3px;
  }
}

/deep/ .verify-btn {
  background-color: #1989fa;
  border-radius: 20px;
  width:70vw;
  margin-left:30px;
}
/deep/ .verify-code-area{
  padding:0px 33px 0px 36px;
  .verify-input-area{
    padding-left:10px
  }
  .verify-change-code{
    padding-left: 0.3rem
  }
}
/deep/ .van-dialog__content{
  min-height:156px;
  text-align: center;
}

.app-invite-friends {
  padding-bottom: 0;
  .verify-code-area {
    float: left;
    width: 100%;
    height: 50px;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    .verify-change-area {
      position: relative;
      left: 30px;
      top: 10px;
    }
  }
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
