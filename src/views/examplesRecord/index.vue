<template>
  <div class="app-collection-examples-record">
    <div class="examples-boby">
        <div class="examples-boby-content">
          <PullRefresh v-model="refreshing" @refresh="onRefresh">
            <Empty v-if="!dataSource.length && !loading && finished && !varAwait" description="暂无数据 ~"
                   image="/static/images/collection/not-data-slot.png"/>
            <List
                v-else
                v-model="loading"
                :offset="200"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadMore"
            >
              <home-card v-for="item of dataSource" :key="item.ID" :goods="item"/>
              <!-- <home-card  /> -->

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
import { PullRefresh, List, Empty } from 'vant'
import HomeCard from './components/HomeCard'
import {exaplesApi} from "@/api"
import { mapGetters } from 'vuex'
export default {
  components: {
    HomeCard,
    PullRefresh,
    Empty,
    List
  },
  data () {
    return {
      loading: false,
      refreshing: false,
      varAwait: false,
      finished: false,
      dataSource:[],
       pagination: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.getDataSource()
  },
  methods:{
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
    // 获取数据
    getDataSource(isClear = false) {
      return new Promise((resolve) => {
        if (this.varAwait) return resolve()
        this.varAwait = true
        this.loading = true
        const { pagination, userInfo} = this
        const params = {
          pageIndex: pagination.PageIndex,
                 pageSize: pagination.PageSize,
                  userId:  userInfo.ID
        }
           exaplesApi
               .getMyTurnCommodityLog(params)
               .then(result => {
                 const data = result.Data || []
                 if (isClear) {
                   this.dataSource = data
                 } else {
                   this.dataSource.push(...data)
                  }
                 this.finished = result.TotalCount === 0 ? true : result.TotalCount < (result.PageIndex * result.PageSize)
                //  this.varAwait = false
                //  this.loading = false
               })
               .finally(() => {
                //  this.finished = true
                 this.varAwait = false
                 this.loading = false
                 resolve()
               })
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .app-collection-examples-record{
     background: #0b0e15;
     .examples-boby{
       margin-top: 38px;
       padding: 0px 16px 50px 16px;
     }
  }
</style>