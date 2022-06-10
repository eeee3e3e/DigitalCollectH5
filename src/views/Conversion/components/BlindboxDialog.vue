<template>
  <div class="dialog" v-show="isShow">
    <van-dialog v-model="isShow" width="78vw" :show-confirm-button="false">
        <div class="dialog-card">
          <div >
            <div class="dialog-card-title">
            <span>盲盒开启中 ({{stepTime}}s)</span>
            </div>
            </div>
            <div class="line">&nbsp;</div>
            <div class="box">
              <div class="blindbox">
                <img src="/static/images/conversion/blindbox.gif" alt="">
            </div>
            </div>
            <div class="footerMessage">
              您购买的盲盒正在开启中，吸口欧气吧...
            </div>
          </div>
    </van-dialog>
  </div>
</template>
<script>
import getImageUrl from "@/utils/get-image-url";
import { Dialog } from 'vant'
import {exaplesApi} from "@/api"
import { mapGetters } from 'vuex'
let timerId
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
  },
  data () {
    return {
      stepTime:3
    }
  },
  created () {
  },
  methods:{
    // 开始倒计时
    startCountDown() {
      this.stopCountDown()
      timerId = setInterval(() => {
        if (this.stepTime <= 0) {
          this.stopCountDown()
          this.$emit('closeQR',false)
          return
        }
        this.stepTime--
      }, 1000)
    },
    // 结束倒计时
    stopCountDown() {
      if (timerId) {
        clearInterval(timerId)
      }
      this.stepTime = 3
    },
    getImageSrc(path) {
      return getImageUrl(path)
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch:{
    isShow (news,old) {
      if (news) {
        this.isShow = true
         this.startCountDown()
      } else {
         this.isShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
// /deep/ .an-dialog__content{
//   background: #ffffff;
// }
    .dialog {
      display: flex;
      flex-direction: column;
      align-items: center;
      /deep/ 
        .van-dialog{
          z-index: 2047;
          // height: 520px;
        // background: #292929;
        border-radius: 8px;
        .van-dialog__content{
         background: #ffffff;
        }
        }
        .dialog-card-title {
          padding:  10px 18px 10px 18px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
        }
        .line{
         width: 100%;
        height: 1px;
        opacity: 0.06;
        background: #000;
        }
        .box{
          display: flex;
          justify-content: center;
          // margin-top:1px;
          width: 100%;
          text-align: center;
        }
        .blindbox{
           width:100px;
          height: 150px;
          >img{
             display: inline-block;
             width:100%;
          height: 100%;
          }
        }
        .footerMessage{
          padding-bottom:20px;
           display: flex;
          justify-content: center;
          // margin-top:1px;
          width: 100%;
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color:gray;
        }
    }
</style>