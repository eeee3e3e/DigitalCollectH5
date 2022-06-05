<template>
  <div class="app-my-center-cell">
    <CellGroup :border="false">
      <Cell is-link to="/city-meta/invite-friends">
        <template #title>
          <img class="app-my-center-cell-icon" src="/static/images/my-center/invite.png" alt="" width="35" height="37">
          <span style="width: 90%;display: flex;justify-content: space-between;align-items: center;">
            <i>邀请好友</i><i style="font-size: 12px; color: #9bc4ff" v-if="isLogin">已邀请 {{TotalCount}} 人</i>
          </span>
        </template>
      </Cell>
      <Cell is-link to="/city-meta/about-us">
        <template #title>
          <img class="app-my-center-cell-icon" src="/static/images/my-center/about-us-icon.png" alt="">
          <span>关于我们</span>
        </template>
      </Cell>
      <Cell is-link to="/city-meta/contact-us">
        <template #title>
          <img class="app-my-center-cell-icon" src="/static/images/my-center/customer-service-icon.png" alt="">
          <span>联系我们</span>
        </template>
      </Cell>
      <Cell is-link to="/city-meta/security-settings">
        <template #title>
          <img class="app-my-center-cell-icon" src="/static/images/my-center/security-settings-icon.png" alt="">
          <span>安全设置</span>
        </template>
      </Cell>
    </CellGroup>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
import { inviteApi } from "@/api"
import { mapGetters } from 'vuex'
import tip from '@/utils/tip'

export default {
  components: {
    Cell,
    CellGroup
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      TotalCount: 0,
      isLogin: false
    }
  },
  mounted(){
    debugger
    // console.log(this.userInfo);
    // console.log(JSON.stringify(this.userInfo))
    this.isLogin = !JSON.stringify(this.userInfo) == '{}'
    if(JSON.stringify(this.userInfo) == '{}'){
      tip('请登录后再邀请')
      this.isLogin = false
    } else {
      console.log('已登录')
      this.isLogin = true
    }
  },
  methods: {

    getDataSource() {
      return new Promise((resolve) => {
        const params = {
          pageIndex: 1,
          pageSize: 2,
          userId: this.userInfo.ID
        }
        inviteApi.getMyRecmmendRecordList(params).then(result => {
          this.TotalCount = result.TotalCount
        })
      })
    },
  }
}
</script>

<style scoped lang="less">
.app-my-center-cell {

  &-icon {
    width: 18px;
    height: 18px;
    margin-right: 19px;
  }

  ::v-deep {
    .van-cell-group {
      background-color: transparent;

      .van-cell {
        background-color: #161616;
        padding: 20px 18px;
        line-height: 1;
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
        margin-bottom: 12px;

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
</style>
