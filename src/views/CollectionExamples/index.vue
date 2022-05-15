<template>
  <div id="parent" class="app-collection-examples">
    <div class="examples-boby">
      <div class="examples-boby-title">
        将下列数字藏品转赠给您的好友
      </div>
      <div class="examples-boby-card">
          <div class="examples-boby-card-details">
            <div class="examples-boby-card-details-leftShop">
              <img  v-if="this.AttachmentList && this.AttachmentList.length"
               :src="getImageSrc(this.AttachmentList[0])" alt="">
            </div>
            <div class="examples-boby-card-details-rightShop">
                <div class="title">{{this.CommodityName}}</div>
                <div class="code">
                   <p>{{this.CommodityCode ? this.CommodityCode.substring(this.CommodityCode.length - 12):'' }}</p>
                  <p> #{{ this.CommodityNo }}/{{ this.LimitNum }}</p>
                  </div>
                <div class="tags">
                <div class="tags-item">
                <div class="unit">
                  <span>限量</span>
                </div>
                <div class="value">
                  <span>{{this.LimitNum}}</span>
                </div>
              </div>
              <div class="tags-item">
                <div class="valueName">
                  <span>城市数藏收藏馆</span>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div class="examples-boby-info">
        <img src="" alt="">
        受赠方账户信息
      </div>
      <div class="examples-boby-info-card">
          <CellGroup :border="false">
             <Cell is-link>
              <template>
                <input class="input-user-nick-iphone" v-model="MobileNo" />
              </template>
              <template #title>
                <span>手机号</span>
              </template>
            </Cell>
          </CellGroup>
      </div>
      <div class="examples-boby-explain">
        <div class="title">转赠说明
           <div class="background"></div>
        </div>
        <div>
          <p>1、请您确认您具备赠送数字藏品的民事行为能力；</p>
          <p>2、请您确认您与受赠人均已通过平台的实名认证并遵守相关法律法规及平台协议；</p>
          <p>3、请您确认本次赠送行为未设定任何形式的对价；</p>
          <p>4、转赠操作无法撤销；</p>
          <p>5、与数字藏品相关的权利将会同步且毫无保留地转移至受赠人；</p>
        </div>
      </div>
        <confirm-dialog :isShow="diaolgShow" @closeQR="closeQR" :exaplesInfo="exaplesInfo" :shop="shop"></confirm-dialog>
    </div>
     <div class="app-collection-examples-footer">
      <button class="save" @click="onSave">确认转赠</button>
    </div>
  
  </div>
</template>
<script>
import getImageUrl from "@/utils/get-image-url";
import { CellGroup, Cell } from 'vant'
import confirmDialog from './components/confirmDialog.vue'
import { verifyPhone } from '@/utils/regexp'
import tip from "@/utils/tip";
import {exaplesApi} from "@/api"
import AppLoading from "@/utils/app-loading"
export default {
  components: {
    CellGroup,
    Cell,
    confirmDialog
  },
  data () {
    return {
      diaolgShow:false,
      AttachmentList:undefined,
      CommodityName:undefined,
      CommodityCode:undefined,
      CommodityNo:undefined,
      LimitNum:undefined,
      MobileNo:undefined,
      exaplesInfo:{},
      shop:{
        AttachmentList:[],
        CommodityName:undefined,
        CommodityCode:undefined,
        CommodityNo:undefined,
        LimitNum:undefined,
        CommodityDetailsID:undefined
      }
    }
  },
  computed: {
    routeParams() {
      return this.$route.query
    }
  },
  created () {
    const { AttachmentList,CommodityName,CommodityCode,CommodityNo,LimitNum,CommodityDetailsID } = this.routeParams
    this.AttachmentList = JSON.parse(AttachmentList)
    this.CommodityName = CommodityName
    this.CommodityCode = CommodityCode
    this.CommodityNo = CommodityNo
    this.LimitNum = LimitNum
    for (let i in this.routeParams){
      this.shop[i] = this.routeParams[i]
      if (this.routeParams[i] === 'AttachmentList') {
        this.shop.AttachmentList = JSON.parse(AttachmentList)
      }
    }
    console.log('图片路径',this.AttachmentList[0],this.CommodityName)
  },
  methods:{
    getImageSrc(path) {
      return getImageUrl(path)
    },
    onSave () {
      const { MobileNo } = this

      if (!MobileNo) {
        return tip.error({
          message: '请填写手机号！'
        })
        return
        }
        if (!verifyPhone(MobileNo)) {
        return tip.error({
          message: '手机号码格式不正确！'
        })
        return
      }
      AppLoading.showAppLoading()
      this.$nextTick(() => {
    // 获取父盒子（肯定有滚动条）
      var parent = document.getElementById('parent')
      parent.scrollTop = 0 // 这个时候设置scrollTop的值绝对生效
    })
        const params = {
        MobileNo: this.MobileNo
      }
        exaplesApi
          .userTurnToUserInfo(params)
          .then(res => {
            console.log('获取转赠用户信息',res)
            this.exaplesInfo = res.Data
            setTimeout(()=>{
          this.diaolgShow = true
        },100)
          })
          .finally(() => {
            AppLoading.closeAppLoading()
          })
    },
    closeQR (v) {
      this.diaolgShow = v
    }
  }
}
</script>
<style lang="less" scoped>
#parent{
  height: 99vh;
  overflow:auto;
}
  .app-collection-examples{
    background: #0b0e15;
    &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px 36px;
    box-sizing: border-box;
    width: 100%;
    z-index: 1000;
    background: #0b0e15;
    .save {
      width: 100%;
      height: 50px;
      background: linear-gradient(90deg,#8334ed, #548dff);
      border-radius: 25px;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06); 
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 50px;
      border: none;
      outline: none;
    }
  }
  .examples-boby{
    margin-top:88px;
     padding: 0px 16px 90px 16px;
     overflow: scroll;

    &-title{
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #aaaaaa;
      line-height: 14px;
      letter-spacing: 1px;
    }
    &-info{
      margin-top:30px;
      // width: 84px;
      letter-spacing: 1px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #aaaaaa;
      line-height: 12px;
      &-card{
        margin-top:14px;
        height: 57px;
        background: #1e1e1e;
        padding:5px;
        // background: red;
        border-radius: 4px;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.13); 
        align-items: center;

        ::v-deep {
        .van-cell-group {
          border-radius: 8px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
          overflow: hidden;
          padding: 0 18px;
          background-color: transparent;
          .van-cell__title{
            font-size: 15px !important;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400 !important;
            text-align: left;
            color: #aaaaaa !important;
          }
          .van-cell {
            padding: 20px 0;
            line-height: 1;
            align-items: center;
            background-color: transparent;
            // border-bottom: 1px solid #222222;
            .van-cell__right-icon{
              display: none;
            }
            &:nth-last-of-type(1) {
              border-bottom: none;
            }

            &::after {
              display: none;
            }

            .van-cell__title {
              font-size: 14px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }

            .van-cell__value {
              font-size: 14px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            }
          }
        }
      }
        .input-user-nick-iphone {
        background-color: transparent;
        outline: none;
        text-align: right;
        border: none;
      }
      }
    }
    &-explain{
      padding: 20px 24px;
      margin-top:40px;
      // height: 240px;
      background: #1e1e1e;
      border-radius: 8px;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.13); 
      >.title{
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: justify;
        color: #ffffff;
        line-height: 16px;
        position: relative;
        >.background{
           width: 78px;
          height: 9px;
          position: absolute;
          bottom: -5px;
          left: -2px;
          opacity: 0.2;
          background: linear-gradient(270deg, rgba(178, 227, 255, 0.00), #7ac3ff);
        }
      }
      >div:nth-child(2){
        margin-top: 20px;
        p{
          line-height: 30px;
        font-size: 13px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #aaaaaa;
        }
      }
    }
    &-card{
      margin-top:16px;
      height: 120px;
      padding: 10px 9.89px;
      box-sizing: border-box;
      border-radius: 8px;
      background: #1e1e1e;
      border-radius: 8px;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.13);
      &-details{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #1e1e1e;
        border-radius: 8px;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.13);
        &-leftShop{
          background-image: url(/public/static/images/collection-examples/shopImage.png);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: 0 0;
          width: 100px;
          height: 100px;
          >img{
            display: inline-block;
            width: 86px;
            height: 86px;
            padding: 7px;
          }
        }
        &-rightShop{
          flex: 1;
          padding-left:12px;
          .title{
            // width: 192px;
            height: 16px;
            font-size: 15px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: justify;
            color: #ffffff;
            line-height: 16px;
          }
          .code{
            padding-left: 25px;
            padding-right: 10px;
            display: flex;
             justify-content: space-between;
            margin-top:14px;
            width: 180px;
            height: 20px;
            background: #fed89b;
            font-size: 11px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #0b0e15;
            border-radius: 10px;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                text-align: center;
                background-repeat: no-repeat;
                > p {
                  font-size: 11px;
                  font-family: PingFangSC, PingFangSC-Regular;
                  font-weight: 400;
                  text-align: center;
                  color: #0b0e15;
                  line-height: 20px;
                }
          }
          .tags {
            margin-top:14px;
            display: flex;
            align-items: center;

            &-item {
              display: flex;
              align-items: center;
              margin: 0 5px;
              border-radius: 4px;
              overflow: hidden;

              .unit {
                
                
               
                >span{
                  display: block;
                  width:30px;
                  padding: 4px 6px;
                   font-family: PingFangSC, PingFangSC-Regular;
                font-size: 9px;
                font-weight: 400;
                color: #333333;
                background: #fed89b;
                text-align: center;
                }
              }

              .value {
                flex: 1;
                padding: 4px 6px;
                background: #282d38;
                font-size: 9px;
                font-family: PingFangSC, PingFangSC-Regular;
                text-align: center;
                color: #ffffff;
              }
              .valueName {
                opacity: 0.4;
                padding: 4px 6px;
                font-size: 12px;
                font-weight: 400;
                font-family: PingFangSC, PingFangSC-Regular;
                text-align: justify;
                color: #ffffff;
                >span{
                  display: block;
                   width:85px;
                }
              }
            }
          }
        }
      }
    }
  }
  }
</style>