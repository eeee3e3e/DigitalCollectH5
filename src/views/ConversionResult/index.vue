<template>
  <div class="app-conversion-result">

    <div class="app-conversion-result-header">
      <div class="app-conversion-result-header-body">
        <div class="icon">
          <img src="/static/images/conversion-result/header-icon.png" alt="">
        </div>
        <p class="text">恭喜您成功兑换藏品！</p>
      </div>
    </div>

    <div class="app-conversion-result-main">
      <div class="app-conversion-result-card">
        <div class="app-conversion-result-card-header">
          <div class="icon">
            <img src="/static/images/authentication-result/idCard-icon.png" alt="">
          </div>
          <span>藏品信息</span>
        </div>
        <div class="app-conversion-result-card-body">
          <CellGroup :border="false">
            <Cell>
              <template>
                <span v-html="formData.CommodityName"></span>
              </template>
              <template #title>
                <span>藏品名称</span>
              </template>
            </Cell>
            <Cell>
              <template>
                <span v-html="formData.BrandName"></span>
              </template>
              <template #title>
                <span>发行方</span>
              </template>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>


    <div class="app-conversion-result-footer">
      <div class="app-conversion-result-footer-content">
        <button class="submit common-save-button" @click="onToDetail">查看藏品</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'
import { goodsApi } from '@/api'
import { mapGetters } from "vuex";

export default {
  components: {
    CellGroup,
    Cell
  },
  data() {
    return {
      loading: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const routeQuery = this.$route.query
      const goodsId = routeQuery.id
      if (!goodsId) return
      this.loading = true
      const params = {
        userId: this.userInfo.ID,
        commodityDetailsID: goodsId
      }
      goodsApi
          .getMyCommodityDetails(params)
          .then(result => {
            this.formData = result.Data
          })
          .finally(() => {
            this.loading = false
          })

    },

    // 查看藏品
    onToDetail() {
      this.$router.replace('/city-meta/collection')
    }
  }
}
</script>

<style scoped lang="less">
.app-conversion-result {
  padding-top: 87px;
  padding-bottom: 20px;

  &-header {
    padding: 0 16px;
    box-sizing: border-box;

    &-body {
      padding-top: 47px;
      padding-bottom: 37px;
      background: #161616;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .icon {
        width: 135px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .text {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #aaaaaa;
        margin-top: 30px;
      }
    }
  }

  &-main {
    padding: 0 16px;
    box-sizing: border-box;
    margin-top: 20px;
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
    width: 100%;

    &-content {
      padding: 20px 35px;
      box-sizing: border-box;
    }
  }
}
</style>
