<template>
  <div
    class="dash-container"
    :style="{ height: $route.path == '/bigScreen' ? '100vh' : 'calc(100vh - 84px)' }"
  >
    <!-- 大屏展示！！！！ -->
    <template v-if="$route.path == '/bigScreen'">
      <div style="height: 84px; position: relative">
        <HeaderTitle></HeaderTitle>
        <RealTime />
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="7">
          <el-col class="col-item">
            <PolymerizeResource></PolymerizeResource>
          </el-col>
          <el-col class="col-item">
            <AccessResourceType></AccessResourceType>
          </el-col>
          <el-col class="col-item">
            <RealTimeLoadMonitoring class="real-time-load-monitoring" />
          </el-col>
        </el-col>
        <el-col :span="10">
          <el-col class="col-item mid-top">
            <CenterTotal></CenterTotal>
          </el-col>
          <el-col class="col-item map">
            <CenterMap></CenterMap>
          </el-col>
          <el-col class="col-item trend-analysis">
            <TrendAnalysis />
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col class="col-item">
            <AdjustableType></AdjustableType>
          </el-col>
          <el-col class="col-item">
            <Responsiveness></Responsiveness>
          </el-col>
          <el-col class="col-item">
            <ComprehensiveIncome></ComprehensiveIncome>
          </el-col>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
import HeaderTitle from "./components/headerTitle.vue";
import RealTime from "./components/realTime.vue";
import PolymerizeResource from "./components/polymerizeResource.vue";
import AccessResourceType from "./components/accessResourceType.vue";
import RealTimeLoadMonitoring from "./components/RealTimeLoadMonitoring.vue";
import CenterTotal from "./components/centerTotal.vue";
import CenterMap from "./components/centerMap.vue";
import TrendAnalysis from "@/views/sc/dashboard/components/TrendAnalysis.vue";
import AdjustableType from "./components/adjustableType.vue";
import Responsiveness from "./components/responsiveness.vue";
import ComprehensiveIncome from "./components/comprehensiveIncome.vue";

export default {
  name: "ScDashboard",
  components: {
    HeaderTitle,
    TrendAnalysis,
    RealTime,
    RealTimeLoadMonitoring,
    PolymerizeResource,
    AccessResourceType,
    CenterTotal,
    CenterMap,
    AdjustableType,
    Responsiveness,
    ComprehensiveIncome,
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
  background: url("/img/bigScreen/bg.png") no-repeat;
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
        height: 10vh;
      }
      &.map {
        height: 55vh;
      }
      &.trend-analysis {
        height: 25vh;
      }
    }
  }
}
</style>
