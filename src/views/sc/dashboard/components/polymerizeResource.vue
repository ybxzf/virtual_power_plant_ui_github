<script>
import DataEmpty from "@/views/sc/dashboard/components/Empty.vue";
import * as echarts from "echarts";
export default {
  name: "PolymerizeResource",
  components: { DataEmpty },
  props: {
    chartData: {
      type: Object,
      default: () => ({
        xData: ["00:15", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
        yData: [45, 38, 30, 85, 125, 110, 185, 160, 70],
        yData1: [60, 58, 62, 78, 95, 100, 115, 105, 75],
        legendData: [],
        title: "",
      }),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    // this.chartData.xData.length && this.drawChart(this.chartData.xData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.myChart.destroy();
    this.myChart = null;
  },
  methods: {
    handleResize() {
      this.myChart.resize();
    },
    drawChart() {
      this.myChart = echarts.init(document.getElementById("loadMonitoring"));
      const option = {};
      this.myChart.setOption(option);
      window.addEventListener("resize", this.handleResize);
    },
  },
};
</script>

<template>
  <div class="loadMonitoring-container">
    <div class="title">
      <span>聚合资源</span>
    </div>
    <div style="height: 75%">
      <div style="height: 40%; display: flex; justify-content: space-between; align-items: center">
        <div style="width: 2%"></div>
        <div
          style="
            width: 45%;
            height: 100%;
            background: url(/img/bigScreen/polymerize_1.png) no-repeat;
            background-size: 100% 100%;
          "
        >
          <div
            style="
              height: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 500;
            "
          >
            接入聚合商
          </div>
          <div
            style="
              height: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 18px;
              font-weight: 600;
            "
          >
            1家
          </div>
        </div>
        <div
          style="
            width: 45%;
            height: 100%;
            background: url(/img/bigScreen/polymerize_2.png) no-repeat;
            background-size: 100% 100%;
          "
        >
          <div
            style="
              height: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 500;
            "
          >
            接入用户
          </div>
          <div
            style="
              height: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 18px;
              font-weight: 600;
            "
          >
            12户
          </div>
        </div>
        <div style="width: 2%"></div>
      </div>
      <div style="height: 5%"></div>
      <div style="height: 55%; display: flex; justify-content: center; align-items: center">
        <div
          style="
            width: 92%;
            height: 100%;
            background: url(/img/bigScreen/polymerize_3_bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div
            style="
              width: 30%;
              height: 100%;
              background: url(/img/bigScreen/polymerize_3.png) no-repeat;
              background-size: contain;
              background-size: 150%;
              background-position: center;
            "
          ></div>
          <div style="width: 70%">
            <div
              style="
                display: flex;
                justify-content: space-between;
                color: rgba(12, 132, 255, 1);
                font-weight: 600;
              "
            >
              <div>当前运行总容量</div>
              <div>0.7MW</div>
            </div>
            <el-progress
              class="progress-total"
              :text-inside="true"
              :stroke-width="16"
              :percentage="70"
            ></el-progress>
            <el-progress
              class="progress-used"
              :text-inside="true"
              :stroke-width="16"
              :percentage="60"
            ></el-progress>
            <div
              style="
                display: flex;
                justify-content: space-between;
                color: rgba(255, 213, 15, 1);
                font-weight: 600;
              "
            >
              <div>可相应容量</div>
              <div>0.6MW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <DataEmpty v-else></DataEmpty> -->
  </div>
</template>

<style scoped lang="scss">
.loadMonitoring-container {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    height: 15%;
    background-image: url("../../../../assets/images/header-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 8%;
      transform: translateY(-60%);
      background-image: -webkit-linear-gradient(top, #ffffff, #597ba1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
#loadMonitoring {
  height: 85%;
  width: 100%;
  //background: #fff;
}
.progress-total {
  margin-bottom: 10px;
}
.progress-used {
  margin-top: 10px;
}

::v-deep .el-progress .el-progress-bar__outer {
  border-radius: 0;
  background-color: rgba(12, 132, 255, 0.1) !important;
}

::v-deep .el-progress .el-progress-bar__innerText {
  color: transparent !important;
}
::v-deep .progress-total .el-progress-bar__inner {
  border-radius: 0;
  border-right: 3px solid #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: linear-gradient(to right, rgba(12, 132, 255, 0.1), rgba(12, 132, 255, 1));
}
::v-deep .progress-used .el-progress-bar__inner {
  border-radius: 0;
  border-right: 3px solid #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: linear-gradient(to right, rgba(255, 213, 15, 0.1), rgba(255, 213, 15, 1));
}
</style>
