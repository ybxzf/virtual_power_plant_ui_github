<template>
  <div
    class="dash-container"
    :style="{ height: $route.path == '/bigScreen' ? '100vh' : 'calc(100vh - 84px)' }"
  >
    <!-- 大屏展示！！！！ -->
    <template v-if="$route.path == '/bigScreen'">
      <div style="height: 84px">
        <RealTime />
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="7">
          <el-col class="col-item"></el-col>
          <el-col class="col-item"></el-col>
          <el-col class="col-item">
            <RealTimeLoadMonitoring class="real-time-load-monitoring" />
          </el-col>
        </el-col>
        <el-col :span="10">
          <el-col class="col-item mid-top"></el-col>
          <el-col class="col-item map"></el-col>
          <el-col class="col-item trend-analysis">
            <TrendAnalysis />
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col class="col-item"></el-col>
          <el-col class="col-item"></el-col>
          <el-col class="col-item"></el-col>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
import RealTime from "./components/realTime.vue";
import RealTimeLoadMonitoring from "./components/RealTimeLoadMonitoring.vue";
import TrendAnalysis from "@/views/sc/dashboard/components/TrendAnalysis.vue";
export default {
  name: "ScDashboard",
  components: {
    TrendAnalysis,
    RealTime,
    RealTimeLoadMonitoring,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.dash-container {
  background: url('../../../assets/images/bigScreen.png') no-repeat;
  // background: #081621;
  // height: calc(100vh - 84px);
  background-size: 100% 100%;
  position: relative;
  .row-bg {
    height: calc(100% - 84px);
    .col-item {
      width: 100%;
      height: 30vh;
      color: #fff;
      padding: 0 20px;
      &.mid-top {
        height: 15vh;
      }
      &.map {
        height: 50vh;
      }
      &.trend-analysis {
        height: 25vh;
      }
    }
  }
}
</style>
