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
          <span class="btn" @click="getDataSource">立即注册</span>
        </div>
        <div v-if='IsRegistered'>
          <i style="font-size: 17px;">恭喜您成功加入城市数藏，快去实名认证吧！</i>
          <span class="btn" @click="goHome">前往首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'
import { registerApi } from "@/api"
import { mapGetters } from 'vuex'

export default {
  components: {
    CellGroup,
    Cell,
    BaseActionSheet,
    UserServiceAgreement,
    PrivacyAgreement
  },
  data() {
    return {
      showUserServiceAgreement: false,
      showPrivacyAgreement: false,
      phoneNumber: '',
      IsRegistered: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    // debugger
    // this.getDataSource()
  },
  methods: {
    goHome(){
      this.$router.push({ path: '/city-meta/home' })
    },
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },
    onViewPrivacyAgreement() {
      this.showPrivacyAgreement = true
    },

    // 获取数据
    getDataSource() {
      return new Promise( resolve => {

        const { userInfo } = this
        const params = {
          "MobileNo": "18768857720", 
          "Code": "332139", 
          "InviteCode": "eNTpiZUucJ" 
        }
        console.log(JSON.stringify(params,'',4))
        registerApi.getRegister(params).then(result => {
          const data = result || []
          console.log(JSON.stringify(data, '', 4))
          const { ReturnCode, ReturnMessage, Data } = result
          if(ReturnCode == 200) {
            this.IsRegistered == true
          }
        }).finally( () => { resolve() })

      })
      
    },
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
}
</style>
