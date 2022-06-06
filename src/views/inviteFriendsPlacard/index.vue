<template>
  
  <div id="placard">
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
    <div id="capture" v-if="isShow"></div>
    <div class="app-invite-friends" id="app-invite-friends">
      
      <!-- <div class="title">
        <img src="/static/images/logo.png" alt="" width="94" height="24">
        <h6>数字藏品新时代</h6>
      </div> -->

      <img src="/static/images/invite-friends/placard-header.png" alt="" width="100%" height="">
      <div class="content">
        <h2>城市数藏梦想邀约人  <span>第 <i>1</i> 期</span></h2>
        <img class="invite-text" src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E6%B5%B7%E6%8A%A5/u33.svg" alt="" style="position: relative;">
        <i class="joinTxet">加入城市数藏，未来近在咫尺！</i>
        <div class="QR-code-wraper">
          <div class="friend">
            <img src="/static/images/avatar.png" alt="" class="avatar" width="22" height="22">
            <span><i>{{NickName}}</i>  邀请您来城市数藏一起领神秘藏品!</span>
          </div>
          <div class="qr-code" style="position: relative;">
            <img src="/static/images/invite-friends/a.png" style="width: 80%;margin: 0 auto;padding: 30px 0 20px 0">
            <!-- <div class="left">
              <img src="/static/images/invite-friends/u21.png" alt="" width="23" height="23">
            </div> -->
            <div class="center" style="position: absolute;top: 9px; left: 121px">
              <!-- <img src="/static/images/invite-friends/1.png" alt="" width="117" height="117"> -->
              <img :src="getImageUrl(RecmmendationCodeImage)" alt="" width="112" height="112">
            </div>
            <!-- <div class="right">
              <img src="/static/images/invite-friends/u21.png" alt="" width="23" height="23">
            </div> -->
          </div>
          <div class="identify">
            请截屏到相册并发给好友
          </div>
          <div class="link">
            {{origin}}/#/city-meta/register?={{recmmendationCode}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { CellGroup, Cell, Notify } from 'vant'
import { BaseActionSheet, UserServiceAgreement, PrivacyAgreement } from '@/components'
import html2canvas from 'html2canvas'
import getImageUrl from "@/utils/get-image-url";
import { mapGetters, mapMutations } from 'vuex'

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
      NickName: '',
      origin: location.origin
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'hasUserInfo'])
  },
  created () {

    if(this.hasUserInfo){
    } else {
      Notify({ type: 'warning', message: '请先 登录' });
    }

  },
  mounted(){
    // alert(/iPad|iPhone|iPod/.test(navigator.userAgent))
    console.log(JSON.stringify(this.$route.query,'',4))
    // debugger
    const { RecmmendationCodeImage, recmmendationCode, NickName} = this.$route.query
    this.RecmmendationCodeImage = RecmmendationCodeImage
    this.recmmendationCode = recmmendationCode
    this.NickName = NickName
    // console.log(this.recmmendationCode)
    // setTimeout( () => {    
      // this.capture()
    // }, 1000)
  },

  // beforeRouteLeave(to, from, next) {
  //   if(from.path == '/city-meta/invite-friends-placard'){
  //     this.isShow = false
  //     this.$router.go(0)
  //   }
  // },

  methods: {
    getImageUrl(path) {
      return getImageUrl(path)
    },
    capture(){
      html2canvas(document.querySelector("#app-invite-friends")).then(canvas => {
          // const pic = document.querySelector("#capture")
          const pic = document.getElementById("capture").appendChild(canvas)
          pic.setAttribute('id','pic')
          pic.style.cssText = "width: 100%;position:absolute;top:0; z-index:1;";
          //获取年月日作为文件名
          let timers=new Date();
          let fullYear=timers.getFullYear();
          let month=timers.getMonth()+1;
          let date=timers.getDate();
          let randoms=Math.random()+'';

          //年月日加上随机数
          let numberFileName=fullYear+''+month+date+randoms.slice(3,10);
          let imgData=canvas.toDataURL();

          //保存图片
          let saveFile = function(data, filename){
              let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
              save_link.href = data;
              save_link.download = filename;

              let event = document.createEvent('MouseEvents');
              event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              save_link.dispatchEvent(event);
          };

          //最终文件名+文件格式
          let filename = numberFileName + '.png';
          saveFile(imgData,filename);
          document.body.appendChild(canvas);  //把截的图显示在网页上
            
      });
    },
    onViewUserServiceAgreement() {
      this.showUserServiceAgreement = true
    },
    onViewPrivacyAgreement() {
      this.showPrivacyAgreement = true
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
    background-image: url(/public/static/images/invite-friends/bg2.png);
    background-repeat: no-repeat;
    background-color: #12194B;
    background-size: 375px 812px;
    height: 820px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -6px;

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

    i.joinTxet{
      font-size: 11px;
    }

    .QR-code-wraper{
      width: 90%;
      background: #fcfbf8;
      border-radius: 0.26667rem;
      margin-top: 8.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;

      .friend{
        background: #285ac6;
        font-size: 12px;
        color: #fff;
        border-radius: 13px;
        margin: 0.41rem 0 0 0;
        line-height: 0.6rem;
        width: 91%;
        box-sizing: border-box;
        padding: 1px 0 1px 4px;

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
        .center{
          img{
            position: absolute;
            margin: 0.83rem 0 0.88rem -0.06333rem;
            z-index: 111;
          }
        }
        .right{
          padding-left: 40px;
        }
      }

      .identify{
        font-size: 12px;
        font-weight: bold;
        color: #000;
      }

      .link{
        width: 88%;
        line-height: 28px;
        background: #edeff3;
        font-size: 0.32rem;
        color: #8896b5;
        margin: 20px 0 20px 0;
        border-radius: 0.34667rem;
        text-align: center;
        /* margin: 0.53333rem 0; */
        padding: 0px 10px;
        word-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }


    }

  }
}

</style>
