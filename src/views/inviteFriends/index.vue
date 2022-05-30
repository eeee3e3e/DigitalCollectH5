<template>
  <div class="app-invite-friends">
    <div class="title">
      邀请好友
    </div>

    <div class="content">
      <div class="rule">
        <img src="/static/images/invite-friends/u11.png" alt="" width="12" height="12">
        活动规则 <i> > </i> </div>
      <h2>城市数藏梦想邀约人  <span>第 <i>1</i> 期</span></h2>
      <img class="invite-text" src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E6%B5%B7%E6%8A%A5/u33.svg" alt="">
      <div class="panel-outer rights">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u83.svg" alt="">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u84.svg" alt="">
        <i class="text">我的邀请权益</i>

        <div class="invite panel-inside">

          <div class="left">
            <div class="friend">
              <img src='/static/images/avatar.png' alt="" class="avatar" width="22" height="22">
              <span><b>user.xxx</b>  邀请您来城市数藏一起领神秘藏品</span>
            </div>

            <div class="link">
              <span class="text">http://121.196.44.29:8002/#/city-meta/register?InviteCode={{recmmendationCode}}</span>
              <span class="btn" @click="copyContentH5(`http://121.196.44.29:8002/#/city-meta/register?InviteCode=${recmmendationCode}`)">复制链接</span>
            </div>
          </div>

          <div class="right">
            <img :src="getImageUrl(RecmmendationCodeImage)" alt="" width="60" height="60">
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
            <span> <i>1212121212</i> 人</span>
          </div>
          <!-- <van-row>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
          </van-row> -->
        </div>

        <span class="saveBtn" @click="savePic">保存邀请图到本地</span>

        <!-- <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒"/> -->
        <van-count-down :time="time" class='timer'>
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
        </van-count-down>

      </div>

     <div class="panel-outer gain">
       <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u83.svg" alt="">
        <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u84.svg" alt="">
        <i class="text">简单3步赢奖励</i>

        <div class="imgWraper">
          <img src="/static/images/invite-friends/2.png" alt="" width="90%">
          <div class="text">
            <span class="item item1">分享给好友</span>
            <span class="item item2">扫描进入页面</span>
            <span class="item item3">注册+实名认证</span>
          </div>
          <div class="invited">
            <img src="/static/images/invite-friends/3.png" alt="" width="56" height="7" style="transform: rotate(180deg);">
            已邀请 <span class="num">31</span> 位好友
            <img src="/static/images/invite-friends/3.png" alt="" width="56" height="7">
          </div>
        </div>
        
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <Empty v-if="!dataSource.length && !loading && finished && !varAwait" description="暂无数据 ~"
                 image="/static/images/collection/not-data-slot.png"/>
          <List
                v-else
                v-model="loading"
                :offset="200"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadMore"
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
                <span class="item time">{{item.RecmmendationTime}}</span>
                <span class="item status">{{item.StatusInfo}}</span>
              </div>
            </div>
            
            <template #loading></template>
            <template #error></template>
            <template #finished>
              <div class="finished">
                <img src="/static/images/home/cry-icon.png" alt="" class="icon">
                <span>已经到底啦 ~ ~</span>
              </div>
            </template>

            <div class="more">查看更多 <img src="https://img02.mockplus.cn/preview/2022-05-24/3f16f198-614f-4b3d-9102-c5214f34e007/images/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B/u112.svg" alt=""></div>
            <div class="coming">一大波好友在来的路上</div>
          </List>
        </PullRefresh>

        <i class="reminder">好友注册后，需要实名认证成功后才算邀请成功哦~</i>
     </div>

    </div>
  </div>
</template>

<script>
import { CountDown, PullRefresh, List, Empty, Notify } from 'vant';
import {inviteApi} from "@/api"
import Vue from 'vue';
import getImageUrl from "@/utils/get-image-url";
Vue.use(CountDown, PullRefresh, List, Empty, Notify);

export default {
  components: { 
    PullRefresh,
    Empty,
    List,
    Notify
  },
  data() {
    return {
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
      }
    }
  },

  created () {
    this.getDataSource()
    this.GetImageCodeUrl()
  },
  methods:{
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

    savePic(Url){
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

    // 刷新
    async onRefresh() {
      this.pagination.PageSize = 10
      this.pagination.PageIndex = 1
      await this.getDataSource(true)
      this.refreshing = false
    },

    // 加载更多
    async onLoadMore() {
      this.pagination.PageSize = 10
      this.pagination.PageIndex++
      await this.getDataSource()
    },

    // 获取数据
    getDataSource(isClear = false) {
      return new Promise((resolve) => {
        // userId=&pageIndex=1&pageSize=10
        if (this.varAwait) return resolve()
        this.varAwait = true
        const { pagination, userInfo} = this
        const params = {
          pageIndex: 1, //pagination.PageIndex,
          pageSize: 10, //pagination.PageSize,
          userId: 'f670cea1-11a4-45a5-a05e-9bb0de4607c2'
        }
        inviteApi.getMyRecmmendRecordList(params).then(result => {
          const data = result.Data || []
          // console.log(JSON.stringify(data, '', 4))
          if (isClear) {
           this.dataSource = data
          } else {
           this.dataSource.push(...data)
          }
          this.finished = result.TotalCount === 0 ? true : result.TotalCount < (result.PageIndex * result.PageSize)
          }).finally(() => {
            this.finished = true
            this.varAwait = false
            this.loading = false
            resolve()
          })
      })
      
    },

    GetImageCodeUrl(){
      return new Promise((resolve) => {
        const { userInfo } = this
        // const params = {
        //   userId: 'c60fd831-5117-4462-8be5-2409cd9786dd'
        // }
        inviteApi.GetImageCodeUrl('c60fd831-5117-4462-8be5-2409cd9786dd').then(result => {
          const data = result.Data || []
          console.log(JSON.stringify(data, '', 4))
          this.sumByReg = data.RecmmendationSumByReg
          this.sumByIdentity = data.RecmmendationSumByIdentity 
          this.recmmendationCode = data.RecmmendationCode
          this.RecmmendationCodeImage = data.RecmmendationCodeImage
        }).finally(() => { resolve() })
      })
    }
  }
}
</script>

<style scoped lang="less">
.panel-outer{
    width: 90%;
    background: #fcfbf8;
    border-radius: 10px;
    margin-top: 280px;  
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    & > img, & > i.text{
      position: absolute;
      top: -10px;
    }

    i.text{
      font-size: 14px;
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
        padding: 2px;
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
          display: flex;
          flex-direction: column;
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
        margin-top: 20px;
        width: 255px;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(90deg,#ffc553, #f7643b);
        border-radius: 25px;
        color: #fff;
        font-size: 14px;
        text-align: center;
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
        img{
          padding-left: 11px;
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
          text-align: center;
          font-size: 12px;
          color: #287bd1;
          padding-top: 10px;

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
          text-align: center;
          padding: 5px 0;
          font-size: 11px;
          .item{
            width: 25%;
            color: #666;
          }
          .item:first-child{
            width: 10%
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
        padding-top: 20px;
      }

    }

    .reminder{
      font-size: 11px;
      text-align: left;
      color: #979eb9;
      padding-bottom: 20px;
    }

  }
}
</style>
