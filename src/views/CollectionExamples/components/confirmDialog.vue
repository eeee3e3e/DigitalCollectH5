<template>
  <div class="dialog" v-show="isShow">
    <van-dialog v-model="isShow" width="90vw" :show-confirm-button="false">
        <div class="dialog-card">
          <div class="dialog-card-title">
            <div>
              <img :src="`${staticPath}/static/images/collection-examples/zcIcon.png`" alt="">
            <span>转赠确认</span>
            </div>
              <div>
                <img :src="`${staticPath}/static/images/collection-examples/titleBj.png`" alt="">
              </div>
            </div>
          <div class="dialog-card-info">
               <div class="dialog-card-info-leftShop">
              <img :src="getImageSrc(this.AttachmentListFile)" alt="">
            </div>
            <div class="dialog-card-info-rightShop">
                <div class="title">{{this.shop.CommodityName}}</div>
                <div class="code">
                  <img :src="`${staticPath}/static/images/collection-examples/qkl.png`" alt="">
                  <!-- <span>JISHADGIN #0001/1000</span> -->
                   <span>{{this.shop.CommodityCode ? this.shop.CommodityCode.substring(this.shop.CommodityCode.length - 12):'' }}</span>
                  <span> #{{ this.shop.CommodityNo }}/{{ this.shop.LimitNum }}</span>
                  </div>
            </div>
          </div>
          <div class="dialog-card-recipient">
              <div class="dialog-card-recipient-title">
                 <img :src="`${staticPath}/static/images/collection-examples/zh.png`" alt="">
                <span>受赠方信息</span>
              </div>
              <div class="dialog-card-recipient-count">
                <div class="dialog-card-recipient-count-left">
                  <!-- <img :src="`${staticPath}/static/images/collection-examples/shop.png`" alt=""> -->
                  <img :src="getImageSrc(exaplesInfo.UserHead) || '/static/images/avatar.png'" alt="">
                </div>
                <div class="dialog-card-recipient-count-right">
                  <p>受赠方姓名</p>
                  <p>{{exaplesInfo.RealName}}</p>
                  <p>受赠方手机号</p>
                  <p>{{exaplesInfo.MobileNo}}</p>
                </div>
              </div>
          </div>
          <div id="vat" class="dialog-card-agreement-content" :class="active ? 'submit-active' : ''">
              <vant-checkbox v-model="isCheck"/>
              <p>
                本人承诺本次转赠仅用于好友之间交流分享
              </p>
            </div>
            <div style="text-align:center;width:100%;">
            <button :class="!isCheck ? 'submit-disabled':'form-submit'"  @click="confirmgroom">
              <span>确认转赠</span>
            </button>
          </div>
          <div class="dialog-waring">
            <img :src="`${staticPath}/static/images/collection-examples/waring.png`" alt="">
            <span>数字藏品仅用于个人鉴赏、分享，严禁以任何形式炒作藏品！</span>
          </div>
           <div style="margin-top:24px;text-align:center;width:100%;color: #777;font-size:12px;margin-bottom:10px">
            <span  @click="close">取消</span>
          </div>
          </div>
    </van-dialog>
    <!-- <div class="footer">
      <img id="bj" @click="close" style="" :src="`${staticPath}/static/images/collection-examples/close.png`" alt="">
    </div> -->
  </div>
</template>
<script>
import getImageUrl from "@/utils/get-image-url";
import { Dialog ,Checkbox } from 'vant'
import {exaplesApi} from "@/api"
import { mapGetters } from 'vuex'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    VantCheckbox: Checkbox,
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    exaplesInfo:{
      type:Object,
      default:{}
    },
    shop:{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
      isCheck: false,
      active:false,
      AttachmentListFile:''
    }
  },
  created () {
    this.AttachmentListFile = JSON.parse(this.shop.AttachmentList)[0]
  },
  methods:{
    getImageSrc(path) {
      return getImageUrl(path)
    },
    // 关闭弹窗
     close(){
           this.$emit('closeQR',false)
        },
    // 确认转赠
    confirmgroom () {
      if (this.isCheck === false) {
        let odiv=document.getElementById("vat")
        this.active = true
       setTimeout(()=>{
           odiv.classList.remove("submit-active")
        this.active = false
        },500)
      } else {
        const { userInfo } = this
        console.log('发送用户',userInfo)
        const params = {
          
          SendUserID:userInfo.ID,
          ReceiveUserID:this.exaplesInfo.ID,
          CommodityDetailsID:this.shop.CommodityDetailsID,
          ReceiveMobileNo:this.exaplesInfo.MobileNo
        }
        exaplesApi
        .getTurnCommodityToUser(params).then(res=>{
          console.log(res)
           this.$router.push({
             path:'examples-successful',
             query:{
               name:this.exaplesInfo.RealName,
               iphone:this.exaplesInfo.MobileNo
             }
           })
        })
         this.active = false
      }
    }
  },
  computed: {
    isSend() {
      return this.isCheck 
    },
    ...mapGetters(['userInfo']),
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
          margin-top: 0px;
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
          width:calc(100% -  60px);
          padding-left:12px;
          .title{
            width:100%;
          height: 16px;
          font-size: 16px;
           white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
          line-height: 16px;
          }
          .code{
            >img{
              display: inline-block;
              vertical-align:middle;
              width: 11px;
              height: 12px;
            }
            >span{
              vertical-align:middle;
               padding-left:8px;
                font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #666666;
            }
            margin-top:12px;
            // height: 20px;
            // background: #fed89b;
           
           
            text-align: justify;
            color: #666666;
            border-radius: 10px;
          }
        }
        }
      }
    }
        .form-submit{
          margin-top:10px;
          height: 50px;
          width: 295px;
          border: none;
          color:#FFFFFF;
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
                30%{left:30px;}
                60%{left: 0px;}
                80% {left:30px;}
                100% {left:0px;}
            }
        @-webkit-keyframes mymove /*Safari and Chrome*/
        {
            0% {left:0px;}
                30%{left:30px;}
                60%{left: 0px;}
                80% {left:30px;}
                100% {left:0px;}

        }
    @keyframes myfirst
          {
          0%   {
                  transform: scale(0);
                  transform-origin: center -100px;
              }
          10% {
                  transform: scale(0.6);
                  transform: translateY(-200px);
              }
          100% {
                  transform: scale(1);
              }
          }
          .submit-disabled {
          background: linear-gradient(270deg, #19191a, #23242b) !important;
          color: #666666 !important;
          margin-top:10px;
          height: 50px;
          width: 295px;
          border: none;
          border-radius: 25px;
          box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06);
        }
</style>