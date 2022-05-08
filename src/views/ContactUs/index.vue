<template>
  <div class="app-contact-us">
    <div class="app-contact-us-main">
      <div class="card-row">
        <div class="app-contact-us-card">
          <div class="app-contact-us-card-body">
            <div class="icon">
              <img src="/static/images/contact-us/contact-us-card-slot.png" alt="">
            </div>
            <div class="into">
              <p>客服邮箱</p>
              <p class="desc">BD@citymeta.mobi</p>
            </div>
            <div class="right" @click="doCopy('BD@citymeta.mobi')">
              <img src="/static/images/copy-icon.png" alt="">
            </div>
          </div>
        </div>
        <div class="app-contact-us-card">
          <div class="app-contact-us-card-body">
            <div class="icon">
              <img src="/static/images/contact-us/contact-us-card-slot.png" alt="">
            </div>
            <div class="into">
              <p>商务合作</p>
              <p class="desc">wangjingfei@bjcitymeta.com</p>
            </div>
            <div class="right" @click="doCopy('wangjingfei@bjcitymeta.com')">
              <img src="/static/images/copy-icon.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="FAQ">
        <div class="FAQ-header"></div>
        <div class="FAQ-body">
          <Collapse v-model="actives" :border="false">
            <CollapseItem title="为什么要实名认证？" name="1">
              <p class="collapse-content">
                您好，给您带来的困扰我们深感抱歉。第一请确认“您输入的身份信息是否正确有效”；第二请确认“认证的手机号是本人在运营商实名过的运营商主号”，如以上两点确认之后仍有问题，我们将尽快为您排查原因。感谢您的支持和理解！
              </p>
            </CollapseItem>
            <CollapseItem title="为什么要实名认证？" name="2">
              <p class="collapse-content">
                您好，给您带来的困扰我们深感抱歉。第一请确认“您输入的身份信息是否正确有效”；第二请确认“认证的手机号是本人在运营商实名过的运营商主号”，如以上两点确认之后仍有问题，我们将尽快为您排查原因。感谢您的支持和理解！
              </p>
            </CollapseItem>
          </Collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Notify } from 'vant'

export default {
  components: {
    Collapse,
    CollapseItem
  },
  data() {
    return {
      actives: []
    }
  },
  methods: {
    // 复制
    doCopy(message) {
      this
          .$copyText(message)
          .then(result => {
            Notify({
              message: '复制成功'
            })
          })
          .catch(error => {
          })
    }
  }
}
</script>

<style scoped lang="less">
.app-contact-us {
  padding-top: 87px;
  padding-bottom: 20px;

  &-main {
    padding: 0 16px;


    .FAQ {
      background: #161616;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);

      .collapse-content {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #eeeeee;
        line-height: 20px;
      }

      ::v-deep {
        .van-collapse {

          .van-cell {
            background-color: transparent;
            padding: 20px 18px;
            line-height: 1;

            &::after {
              display: none;
            }

            .van-cell__title {
              font-size: 16px;
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
              text-align: left;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }

            .van-cell__value {
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #666666;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            }
          }
        }
      }
    }
  }

  &-card {
    padding: 16px 20px;
    box-sizing: border-box;
    background: #161616;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
    margin-bottom: 14px;

    &-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;

      .icon {
        width: 40px;
        height: 40px;
        //background: linear-gradient(180deg, #414141, #282828);
        border-radius: 20px;
        margin-right: 14px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .into {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;

        p {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: justify;
          color: #666666;
        }

        p.desc {
          font-size: 15px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
          padding-top: 6px;
        }
      }

      .right {
        width: 15px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
