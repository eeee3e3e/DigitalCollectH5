<template>
  <div class="app-invite-friends">

    <!-- <div class="title">邀请好友</div> -->

    <div class="content">
      <!-- <div class="rule" @click="rule">
        <img src="/static/images/invite-friends/u11.png" alt="" width="12" height="12">
        活动规则 <i> > </i> 
      </div>
      <h2>城市数藏梦想邀约人  <span>第 <i>1</i> 期</span></h2>
      <img class="invite-text" src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E6%B5%B7%E6%8A%A5/u33.svg" alt=""> -->
      <div class="panel-outer rights">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u83.svg" alt="">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u84.svg" alt="">
        <img src="/static/images/invite-friends/quanyi.png" alt="" class="text" width="78" height="14" style="top:-2px">

        <div class="invite panel-inside">

          <div class="left">
            <div class="friend">
              <img src='/static/images/avatar.png' alt="" class="avatar" width="22" height="22">
              <span style="display: flex;align-items: center;">
                <b>{{NickName}}</b>
                <i>&nbsp;&nbsp;</i>
                <i>邀请您来数藏领藏品！</i>
              </span>
            </div>

            <div class="link">
              <span class="text">{{origin}}/#/city-meta/register?InviteCode={{recmmendationCode}}</span>
              <span class="btn" @click="copyContentH5(`${origin}/#/city-meta/register?InviteCode=${recmmendationCode}`)">复制链接</span>
            </div>
          </div>

          <div class="right">
            <img :src="getImageUrl(RecmmendationCodeImage)" alt="" width="60" height="60" id="qrcode" ref="qrcode">
            <!-- <img src='/static/images/invite-friends/qr.jpg' alt="" class="avatar" width="60" height="60" id="qrcode" ref="qrcode"> -->
          </div>
          
        </div> 

        <div class="data panel-inside">
          <div class="item" style="">
            <span class="text">邀请人数</span>
            <span> <i>{{sumByReg}}</i> 人</span>
          </div>
          <div class="item" style="">
            <span class="text">邀请成功</span>
            <span> <i>{{sumByIdentity}}</i> 人</span>
          </div>
          <div class="item" style="">
            <span class="text">获得城市金</span>
            <span> <i>{{RecmmendationIntegral}}</i></span>
          </div>
          <!-- <van-row>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
          </van-row> -->
        </div>

        <span class="saveBtn" @click="savePic">保存邀请图到本地</span>
        <div class="tips" v-if="isTipShow">
        <!-- <div class="tips"> -->
          <div class="unlock" v-if="isTipShowLock">
            <img src="/static/images/invite-friends/lock.png" alt="" width="10" height="12">
            <span>邀请10人解锁抽奖资格</span>
          </div>
          <div class="gift" v-if="isTipShowGift">
            <img src="/static/images/invite-friends/gift.png" alt="" width="10" height="10">
            <span class="gift">已获得抽奖资格，待抽奖~</span>
          </div>
        </div>

        <!-- <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒"/> -->
        <!-- <van-count-down :time="time" class='timer'>
          <template #default="timeData">
            <span class="block">{{ timeData.days }}</span>
            <span class="colon"> 天 </span>
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon"> : </span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon"> : </span>
            <span class="block">{{ timeData.seconds }}</span>
            <span> 后结束</span>
          </template>
        </van-count-down> -->

      </div>

     <div class="panel-outer gain">
       <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u83.svg" alt="">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u84.svg" alt="">
        <img src="/static/images/invite-friends/3bu.png" alt="" class="text" width="78" height="14" style="top:-2px">

        <div class="imgWraper">
          <img src="/static/images/invite-friends/step.png" alt="" class="step">
          <!-- <div class="text">
            <span class="item item1">分享给好友</span>
            <span class="item item2">扫描进入页面</span>
            <span class="item item3">注册+实名认证</span>
          </div> -->
          <div class="invited">
            <img src="/static/images/invite-friends/left.png" alt="" width="56" height="10">
            <span>已邀请 <span class="num">{{TotalCount}}</span> 位好友</span>
            <img src="/static/images/invite-friends/right.png" alt="" width="56" height="10">
          </div>
        </div>
        
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <Empty v-if="!dataSource.length && !loading && finished && !varAwait" description="暂无数据 ~"
                 image="/static/images/collection/not-data-slot.png"/>
          <List
                v-else
                :offset="200"
                :finished="finished"
            >
            <div class="wraper">
              <div class="row">
                <span class="item name">好友</span>
                <span class="item nickName">昵称</span>
                <span class="item time">邀请时间</span>
                <span class="item status">好友状态</span>
              </div>
              <div class="row" v-for="item of dataSource">
                <span class="item name">
                  <img src="/static/images/avatar.png" alt="" class="avatar" width="22" height="22">
                </span>
                <span class="item nickName">{{item.UserNickName}}</span>
                <span class="item time">{{item.RecmmendationTime.substring(10, 0).replace(/-/g,'.')}}</span>
                <span class="item status" :class="{'success':item.StatusInfo == '认证成功'}">{{item.StatusInfo}}</span>
              </div>
            </div>
            
            <template #loading></template>
            <template #error></template>
            <!-- <template>
              <div class="finished" v-show='finished==true'>
                <img src="/static/images/home/cry-icon.png" alt="" class="icon">
                <span>已经到底啦 ~ ~</span>
              </div>
            </template> -->

            <div class="finished" style="margin-top: 20px" v-show='finished==true'>
              <img src="/static/images/home/cry-icon.png" alt="" class="icon"><span>已经到底啦 ~ ~</span>
            </div>

            <div class="more" @click="onLoadMore" v-show='finished==false'>查看更多 <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u112.svg" alt=""></div>
          </List>
        </PullRefresh>
        <div class="footer">
          <div class="coming">一大波好友在来的路上</div>
          <i class="reminder">好友注册后，需要实名认证成功后才算邀请成功哦~</i>
        </div>
     </div>

    </div>

    <van-overlay  :show="overlayShow" @click="overlayShow = false">
      <div class="wrapper" @click.stop>

        <div class="ruleTitle">
          <div class="left">
            <img src="/static/images/invite-friends/c4.png" alt="" width="16" height="18">
            <span>活动规则</span>
          </div>
          <img src="/static/images/invite-friends/5.png" alt="" width="69" height="21">
        </div>
        <pre>
          
        0元购操作流程：活动有效期内，进入商城页面，右上角，点击分享到朋友圈或朋友，邀请朋友关注，成功关注后，粉丝数量累积+1，取消后粉丝数量-1，总数量达到 0 元购商品指定数量，即可 0 元支付，支付方式请选择余额支付。 

        重要提示：双 11 活动期间，由于物流繁忙，到货时间可能延后； 

        如有问题，请致电全国统一客服热线：400-999-0281 

        活动规则

        1、所有 0 元购商品，包邮，无需支付其它费用； 

        2、所有 0 元购商品，不可重复领取； 3、所有 0 元购商品达成条件，根据活动期间粉丝新增数量判断；4、粉丝数量，重复取消关注无效。 

        1、所有 0 元购商品，包邮，无需支付其它费用； 

        2、所有 0 元购商品，不可重复领取；

        3、所有 0 元购商品达成条件，根据活动期间，所有 0 元购商品，包元

        </pre>
        <img src="/static/images/invite-friends/close.png" alt="" class="close" width="31" height="31" @click="overlayShow = false">
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { CountDown, PullRefresh, List, Empty, Notify } from 'vant';
import { Overlay } from 'vant';
import {inviteApi} from "@/api"
import getImageUrl from "@/utils/get-image-url";

// import QRCode from 'qrcodejs2';
import axios from "axios";
import { mapGetters, mapMutations } from 'vuex'
import Vue from 'vue';
Vue.use(CountDown, PullRefresh, List, Empty, Notify);
Vue.use(Overlay);

export default {
  components: { 
    PullRefresh,
    Empty,
    List,
    Notify,
    Overlay
  },
  data() {
    return {
      overlayShow: false,
      NickName: '',
      RecmmendationIntegral: '',
      sumByReg: 0,
      sumByIdentity: 0,
      recmmendationCode: '',
      RecmmendationCodeImage: '',
      time: 360 * 60 * 60 * 1000,
      timeData: {
        hours: 24,
        minutes: 60,
        seconds: 58
      },
      loading: false,
      refreshing: false,
      varAwait: false,
      finished: false,
      dataSource:[],
       pagination: {
        PageIndex: 1,
        PageSize: 10
      },
      TotalCount: 0,
      origin: location.origin,
      // currentDate: ''
      isTipShow: false,
      isTipShowLock: false,
      isTipShowGift: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    // console.log(JSON.stringify(this.userInfo.ID,'',4));
    // alert(getDate('2022-6-11'))
    // console.log(this.currentDate(new Date()))
    this.GetImageCodeUrl()
    this.getDataSource()

  },
  methods:{
    rule(){
      this.overlayShow = true
    },

    // 加载图片资源
    getImageUrl(path) {
      return getImageUrl(path)
    },
    copyContentH5(content) {
      var copyDom = document.createElement('div');
      copyDom.innerText=content;
      copyDom.style.position='absolute';
      copyDom.style.top='0px';
      copyDom.style.right='-9999px';
      document.body.appendChild(copyDom);
      //创建选中范围
      var range = document.createRange();
      range.selectNode(copyDom);
      //移除剪切板中内容
      window.getSelection().removeAllRanges();
      //添加新的内容到剪切板
      window.getSelection().addRange(range);
      //复制
      var successful = document.execCommand('copy');
      copyDom.parentNode.removeChild(copyDom);
      try{
          var msg = successful ? "successful" : "failed";
          console.log('Copy command was : ' + msg);
          Notify({ type: 'success', message: '链接已复制' });
      } catch(err){
          console.log('Oops , unable to copy!');
      }
    },

    savePic1(Url){
      Url = getImageUrl(this.RecmmendationCodeImage) //图片路径，也可以传值进来
      var triggerEvent = "touchstart"; //指定下载方式
        var blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
        var url = URL.createObjectURL(blob); //创建一个字符串路径空位
        var a = document.createElement('a'); //创建一个 a 标签
        a.href = Url;  //把路径赋到a标签的href上
        //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
        a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0]; 
        /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/
        
        //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
      var e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));  
      //派遣后，它将不再执行任何操作。执行保存到本地
        a.dispatchEvent(e); 
        //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
        URL.revokeObjectURL(url); 
        Notify({ type: 'success', message: '保存成功' });
      /* 
      //这段好像并不影响，所以我不用，注释掉
      var imgs = document.getElementsByTagName("img");
      for(var i = 0,o;o = imgs[i];i++){
        
        o.addEventListener(triggerEvent,function(){
          var newurl = this.getAttribute("src");
          saveAs(newurl);
        },false);
      } */
      
    },

    savePic(){
      const params = {
        sumByReg: this.sumByReg,
        sumByIdentity: this.sumByIdentity,
        recmmendationCode: this.recmmendationCode,
        RecmmendationCodeImage: this.RecmmendationCodeImage,
        NickName: this.NickName
      }
      this.$router.push({ 
        path: '/city-meta/invite-friends-placard', 
        query: params
      })
    },

    GetImageCodeUrl(){
      return new Promise((resolve) => {
        // alert(this.userInfo.ID)
        const { userInfo } = this
        // inviteApi.GetImageCodeUrl('4e679f22-9bb8-4c3b-8de2-2448f4dbc077').then(result => {
        // console.log(this.userInfo.ID)
        console.log(JSON.stringify(this.userInfo,'', 4))
        // return;
        // inviteApi.GetImageCodeUrl(this.userInfo.ID).then(result => {
        inviteApi.GetImageCodeUrl(this.userInfo.ID).then(result => {
          const data = result.Data || []
          // console.log(JSON.stringify(data, '', 4))
          this.NickName = data.NickName
          this.UserHead = data.UserHead
          this.RecmmendationIntegral = data.RecmmendationIntegral
          this.sumByReg = data.RecmmendationSumByReg
          this.sumByIdentity = data.RecmmendationSumByIdentity 
          this.recmmendationCode = data.RecmmendationCode
          this.RecmmendationCodeImage = data.RecmmendationCodeImage
        }).finally(() => { resolve() })
      })
    },
    // 刷新
    async onRefresh() {
      this.pagination.PageSize = 10
      this.pagination.PageIndex = 1
      await this.getDataSource(true)
      this.refreshing = false
    },

    // 加载更多
    async onLoadMore() {
      // debugger
      // alert(this.pagination.PageIndex)
      this.pagination.PageSize = 10
      this.pagination.PageIndex++
      await this.getDataSource()
    },

    // 获取数据
    getDataSource(isClear = false) {
      return new Promise((resolve) => {
        // userId=&pageIndex=1&pageSize=10
        // if (this.varAwait) return resolve()

        this.varAwait = true
        const { pagination, userInfo} = this
        const params = {
          pageIndex: pagination.PageIndex,
          pageSize: pagination.PageSize,
          // userId: JSON.stringify(this.userInfo.ID,'',4)
          userId: this.userInfo.ID,
          // userId: '4e679f22-9bb8-4c3b-8de2-2448f4dbc077'
        } 
        inviteApi.getMyRecmmendRecordList(params).then(result => {
          const data = result.Data || []
          this.TotalCount = result.TotalCount
          // console.log(JSON.stringify(data, '', 4))
          if (isClear) {
           this.dataSource = data
          } else {
           this.dataSource.push(...data)
          }
          this.finished = result.TotalCount === 0 ? true : result.TotalCount < (result.PageIndex * result.PageSize)
          this.isTipShow = ((new Date('2022-6-11') * 1) > (new Date() * 1))
          if(this.isTipShow){
            if(result.TotalCount < 10) {
              this.isTipShowLock = true
            }
            if(result.TotalCount >= 10) {
              this.isTipShowGift = true
            }
          }
        }).finally(() => {
          // this.finished = true
          // this.varAwait = false
          this.loading = false
          resolve()
        })
      })
      
    },

  }
}
</script>

<style scoped lang="less">
.panel-outer{
    width: 90%;
    background: #fcfbf8;
    border-radius: 10px;
    margin-top: 300px;  
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    & > img, & > i.text{
      position: absolute;
      top: -9px;
    }

    i.text{
      font-size: 13px;
      font-family: HYYaKuHeiW, HYYaKuHeiW-Regular;
      text-shadow: 0px 1px 2px 0px rgba(0,0,0,0.10) inset; 
      height: 14px;
      color: #865e30;
      top: -2px
    }

}
.panel-outer + .panel-outer{
  margin-top: 30px;
}
.panel-inside{
  width: 95%;
  height: 80px;
  border-radius: 4px;
  background: #F2F3FA;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.app-invite-friends {
  padding-bottom: 20px;
  box-sizing: border-box;
  color: #ccc;

  .title{
    width: 375px;
    height: 90px;
    background: #1a1d31;
    padding: 20px;
    padding-top: 50px;
    box-sizing: border-box;
    text-align: center;
    font-size: 17px;
    color: #fff;
  }

  .content{
    background-image: url(/public/static/images/invite-friends/bg.png);
    background-repeat: no-repeat;
    background-color: #12194B;
    background-size: 100%;
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    .rule{
      position: absolute;
      right: 30px;
      top: 20px;
      width: 104px;
      height: 26px;
      line-height: 26px;
      opacity: 0.8;
      background: #96a1cc;
      border-radius: 17px;
      color: #1C2357;
      font-size: 12px;
      font-weight: bold;

      img{
        padding: 6px 3px 0 12px
      }
      i{
        font-family: '仿宋'
      }
    }

    h2{
      font-size: 18px;
      padding: 70px 0 20px 0;
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

    .rights{
      
      .invite{
        width: 95%;
        height: 80px;
        border-radius: 4px;
        background: #F2F3FA;
        margin-top: 30px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        
        .left, .right{
          height: 30px;
        }

        .left{
          width: 80%;

          .friend{
            font-size: 11px;
            color: #3D4AA8;
            display: flex;
            padding: 2px 10px 2px 1px;
            img.avatar{
              margin: 1px 8px 0 6px;
            }
          }

          .link{
            background: #e5e8ef;
            border-radius: 13px;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            padding: 3px;

            .text{
              width: 70%;
              display: flex;
              align-items: center;

              font-size: 12px;
              color: #777;

              text-indent: 5px;
              white-space: nowrap;  
              overflow: hidden; 
              text-overflow: ellipsis;
            }
          
            .btn{
              border-radius: 13px;
              background: #FFAB06;
              font-size: 12px;
              color: #584533;
              padding: 5px;
              display: flex;
              align-items: flex-end;
            }
          }
        }
        .right{
        }
      }

      .data{
        display: flex;
        align-items: center;
        .item{
          width: 33%;
          height: 51px;
          font-size: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #666;
          .text{
            margin-bottom: 10px;
          }
          i{
            color: #4752A5;
          }
        }
        
        .item ~ .item{
          border-left: 1px solid #EEEEEE;
        }
      }

      .saveBtn{
        margin: 20px 0;
        width: 255px;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(90deg,#ffc553, #f7643b);
        border-radius: 25px;
        color: #fff;
        font-size: 14px;
        text-align: center;
      }

      .tips{
        div{
          padding-bottom: 10px;
        }
        span{
          font-size: 12px;
          padding-left: 9px;
        }
        span.gift{
          color: #3971e9;          
        }
      }

      .timer{
        font-size: 12px;
        padding: 20px 0;
        color: #666;
      }

      .block{
        display: inline-block;
        text-align: center;
        border-radius: 5px;
        width: 24px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #ffffff;
        background: #5c84dc;
      }

    }

    .panel-outer.gain{
      .imgWraper{
        padding: 20px;
        position: relative;
        img.step{
          padding: 20px 0;
        }
        .text{
          display: flex;
          position: absolute;
          top: 80px;
          left: 30px;
          .item {
            font-size: 12px;
            color:#2c3579;
            text-align: center
          }
          .item2{
            padding: 0 28px 0 42px;
          }
        }
        .invited{
          font-family: 'HYYaKuHeiW, HYYaKuHeiW-Regular';
          text-align: center;
          font-size: 12px;
          color: #287bd1;
          display: flex;
          justify-content: space-between;
          .num{
            padding: 0 5px;
            background: #ff9923;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }
      }

      .wraper{
        width: 320px;
        padding-left: 50px;
        .row{
          display: flex;
          align-items: center;
          text-align: left;
          padding: 5px 0 5px 5px;
          font-size: 11px;
          color: #aaa;

          .item{
            width: 25%;
            color: #666;
          }
          .item:first-child{
            width: 15%
          }
          .item.nickName{
            width: 28%;
          }
          .item.status.success{
           color: #4d84fd;
          }
        }
        .row ~ .row{
          .item.nickName{
            color: #333;
          }
        }
      }

      .more{
        font-size: 11px;
        color: #285AC6;
        text-align: center;
        padding-top: 10px;
      }
      .coming{
        font-size: 14px;
        font-weight: bold;
        color: #2b388f;
        text-align: center;
        padding: 10px 0;
      }

    }

    .footer{
      margin-top: 20px;
      background: #f3f5f8;
      text-align: center;
      width: 100%;
      padding: 10px 0 20px 0;
      border-radius: 0 0 15px 15px;
    }
    .reminder{
      font-size: 11px;
      text-align: left;
      color: #979eb9;
      padding-bottom: 20px;
    }

  }

  .wrapper{
    width: 90%;
    background: #292929;
    border-radius: 8px;
    margin: 30px auto;
    font-size: 12px;
    margin-top: 20%;
    padding-bottom: 15px;
    position: relative;

    .ruleTitle{
      display: flex;
      justify-content: space-between;
      padding: 30px 20px 10px 20px;

      .left{
        display:flex;
        span{
          height: 18px;
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 18px;
          padding-left: 6px;
        }
      }
    }

    pre{
      word-break: break-word;
      white-space: pre-line;
      color: #fff;
      line-height: 15px;
      padding: 0 20px;
      box-sizing: border-box;
    }

    img.close{
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: -50px;
    }
  }
}
</style>
