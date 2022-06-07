<template>
  <div class="app-authentication">
    <div class="app-authentication-header">
      <div class="icon">
        <img src="/static/images/password/header-icon.png" alt="">
      </div>
      <div class="text">
        <p>账户密码将最大化保护您的财产安全， </p>
        <p>在藏品转赠时需要验证您的账户支付密码</p>
      </div>
    </div>
    <div class="app-authentication-main">
        <div></div>
         <img class="img" src="/static/images/password/lock.png" alt="">
    </div>
    <div class="app-authentication-footer">
      <div class="app-authentication-footer-content">
        <button class="submit"  @click="setPassword">设置密码
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  
  },
  methods: {
    setPassword () {
        this.$router.push('set-password')
      }
  },
}
</script>

<style scoped lang="less">
.app-authentication {
  &-header {
    padding: 102px 24px 0 24px;

    .icon {
      img {
        width: 192px;
        object-fit: cover;
      }
    }

    .text {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 22px;
      padding: 24px 0;
    }
  }

  &-main {
    margin-top:120px;
    text-align: center;
     box-sizing: border-box;
     position: relative;
    >div{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 155px;
      height: 155px;
      opacity: 0.04;
      border: 6px solid #ffffff;
      border-radius: 105px;
    }
    .img{
        width: 81px;
        height: 87px;
        // opacity: 1;
        // margin:30px 36px 38px 38px;
        position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      }
    

  }

  &-footer {
    width: 100%;
    margin: auto;
    margin-top: 250px;
    text-align: center;
    &-content {
      // padding: 20px 35px;
      box-sizing: border-box;

      .submit {
        text-align: center;
          width: 265px;
          height: 50px;
          background: linear-gradient(90deg,#ff9110, #fcb734);
          border-radius: 25px;
          box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.06); 
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #ffffff;
          border:none;
          line-height: 18px;
      }
    }
  }
}
</style>
