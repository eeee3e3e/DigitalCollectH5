<template>
  <div class="dialog" v-show="isShow">
    <van-dialog v-model="isShow" width="90vw" :show-confirm-button="false">
        <div class="dialog-card">
          <div class="dialog-card-title">
            <div>
              <img src="/static/images/collection-examples/zcIcon.png" alt="">
            <span>转赠确认</span>
            </div>
              <div>
                <img src="/static/images/collection-examples/titleBj.png" alt="">
              </div>
            </div>
          <div class="dialog-card-info">
               <div class="dialog-card-info-leftShop">
              <img src="/static/images/collection-examples/shop.png" alt="">
            </div>
            <div class="dialog-card-info-rightShop">
                <div class="title">城市数藏 & Xmeta 联合勋章</div>
                <div class="code">JISHADGIN #0001/1000</div>
            </div>
          </div>
          <div class="dialog-card-recipient">
              <div class="dialog-card-recipient-title">
                 <img src="/static/images/authentication-result/idCard-icon.png" alt="">
                <span>受赠方信息</span>
              </div>
              <div class="dialog-card-recipient-count">
                <div class="dialog-card-recipient-count-left">
                  <img src="/static/images/collection-examples/shop.png" alt="">
                </div>
                <div class="dialog-card-recipient-count-right">
                  <p>受赠方姓名</p>
                  <p>孙**</p>
                  <p>受赠方手机号</p>
                  <p>18888888888</p>
                </div>
              </div>
          </div>
          <div class="dialog-card-agreement-content" :class="active ? 'submit-active' : ''">
              <vant-checkbox v-model="isCheck"/>
              <p>
                本人承诺本次转赠仅用于好友之间交流分享
              </p>
            </div>
            <div style="text-align:center;width:100%;">
            <button class="form-submit"  @click="confirmgroom">
              <span>确认转赠</span>
            </button>
          </div>
          <div class="dialog-waring">
            <img src="/static/images/collection-examples/waring.png" alt="">
            <span>数字藏品仅用于个人鉴赏、分享，严禁以任何形式炒作藏品！</span>
          </div>
        </div>
    </van-dialog>
    <div class="footer">
      <img id="bj" @click="close" style="" src="/static/images/collection-examples/close.png" alt="">
    </div>
  </div>
</template>
<script>
import { Dialog ,Checkbox } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    VantCheckbox: Checkbox,
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      isCheck: false,
      active:false
    }
  },
  methods:{
    // 关闭弹窗
     close(){
           this.$emit('closeQR',false)
        },
    // 确认转赠
    confirmgroom () {
      if (this.isCheck === false) {
        this.active = !this.active
      } else {
        this.$router.push('examples-successful')
      }
    }
  },
  computed: {
    isSend() {
      return this.isCheck 
    }
  },
  watch:{
    isShow (news,old) {
      if (news) {
        this.isShow = true
      } else {
         this.isShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .dialog {
       position: relative;
      //  overflow: auto;
      /deep/ 
        .van-dialog{
          z-index: 2047;
          // height: 520px;
        background: #292929;
        border-radius: 8px;
        .van-dialog__content{
          // min-height:550px;
          // overflow: auto;
        }
        }
      &-card{
        .dialog-waring{
          >img{
            display: inline-block;
            width: 14px;
            height: 12px;
          }
          >span{
            margin-left:8px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #ff5050;
            line-height: 18px;
            margin-top:-2px;
          }
          display: flex;
          margin-top: 22px;
        }
        padding: 24px 16px 10px 16px;
        &-agreement-content{
          margin-top: 16px;

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
        &-recipient{
         &-title{
           margin-top:20px;
          height: 12px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 12px;
          >span{
            height: 12px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 12px;
            vertical-align:middle;
            display: inline-block;
            margin-left:8px;
          }
          >img{
            display: inline-block;
            width: 12px;
            height: 12px;
            background: #999999;
             vertical-align:middle;
          }
         }
         &-count{
           margin-top: 16px;
          display: flex;
          // align-items: center;
          // justify-content: space-between;
          margin-top:26px;
          padding:16px 20px;
          height: 110px;
          background: #1e1e1e;
          border-radius: 8px;
          box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.11) inset; 
          &-left{
            >img{
              display: inline-block;
              width: 42px;
              height: 42px;
              border-radius: 26px;
            }
          }
          &-right{
            margin-left:20px;
            >p:nth-child(1){
              height: 12px;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: justify;
              color: #666666;
              line-height: 12px;
            }
            >p:nth-child(2){
              margin-top: 10px;
              height: 20px;
              font-size: 16px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #ffe79c;
              line-height: 20px;
            }
            >p:nth-child(3){
              margin-top: 18px;
              height: 12px;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: justify;
              color: #666666;
              line-height: 12px;
            }
            >p:nth-child(4){
              margin-top: 10px;
              height: 20px;
              font-size: 16px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #ffe79c;
              line-height: 20px;
            }
          }
         }
        }
        &-title{
          display: flex;
          // align-items: center;
          justify-content: space-between;
          > div:nth-child(1){
            
          >span{
             height: 18px;
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 18px;
          vertical-align:middle;
          }
            >img{
              vertical-align:middle;
               width: 17px;
            height: 18px;
            display: inline-block;
            margin-right:8px;
            }
           
          }
          >div:nth-child(2){
            >img{
            // width: 142px;
            height: 21px;
            opacity: 0.6;
            }
          }
        }
        &-info{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top:26px;
          padding:12px 16px;
          overflow: hidden;
          background: #1e1e1e;
          border-radius: 8px;
          box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.11) inset; 
          &-leftShop{
          background-image: url(/public/static/images/collection-examples/shopImage.png);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: 0 0;
          width: 50px;
          height: 50px;
          >img{
            display: inline-block;
            width: 36px;
            height: 28px;
            padding: 7px;
          }
        }
        &-rightShop{
          flex: 1;
          padding-left:12px;
          .title{
          height: 16px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
          line-height: 16px;
          }
          .code{
            margin-top:14px;
            width: 151px;
            height: 16px;
            background: #fed89b;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            padding-left:16px;
            text-align: justify;
            color: #666666;
            line-height: 16px;
            border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;
          }
        }
        }
      }
    }
        .form-submit{
          margin-top:25px;
          height: 50px;
          width: 295px;
          border: none;
          background: linear-gradient(90deg,#8334ed, #548dff);
          border-radius: 25px;
          box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06); 
        }
        .submit-active{
            position:relative;
            animation:mymove .5s;
            -webkit-animation:mymove .5s; /*Safari and Chrome*/
        }
        @keyframes mymove
            {
                0% {left:0px;}
                50%{left:60px;}
                100% {left:0px;}
            }
        @-webkit-keyframes mymove /*Safari and Chrome*/
        {
            0% {left:0px;}
            50%{left:60px;}
            100% {left:0px;}

        }
        @media screen and (max-height: 700px){
          .footer{
            position: absolute;
            animation: myfirst 0.3s;
            top:-180px;
            left:46%;
            z-index: 9999;
            flex-direction: column;
            align-items: center;
            #bj {
                display: block;
                width: 31px;
                height: 31px;
                opacity: 0.8;
              
            }
    }
        }
       
    @media screen and (max-height:1300px) and (min-height:700px){
          .footer{
            position: absolute;
            animation: myfirst 0.3s;
            top:-110px;
            left:46%;
            z-index: 9999;
            flex-direction: column;
            align-items: center;
            #bj {
                display: block;
                width: 31px;
                height: 31px;
                opacity: 0.8;
              
            }
    }
        }
    @keyframes myfirst
          {
          0%   {
                  transform: scale(0);
                  transform-origin: center -200px;
              }
          10% {
                  transform: scale(0.6);
                  transform: translateY(-200px);
              }
          100% {
                  transform: scale(1);
              }
          }
</style>