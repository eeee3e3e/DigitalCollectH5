<template>
  <div class="app-security-settings">
    <div class="app-security-settings-main">
      <div class="app-security-settings-card">
        <div class="app-security-settings-card-header">
          <div class="icon">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"
                 width="12px" height="12px">
              <g transform="matrix(1 0 0 1 -26 -181 )">
                <path
                    d="M 11.7329875725441 6.62694618825526  C 12.0887627342149 6.26840526391447  12.0887627342149 5.69155917999501  11.7344338130388 5.33301825565422  L 10.5890113413179 4.20968640802198  C 10.5890113413179 4.20968640802198  10.5890113413179 2.79287146506226  10.5890113413179 2.79287146506226  C 10.5875651008232 2.28831185782451  10.7379741122613 1.37750225163609  10.236128660636 1.37605652210254  C 10.236128660636 1.37605652210254  7.41306721518185 1.37605652210254  7.41306721518185 1.37605652210254  C 7.41306721518185 1.37605652210254  6.70730185381854 0.314891044416299  6.70730185381854 0.314891044416299  C 6.35152669214767 -0.0407584208571734  5.7122883935358 -0.12894792240877  5.35651323186448 0.226701542864703  C 5.35651323186448 0.226701542864703  4.59000576972812 1.37750225163609  4.59000576972812 1.37750225163609  C 4.59000576972812 1.37750225163609  2.47126344514299 1.37750225163609  2.47126344514299 1.37750225163609  C 1.96797175302345 1.37894798116963  1.3880293146899 1.77507787338504  1.38658307419519 2.2796374806228  C 1.38658307419519 2.2796374806228  1.38658307419519 4.13450847227296  1.38658307419519 4.13450847227296  C 1.38658307419519 4.13450847227296  0.265746690882224 5.33446398518799  0.265746690882224 5.33446398518799  C -0.0885822302939232 5.69155917999501  -0.0885822302939232 6.26985099344802  0.265746690882224 6.62694618825526  C 0.265746690882224 6.62694618825526  1.38658307419519 7.84280472604019  1.38658307419519 7.84280472604019  C 1.38658307419519 7.84280472604019  1.38658307419519 9.69767571769034  1.38658307419519 9.69767571769034  C 1.3880293146899 10.2022353249281  1.61508907234156 10.5839079218072  2.11838076446156 10.5853536513407  C 2.11838076446156 10.5853536513407  4.23567684855198 10.5853536513407  4.23567684855198 10.5853536513407  C 4.23567684855198 10.5853536513407  5.35506699137022 11.7332629010448  5.35506699137022 11.7332629010448  C 5.71084215304109 12.0889123663185  6.2878921103852 12.0889123663185  6.64366727205652 11.7332629010448  C 6.64366727205652 11.7332629010448  7.76450365536903 10.5853536513407  7.76450365536903 10.5853536513407  C 7.76450365536903 10.5853536513407  9.52891705877801 10.5853536513407  9.52891705877801 10.5853536513407  C 10.0322087508976 10.5839079218072  10.5861188603285 10.0273020513587  10.5875651008232 9.52274244412092  C 10.5875651008232 9.52274244412092  10.5875651008232 7.75172376542127  10.5875651008232 7.75172376542127  C 10.5875651008232 7.75172376542127  11.7329875725441 6.62694618825526  11.7329875725441 6.62694618825526  Z M 6.93291537097593 4.13306274273941  L 9.24400768134228 4.13306274273941  L 6.00876769492834 8.76951735709849  L 2.77352770851394 4.13306274273941  L 5.08462001888029 4.13306274273941  L 6.0000902519605 6.89440615197736  L 6.93291537097593 4.13306274273941  Z "
                    fill-rule="nonzero" fill="#aaaaaa" stroke="none" transform="matrix(1 0 0 1 26 181 )"/>
              </g>
            </svg>
          </div>
          <span>身份设置</span>
        </div>
        <div class="app-security-settings-card-body">
          <CellGroup :border="false">
            <Cell is-link @click="onToAuthentication">
              <template v-if="userInfo.IsIdentityVerify">
                <div class="certified">
                  <img class="icon" src="/static/images/security-settings/certified.png" alt="">
                  <span>已认证</span>
                </div>
              </template>
              <template #title>
                <span>实名设置</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
      <div class="app-security-settings-card">
        <div class="app-security-settings-card-header">
          <div class="icon">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"
                 width="12px" height="12px">
              <g transform="matrix(1 0 0 1 -26 -289 )">
                <path
                    d="M 2.39913280193468 1.7993358184176  L 0 1.7993358184176  L 0 3.59867163683498  L 10.2006562050783 3.59867163683498  L 10.2006562050783 1.7993358184176  L 7.80152340314362 1.7993358184176  L 7.80152340314362 0  L 6.59760934594533 0  L 6.59760934594533 1.7993358184176  L 3.59869920290203 1.7993358184176  L 3.59869920290203 0  L 2.39913280193468 0  L 2.39913280193468 1.7993358184176  Z M 0 7.19735499236822  L 0 4.19845805543969  L 2.9989101430433 4.19845805543969  L 2.9989101430433 7.19735499236822  L 0 7.19735499236822  Z M 6.05867361382843 7.1973571918179  C 6.05867361382843 7.1973571918179  3.59869706216159 7.1973571918179  3.59869706216159 7.1973571918179  L 3.59869706216159 4.19846025488937  L 6.59760720520489 4.19846025488937  L 6.59760930498624 5.04162665082004  C 6.21839993165622 5.47207905023447  6.00565891696806 6.02396880497054  5.99782611409637 6.59757663256232  C 5.98767567273489 6.79943003965513  6.0081913484255 7.00165492948554  6.05867361382843 7.1973571918179  Z M 2.9989101430433 7.79713789536345  L 2.9989101430433 10.796034832292  L 0 10.796034832292  L 0 7.79713789536345  L 2.9989101430433 7.79713789536345  Z M 3.59869398675164 7.79713932680352  L 6.29772131861546 7.79713932680352  L 6.59760881729517 8.15787601790407  C 5.51954593141772 8.68721196580873  4.71473382558679 9.6466780489236  4.3810189833066 10.8003839008175  C 4.3810189833066 10.8003839008175  3.59869398675164 10.8003839008175  3.59869398675164 10.8003839008175  L 3.59869398675164 7.79713932680352  Z "
                    fill-rule="nonzero" fill="#aaaaaa" stroke="none" transform="matrix(1 0 0 1 26 289 )"/>
              </g>
            </svg>
          </div>
          <span>身份设置</span>
        </div>
        <div class="app-security-settings-card-body">
          <CellGroup :border="false">
            <Cell is-link>
              <template #title>
                <span>修改手机号</span>
              </template>
            </Cell>
            <!-- <Cell is-link to="/city-meta/pay-password">
              <template #title>
                <span>设置支付密码</span>
              </template>
            </Cell> -->
            <Cell is-link>
              <template #title>
                <span>修改登录密码</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
    <div class="app-security-settings-footer">
      <button class="logout" @click="onLogout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    CellGroup,
    Cell
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapMutations(['SET_AUTH', 'DEL_USER_INFO']),
    // 退出登录
    onLogout() {
      this.DEL_USER_INFO()
      this.$router.replace('/city-meta/verification-code-login')
    },
    // 前往认证
    onToAuthentication() {
      if (this.userInfo.IsIdentityVerify) {
        this.SET_AUTH({
          Name: this.userInfo.RealName
        })
        this.$router.push('/city-meta/authentication-result')
        return
      }
      this.$router.push('/city-meta/authentication')
    }
  }
}
</script>

<style scoped lang="less">
.app-security-settings {
  padding-top: 80px;
  padding-bottom: 90px;

  &-main {
    padding: 0 16px;
    box-sizing: border-box;
  }

  &-card {
    &-header {
      padding: 14px 0;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #aaaaaa;
      display: flex;


      .icon {
        margin-right: 6px;
        width: 12px;


        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }

    &-body {

      .certified {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #eece76;

        .icon {
          margin-right: 5px;
          width: 15px;
          object-fit: cover;
        }
      }

      ::v-deep {
        .van-cell-group {
          border-radius: 8px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
          overflow: hidden;
          padding: 0 18px;
          background-color: #161616;

          .van-cell {
            padding: 20px 0;
            line-height: 1;
            align-items: center;
            background-color: transparent;
            border-bottom: 1px solid #222222;

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
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px 36px;
    box-sizing: border-box;
    width: 100%;

    .logout {
      width: 100%;
      height: 50px;
      background: linear-gradient(90deg, #3487ed, #5484ff);
      border-radius: 25px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
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
}
</style>
