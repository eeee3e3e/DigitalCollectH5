<template>
  <div class="app-contact-us">
    <div class="app-contact-us-main">
      <div class="card-row">
        <div class="app-contact-us-card">
          <div class="app-contact-us-card-body">
            <div class="icon">
              <img :src="`${staticPath}/static/images/contact-us/contact-us-card-slot.png`" alt="">
            </div>
            <div class="into">
              <p>客服邮箱</p>
              <p class="desc">BD@citymeta.mobi</p>
            </div>
            <div class="right" @click="doCopy('BD@citymeta.mobi')">
              <img :src="`${staticPath}/static/images/copy-icon.png`" alt="">
            </div>
          </div>
        </div>
        <div class="app-contact-us-card">
          <div class="app-contact-us-card-body">
            <div class="icon">
              <img :src="`${staticPath}/static/images/contact-us/contact-us-card-slot.png`" alt="">
            </div>
            <div class="into">
              <p>商务合作</p>
              <p class="desc">wangjingfei@bjcitymeta.com</p>
            </div>
            <div class="right" @click="doCopy('wangjingfei@bjcitymeta.com')">
              <img :src="`${staticPath}/static/images/copy-icon.png`" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="FAQ">
<!--        <div class="FAQ-header">-->
<!--          <div class="left">-->
<!--            <div class="icon">-->
<!--              <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"-->
<!--                   width="4px" height="6px">-->
<!--                <g transform="matrix(1 0 0 1 -30 -363 )">-->
<!--                  <path-->
<!--                      d="M 1.37368408176089 2.01443172618027  L 1.37368420408822 1.84432982018556  C 1.37368420408822 1.61752541835806  1.43333333333352 1.39072217934382  1.5526319588061 1.33402107888695  C 1.67193021729669 1.22061911053585  1.7912289650966 1.16391777751632  2.02982474811382 1.16391777751632  C 2.2087725028317 1.16391777751632  2.32807100597695 1.22061876169187  2.44736828584893 1.27731974586742  C 2.56666654433952 1.39072171421852  2.6263160405668 1.50412414769492  2.6263160405668 1.67422628625228  C 2.6263160405668 1.78762825460338  2.56666691132151 1.95773178853666  2.44736828584893 2.07113282663715  C 2.44736828584893 2.07113282663715  1.73157849025069 3.0350492087775  1.73157849025069 3.0350492087775  C 1.6122802317601 3.1484511771286  1.55263073553282 3.26185361060501  1.55263073553282 3.37525464870549  C 1.55263073553282 3.48865661705659  1.49298160628752 3.60205905053299  1.49298160628752 3.77216118909035  C 1.49298160628752 3.77216118909035  1.49298160628752 4.33917103084585  1.49298160628752 4.33917103084585  L 2.56666568804823 4.33917103084585  C 2.56666568804823 4.33917103084585  2.56666568804823 3.82886228954723  2.56666568804823 3.82886228954723  C 2.56666568804823 3.6587589881766  2.62631481729352 3.54535678726285  2.68596394653882 3.43195574916237  C 2.68596394653882 3.43195574916237  3.40175374213705 2.52474046747889  3.40175374213705 2.52474046747889  C 3.58070149685493 2.29793606565138  3.70000000000018 2.01443172618027  3.70000000000018 1.67422512343902  C 3.70000000000018 1.22061748259728  3.52105224528231 0.823709779399146  3.16315795911983 0.596906540384909  C 2.80526367295735 0.370102138557407  2.4473681635216 0.200000000000045  1.97017537421387 0.200000000000045  C 1.49298258490614 0.200000000000045  1.13508707547039 0.370103301370672  0.77719278930791 0.596906540384909  C 0.478946531444782 0.937111980312897  0.300000000000182 1.27731858305415  0.300000000000182 1.73092622389589  C 0.300000000000182 1.73092622389589  0.300000000000182 2.01443172618027  0.300000000000182 2.01443172618027  L 1.37368408176089 2.01443172618027  Z M 2.5666665443394 5.70000000000004  L 1.4929824625787 5.70000000000004  L 1.4929824625787 4.73608361785968  L 2.5666665443394 4.73608361785968  L 2.5666665443394 5.70000000000004  Z "-->
<!--                      fill-rule="nonzero" fill="#aaaaaa" stroke="none" transform="matrix(1 0 0 1 30 363 )"/>-->
<!--                </g>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <span>常见问题</span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="FAQ-body">
          <Collapse v-model="actives" :border="false">
            <CollapseItem title="为什么要实名认证？" name="1">
              <p class="collapse-content">
                1、出于法律法规监管合规要求，在购买、兑换、转赠数字藏品前需要进行实名认证。<br/>
                2、实名认证是对用户资料真实性进行的验证审核,以便建立完善可靠的互联网信用基础。<br/>
                3、防范违法洗钱等行为出现。
              </p>
            </CollapseItem>
            <!--            <CollapseItem title="为什么要实名认证？" name="2">-->
            <!--              <p class="collapse-content">-->
            <!--                您好，给您带来的困扰我们深感抱歉。第一请确认“您输入的身份信息是否正确有效”；第二请确认“认证的手机号是本人在运营商实名过的运营商主号”，如以上两点确认之后仍有问题，我们将尽快为您排查原因。感谢您的支持和理解！-->
            <!--              </p>-->
            <!--            </CollapseItem>-->
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

      &-header {
        .left {
          display: flex;
          align-items: center;
          padding: 12px 0;

          .icon {
            margin-right: 6px;
            width: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #aaaaaa;
        }

      }

      &-body {

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
