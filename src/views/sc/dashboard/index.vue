<template>
  <div class="dash-container" :style="{ height: $route.path == '/bigScreen' ? '100vh' : 'calc(100vh - 84px)' }">
    <!-- 大屏展示！！！！ -->
  </div>
</template>
<script>

export default {
  name: 'ScDashboard',
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
}
</style>
