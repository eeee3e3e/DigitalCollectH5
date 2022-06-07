<template>
  <div class="integral">
    <div class="header">
      <h6>我的城市金</h6>
    </div>

    <div class="content">
      <div class="current">
        <div class="title">
          <div class="left">
            <img :src="`${staticPath}/static/images/integral/4.png`" alt="" width="12" height="12">
            <span>当前城市金</span>
          </div>
          <div class="right">
            <span>城市金规则</span>
            <img :src="`${staticPath}/static/images/integral/5.png`" alt="" width="10" height="10">
          </div>
        </div>
      </div>
    </div>

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
        debugger
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
<!--     width: 343px;
    height: 106px;
    background: red; -->
<style scoped lang="less">
  .header{
    width: 375px;
    height: 88px;
    background: #000000;
    box-shadow: 0px 0.33px 0px 0px rgba(0,0,0,0.30); 
    backdrop-filter: blur(20px);
    text-align: center;
    font-size: 17px;
    color: #fff;
    h6{
      position: absolute;
      right: 0;
      left: 0;
      top: 60px;
    }
  }
  .content{
    background: red;
    padding: 20px;
    .current{
    }
  }
</style>
