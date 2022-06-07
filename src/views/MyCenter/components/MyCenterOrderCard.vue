<template>
  <div class="app-my-center-order-card">
    <CellGroup :border="false">
      <Cell is-link>
        <template #title>
          <span>我的订单</span>
        </template>
        <template>
          <div class="van-cell__extra">
            <span>全部订单</span>
          </div>
        </template>
      </Cell>
    </CellGroup>
    <Grid :column-num="3" :border="false">
      <GridItem icon="photo-o" text="待付款" @click="onShowUnderDevelopmentTip">
        <template #icon>
          <img class="app-my-center-order-card-grid-icon" :src="`${staticPath}/static/images/my-center/obligation-icon.png`" alt="">
        </template>
      </GridItem>
      <GridItem icon="photo-o" text="已付款" @click="onShowUnderDevelopmentTip">
        <template #icon>
          <img class="app-my-center-order-card-grid-icon" :src="`${staticPath}/static/images/my-center/await-pay.png`" alt="">
        </template>
      </GridItem>
      <GridItem icon="photo-o" text="已取消" @click="onShowUnderDevelopmentTip">
        <template #icon>
          <img class="app-my-center-order-card-grid-icon" :src="`${staticPath}/static/images/my-center/canceled-order-icon.png`" alt="">
        </template>
      </GridItem>
    </Grid>
  </div>
</template>

<script>
import { Cell, CellGroup, Grid, GridItem } from 'vant'
import underDevelopmentTip from "@/utils/under-development-tip";

export default {
  components: {
    Cell,
    CellGroup,
    Grid,
    GridItem
  },
  methods: {
    onShowUnderDevelopmentTip() {
      underDevelopmentTip()
    }
  }
}
</script>

<style scoped lang="less">
.app-my-center-order-card {
  background-color: #161616;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
  margin-bottom: 12px;
  overflow: hidden;

  &-grid-icon {
    width: 20px;
    height: 20px;
    object-fit: cover;
    margin-bottom: 12px;
  }

  ::v-deep {
    .van-cell-group {
      background-color: transparent;

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

</style>
