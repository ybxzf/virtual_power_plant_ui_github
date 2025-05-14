<template>
  <div class="dash-container" :style="{ height: $route.path == '/bigScreen' ? '100vh' : 'calc(100vh - 84px)' }">
    <!-- 大屏展示！！！！ -->
    <RealTime v-if="$route.path == '/bigScreen'" />
  </div>
</template>
<script>
import RealTime from './components/realTime.vue'
export default {
  name: 'ScDashboard',
  components: {
    RealTime,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.dash-container {
  background: url('../../../assets/images/bigScreen.png') no-repeat;
  // height: calc(100vh - 84px);
  background-size: 100% 100%;
  position: relative;
}
</style>
