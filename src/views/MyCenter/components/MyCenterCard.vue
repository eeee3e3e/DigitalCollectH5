<template>
  <div class="app-my-center-card">
    <div class="user-card">
      <div class="user-card-info">
        <div class="user-card-info-avatar">
          <base-image
              width="100%"
              height="100%"
              fit="cover"
              :src="userAvatar"
          />
        </div>
        <div class="user-card-info-body">
          <div class="user-card-info-body-left">
            <template v-if="!hasUserInfo">
              <p class="user-name">登录城市数藏</p>
              <p class="user-login-entry" @click="onToLogin">登录后查看个人藏品</p>
            </template>
            <template v-else>
              <p class="user-name" v-html="userInfo.NickName">登录城市数藏</p>
              <template>
                <p class="user-desc">兑换藏品前，请先 <span class="real-name" @click="onToAuthentication">实名认证</span></p>
              </template>
<!--              <template>-->
<!--                <p class="user-name">登录城市数藏</p>-->
<!--                <p class="user-desc">兑换藏品前，请先 <span class="real-name" @click="onToAuthentication">实名认证</span></p>-->
<!--              </template>-->
            </template>
          </div>
          <div class="user-card-info-body-right" @click="onToEditUserInfo">
            <span>编辑</span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-card-grid">
      <Grid :column-num="4" :border="false">
        <GridItem text="藏品合成" @click="onShowUnderDevelopmentTip">
          <template #icon>
            <img class="user-card-grid-item-icon" src="/static/images/my-center/obligation-icon.png" alt="">
          </template>
        </GridItem>
        <GridItem text="转赠记录" @click="onShowUnderDevelopmentTip">
          <template #icon>
            <img class="user-card-grid-item-icon" src="/static/images/my-center/turn-records-icon.png" alt="">
          </template>
        </GridItem>
        <GridItem text="我的权益" @click="onShowUnderDevelopmentTip">
          <template #icon>
            <img class="user-card-grid-item-icon" src="/static/images/my-center/my-dream-icon.png" alt="">
          </template>
        </GridItem>
        <GridItem text="我的消息" @click="onShowUnderDevelopmentTip">
          <template #icon>
            <img class="user-card-grid-item-icon" src="/static/images/my-center/my-message-icon.png" alt="">
          </template>
        </GridItem>
      </Grid>
    </div>
  </div>
</template>

<script>
import { Image, Grid, GridItem } from 'vant'
import { mapGetters } from 'vuex'
import getImageUrl from "@/utils/get-image-url";
import underDevelopmentTip from '@/utils/under-development-tip'

export default {
  components: {
    BaseImage: Image,
    Grid,
    GridItem
  },
  computed: {
    ...mapGetters(['hasUserInfo', 'userInfo']),
    userAvatar() {
      return getImageUrl(this.userInfo.UserHead) ?? '/static/images/avatar.png'
    }
  },
  methods: {
    // 编辑信息
    onToEditUserInfo() {
      this.$router.push('/city-meta/edit-userinfo')
    },

    // 前往登录页面
    onToLogin() {
      this.$router.push('/city-meta/verification-code-login')
    },

    // 实名认证页面
    onToAuthentication() {
      this.$router.push('/city-meta/authentication')
    },

    onShowUnderDevelopmentTip() {
      underDevelopmentTip()
    }
  }
}
</script>

<style scoped lang="less">
.app-my-center-card {
  padding: 0 24px;
  box-sizing: border-box;

  .user-card {
    padding-top: 36px;

    &-tips {
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
    }

    &-info {
      display: flex;
      align-items: center;

      &-avatar {
        width: 48px;
        height: 48px;
        margin-right: 14px;
        border-radius: 50%;
        overflow: hidden;
      }

      &-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;

        &-left {
          flex: 1;

          .user-name {
            font-size: 18px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: #ffffff;
          }

          .user-login-entry {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #91B3F7;
            margin-top: 10px;
          }

          .user-desc {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #666666;
            margin-top: 10px;

            .real-name {
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #EECE76;
            }
          }
        }

        &-right {
          width: 64px;
          height: 26px;
          //opacity: 0.1;
          background-color: rgba(255, 255, 255, 0.1);
          //background: #ffffff;
          border-radius: 15px;
          text-align: center;
          line-height: 26px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }

    &-grid {
      padding: 40px 0;

      &-item {
        &-icon {
          width: 20px;
          object-fit: cover;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
