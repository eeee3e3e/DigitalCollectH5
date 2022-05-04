<template>
  <div class="app-collection">
    <collection-header :total-count="pagination.TotalCount"/>
    <div class="app-collection-main pub-content">
      <collection-for-entry/>
      <div class="app-collection-main-body">
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <Empty v-if="!dataSource.length && !loading && finished && !varAwait" description="您还没获得数字藏品 ~"
                 image="/static/images/collection/not-data-slot.png"/>
          <List v-else
                v-model="loading"
                :offset="200"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadMore"
          >

            <div class="card">
              <div v-for="item of dataSource" :key="item.ID" class="card-item" @click ="goTocollection(item)">
                <div class="card-item-view">
                  <div class="card-item-view-body">
                    <base-image :src="getImageUrl(item.FrontImage)"
                                width="100%"
                                fit="cover">
                      <template v-slot:loading>
                        <Loading type="spinner" size="20"/>
                      </template>
                    </base-image>
                  </div>
                </div>
                <div class="card-item-info">
                  <div class="card-item-info-body">
                    <div class="card-item-info-body-top">
                      <p>JISHADGIN #0001/1000</p>
                    </div>
                    <p class="card-item-info-body-title" v-html="item.CommodityName"></p>
                    <p class="card-item-info-body-source" v-html="item.BrandName"></p>
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
    </div>
  </div>
</template>

<script>
import CollectionHeader from './components/CollectionHeader'
import CollectionForEntry from './components/CollectionForEntry'
import { Empty, PullRefresh, List, Image, Loading } from 'vant'
import { goodsApi } from '@/api'
import { mapGetters } from 'vuex'
import getImageUrl from "@/utils/get-image-url";

export default {
  components: {
    BaseImage: Image,
    CollectionHeader,
    CollectionForEntry,
    Empty,
    PullRefresh,
    Loading,
    List
  },
  data() {
    return {
      loading: false,
      refreshing: false,
      varAwait: false,
      finished: false,
      pagination: {
        PageIndex: 1,
        PageSize: 10,
        TotalCount: 0
      },
      dataSource: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created() {
    this.getDataSource()
  },
  methods: {
    // 获取列表数据
    getDataSource(isClear = false) {
      const { pagination, userInfo } = this
      if (this.varAwait) return
      this.varAwait = true
      const params = {
        userId: userInfo.ID,
        pageIndex: pagination.PageIndex,
        pageSize: pagination.PageSize
      }
      goodsApi
          .getMyGoodsDetailsList(params)
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
            this.varAwait = false
            this.loading = false
          })
    },
    goTocollection (item) {
      this.$router.push({
        path: '/city-meta/collection_s',
        query: {
          userId: this.userInfo.ID,
          commodityDetailsID: item.CommodityDetailsID,
          collectStatus: '1' // 我的藏品明细标识
        }
      })
    },
    // 刷新
    async onRefresh() {
      this.finished = false
      this.loading = true
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
    },

    // 加载图片资源
    getImageUrl(path) {
      return getImageUrl(path)
    }
  }
}
</script>

<style scoped lang="less">
.app-collection {

  ::v-deep {
    .van-empty__image {
      height: auto;
    }
  }

  &-main {
    &-body {
      .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        //margin-top: 24px;
        flex-wrap: wrap;
        padding-top: 4px;

        &-item {
          margin-top: 20px;
          width: 50%;
          //padding: 20px;
          padding-right: 13px;
          box-sizing: border-box;

          &:nth-of-type(2n) {
            padding-right: 0;
            padding-left: 13px;
          }

          &-view {
            padding: 10px;
            box-sizing: border-box;
            background-image: url(/public/static/images/collection/card-background.png);
            background-position: 0 0;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 150px;

            &-body {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              //background-color: #000000;
              img {
                width: 100%;
                object-fit: cover;
              }
            }
          }

          &-info {
            position: relative;
            background-image: url(/public/static/images/collection/card-info-top-background.png);
            background-position: 0 0;
            background-size: 100%;
            background-repeat: no-repeat;
            margin-top: 8px;
            padding-bottom: 8px;

            &-body {
              padding-top: 14px;

              &-top {
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100%;
                background-repeat: no-repeat;
                height: 16px;

                p {
                  width: 100%;
                  padding: 0 3px 0 15px;
                  box-sizing: border-box;
                  font-size: 12px;
                  font-family: PingFangSC, PingFangSC-Regular;
                  font-weight: 400;
                  color: #716249;
                  line-height: 15px;
                  height: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  transform: scale(0.9);
                  text-align: left;
                }
              }

              &-title {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Medium;
                font-weight: 500;
                text-align: justify;
                color: #ffffff;
                margin-top: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              &-source {
                margin-top: 6px;
                font-size: 11px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: justify;
                color: rgba(255, 255, 255, .4);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
