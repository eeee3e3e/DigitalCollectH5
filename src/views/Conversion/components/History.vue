<template>
  <div>
    <PullRefresh v-model="refreshing" @refresh="onRefresh" style="min-height: 20vh;">
      <Empty v-if="!dataSource.length && !loading && finished" description="您还没有历史兑换记录 ~"
             image="/static/images/collection/not-data-slot.png"/>
      <List
          v-else
          v-model="loading"
          :offset="200"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadMore"
      >

        <div class="card-main">
          <div class="app-collection-for-entry" v-for="item of dataSource" :key="item.ID"
               @click="onToConversion(item)">
            <div class="app-collection-for-entry-body">
              <div class="icon">
                <img :src="getImageUrl(item.CommodityFrontImage)" alt="">
              </div>
              <div class="into">
                <p v-html="item.CommodityName"></p>
                <p class="desc" v-html="item.CommodityExchangesDateTime"></p>
              </div>
              <div class="right">
                <img src="/static/images/right-icon.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <template #loading></template>
        <template #error></template>
        <template #finished>
          <div class="finished">
            <img src="/static/images/home/cry-icon.png" alt="" class="icon">
            <span>已经到底啦 ~ ~</span>
          </div>
        </template>
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { BaseReuseCard } from '@/components'
import { PullRefresh, List, Empty } from 'vant'
import { goodsApi } from "@/api";
import { mapGetters } from "vuex";
import getImageUrl from "@/utils/get-image-url";

export default {
  components: {
    BaseReuseCard,
    PullRefresh,
    Empty,
    List
  },
  data() {
    return {
      loading: false,
      refreshing: false,
      finished: false,
      dataSource: [],
      pagination: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getDataSource()
  },
  methods: {
    getImageUrl: getImageUrl,
    onToConversion(item) {
      this.$router.push({
        path: '/city-meta/collection_s',
        query: {
          userId: this.userInfo.ID,
          commodityDetailsID: item.CommodityDetailsID,
          collectStatus: '1' // 我的藏品明细标识
        }
      })
    },

    // 获取数据
    getDataSource(isClear = false) {
      return new Promise((resolve) => {
        const { pagination } = this
        goodsApi
            .getMyExchangesRecordList({
              pageIndex: pagination.PageIndex,
              pageSize: pagination.PageSize,
              userId: this.userInfo.ID
            })
            .then(result => {
              const data = result.Data || []
              if (isClear) {
                this.dataSource = data
              } else {
                this.dataSource.push(...data)
              }

              this.finished = result.TotalCount === 0 ? true : result.TotalCount < (result.PageIndex * result.PageSize)
            })
            .finally(() => {
              this.finished = true
              this.loading = false
              resolve()
            })
      })
    },

    // 刷新
    async onRefresh() {
      this.pagination.PageSize = 10
      this.pagination.PageIndex = 1
      await this.getDataSource(true)
      this.refreshing = false
    },

    // 加载更多
    async onLoadMore() {
      this.pagination.PageSize = 10
      this.pagination.PageIndex++
      await this.getDataSource()
    }
  }
}
</script>

<style scoped lang="less">
.card-main {

  .app-collection-for-entry {
    padding: 16px 20px;
    box-sizing: border-box;
    background: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
    margin-bottom: 20px;

    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }

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
          font-size: 15px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
        }

        p.desc {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: justify;
          color: #666666;
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
