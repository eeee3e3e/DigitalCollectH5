<template>
  <div class="app-my-center">

    <my-center-card/>

    <div class="pub-content">
      <my-center-banner/>
      <my-center-order-card/>
      <my-center-cell/>
    </div>
  </div>
</template>

<script>
import MyCenterCard from './components/MyCenterCard'
import MyCenterCell from './components/MyCenterCell'
import MyCenterOrderCard from './components/MyCenterOrderCard'
import MyCenterBanner from './components/MyCenterBanner'
import { userApi } from '@/api'
export default {
 data () {
   return {
     clearTotal:false
   }
 },
  components: {
    MyCenterCard,
    MyCenterCell,
    MyCenterBanner,
    MyCenterOrderCard
  },
  methods:{
    
  }
}
</script>

<style scoped lang="less">
.app-my-center {
  padding-bottom: 20px;
}
</style>
