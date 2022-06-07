<template>
  <Tabbar :value="activeTabBar" :border="false">
    <TabbarItem v-for="tabBarItem of tabBarDataSource" :key="tabBarItem.key" :name="tabBarItem.key"
                :to="tabBarItem.key">
      <span v-html="tabBarItem.title"></span>
      <template #icon>
        <div>
          <img v-show="activeTabBar === tabBarItem.key" :src="tabBarItem.activeIcon" alt="">
          <img v-show="activeTabBar !== tabBarItem.key" :src="tabBarItem.icon" alt="">
        </div>
      </template>
    </TabbarItem>
  </Tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      tabBarDataSource: Object.freeze([
        {
          key: '/city-meta/home',
          title: '首页',
          icon: './static/images/tab-bar/home.png',
          activeIcon: './static/images/tab-bar/home-active.png'
        },
        {
          key: '/city-meta/collection',
          title: '藏品',
          icon: './static/images/tab-bar/collection.png',
          activeIcon: './static/images/tab-bar/collection-active.png'
        },
        {
          key: '/city-meta/my-center',
          title: '我的',
          icon: './static/images/tab-bar/my-center.png',
          activeIcon: './static/images/tab-bar/my-center-active.png'
        }
      ])
    }
  },
  computed: {
    activeTabBar() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
