<template>
  <div class="app-home">
    <home-header/>
    <div class="app-home-main pub-content">
      <home-banner/>
      <div class="app-home-main-body">
        <div class="app-home-main-body-header">
          <div class="left">
            <img class="icon" :src="`${staticPath}/static/images/home/social-metasverse.png`" alt="">
            <p>发售藏品</p>
          </div>
          <div class="right">
            <img :src="`${staticPath}/static/images/home/sale-collection.png`" alt="">
          </div>
        </div>
        <div class="app-home-main-body-content">
          <PullRefresh v-model="refreshing" @refresh="onRefresh">
            <Empty v-if="!dataSource.length && !loading && finished && !varAwait" description="暂无数据 ~"
                   :image="`${staticPath}/static/images/collection/not-data-slot.png`"/>
            <List
                v-else
                v-model="loading"
                :offset="200"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadMore"
            >
              <home-card v-for="item of dataSource" :key="item.ID" :goods="item" @click="onToDetail(item)"/>

              <template #loading></template>
              <template #error></template>
              <template #finished>
                <div class="finished">
                  <img :src="`${staticPath}/static/images/home/cry-icon.png`" alt="" class="icon">
                  <span>已经到底啦 ~ ~</span>
                </div>
              </template>
            </List>
          </PullRefresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PullRefresh, List, Empty } from 'vant'
import HomeBanner from './components/HomeBanner'
import HomeHeader from './components/HomeHeader'
import HomeCard from './components/HomeCard'
import { goodsApi } from '@/api'

export default {
  components: {
    HomeBanner,
    HomeCard,
    HomeHeader,
    PullRefresh,
    Empty,
    List
  },
  data() {
    return {
      loading: false,
      refreshing: false,
      varAwait: false,
      finished: false,
      dataSource: [],
      collectStatus: '2',
      pagination: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },

  created() {
    console.log(this)
    this.getDataSource()
  },

  methods: {

    // 跳转详情
    onToDetail(row) {
      // this.$router.push(`/city-meta/collection/${row.ID}&${row.HomeStatus}`)
      this.$router.push({
        path: '/city-meta/collection_s',
        query: {
          id: row.ID,
          homeStatus: row.HomeStatus,
          collectStatus: '2'
        }
      })
    },

    // 获取数据
    getDataSource(isClear = false) {
      return new Promise((resolve) => {
        if (this.varAwait) return resolve()
        this.varAwait = true
        const { pagination } = this
        goodsApi
            .getGoodsListByPage({
              pageIndex: pagination.PageIndex,
              pageSize: pagination.PageSize
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
              this.varAwait = false
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

.app-home {
  padding-bottom: 20px;

  &-main {
    &-body {
      margin-top: 28px;

      &-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .left {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          text-align: justify;
          color: #ffffff;
          letter-spacing: 1px;

          .icon {
            width: 25px;
            margin-right: 6px;
            object-fit: cover;
          }

        }

        .right {
          width: 114px;
          display: flex;
          align-items: flex-end;
          //height: 22px;

          img {
            width: 100%;
            object-fit: cover;
          }
        }
      }

      &-content {
      }
    }
  }
}

</style>
