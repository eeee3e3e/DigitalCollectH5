<template>
  <div class="app-edit-userinfo">
    <div class="app-edit-userinfo-main">
      <div class="app-edit-userinfo-card">
        <div class="app-edit-userinfo-card-header">
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
          <span>身份资料</span>
        </div>
        <div class="app-edit-userinfo-card-body">
          <CellGroup :border="false">
            <Cell is-link>
              <template>
                <div class="head-portrait">
                  <Uploader :deletable="false" :preview-full-image="false"
                            :max-count="1" :after-read="onAfterRead">
                    <img class="icon" :src="getImageUrl(form.UserHead)" alt="">
                  </Uploader>
                </div>
              </template>
              <template #title>
                <span>头像</span>
              </template>
            </Cell>
            <Cell is-link>
              <template>
                <input class="input-user-nick-name" v-model="form.NickName"/>
              </template>
              <template #title>
                <span>昵称</span>
              </template>
            </Cell>
            <Cell is-link>
              <template>
                <div class="user-phone-content">
                  <img class="icon" src="/static/images/edit-userinfo/user-phone-icon.png" alt="">
                  <span>{{ userInfo.MobileNo | filterMobileNo }}</span>
                </div>
              </template>
              <template #title>
                <span>手机号</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
      <div class="app-edit-userinfo-card">
        <div class="app-edit-userinfo-card-header">
          <div class="icon">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"
                 width="12px" height="12px">
              <g transform="matrix(1 0 0 1 -26 -419 )">
                <path
                    d="M 2.19717933825739 12  C 0.983705418901465 11.9999999432487  0 10.9475031176352  0 9.64918913052799  C 0 9.64918913052799  0 2.35171325123713  0 2.35171360620069  C 0 1.05339096599909  0.983712351123557 0.000902736728676246  2.19717933825741 0.000902736728676246  C 2.19717933825741 0.000902736728676246  9.80282076933833 0  9.80282066174261 0  C 11.0162945810985 0  12 1.05249564620846  12 2.35081086947201  C 12 2.35081086947201  12 9.64918914288955  12 9.64918913052799  C 12 10.9475117707296  11.0162876488765 12  9.80282066174261 12  C 9.80282066174261 12  2.1971794342994 12  2.19717933825739 12  Z M 2.19721407512433 10.915011079829  L 9.80285525085258 10.915011079829  C 10.4562633956055 10.9150111103874  10.9859544838458 10.3482828451254  10.9859544838458 9.64918698975248  C 10.9859544838458 9.64918698975248  10.9859544838458 4.34899362883891  10.9859200023316 4.34900814353938  L 1.01408030890187 4.34900814353938  L 1.01408029655778 9.64922584214617  C 1.01386982505283 10.3012241410426  1.47657851166021 10.8467399329867  2.08312945671268 10.9095861212089  C 2.08312945671268 10.9095861212089  2.19721407512433 10.915011079829  2.19721407512433 10.915011079829  Z M 9.91689851717967 1.09131530264642  C 9.91689851717967 1.09131530264642  9.80281389876802 1.08589034402632  9.80282076933833 1.08589782661659  L 2.19717949018015 1.08589782661659  C 1.54377134542723 1.08589785717504  1.01408025718692 1.65262606132018  1.01408025718692 2.35172191669307  C 1.01408025718692 2.35172191669307  1.01408025718692 3.2640188918312  1.01408025718692 3.2640188918312  L 10.9859199506166 3.2640188918312  L 10.9859199484463 2.3508102722725  C 10.9857096583345 1.6991580971507  10.5231259585356 1.15415531008688  9.91689851717967 1.09131530264642  Z M 4.43577391823622 5.91320395427948  C 4.30929321585904 5.78522098014093  4.30373010764921 5.57176768448278  4.42334860340096 5.43644317785305  C 4.55744088560916 5.30129667773599  4.77914651488064 5.28800256173929  4.91239228161458 5.42315012338196  L 6.02619586744255 6.56872092490113  L 7.14168978908394 5.42495859097488  C 7.27566653425767 5.29037948661693  7.48433335073616 5.29037948661693  7.61831010471127 5.42495865815903  C 7.74432403746918 5.55274261112714  7.7496595377211 5.76562974718252  7.63022694105781 5.90045484665171  C 7.63022694105781 5.90045484665171  6.84084522456438 6.71157774099964  6.84084522456438 6.71157774099964  C 6.84084522456438 6.71157774099964  7.18140911959611 6.71157774099964  7.18140911959611 6.71157774099964  C 7.36732438324638 6.71157774099964  7.51859240099918 6.8661887588143  7.51859240245611 7.05696716157649  C 7.5149079033194 7.25217478968625  7.36401540403603 7.40722587915724  7.18156509604958 7.40328377659552  C 7.18156509604958 7.40328377659552  6.36422508094722 7.40326051151516  6.36422508094722 7.40326051151516  L 6.36422508094722 7.84539531275885  C 6.36422508094722 7.84539531275885  7.18140812743454 7.84539531275885  7.18140812743454 7.84539531275885  C 7.36732339108481 7.84539531275885  7.51859140883762 8.00000633057351  7.51859140954454 8.1916884075651  C 7.51444039497004 8.38688491026784  7.36317792299489 8.54152312352193  7.18056299322024 8.537077303545  C 7.18056299322024 8.537077303545  6.3642245224549 8.537077303545  6.3642245224549 8.537077303545  L 6.36422453296827 9.49729462210871  C 6.360069613242 9.69220310038469  6.20922120289099 9.84672387878669  6.02704125000658 9.84268411990877  C 5.84486129868079 9.8467237675672  5.69401268036312 9.69220433657557  5.6898579686035 9.49729462214327  C 5.6898579686035 9.49729462214327  5.6898579686035 8.5370768104076  5.6898579686035 8.5370768104076  L 4.87267491348408 8.53707681057534  C 4.69082193196585 8.54061151309281  4.5404932303033 8.38623730574784  4.536336207803 8.19168731280985  C 4.536336207803 8.00000520257589  4.68675849446347 7.84539418476123  4.87267491348408 7.84539418476123  C 4.87267491348408 7.84539418476123  5.68985795997141 7.84539418476123  5.68985795997141 7.84539418476123  L 5.68985795997141 7.40325938351754  L 4.87267490004378 7.40325938377799  C 4.69049957019937 7.40678959904795  4.54003453483614 7.25187102553639  4.53633619436269 7.05696625572938  C 4.53633619436269 6.86709264221793  4.68675848102317 6.71157675796383  4.87267490004378 6.71157675796383  C 4.87267490004378 6.71157675796383  5.2132387950755 6.71157675796383  5.2132387950755 6.71157675796383  L 4.43577391823622 5.91320395427948  Z "
                    fill-rule="nonzero" fill="#aaaaaa" stroke="none" transform="matrix(1 0 0 1 26 419 )"/>
              </g>
            </svg>
          </div>
          <span>账户资料</span>
        </div>
        <div class="app-edit-userinfo-card-body">
          <CellGroup :border="false">
            <Cell>
              <template>
                <div class="chain-account">
                  <img class="icon" src="/static/images/edit-userinfo/chain-account-icon.png" alt="">
                  <p class="OpbChainClientAddress" v-html="userInfo.OpbChainClientAddress"></p>
                </div>
              </template>
              <template #extra>
                <div class="copy-icon" @click="doCopy(userInfo.OpbChainClientAddress)">
                  <img class="icon" src="/static/images/copy-icon.png" alt="">
                </div>
              </template>
              <template #title>
                <span>链上账户</span>
              </template>
            </Cell>
            <Cell>
              <template>
                <div class="ID">
                  <p class="OpbChainClientAddress" v-html="userInfo.ID"></p>
                </div>
              </template>
              <template #extra>
                <div class="copy-icon" @click="doCopy(userInfo.ID)">
                  <img class="icon" src="/static/images/copy-icon.png" alt="">
                </div>
              </template>
              <template #title>
                <span>平台账户ID</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
    <div class="app-edit-userinfo-footer">
      <button class="save" @click="onSave">保存资料</button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell, Notify, Uploader } from 'vant'
import { mapActions, mapGetters } from 'vuex'
import { fileApi, userApi } from '@/api'
import AppLoading from "@/utils/app-loading";
import getImageUrl from "@/utils/get-image-url";
import tip from "@/utils/tip";

export default {
  components: {
    CellGroup,
    Uploader,
    Cell
  },
  data() {
    return {
      form: {
        UserHead: undefined,
        NickName: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    // this.form.UserHead = this.userInfo.UserHead
    this.form = { ...this.userInfo }
  },
  methods: {
    ...mapActions(['REFRESH_USER_INFO']),

    getImageUrl(path) {
      return getImageUrl(path) || '/static/images/avatar.png'
    },

    // 文件读取完成后的回调函数
    onAfterRead(event) {
      AppLoading.showAppLoading()
      const formData = new FormData()
      formData.append('file', event.file)
      fileApi
          .uploadFile(formData, { path: '/Files/' })
          .then(result => {
            this.form.UserHead = result.Data
          })
          .finally(() => {
            AppLoading.closeAppLoading()
          })

      // this.form.UserHead = content
    },

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
    },

    onSave() {
      AppLoading.showAppLoading()
      const params = { ...this.form }
      userApi
          .editUserInfo(params)
          .then(async result => {
            await this.REFRESH_USER_INFO()
            tip('修改成功')
            this.$router.go(-1)
          })
          .finally(() => {
            AppLoading.closeAppLoading()
          })
    }
  }
}
</script>

<style scoped lang="less">
.app-edit-userinfo {
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

      .input-user-nick-name {
        background-color: transparent;
        outline: none;
        text-align: right;
        border: none;
      }

      .head-portrait {
        align-items: center;
        height: 50px;

        .icon {
          width: 100%;
          object-fit: cover;
        }

        ::v-deep {
          .van-uploader {
            width: 50px;
            height: 50px;

            .van-uploader__wrapper {

              width: 100%;
              height: 100%;

              .van-uploader__input-wrapper {
                width: 100%;
                height: 100%;
                max-height: 50px;
                overflow: hidden;
              }

              .van-uploader__upload {
                margin: 0;
              }
            }
          }
        }

        //.icon {
        //  width: 50px;
        //  object-fit: cover;
        //}


      }

      .user-phone-content {
        display: flex;
        padding-right: 12px;

        .icon {
          width: 12px;
          object-fit: cover;
          margin-right: 8px;
        }
      }

      .chain-account, .ID {
        width: 100%;
        display: flex;
        padding-right: 10px;
        justify-content: flex-end;

        .icon {
          width: 13px;
          object-fit: cover;
          margin-right: 8px;
        }

        p {
          //display: inline-block;
          width: calc(100% - 50px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }
      }

      .copy-icon {
        .icon {
          width: 16px;
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

    .save {
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
