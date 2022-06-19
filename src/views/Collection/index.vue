<template>
  <div class="app-collection">
    <collection-header :total-count="Total"/>
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
              <div v-for="item of dataSource" :key="item.ID" class="card-item" @click="goTocollection(item)">
                <div class="card-item-view">
                  <div class="card-item-view-body">
                    <base-image :src="getImageUrl(item.FrontImage)"
                                width="100%"
                                fit="cover">
                      <template v-slot:loading>
                        <Loading type="spinner" size="20"/>
                      </template>
                    </base-image>
                    <img v-if="item.CommodityStatus=== 'chaining' && Number(item.CollectionCount)<=5" class="bg-icon ready" src="/static/images/collection/slz.png" alt="">
                    <img v-if="item.CommodityStatus=== 'chained' && Number(item.CollectionCount)<=5" class="bg-icon ready" src="/static/images/collection/ready.png" alt="">
                    <img v-if="item.CommodityStatus=== 'allow-give' && Number(item.CollectionCount)<=5" class="bg-icon ready" src="/static/images/collection/kzz.png" alt="">
                    <span  class="bg-icons readys" v-if="Number(item.CollectionCount)>5">{{Number(item.CollectionCount) >99 ?  '99+' : 'x'+ item.CollectionCount}}</span>
                  </div>
                   <img v-if="Number(item.CollectionCount)>5" class="bg-icon-size bgSzie" src="/static/images/collection/cd.png" alt="" />
                </div>
                <div class="card-item-info">
                  <div class="card-item-info-body" v-if="Number(item.CollectionCount)<=5">
                    <div class="card-item-info-body-top">
                      <!--                      //修改为 12位，左右布局-->
                      <p>{{ item.CommodityCode | filterCommodityID }}</p>
                      <p> #{{ item.CommodityNo }}/{{ item.LimitNum }}</p>
                    </div>
                    <p class="card-item-info-body-title" v-html="item.CommodityName"></p>
                    <p class="card-item-info-body-source" v-html="item.BrandName"></p>
                  </div>
                  <!-- //// -->
                   <div class="card-item-info-body" v-if="Number(item.CollectionCount)>5">
                    <div class="card-item-info-body-name">
                      <p v-html="item.CommodityName"></p>
                    </div>
                    <p class="card-item-info-body-title" style="color:#8DB1FF;font-size:13px;">藏品数量 x{{item.CollectionCount}}</p>
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
      Total:0,
      dataSource: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo','hasUserInfo']),
  },
  created() {
    if (this.hasUserInfo) {
       this.getDataSource()
    }
   
  },
  methods: {
    // 获取列表数据
    getDataSource(isClear = false) {
      const { pagination, userInfo } = this
      if (this.varAwait) return
      this.varAwait = true
      this.loading = true
      const params = {
        userId: userInfo.ID,
        pageIndex: pagination.PageIndex,
        pageSize: pagination.PageSize
      }
      goodsApi
          .GetMyDrawerCommodityDetailsList(params)
          .then(result => {
            const data = result.Data || []
            if (isClear) {
              this.dataSource = data
            } else {
              this.dataSource.push(...data)
            }
            this.pagination.TotalCount = result.TotalCount
            this.Total = result.Total
            this.finished = result.TotalCount === 0 ? true : result.TotalCount < (result.PageIndex * result.PageSize)
            // this.loading = false
            // this.varAwait = false
          })
          .finally(() => {
            // this.finished = true
            this.varAwait = false
            this.loading = false
          })
    },
    goTocollection(item) {
      if (Number(item.CollectionCount)>5) {
        this.$router.push({
        path: '/city-meta/collection-list',
        query: {
          commodityId: item.CommodityID
        }
        })
      } else {
        this.$router.push({
        path: '/city-meta/collection_s',
        query: {
          userId: this.userInfo.ID,
          commodityDetailsID: item.CommodityDetailsID,
          collectStatus: '1', // 我的藏品明细标识
          CommodityStatus: item.CommodityStatus
        }
      })
      }
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
      if (this.hasUserInfo) {
      this.pagination.PageSize = 10
      this.pagination.PageIndex++
      await this.getDataSource()
      } else {
          this.finished = true
            this.varAwait = false
            this.loading = false
      }
      
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
            position: relative;
             .bg-icon-size {
                position: absolute;
                top: 0;
                left: 5px;
                // z-index: 10;
              }
            .bgSzie{
              // z-index: 1;
                width: 95%;
                height:98%;
                 object-fit: cover;
              }
            &-body {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
               z-index: 999;
              //background-color: #000000;
              position: relative;

              img {
                width: 100%;
                object-fit: cover;
              }

              .bg-icon {
                position: absolute;
                top: 0;
                left: 0;
                // z-index: 10;
              }
              .bg-icons {
                position: absolute;
                bottom: 5px;
                right: 5px;
                // z-index: 10;
              }
              .readys {
                background: red;
                text-align: center;
                line-height: 17px;
                color:#FFF;
                font-size: 12px;
                width: 30px;
                border-radius: 20px;
              }
              .await {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  width: 60%;
                }
              }
              .ready {
                width: 40px;
                height: 40px;
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
                padding-left: 15px;
                padding-right: 5px;
                display: flex;
                justify-content: space-between;
                background-image: url(/public/static/images/collection/card-info-text-background.png);
                background-position: 0 0;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                height: 16px;

                p {
                  //width: 100%;
                  box-sizing: border-box;
                  font-size: 12px;
                  font-family: PingFangSC, PingFangSC-Regular;
                  font-weight: 400;
                  color: #716249;
                  line-height: 16px;
                  height: 16px;
                  //overflow: hidden;
                  //text-overflow: ellipsis;
                  //white-space: nowrap;
                  transform: scale(0.9);
                  text-align: left;
                }
              }
              &-name {
                // padding-left: 15px;
                // padding-right: 5px;
                display: flex;
                justify-content: space-between;
                height: 16px;

                p {
                  width: 100%;
                  box-sizing: border-box;
                  font-size: 14px;
                  font-family: PingFangSC, PingFangSC-Medium;
                  font-weight: 500;
                   color: #ffffff;
                  line-height: 16px;
                  height: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  text-align: left;
                }
              }

              &-title {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Medium;
                font-weight: 500;
                text-align: justify;
                color: #ffffff;
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 1.5;
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
