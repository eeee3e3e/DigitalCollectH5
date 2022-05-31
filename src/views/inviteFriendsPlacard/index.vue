<template>
  <div id="placard">

    <div id="capture" v-if="isShow"></div>
    <div class="app-invite-friends" id="app-invite-friends">
      <div class="title">
        <h6>数字藏品新时代</h6>
        <img src="/static/images/logo.png" alt="" width="94" height="24">
      </div>

      <div class="content">
        <h2>城市数藏梦想邀约人  <span>第 <i>1</i> 期</span></h2>
        <div>
          
        </div>
        <img class="invite-text" src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E6%B5%B7%E6%8A%A5/u33.svg" alt="" style="position: relative;">
        <i>加入城市数藏，未来近在咫尺！</i>
        <div class="QR-code-wraper">
          <div class="friend">
            <img src="/static/images/avatar.png" alt="" class="avatar" width="22" height="22">
            <span><i>{{NickName}}</i>  邀请您来城市数藏一起领神秘藏品</span>
          </div>
          <div class="qr-code">
            <div class="left">
              <img src="/static/images/invite-friends/u21.png" alt="" width="23" height="23">
            </div>
            <div class="center">
              <!-- <img src="/static/images/invite-friends/1.png" alt="" width="117" height="117"> -->
              <img :src="getImageUrl(RecmmendationCodeImage)" alt="" width="117" height="117">
            </div>
            <div class="right">
              <img src="/static/images/invite-friends/u21.png" alt="" width="23" height="23">
            </div>
          </div>
          <div class="identify">
            长按识别二维码注册城市数藏
          </div>
          <div class="link">
            http://121.196.44.29:8002/#/city-meta/register?={{recmmendationCode}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { CellGroup, Cell } from 'vant'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'
import html2canvas from 'html2canvas'
import getImageUrl from "@/utils/get-image-url";

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
      isShow: true,
      RecmmendationCodeImage: '',
      recmmendationCode: '',
      NickName: ''
    }
  },

  mounted(){
    console.log(JSON.stringify(this.$route.query,'',4))
    // debugger
    const { RecmmendationCodeImage, recmmendationCode, NickName} = this.$route.query
    this.RecmmendationCodeImage = RecmmendationCodeImage
    this.recmmendationCode = recmmendationCode
    this.NickName = NickName
    // console.log(this.recmmendationCode)
    setTimeout( () => {      
      this.capture()
    }, 1000)
  },

  beforeRouteLeave(to, from, next) {
    if(from.path == '/city-meta/invite-friends-placard'){
      this.isShow = false
      this.$router.go(0)
    }
  },

  methods: {
    getImageUrl(path) {
      return getImageUrl(path)
    },
    capture(){
      html2canvas(document.querySelector("#app-invite-friends")).then(canvas => {
          // const pic = document.querySelector("#capture")
          const pic = document.getElementById("capture").appendChild(canvas)
          pic.setAttribute('id','pic')
          pic.style.cssText = "width: 100%;position:absolute;top:0"
      });
    },
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },
    onViewPrivacyAgreement() {
      this.showPrivacyAgreement = true
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
    width: 375px;
    height: 100px;
    background: #1a1d31;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    box-sizing: border-box;

    h6{
      
      padding-top: 50px;
      font-size: 12px;
    }

    img {
      padding-top: 45px;
    }
  }

  .content{
    background-image: url(/public/static/images/invite-friends/bg1.png);
    background-size: 100%;
    height: 820px;
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
        display: inline-block;
        width: 52px;
        height: 22px;
        line-height: 21px;
        text-align: center;
        position: relative;
        top: -2px;
        margin-left: 10px
      }
    }
    img.invite-text {
      padding: 10px 0 30px 0
    }

    i{
      font-size: 11px;
    }

    .QR-code-wraper{
      width: 90%;
      height: 270px;
      background: #fcfbf8;
      border-radius: 10px;
      margin-top: 280px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .friend{
        background: #285AC6;
        font-size: 12px;
        color: #fff;
        border-radius: 13px;
        text-align: center;
        margin: 20px 0;
        padding: 2px 10px 2px 1px;
        img.avatar{
          margin-right: 8px
        }
        img.avatar, span{
          display: inline-block;
          vertical-align: middle;
        }
      }

      .qr-code{
        display: flex;
        align-items: center;
        align-content: center;

        .left{
          padding-right: 40px;
        }
        .right{
          padding-left: 40px;
        }
      }

      .identify{
        font-size: 12px;
        font-weight: bold;
        color: #000;
        padding-top: 20px
      }

      .link{
        width: 80%;
        background: #e5e8ef;
        font-size: 12px;
        color: #777;
        border-radius: 13px;
        text-align: center;
        margin: 20px 0;
        padding: 6px;
        word-wrap: break-word;
        white-space: nowrap;  
        overflow: hidden; 
        text-overflow: ellipsis;
      }


    }

  }
}

</style>
