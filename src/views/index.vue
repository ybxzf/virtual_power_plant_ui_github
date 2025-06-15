<template>
  <div class="app-container home">
    <el-row class="home-statistics">
      <el-col :span="6" class="statistics-item" v-for="(item, i) in statisticsData" :key="i">
        <div @click="handleStatisticsClick(item)" style="width: 100%;height: 100%">
          <div class="item-label">{{ item.label }}</div>
          <div class="item-val">{{ item.value + ' ' + item.unit }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 41%;background: rgb(210 21 255 / 0%);">
      <el-col :span="24" style="background-color: rgba(12, 13, 111, 0);position: relative;">
        <div style="position: absolute; right: 5%;top: 3%;z-index: 2;">
          <el-button size="mini" :type="chartType == 'realTimeLoadMonitoring' ? 'primary' : ''"
            @click="changeChartType('realTimeLoadMonitoring')">实时负荷</el-button>
          <el-button size="mini" :type="chartType == 'historyData' ? 'primary' : ''"
            @click="changeChartType('historyData')">历史数据</el-button>
        </div>
        <RealTimeLoadMonitoring v-if="chartType === 'realTimeLoadMonitoring'" class="real-time-load-monitoring">
        </RealTimeLoadMonitoring>
        <HistoryData v-else class="real-time-load-monitoring">
        </HistoryData>
      </el-col>
    </el-row>
    <el-row style="height: 40%;">
      <el-col :span="8" style="background-color: rgb(12 111 52 / 0%);">
        <AggregationTypeRank class="real-time-load-monitoring"></AggregationTypeRank>
      </el-col>
      <el-col :span="16">
        <SettlementRank></SettlementRank>
      </el-col>
    </el-row>

    <!-- 欢迎访问！ -->
  </div>
</template>

<script>
import RealTimeLoadMonitoring from "./homePage/components/RealTimeLoadMonitoring.vue";
import HistoryData from "./homePage/components/historyData.vue";
import AggregationTypeRank from "./homePage/components/aggregationTypeRank.vue";
import SettlementRank from './homePage/components/settlementRank.vue';

export default {
  name: "Index",
  components: {
    RealTimeLoadMonitoring,
    HistoryData,
    AggregationTypeRank,
    SettlementRank,
  },
  data() {
    return {
      statisticsData: [//统计信息
        { label: '聚合负荷', value: 45.4, unit: 'MW', color: '#000000', path: '/resmanage/dlresource' },
        { label: '可调负荷', value: 30.3, unit: 'MW', color: '#000000', path: '/peoples/circuitLoadConfig' },
        { label: '接入聚合商', value: 1, unit: '家', color: '#000000', path: '/peoples/company' },
        { label: '接入用户', value: 170, unit: '户', color: '#000000', path: '/peoples/corporation' },
      ],
      chartType: 'realTimeLoadMonitoring'//图表类型
    };
  },
  methods: {
    //点击统计项
    handleStatisticsClick(item) {
      this.$router.push({ path: item.path });
    },
    // 切换图表类型
    changeChartType(type) {
      this.chartType = type;
    },
  }
};
</script>

<style scoped lang="scss">
.app-container {
  padding: 10px;
}

.home {
  background: url('../assets/images/homePage.png') no-repeat;
  height: calc(100vh - 100px);
  background-size: 100% 100%;

  .el-row {
    width: 100%;
  }

  .el-col {
    height: 100%;
  }

  .home-statistics {
    background: url('../assets/images/statistics.png') no-repeat;
    // background: rgb(17 128 225 / 50%);
    height: calc(100vh - 100px);
    background-size: 100% 100%;
    height: 21%;

    .statistics-item {
      // background-color: rgba(12, 13, 111, 0.5);
      position: relative;
      cursor: pointer;

      .item-label {
        height: 40%;
        display: flex;
        align-items: flex-end;
        padding-left: 15%;
        color: #585858;
        font-size: 20px;
        font-family: AlibabaPuHuiTi_3_65_Medium;
      }

      .item-val {
        height: 50%;
        display: flex;
        align-items: center;
        padding-left: 15%;
        font-family: AlibabaPuHuiTi_3_95_ExtraBold;
        color: #404040;
        font-size: 32px;
        font-weight: 600;
      }
    }
  }
}
</style>
